import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Pen, User, Mail, Calendar, BookOpen, Heart, Trash2, Lock, LockOpen } from 'lucide-react';
import MainLayout from '../home/MainLayout';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  interface UserDetails {
    name: string;
    email: string;
    bio?: string;
    post: { id: string; title: string; content: string; createdAt: string; private: boolean; image?: string }[];
    like: any[];
  }
  
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState('');
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/user/userdetails',
          { withCredentials: true }
        );
        
        if (response.data.success) {
          setUserDetails(response.data.alldetail);
          console.log(userDetails);
          
          setBio(response.data.alldetail.bio || '');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleBioUpdate = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/user/setbio',
        { bio: tempBio },
        { withCredentials: true }
      );

      if (response.data.success) {
        setBio(tempBio);
        setUserDetails(prev => prev ? { ...prev, bio: tempBio } : null);
        toast.success('Bio updated successfully');
        setIsEditingBio(false);
      }
    } catch (error) {
      console.error('Error updating bio:', error);
      toast.error('Failed to update bio');
    }
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;
    
    setIsProcessing(true);
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/post/deletepost/${postToDelete}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success('Post removed successfully');
        setUserDetails(prev => {
          if (!prev) return null;
          return {
            ...prev,
            post: prev.post.filter((post: any) => post.id !== postToDelete)
          };
        });
        setPostToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    } finally {
      setIsProcessing(false);
    }
  };

  const togglePostPrivacy = async (postId :string, currentPrivacy:boolean) => {
    setIsProcessing(true);
    
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/post/setprivate',
        { id: postId, previous: currentPrivacy },
        { withCredentials: true }
      );

      if (response.data.success) {

        toast.success(`Post marked as ${!currentPrivacy ? 'private' : 'public'}`);
        setUserDetails(prev => {
          if (!prev) return null;
          return {
            ...prev,
            post: prev.post.map(post => 
              post.id === postId ? { ...post, private: !currentPrivacy } : post
            )
          };
        });
      }
    } catch (error) {
      console.error('Error toggling post privacy:', error);
      toast.error('Failed to update post privacy');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </MainLayout>
    );
  }

  if (!userDetails) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <p className="text-gray-600">Failed to load profile data</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Delete Confirmation Modal */}
          {postToDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Post</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setPostToDelete(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeletePost}
                    disabled={isProcessing}
                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 ${
                      isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition duration-500">
          <div 
  className="h-32 bg-cover bg-center"
  style={{
    backgroundImage: "url('/profile.jpeg')"
  }}
></div>
            
            <div className="px-6 pb-6 relative mt-4" >
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16">
                <div className="flex items-end">
                  <div className="bg-white p-2 rounded-full shadow-lg ">
                    <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <User size={48} />
                    </div>
                  </div>
                  <div className="ml-4 mb-2">
                    <h1 className="text-2xl font-bold text-zinc-900">{userDetails.name}</h1>
                    <p className="text-purple-600">{userDetails.email}</p>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {userDetails.post.length} {userDetails.post.length === 1 ? 'Post' : 'Posts'}
                  </div>
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {userDetails.like.length} {userDetails.like.length === 1 ? 'Like' : 'Likes'}
                  </div>
                </div>
              </div>
              
              {/* Bio Section */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-900">About</h2>
                  {!isEditingBio ? (
                    <button 
                      onClick={() => {
                        setTempBio(bio);
                        setIsEditingBio(true);
                      }}
                      className="text-purple-600 hover:text-purple-800 flex items-center"
                    >
                      <Pen size={16} className="mr-1" />
                      Edit
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleBioUpdate}
                        className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
                      >
                        Save
                      </button>
                      <button 
                        onClick={() => setIsEditingBio(false)}
                        className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                
                {isEditingBio ? (
                  <textarea
                    value={tempBio}
                    onChange={(e) => setTempBio(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-700">
                    {bio || 'No bio yet. Tell us about yourself!'}
                  </p>
                )}
              </div>
              
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center text-gray-600">
                  <Mail size={18} className="mr-2 text-purple-600" />
                  <span>{userDetails.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2 text-purple-600" />
                  <span>Joined {formatDate(userDetails.post[0]?.createdAt || new Date())}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Posts Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen size={20} className="mr-2 text-purple-600" />
              Your Posts
            </h2>
            
            {userDetails.post.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">You haven't created any posts yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userDetails.post.map(post => (
                  <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg line-clamp-2">{post.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          post.private ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {post.private ? 'Private' : 'Public'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(post.createdAt)}
                        </div>
                        <Link 
                          to={`/blog/${post.id}`} 
                          className="text-sm text-purple-600 hover:text-purple-800"
                        >
                          Read →
                        </Link>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        onClick={() => togglePostPrivacy(post.id, post.private)}
                        disabled={isProcessing}
                        className="p-2 rounded-full  bg-white/90 hover:bg-gray-100 transition-colors"
                        title={post.private ? 'Make public' : 'Make private'}
                      >
                        {post.private ? (
                          <Lock size={16} className="text-purple-600" />
                        ) : (
                          <LockOpen size={16} className="text-purple-600" />
                        )}
                      </button>
                      <button
                        onClick={() => setPostToDelete(post.id)}
                        className="p-2 rounded-full bg-white/90 hover:bg-red-100 transition-colors"
                        title="Delete post"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Liked Posts Section */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Heart size={20} className="mr-2 text-purple-600" />
              Liked Posts
            </h2>
            
            {userDetails.like.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">You haven't liked any posts yet</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">
                  You've liked {userDetails.like.length} {userDetails.like.length === 1 ? 'post' : 'posts'}
                 
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;