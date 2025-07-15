import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { incentroTheme } from '../theme/incentro-theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  colors: typeof incentroTheme.colors.light | typeof incentroTheme.colors.dark;
  typography: typeof incentroTheme.typography;
  spacing: typeof incentroTheme.spacing;
  borderRadius: typeof incentroTheme.borderRadius;
  shadows: typeof incentroTheme.shadows;
  animation: typeof incentroTheme.animation;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('incentro-theme') as ThemeMode;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem('incentro-theme', theme);
    
    // Update CSS custom properties
    const root = document.documentElement;
    const colors = theme === 'dark' ? incentroTheme.colors.dark : incentroTheme.colors.light;
    
    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--surface', colors.surface);
    root.style.setProperty('--surface-elevated', colors.surfaceElevated);
    root.style.setProperty('--text-primary', colors.text.primary);
    root.style.setProperty('--text-secondary', colors.text.secondary);
    root.style.setProperty('--text-muted', colors.text.muted);
    root.style.setProperty('--border', colors.border);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--success', colors.success);
    root.style.setProperty('--warning', colors.warning);
    root.style.setProperty('--error', colors.error);
    
    // Primary colors
    root.style.setProperty('--primary-incentronaut', incentroTheme.colors.primary.incentronaut);
    root.style.setProperty('--primary-mars', incentroTheme.colors.primary.mars);
    root.style.setProperty('--primary-sunlight', incentroTheme.colors.primary.sunlight);
    root.style.setProperty('--primary-starburst', incentroTheme.colors.primary.starburst);
    
    // Add/remove dark class for additional CSS targeting
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const colors = theme === 'dark' ? incentroTheme.colors.dark : incentroTheme.colors.light;

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    colors,
    typography: incentroTheme.typography,
    spacing: incentroTheme.spacing,
    borderRadius: incentroTheme.borderRadius,
    shadows: incentroTheme.shadows,
    animation: incentroTheme.animation,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}