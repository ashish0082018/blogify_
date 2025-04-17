import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MessageSquare, Send, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useSelector } from 'react-redux';

interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: string;
  author: {
    name: string;
    email: string;
  };
}

interface CommentSectionProps {
  postId: string;
  isSignedIn: boolean;
  currentUser?: {
    id: string;
    name: string;
    email: string;
  };
}

const CommentSection = ({ postId, isSignedIn, currentUser }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { authUser } = useSelector((state: any) => state.user);

  // Fetch comments when component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://blogify-6ym8.onrender.com/api/v1/post/comment/${postId}`);
        if (response.data.success) {
          setComments(response.data.comments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error('Failed to load comments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Optimistically add the new comment to local state
      const optimisticComment: Comment = {
        id: `temp-${Date.now()}`,
        content: commentText,
        postId,
        authorId: currentUser?.id || '',
        createdAt: new Date().toISOString(),
        author: {
          name: currentUser?.name || 'You',
          email: currentUser?.email || ''
        }
      };

      setComments(prev => [optimisticComment, ...prev]);
      setCommentText('');

      // Post the comment to the server
      const response = await axios.post(
        `https://blogify-6ym8.onrender.com/api/v1/user/comment/${postId}`,
        { content: commentText },
        { withCredentials: true }
      );

      if (response.data.success) {
        // Replace the optimistic comment with the real one from server
        setComments(prev => [
          {
            ...response.data.comment,
            author: {
              ...response.data.comment.author,
              name: currentUser?.name || 'You' // Ensure "You" is preserved
            }
          },
          ...prev.filter(c => c.id !== optimisticComment.id)
        ]);
        toast.success('Thanks! Comment added.');
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error('Write comment in the less than 200 words');
      // Remove the optimistic comment if there was an error
      setComments(prev => prev.filter(c => !c.id.startsWith('temp-')));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Optimistically remove the comment from local state
      setComments(prev => prev.filter(comment => comment.id !== id));
      
      const response = await axios.post(
        `https://blogify-6ym8.onrender.com/api/v1/post/deletecomment`,
        { commentId: id },
        { withCredentials: true }
      );

      if (!response.data.success) {
        throw new Error("Failed to delete comment");
      }
      toast.success("Comment removed successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Revert the optimistic update if there was an error
      const response = await axios.get(`https://blogify-6ym8.onrender.com/api/v1/post/comment/${postId}`);
      if (response.data.success) {
        setComments(response.data.comments);
      }
      toast.error("Failed to delete comment");
    }
  };

  if (isLoading) {
    return (
      <div className="mt-12 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse flex gap-4">
            <div className="rounded-full h-10 w-10 bg-gray-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-5 w-5" />
        <h3 className="text-xl font-heading font-semibold">
          Comments ({comments.length})
        </h3>
      </div>
      
      {isSignedIn ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <Textarea
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="mb-3"
            rows={3}
          />
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="flex items-center gap-2"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-center">
          <p className="text-gray-600 mb-3">
            Sign in to join the conversation
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" asChild>
              <a href="/signin">Sign In</a>
            </Button>
            <Button asChild>
              <a href="/register">Register</a>
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group relative hover:bg-gray-50 rounded-lg p-2">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {comment.author?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800 truncate">
                      {comment.authorId === authUser?.id ? 'You' : comment.author?.name}
                    </span>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-700 break-words">{comment.content}</p>
                </div>
              </div>
              {authUser?.id === comment.authorId && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="absolute right-4 top-4 p-2 bg-white hover:bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-gray-200"
                  title="Delete comment"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto opacity-20 mb-4" />
            <p>Be the first to comment on this post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;