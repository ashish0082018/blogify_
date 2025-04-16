
import { Link } from 'react-router-dom';
import MainLayout from '../home/MainLayout';
import SignInForm from './Signin';

const SignInPage = () => {
  return (
    <MainLayout>
      <div className="container-blog py-12 md:py-16">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to continue to your account</p>
          </div>
          
          <SignInForm />
          
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
            <p>
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SignInPage;
