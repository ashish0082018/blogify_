
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { Calendar} from 'lucide-react';
import MainLayout from '../home/MainLayout';
import CommentSection from './Commentsection';
import BlogContent from './BlogContent';
import { useSelector } from 'react-redux';

          

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const {authUser}=useSelector((state:any)=>state.user);
  const [isSignedIn, setIsSignedIn] = useState(false); // For demo purposes
  const [isLoading, setIsLoading] = useState(true);


 const {allPost}=useSelector((state:any)=>state.post);
 const selectedPost = allPost?.find((post: any) => post.id === id);
 


useEffect(() => {
  window.scrollTo(0, 0);
    if (authUser) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [authUser,id]);

 
  
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container-blog py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <article className="container-blog py-16 px-8">
        <header className="mb-8 max-w-3xl mx-auto text-center">
          
          <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
            {selectedPost.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center">

              <span className="font-medium text-gray-800">
                {selectedPost.author.name}
              </span>
            </div>
            
            <div className="flex items-center text-gray-600">
  <Calendar className="h-4 w-4 mr-1" />
  <time dateTime={new Date(selectedPost.createdAt).toISOString()}>
    {formatDistanceToNow(new Date(selectedPost.createdAt), { addSuffix: true })}
  </time>
</div>

          </div>
        </header>
        
        <div className="max-w-4xl mx-auto mb-12 rounded-xl overflow-hidden shadow-lg">
          <img
            src={selectedPost.image}
           
            className="w-full h-72 md:h-96 object-cover"
          />
        </div>
        
        <div className="max-w-3xl mx-auto">


          <BlogContent 
            content={selectedPost.content} 
            likesCount={selectedPost.like.length} 
            isSignedIn={isSignedIn}
            postId={selectedPost.id}
          />

          
          <Separator className="my-12" />
          
          <div className="flex items-center gap-4 mb-8">

            <div>
              <h3 className="font-heading font-semibold text-lg">
                Written by {selectedPost.author.name}
              </h3>
              <p className="text-gray-600">{selectedPost.author.bio}</p>
            </div>
          </div>
          
          <Separator className="my-12" />
          
          <CommentSection 
            postId={selectedPost.id}
            // comments={selectedPost.comment}
            isSignedIn={isSignedIn}
          />
        </div>
      </article>
    </MainLayout>
  );
};

export default BlogDetailPage;
