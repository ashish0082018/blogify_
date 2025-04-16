import { BookOpenText, Code, LayoutDashboard, Mail, PenTool, Rocket, ShieldCheck, Users } from 'lucide-react';
import MainLayout from '../home/MainLayout';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AboutPage = () => {
    const {authUser}=useSelector((store:any)=>store.user);

  return (
    <MainLayout> 
    <div className="min-h-screen bg-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-100 to-purple-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-purple-900 mb-6">About Blogify</h1>
          <p className="text-xl text-purple-700 max-w-3xl mx-auto">
            A modern blogging platform designed for writers and readers to connect, share, and grow together.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-purple-50/80 backdrop-blur-sm"></div>
      </section>

      {/* Developer Profile */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-purple-50 rounded-2xl p-8 shadow-lg border border-purple-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-200 to-purple-400 p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-white overflow-hidden">
                  {/* Placeholder for developer image */}
                  <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                    <span className="text-4xl font-bold text-purple-600">AV</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-purple-900 mb-2">Ashish Verma</h2>
                <p className="text-purple-700 font-medium mb-4">Full Stack Web Developer</p>
                <p className="text-purple-600 mb-4">
                  Passionate about building beautiful, functional web applications with modern technologies.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">React</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">TypeScript</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Node.js</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-purple-900 mb-12">Why Choose Blogify?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <PenTool className="w-8 h-8 text-purple-600" />,
                title: "Beautiful Editor",
                description: "Write with our distraction-free, feature-rich markdown editor."
              },
              {
                icon: <Rocket className="w-8 h-8 text-purple-600" />,
                title: "Blazing Fast",
                description: "Optimized performance for the best reading experience."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
                title: "Secure Platform",
                description: "Your data is protected with industry-standard security."
              },
              {
                icon: <Users className="w-8 h-8 text-purple-600" />,
                title: "Engaged Community",
                description: "Connect with like-minded writers and readers."
              },
              {
                icon: <LayoutDashboard className="w-8 h-8 text-purple-600" />,
                title: "Custom Dashboard",
                description: "Track your stats and manage content effortlessly."
              },
              {
                icon: <Code className="w-8 h-8 text-purple-600" />,
                title: "Developer Friendly",
                description: "Built with modern technologies for extensibility."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-purple-900 mb-2">{feature.title}</h3>
                <p className="text-purple-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-purple-900 mb-12">Our Blog in Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "500+", label: "Articles Published" },
                { number: "10K+", label: "Monthly Readers" },
                { number: "1K+", label: "Active Writers" },
                { number: "99.9%", label: "Uptime" }
              ].map((stat, index) => (
                <div key={index} className="p-6 bg-purple-50 rounded-xl">
                  <p className="text-4xl font-bold text-purple-600 mb-2">{stat.number}</p>
                  <p className="text-purple-700">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-100 to-purple-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-purple-100">
            <BookOpenText className="w-12 h-12 mx-auto text-purple-600 mb-4" />
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Ready to start your blogging journey?</h2>
            <p className="text-purple-600 mb-6">
              Join thousands of writers who are already sharing their stories with the world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
{
    authUser ?          <Link to={"/create"} >     <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-sm">
    Create Your Blog
    </button>
    </Link> :
             <Link to={"/register"} >     <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-sm">
             Create Your Blog
             </button>
             </Link> 
}
              <button className="px-6 py-3 border border-purple-300 text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                <Link to={"/blog"}>Explore Blogs</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-purple-900 mb-2">Have Questions?</h2>
            <p className="text-purple-600 mb-8 max-w-2xl mx-auto">
              Feel free to reach out to our team or the developer directly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="av0082018@gmail.com" className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                <Mail className="w-5 h-5" />
                Contact Support
              </a>
              <a href="https://github.com/ashish0082018" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                {/* <Github className="w-5 h-5" /> */}
                Developer's GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </MainLayout>
  );
};

export default AboutPage;