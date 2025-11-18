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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 active:scale-95 glass-effect"
        aria-label="Select theme"
      >
        <span className="text-2xl">{themes[theme].icon}</span>
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-semibold leading-tight">
            {themes[theme].name}
          </span>
          <span className="text-xs opacity-70 leading-tight">
            Theme
          </span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-80 glass-effect rounded-2xl shadow-2xl border z-50 animate-slideInDown overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider opacity-70">
                Choose Your Theme
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-black/5 transition-colors"
                aria-label="Close theme selector"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(themes).map(([key, themeConfig]) => (
                <button
                  key={key}
                  onClick={() => {
                    setTheme(key);
                    setIsOpen(false);
                  }}
                  className={`relative group flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                    theme === key 
                      ? 'ring-2 ring-offset-2 shadow-lg' 
                      : 'hover:shadow-md'
                  }`}
                  style={{
                    background: theme === key 
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))'
                      : 'transparent'
                  }}
                >
                  <div className="text-3xl mb-1 group-hover:scale-110 transition-transform duration-300">
                    {themeConfig.icon}
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm mb-0.5">
                      {themeConfig.name}
                    </div>
                    <div className="text-xs opacity-60 leading-tight">
                      {themeConfig.description}
                    </div>
                  </div>
                  {theme === key && (
                    <div className="absolute top-2 right-2">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-black/10">
              <p className="text-xs text-center opacity-60">
                ✨ Each theme features unique gradients and colors
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;