import React, { createContext, useContext, useState, useEffect } from 'react';

// Define theme types as string constants
const LIGHT = 'light';
const DARK = 'dark';

// Create context
const ThemeContext = createContext();

// Provider component
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(LIGHT);

  // Initialize theme on mount
  useEffect(() => {
    // Check localStorage
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
      setThemeState(storedTheme);
      document.documentElement.classList.add(storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Check system preference
      setThemeState(DARK);
      document.documentElement.classList.add(DARK);
    } else {
      document.documentElement.classList.add(LIGHT);
    }
  }, []);

  // Set theme function
  const setTheme = (newTheme) => {
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.remove(LIGHT, DARK);
    document.documentElement.classList.add(newTheme);
    setThemeState(newTheme);
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === LIGHT ? DARK : LIGHT;
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}