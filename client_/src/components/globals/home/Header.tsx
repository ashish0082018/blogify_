import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, Plus } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import axios from 'axios';
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/userSlice';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authUser } = useSelector((store:any) => store.user);
  const dispatch=useDispatch();
  
  const Handlelogout =async () => {
    try {
      const response= await axios.get("https://blogify-6ym8.onrender.com/api/v1/user/logout",{withCredentials:true})
      if(response.data.success){
        dispatch(setAuthUser(null))
        toast("See you next time... 👋" )
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="w-full bg-white/90 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">B</div>
          <span className="font-heading font-bold text-xl md:text-2xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Blogify</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors font-medium hover:underline underline-offset-4 decoration-2">Home</Link>
          <Link to="/blog" className="text-foreground/80 hover:text-primary transition-colors font-medium hover:underline underline-offset-4 decoration-2">Blog</Link>
          <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors font-medium hover:underline underline-offset-4 decoration-2">About</Link>
          
          {authUser && (
            <>
              <Link to="/create" className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors font-medium hover:underline underline-offset-4 decoration-2">
                <Plus size={16} /> Create
              </Link>
              <Link to="/profile" className="text-foreground/80 hover:text-primary transition-colors font-medium hover:underline underline-offset-4 decoration-2">Profile</Link>
            </>
          )}
        </nav>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {authUser ? (
            <Popover>
              <PopoverTrigger className="focus:outline-none">
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <AvatarImage src={authUser.avatar || "https://github.com/shadcn.png"} />
                  <AvatarFallback>
                    {authUser.name ? authUser.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2 mt-2">
                <div className="px-3 py-2">
                  <h3 className="font-semibold text-sm">{authUser.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">{authUser.email}</p>
                </div>
                <Separator className="my-2" />
                <Link to="/profile">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <User size={14} /> Profile
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-red-500 hover:text-red-600"
                  onClick={Handlelogout}
                >
                  <LogOut size={14} /> Logout
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="outline" className="hover:bg-primary/10">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="px-4 py-3 space-y-2">
          <Link 
            to="/" 
            className="block py-3 px-2 rounded-md hover:bg-gray-50 text-foreground/80 hover:text-primary transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/blog" 
            className="block py-3 px-2 rounded-md hover:bg-gray-50 text-foreground/80 hover:text-primary transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link 
            to="/about" 
            className="block py-3 px-2 rounded-md hover:bg-gray-50 text-foreground/80 hover:text-primary transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          
          {authUser && (
            <>
              <Link 
                to="/create" 
                className="  py-3 px-2 rounded-md hover:bg-gray-50 text-foreground/80 hover:text-primary transition-colors font-medium flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Plus size={16} /> Create Post
              </Link>
              <Link 
                to="/profile" 
                className="block py-3 px-2 rounded-md hover:bg-gray-50 text-foreground/80 hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </>
          )}
          
          <div className="pt-2 border-t space-y-2">
            {authUser ? (
              <>
                <div className="flex items-center gap-3 px-2 py-3">
                  <Avatar>
                    <AvatarImage src={authUser.avatar || "https://github.com/shadcn.png"} />
                    <AvatarFallback>
                      {authUser.name ? authUser.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{authUser.name}</h4>
                    <p className="text-xs text-muted-foreground">{authUser.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full gap-2 text-red-500 hover:text-red-600 border-red-100 hover:border-red-200"
                  onClick={Handlelogout}
                >
                  <LogOut size={16} /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-primary to-purple-600">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;