
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  image: string;
  author: {
    name: string;
    bio?:string;
  };
  createdAt: Date;
  like: Array<any>;
  comment: Array<any>;

}

const BlogCard = ({
  id,
  title,
  content,
  image,
  author,
  createdAt,
  like,
  comment
}: BlogCardProps) => {




  return (
    <article className="blog-card">
<Link to={`/blog/${id}`} className="block">
  <div className="relative h-48 overflow-hidden rounded-lg">
    <img 
      src={image} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      onError={(e) => {
        // Fallback image if the original fails to load
        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Blog+Image';
      }}
    />
  </div>
</Link>
      
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">

          <span className="text-sm text-gray-600">
            {author.name} 
            
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Clock size={14} />
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </span>
        </div>
        
        <Link to={`/blog/${id}`} className="block group">
          <h3 className="font-heading text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {content}
          </p>
        </Link>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-500 text-sm">
              <Heart size={16} className="text-gray-400" /> 
              {like.length}
            </span>
            <span className="flex items-center gap-1 text-gray-500 text-sm">
              <MessageSquare size={16} className="text-gray-400" /> 
              {comment.length}
            </span>
          </div>
          <Link to={`/blog/${id}`} className="text-primary text-sm font-medium hover:underline">
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
