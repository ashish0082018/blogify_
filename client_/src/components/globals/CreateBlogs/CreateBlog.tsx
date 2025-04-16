import { useState, useCallback } from "react";
import axios from 'axios';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import MainLayout from "../home/MainLayout";
import { Loader2, UploadCloud, X, Type, PenTool } from 'lucide-react';

function Createpost() {
  const navigate = useNavigate();
  const [postdata, setpostdata] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handlesubmit = async (e:any) => {
    e.preventDefault();
    
    if (!postdata.title || !postdata.content || !postdata.image) {
      toast.error("Please fill all fields and upload a cover image");
      return;
    }

    const formData = new FormData();
    formData.append('title', postdata.title);
    formData.append('content', postdata.content);
    formData.append('image', postdata.image);

    setLoading(true);

    try {
      const response = await axios.post(
        "https://blogify-6ym8.onrender.com/api/v1/post/createpost", 
        formData, 
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );
      
      if (response.data.success) {
        toast.success("Blog published successfully!");
        navigate("/blog");
        resetForm();
      }
    } catch (error) {
      console.error('Error creating post:', error);
      const errorMessage = (error as any)?.response?.data?.message || 'Failed to publish blog';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setpostdata({ title: "", content: "", image: null });
    setImagePreview(null);
  };

  const handleDrag = useCallback((e:any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e:any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file:any) => {
    if (!file.type.match('image.*')) {
      toast.error("Please upload an image file (JPEG, PNG)");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    
    setpostdata({ ...postdata, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setpostdata({ ...postdata, image: null });
    setImagePreview(null);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-purple-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-purple-900 mb-2">Create New Blog Post</h1>
            <p className="text-purple-700/80">Share your thoughts and ideas with the world</p>
          </div>
          
          <form onSubmit={handlesubmit} className="space-y-8">
            {/* Cover Image Upload */}
            <div>
              <label className="block text-sm font-medium text-purple-800 mb-2">
                Cover Image
              </label>
              <div 
                className={`relative rounded-lg border-2 border-dashed ${dragActive ? 'border-purple-500 bg-purple-100/50' : 'border-purple-300'} transition-colors duration-200`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all"
                    >
                      <X className="w-4 h-4 text-purple-700" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-purple-400" />
                    <div className="mt-4 flex text-sm text-purple-700">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-purple-500 mt-2">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-purple-800 mb-2">
                Blog Title
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Type className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  id="title"
                  name="title"
                  value={postdata.title}
                  onChange={(e) => setpostdata({ ...postdata, title: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border border-purple-300 rounded-md leading-5 bg-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Enter a compelling title..."
                  required
                />
              </div>
            </div>

            {/* Content Editor */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-purple-800 mb-2">
                Your Story
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                  <PenTool className="h-5 w-5 text-purple-400" />
                </div>
                <textarea
                  id="content"
                  name="content"
                  rows={12}
                  value={postdata.content}
                  onChange={(e) => setpostdata({ ...postdata, content: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border border-purple-300 rounded-md leading-5 bg-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="Write your post content here..."
                  required
                />
              </div>
              <p className="mt-2 text-sm text-purple-500">
                Write something meaningful and engaging
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-purple-200">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-purple-300 rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  loading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Publishing...
                  </>
                ) : (
                  'Publish Post'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default Createpost;