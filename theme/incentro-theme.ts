export const incentroTheme = {
  colors: {
    primary: {
      incentronaut: '#1E3A8A', // Deep blue/navy
      mars: '#FF5000', // Incentro Mars orange
      sunlight: '#FFFFFF', // White/off-white
      starburst: '#FF6B3D', // Jupiter bright orange
    },
    light: {
      background: '#FFFFFF',
      surface: '#FAFBFC',
      surfaceElevated: '#F5F6F8',
      text: {
        primary: '#1A1D23',
        secondary: '#4A5568',
        muted: '#718096',
      },
      border: '#E2E8F0',
      accent: '#FF5000',
      success: '#48BB78',
      warning: '#ED8936',
      error: '#F56565',
    },
    dark: {
      background: '#0A0B0F',
      surface: '#1A1D23',
      surfaceElevated: '#2D3748',
      text: {
        primary: '#FFFFFF',
        secondary: '#CBD5E1',
        muted: '#A0AEC0',
      },
      border: '#4A5568',
      accent: '#FF6B3D',
      success: '#68D391',
      warning: '#F6AD55',
      error: '#FC8181',
    },
  },
  typography: {
    fontFamily: {
      sans: ['Work Sans', 'Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Courier New', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
    letterSpacing: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  animation: {
    transition: 'all 0.2s ease-in-out',
    transitionSlow: 'all 0.3s ease-in-out',
    hover: 'transform 0.2s ease-in-out',
  },
};

export type IncentroTheme = typeof incentroTheme;