import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import ThemeSelector from './ThemeSelector';

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-effect sticky top-0 z-40 border-b" style={{borderColor: 'rgba(128,128,128,0.15)'}}>
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 gradient-bg rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight gradient-text">
              MERNfolio
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeSelector />

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive('/dashboard')
                      ? 'tab-button-active'
                      : 'theme-text hover:scale-105'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to={`/portfolio/${user.uid}`}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname.includes('/portfolio/')
                      ? 'tab-button-active'
                      : 'theme-text hover:scale-105'
                  }`}
                >
                  My Portfolio
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-2 px-5 py-2 text-sm font-semibold text-white gradient-bg rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="ml-2 px-5 py-2 text-sm font-semibold text-white gradient-bg rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl theme-text transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 mt-3 space-y-1 animate-slideInDown" style={{borderTop: '1px solid rgba(128,128,128,0.15)'}}>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium theme-text transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to={`/portfolio/${user.uid}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium theme-text transition-colors"
                >
                  My Portfolio
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-center text-white gradient-bg"
              >
                Get Started
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
