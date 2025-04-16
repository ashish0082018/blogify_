
import { Link } from 'react-router-dom';
import RegisterForm from './Signup';
import MainLayout from '../home/MainLayout';


const RegisterPage = () => {
  return (
    <MainLayout>
      <div className="container-blog py-12 md:py-16">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold mb-2">Create an Account</h1>
            <p className="text-gray-600">Join the BlogBloom community today</p>
          </div>
          
          <RegisterForm />
          
          <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
            <p>
              By registering, you agree to our{' '}
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

export default RegisterPage;
