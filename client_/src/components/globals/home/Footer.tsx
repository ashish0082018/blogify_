import { Link } from 'react-router-dom';
import {  Instagram, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 pt-16 pb-8 px-10">
      <div className="container-blog">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Branding & Socials */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-white font-bold transition-transform group-hover:scale-105">
                B
              </div>
              <span className="font-heading font-bold text-xl md:text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Blogify
              </span>
            </Link>
            <p className="text-gray-600 mb-4">
              Share your thoughts and ideas with the world. BlogBloom is the platform for modern writers.
            </p>
            <div className="flex gap-4">
              <a   target="_blank" href="https://www.linkedin.com/in/ashish-verma-16b525238/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-400 hover:text-primary transition-colors" aria-label="Facebook">
                <Linkedin size={20} />
              </a>
              <a href="#"   target="_blank" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a   target="_blank" href="https://github.com/ashish0082018" className="text-gray-400 hover:text-primary transition-colors" aria-label="Github">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-base font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link  to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-base font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary transition-colors">Writing Guides</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-primary transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-3 text-center text-sm text-gray-600">
          <p>&copy; {currentYear} Blogify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
