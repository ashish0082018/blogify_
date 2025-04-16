
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturedPostProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  createdAt: Date;
  categories: string[];
}

const FeaturedPost = ({
  id,
  title,
  excerpt,
  coverImage,
  author,
  createdAt,
  categories
}: FeaturedPostProps) => {

  
  return (
    <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-10">
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <Link to={`/blog/${id}`}>
          <img
            src={coverImage}
            alt={title}
            className="w-full h-96 object-cover transition-transform hover:scale-105 duration-700"
          />
        </Link>
      </div>
      
      <div className="flex flex-col">
        <div className="flex gap-2 mb-4">
          {categories.map((category, index) => (
            <span 
              key={index}
              className="text-xs uppercase tracking-wider bg-accent text-primary px-3 py-1 rounded-full font-medium"
            >
              {category}
            </span>
          ))}
        </div>
        
        <Link to={`/blog/${id}`} className="group">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
            {title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-6 text-lg">
          {excerpt}
        </p>
        
        <div className="flex items-center gap-4 mb-6">
          <img
            src={author.avatarUrl}
            alt={author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-gray-800">{author.name}</p>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock size={14} />
              {formatDistanceToNow(createdAt, { addSuffix: true })}
            </span>
          </div>
        </div>
        
        <Link to={`/blog/${id}`}>
          <Button>Read Article</Button>
        </Link>
      </div>
    </article>
  );
};

export default FeaturedPost;
