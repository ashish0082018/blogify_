
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainLayout from './MainLayout';
import { Button } from '@/components/ui/button';
import HeroSection from './HeroSection';
import FeaturedPost from './FeaturedPost';

import { useSelector } from 'react-redux';

// Mock data
const featuredPost = {
  id: 'cm9j0eotw0004dml4cbuunkez',
  title: 'The Future of Web Development: Trends to Watch in 2024',
  excerpt: 'Discover the latest trends shaping the future of web development, from AI-powered tools to serverless architectures and the evolution of frontend frameworks.',
  coverImage: '/blog.jpeg',
  author: {
    name: 'Alex Morgan',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
  },
  createdAt: new Date('2023-12-20'),
  categories: ['Technology', 'Web Development'],
};



const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const {authUser}=useSelector((store:any)=>store.user);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <> 
   
    <MainLayout>
  
      <HeroSection />
    
      <section className="section bg-white">
        <div className="container-blog mb-16 px-20">
          <div className={`opacity-0 ${isLoaded ? 'opacity-100 transition-opacity duration-1000' : ''}`}>
            <FeaturedPost {...featuredPost} />
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <span className="inline-block px-4 py-1 text-sm font-semibold text-purple-600 bg-purple-100 rounded-full mb-4">
        For Content Creators
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Why Write on <span className="text-purple-600">Blogify</span>?
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Join thousands of writers who are growing their audience with our powerful publishing platform.
      </p>
    </div>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-28">
      {[
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          ),
          title: "Easy to Create",
          description: "User-friendly editor that makes creating beautiful blog posts simple and enjoyable."
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          ),
          title: "Reach Audience",
          description: "Connect with readers interested in your content and grow your audience organically."
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          ),
          title: "Engage Community",
          description: "Build relationships through comments and discussions around your content."
        },
        {
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          title: "Track Analytics",
          description: "Gain insights about your readers with detailed analytics and performance tracking."
        }
      ].map((feature, index) => (
        <div 
          key={index}
          className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="h-14 w-14 rounded-xl bg-purple-50 flex items-center justify-center mb-6 text-purple-600">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>


    {/* CTA Section */}
    <div className="text-center">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Ready to start your writing journey?
      </h3>
{
  authUser ?        <Link to="/create">
  <Button 
    size="lg" 
    className="font-medium bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
  >
    Start Your Blog Today - It's Free
  </Button>
</Link>:
      <Link to="/register">
      <Button 
        size="lg" 
        className="font-medium bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
      >
        Start Your Blog Today - It's Free
      </Button>
    </Link>
}
      <p className="mt-4 text-gray-600">
        Join 50,000+ creators already growing with Blogify
      </p>
    </div>
  </div>
</section>
    
     
    </MainLayout>

    </>
  );
};

export default LandingPage;
