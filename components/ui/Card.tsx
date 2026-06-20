'use client';

import React from 'react';

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'warning' | 'borderless';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = '',
      variant = 'default',
      style,
      children,
      ...props
    },
    ref
  ) => {
    const variants: Record<string, React.CSSProperties> = {
      default: {
        background: '#FFFFFF',
        border: '1px solid #D9DDE5',
        color: '#111827',
      },

      accent: {
        background:
          'linear-gradient(135deg,#071133 0%,#163B87 100%)',
        color: '#FFFFFF',
        border: 'none',
        position: 'relative',
        overflow: 'hidden',
      },

      warning: {
        background: '#FFFFFF',
        border: '1px solid #D9DDE5',
        borderLeft: '4px solid #EF4444',
        color: '#111827',
      },

      borderless: {
        background: '#F5F6FA',
        border: 'none',
        color: '#111827',
      },
    };

    return (
      <div
        ref={ref}
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
          transition: 'all .15s ease',
          ...variants[variant],
          ...style,
        }}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/* ==========================================
   CARD HEADER
========================================== */

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', style, children, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      padding: '20px',
      paddingBottom: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      ...style,
    }}
    className={className}
    {...props}
  >
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

/* ==========================================
   CARD TITLE
========================================== */

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className = '', style, children, ...props }, ref) => (
  <h3
    ref={ref}
    style={{
      margin: 0,
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '24px',
      letterSpacing: '-0.02em',
      ...style,
    }}
    className={className}
    {...props}
  >
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

/* ==========================================
   CARD DESCRIPTION
========================================== */

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className = '', style, children, ...props }, ref) => (
  <p
    ref={ref}
    style={{
      margin: 0,
      fontSize: '13px',
      lineHeight: '20px',
      color: '#6B7280',
      ...style,
    }}
    className={className}
    {...props}
  >
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

/* ==========================================
   CARD CONTENT
========================================== */

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', style, children, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      padding: '20px',
      paddingTop: 0,
      fontSize: '14px',
      lineHeight: '24px',
      ...style,
    }}
    className={className}
    {...props}
  >
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

/* ==========================================
   CARD FOOTER
========================================== */

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', style, children, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      padding: '20px',
      borderTop: '1px solid #EEF1F5',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      ...style,
    }}
    className={className}
    {...props}
  >
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';