import { Heart, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';

interface BlogContentProps {
  content: string;
  likesCount: number;
  isSignedIn: boolean;
  postId: string;
}

interface User {
  id: string;
  name: string;
}

const BlogContent = ({ content, likesCount, isSignedIn, postId }: BlogContentProps) => {
  const [likes, setLikes] = useState(likesCount);
  const [hasLiked, setHasLiked] = useState(false);
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const [showLikedUsers, setShowLikedUsers] = useState(false);
  const [isLoadingLikes, setIsLoadingLikes] = useState(false);
  const {authUser}=useSelector((state:any)=>state.user);
  
  const handleLike = async () => {
    if (!isSignedIn) {
      toast.error('Please sign in to like this post');
      return;
    }
    
    try {
      setIsLoadingLikes(true);
      const newLikeStatus = !hasLiked;
      
      // Optimistic UI update
      setLikes(newLikeStatus ? likes + 1 : likes - 1);
      setHasLiked(newLikeStatus);
      
      await axios.get(
        `https://blogify-6ym8.onrender.com/api/v1/post/likepost/${postId}`,
        
        { withCredentials: true }
      );
      
      if (newLikeStatus) {
        toast.success('You liked this post!');
        fetchLikedUsers();
      }
    } catch (error) {
      // Revert on error
      setLikes(hasLiked ? likes - 1 : likes + 1);
      setHasLiked(!hasLiked);
      toast.error('Failed to update like');
    } finally {
      setIsLoadingLikes(false);
    }
  };
  
  const fetchLikedUsers = async () => {
    try {
      const response = await axios.get(
        `https://blogify-6ym8.onrender.com/api/v1/post/likes/${postId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        setLikedUsers(response.data.users);
      }
    } catch (error) {
      console.error('Failed to fetch liked users:', error);
    }
  };
  
  const toggleLikedUsers = () => {
    if (!showLikedUsers && likedUsers.length === 0) {
      fetchLikedUsers();
    }
    setShowLikedUsers(!showLikedUsers);
  };
  
  // Split content into paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');
  
  return (
    <div className="relative">
      <div className="prose prose-lg max-w-none">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-6 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      
      <div className="mt-8 border-t border-b py-6">
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleLike}
            disabled={isLoadingLikes}
            className={`flex items-center gap-2 px-8 py-2 rounded-full transition-all ${
              hasLiked
                ? 'bg-primary/10 text-primary'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Heart className={`h-5 w-5 ${hasLiked ? 'fill-primary text-primary' : ''}`} />
            <span className="font-medium">{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
          </button>
          
          {likes > 0 && (
            <button
              onClick={toggleLikedUsers}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>See who liked this</span>
              {showLikedUsers ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          )}
          
          {showLikedUsers && (
            <div className="w-full mt-4 space-y-3 max-h-60 overflow-y-auto px-4 ">
              {likedUsers.length > 0 ? (
                likedUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-gray-200 text-gray-700">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">{user.name}</span>
                    {hasLiked && user.id === authUser.id && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">You</span>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-400">
                  Loading liked users...
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogContent;