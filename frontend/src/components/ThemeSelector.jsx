import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeSelector = () => {
  const { theme, themes, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTheme = themes[theme];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 glass-effect"
        aria-label="Select theme"
      >
        {/* Color swatch */}
        <div
          className="w-6 h-6 rounded-lg shadow-inner"
          style={{ background: `linear-gradient(135deg, ${currentTheme.colors[0]}, ${currentTheme.colors[1]}, ${currentTheme.colors[2]})` }}
        />
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-semibold leading-tight">
            {currentTheme.name}
          </span>
          <span className="text-[10px] opacity-60 leading-tight">
            Theme
          </span>
        </div>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-300 opacity-50 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 animate-slideInDown overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Choose Theme
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400"
                aria-label="Close theme selector"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2.5">
              {Object.entries(themes).map(([key, themeConfig]) => (
                <button
                  key={key}
                  onClick={() => {
                    setTheme(key);
                    setIsOpen(false);
                  }}
                  className={`group relative flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    theme === key 
                      ? 'bg-gray-100 dark:bg-gray-700 ring-2 ring-violet-500/50' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  {/* Gradient swatch */}
                  <div
                    className="w-8 h-8 rounded-lg flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-200"
                    style={{ background: `linear-gradient(135deg, ${themeConfig.colors[0]}, ${themeConfig.colors[1]}, ${themeConfig.colors[2]})` }}
                  />
                  <div className="text-left min-w-0">
                    <div className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                      {themeConfig.name}
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500 truncate">
                      {themeConfig.description}
                    </div>
                  </div>
                  {theme === key && (
                    <div className="absolute top-1.5 right-1.5">
                      <svg className="w-4 h-4 text-violet-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <p className="text-[10px] text-center text-gray-400 dark:text-gray-500">
                Each theme applies unique colors across the app
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;