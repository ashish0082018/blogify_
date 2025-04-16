
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const {authUser}=useSelector((store:any)=>store.user);

  return (
    <section className="relative bg-linear-to-r from-purple-200 to-gray-100 py-20 md:py-32 overflow-hidden md:px-20">
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden z-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-blog relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-block text-purple-400  px-4 py-1 rounded-full bg-purple-100 hover:scale-105 transition hover:cursor-grab  font-medium mb-6 animate-fade-in">
              Welcome to Blogify
            </div>
            <h1 className="font-heading font-bold mb-6 leading-tight text-6xl">
              Unleash Your Ideas <br className="hidden md:block"/> Through Elegant Writing
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0">
              Create, share, and discover stories that inspire in a beautiful, modern blogging platform designed for today's writers.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
{
  authUser?               <Link to="/create">
  <Button size="lg" className="font-medium px-6 hover:cursor-pointer">
    Start Blogging <ArrowRight className="ml-2 h-4 w-4 " />
  </Button>
</Link>:
              <Link to="/register">
              <Button size="lg" className="font-medium px-6 hover:cursor-pointer">
                Start Blogging <ArrowRight className="ml-2 h-4 w-4 " />
              </Button>
            </Link>
}
              <Link to="/blog">
                <Button size="lg" variant="outline" className="hover:cursor-pointer font-medium px-6">
                  Explore Articles
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent rounded-2xl transform rotate-6"></div>
            <div className="relative shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <img 
                src="/landing.jpeg" 
                alt="Person writing on a laptop" 
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
