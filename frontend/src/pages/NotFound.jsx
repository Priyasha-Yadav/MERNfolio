import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="animate-bounce-in">
          <div className="text-9xl mb-8">🔍</div>
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link to="/" className="btn-primary">
              Go Home 🏠
            </Link>
            <Link to="/login" className="btn-secondary">
              Get Started ✨
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;