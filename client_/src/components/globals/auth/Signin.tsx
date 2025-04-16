import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/redux/userSlice';

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('https://blogify-6ym8.onrender.com/api/v1/user/login', {
        email,
        password,
      }, {
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success('Signed in successfully!');
        dispatch(setAuthUser(response.data.user));
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-900 border border-purple-100 dark:border-purple-900">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-2">Welcome Back</h2>
        <p className="text-gray-600 dark:text-gray-300">Sign in to access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 dark:hover:text-purple-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:bg-gray-800"
            />
            <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-300">
              Remember me
            </Label>
          </div>

        </div>

        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300 py-2 rounded-lg font-medium"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;