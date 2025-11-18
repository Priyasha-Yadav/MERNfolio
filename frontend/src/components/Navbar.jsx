import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            MERNfolio 🚀
          </Link>

          <div className="flex items-center gap-4">
            <ThemeSelector />

            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="hidden sm:block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link 
                  to={`/portfolio/${user.uid}`} 
                  className="hidden sm:block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium"
                >
                  My Portfolio
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="btn-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
