
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: Date;
  likesCount: number;
  commentsCount: number;
}

const BlogCard = ({
  id,
  title,
  excerpt,
  coverImage,
  author,
  createdAt,
  likesCount,
  commentsCount
}: BlogCardProps) => {
  return (
    <article className="blog-card">
      <Link to={`/blog/${id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>
      </Link>
      
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={author.avatarUrl}
            alt={author.name}
            className="w-8 h-8 rounded-full object-cover"
          />
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
            {excerpt}
          </p>
        </Link>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-500 text-sm">
              <Heart size={16} className="text-gray-400" /> 
              {likesCount}
            </span>
            <span className="flex items-center gap-1 text-gray-500 text-sm">
              <MessageSquare size={16} className="text-gray-400" /> 
              {commentsCount}
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
