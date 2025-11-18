import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
  aurora: {
    name: 'Aurora',
    icon: '🌌',
    description: 'Modern purple, pink & blue gradient',
    primary: 'purple',
    secondary: 'pink',
    accent: 'blue'
  },
  midnight: {
    name: 'Midnight',
    icon: '🌙',
    description: 'Deep blue with gold accents',
    primary: 'indigo',
    secondary: 'amber',
    accent: 'cyan',
    isDark: true
  },
  sakura: {
    name: 'Sakura',
    icon: '🌸',
    description: 'Soft pink with mint accents',
    primary: 'pink',
    secondary: 'teal',
    accent: 'orange'
  },
  cosmic: {
    name: 'Cosmic',
    icon: '✨',
    description: 'Deep purple & cyan futuristic',
    primary: 'indigo',
    secondary: 'cyan',
    accent: 'purple',
    isDark: true
  },
  emerald: {
    name: 'Emerald',
    icon: '💎',
    description: 'Rich green with gold',
    primary: 'emerald',
    secondary: 'amber',
    accent: 'teal'
  },
  sunset: {
    name: 'Sunset',
    icon: '🌅',
    description: 'Warm orange with purple',
    primary: 'orange',
    secondary: 'purple',
    accent: 'red'
  }
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme && themes[savedTheme] ? savedTheme : 'aurora';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    Object.keys(themes).forEach(theme => {
      root.classList.remove(theme);
    });
    
    // Add current theme class
    root.classList.add(currentTheme);
    
    // Handle dark mode class for dark themes
    if (themes[currentTheme]?.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const toggleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setCurrentTheme(themeKeys[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme: currentTheme, 
      themeConfig: themes[currentTheme],
      themes,
      setTheme, 
      toggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};