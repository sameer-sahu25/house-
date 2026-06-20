'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'accent';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      border: 'none',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'all .15s ease',
      fontFamily: 'inherit',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      userSelect: 'none',
      opacity: isDisabled ? 0.6 : 1,
      width: fullWidth ? '100%' : undefined,
      outline: 'none',
      textDecoration: 'none',
      position: 'relative',
    };

    const variants: Record<string, React.CSSProperties> = {
      primary: {
        background: '#072B84',
        color: '#FFFFFF',
        border: '1px solid #072B84',
      },

      secondary: {
        background: '#FFFFFF',
        color: '#111827',
        border: '1px solid #D9DDE5',
      },

      danger: {
        background: '#DC2626',
        color: '#FFFFFF',
        border: '1px solid #DC2626',
      },

      ghost: {
        background: 'transparent',
        color: '#4B5563',
        border: '1px solid transparent',
      },

      accent: {
        background:
          'linear-gradient(135deg,#071133 0%,#163B87 100%)',
        color: '#FFFFFF',
        border: 'none',
      },
    };

    const sizes: Record<string, React.CSSProperties> = {
      xs: {
        height: '30px',
        padding: '0 10px',
        fontSize: '11px',
        borderRadius: '4px',
      },

      sm: {
        height: '36px',
        padding: '0 14px',
        fontSize: '13px',
        borderRadius: '4px',
      },

      md: {
        height: '44px',
        padding: '0 18px',
        fontSize: '14px',
        borderRadius: '4px',
      },

      lg: {
        height: '48px',
        padding: '0 24px',
        fontSize: '15px',
        borderRadius: '4px',
      },
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        style={{
          ...baseStyle,
          ...variants[variant],
          ...sizes[size],
        }}
        className={className}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2
              size={16}
              style={{
                animation: 'spin 1s linear infinite',
              }}
            />

            {children && <span>{children}</span>}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}

            {children && <span>{children}</span>}

            {icon && iconPosition === 'right' && icon}
          </>
        )}

        <style jsx>{`
          button:hover:not(:disabled) {
            filter: brightness(0.97);
          }

          button:active:not(:disabled) {
            transform: scale(0.99);
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;