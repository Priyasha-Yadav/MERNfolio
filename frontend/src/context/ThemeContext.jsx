import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
  aurora: {
    name: 'Aurora',
    description: 'Purple & pink gradient',
    gradient: 'from-violet-500 via-purple-500 to-pink-500',
    colors: ['#8B5CF6', '#A855F7', '#EC4899'],
    primary: 'purple',
    secondary: 'pink',
    accent: 'blue'
  },
  midnight: {
    name: 'Midnight',
    description: 'Deep blue & gold',
    gradient: 'from-indigo-600 via-blue-700 to-amber-500',
    colors: ['#4F46E5', '#1D4ED8', '#F59E0B'],
    primary: 'indigo',
    secondary: 'amber',
    accent: 'cyan',
    isDark: true
  },
  sakura: {
    name: 'Sakura',
    description: 'Soft pink & mint',
    gradient: 'from-pink-400 via-rose-400 to-teal-400',
    colors: ['#F472B6', '#FB7185', '#2DD4BF'],
    primary: 'pink',
    secondary: 'teal',
    accent: 'orange'
  },
  cosmic: {
    name: 'Cosmic',
    description: 'Purple & cyan futuristic',
    gradient: 'from-indigo-500 via-purple-600 to-cyan-400',
    colors: ['#6366F1', '#9333EA', '#22D3EE'],
    primary: 'indigo',
    secondary: 'cyan',
    accent: 'purple',
    isDark: true
  },
  emerald: {
    name: 'Emerald',
    description: 'Rich green & gold',
    gradient: 'from-emerald-500 via-green-500 to-amber-400',
    colors: ['#10B981', '#22C55E', '#FBBF24'],
    primary: 'emerald',
    secondary: 'amber',
    accent: 'teal'
  },
  sunset: {
    name: 'Sunset',
    description: 'Warm orange & purple',
    gradient: 'from-orange-500 via-red-500 to-purple-600',
    colors: ['#F97316', '#EF4444', '#9333EA'],
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
    Object.keys(themes).forEach(theme => { root.classList.remove(theme); });
    root.classList.add(currentTheme);
    if (themes[currentTheme]?.isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const setTheme = (themeName) => {
    if (themes[themeName]) setCurrentTheme(themeName);
  };

  const toggleTheme = () => {
    const keys = Object.keys(themes);
    const next = (keys.indexOf(currentTheme) + 1) % keys.length;
    setCurrentTheme(keys[next]);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, themeConfig: themes[currentTheme], themes, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};