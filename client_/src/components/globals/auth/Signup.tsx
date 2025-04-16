import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '@/redux/userSlice';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
        name,
        email,
        password,
      }, {
        withCredentials: true,
      });
      
      if (response.data.success) {
        toast.success('Account created successfully!');
        dispatch(setAuthUser(response.data.user));
        navigate('/');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Something went wrong';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-900 border border-purple-100 dark:border-purple-900">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-2">Create Account</h2>
        <p className="text-gray-600 dark:text-gray-300">Join us to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
          <Input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Your Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

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

        <div className="space-y-3">
          <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <input
            type="checkbox"
            id="terms"
            required
            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:bg-gray-800"
          />
          <Label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
            I agree to the{' '}
            <Link to="/terms" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300 py-2 rounded-lg font-medium"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          Already have an account?{' '}
          <Link 
            to="/signin" 
            className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;