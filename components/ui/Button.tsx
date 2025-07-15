import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'voice' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {

  const baseClasses = 'font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 hover-lift disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-6 py-2.5 text-base rounded-lg',
    lg: 'px-8 py-3 text-lg rounded-xl'
  };

  const variantClasses = {
    primary: 'bg-incentro-gradient text-white hover:shadow-incentro focus:ring-orange-400',
    secondary: `bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:bg-[var(--surface-elevated)] focus:ring-[var(--accent)]`,
    voice: `bg-[var(--primary-incentronaut)] text-white hover:bg-opacity-90 focus:ring-blue-400`,
    outline: `border-2 border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white focus:ring-[var(--accent)]`
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </div>
      ) : children}
    </button>
  );
}