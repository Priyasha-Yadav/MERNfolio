import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="animate-fadeIn">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
          </div>
          <h1 className="text-7xl font-extrabold text-gray-200 dark:text-gray-800 mb-2" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
            404
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 text-white font-semibold bg-gradient-to-r from-violet-600 to-pink-500 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Go Home
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 font-semibold border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;