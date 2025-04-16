import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import MainLayout from '../home/MainLayout';
import BlogCard from './Blogcard';
import useGetPost from '@/hooks/usepost';
import { useSelector } from 'react-redux';

// Mock blog data


const BlogFeedPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  useGetPost();
  const {allPost}=useSelector((state:any)=>state.post);

  console.log(allPost);
  
  
  // Filter blogs based on search query (case insensitive)
  const filteredBlogs = allPost.filter((blog :any) => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the filteredBlogs
  };
  
  return (
    <MainLayout>
      {/* Section 1 - Header with search */}
      <div className="bg-gradient-to-b from-purple-400 to-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Explore Articles
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles by title..."
                className="pl-10 pr-24 py-6 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                size="sm"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Section 2 - Blog feed */}
      <div className="container mx-auto max-w-7xl py-12 px-4">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="font-semibold text-2xl">
            {searchQuery ? `Search results for "${searchQuery}"` : 'All Articles'}
          </h2>
          <span className="text-gray-500">
            Showing {filteredBlogs.length} of {allPost.length} articles
          </span>
        </div>
        
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog :any) => (
              <BlogCard key={blog.id}  {...blog}/>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">
              No articles found matching your search.
            </h3>
            <Button 
              variant="ghost" 
              className="mt-4"
              onClick={() => setSearchQuery('')}
            >
              Clear search
            </Button>
          </div>
        )}
        
        {!searchQuery && filteredBlogs.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BlogFeedPage;