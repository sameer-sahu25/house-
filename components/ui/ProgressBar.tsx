'use client';

import React from 'react';

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'primary' | 'success' | 'danger' | 'warning';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  labelPosition?: 'top' | 'bottom' | 'none';
  customLabel?: string;
  animated?: boolean;
}

export const ProgressBar = React.forwardRef<
  HTMLDivElement,
  ProgressBarProps
>(
  (
    {
      className = '',
      value,
      max = 100,
      variant = 'primary',
      size = 'md',
      showLabel = false,
      labelPosition = 'top',
      customLabel,
      animated = true,
      style,
      ...props
    },
    ref
  ) => {
    const safeValue = Math.max(
      0,
      Math.min(value, max)
    );

    const percentage = Math.round(
      (safeValue / max) * 100
    );

    const heights: Record<string, string> = {
      xs: '4px',
      sm: '6px',
      md: '10px',
      lg: '16px',
    };

    const colors: Record<string, string> = {
      primary: '#072B84',
      success: '#10B981',
      danger: '#EF4444',
      warning: '#F59E0B',
    };

    const label =
      customLabel ?? `${percentage}%`;

    return (
      <div
        ref={ref}
        className={className}
        style={{
          width: '100%',
          ...style,
        }}
        {...props}
      >
        {/* Top Label */}
        {showLabel &&
          labelPosition === 'top' && (
            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#111827',
                }}
              >
                {customLabel
                  ? customLabel
                  : 'Progress'}
              </span>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#6B7280',
                  background: '#F3F4F6',
                  padding: '2px 8px',
                  borderRadius: '999px',
                }}
              >
                {percentage}%
              </span>
            </div>
          )}

        {/* Track */}
        <div
          style={{
            width: '100%',
            height: heights[size],
            background: '#E5E7EB',
            borderRadius: '999px',
            overflow: 'hidden',
          }}
        >
          {/* Fill */}
          <div
            role="progressbar"
            aria-valuenow={safeValue}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={
              customLabel || 'Progress'
            }
            style={{
              width: `${percentage}%`,
              height: '100%',
              background:
                colors[variant],
              borderRadius: '999px',
              transition: animated
                ? 'width .4s ease'
                : 'none',
            }}
          />
        </div>

        {/* Bottom Label */}
        {showLabel &&
          labelPosition ===
            'bottom' && (
            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                marginTop: '8px',
                fontSize: '12px',
                color: '#6B7280',
              }}
            >
              <span>{label}</span>

              <span>
                {percentage}% Complete
              </span>
            </div>
          )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;