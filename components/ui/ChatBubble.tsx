'use client';

import React from 'react';
import { Scale, User } from 'lucide-react';

export interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'ai' | 'user';
  timestamp?: string;
  avatar?: React.ReactNode;
}

export const ChatBubble = React.forwardRef<
  HTMLDivElement,
  ChatBubbleProps
>(
  (
    {
      className = '',
      variant = 'ai',
      timestamp,
      avatar,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const isAi = variant === 'ai';

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          width: '100%',
          justifyContent: isAi
            ? 'flex-start'
            : 'flex-end',
          ...style,
        }}
        className={className}
        {...props}
      >
        {/* AI Avatar */}
        {isAi && (
          <div
            style={{
              width: '36px',
              height: '36px',
              minWidth: '36px',
              borderRadius: '999px',
              background: '#072B84',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2px',
            }}
          >
            {avatar || <Scale size={16} />}
          </div>
        )}

        {/* Bubble */}
        <div
          style={{
            maxWidth: '80%',
            background: isAi
              ? '#E9EAED'
              : '#072B84',
            color: isAi
              ? '#111827'
              : '#FFFFFF',
            border: isAi
              ? '1px solid #D6D9DE'
              : 'none',
            borderRadius: '16px',
            borderTopLeftRadius: isAi
              ? '4px'
              : '16px',
            borderTopRightRadius: !isAi
              ? '4px'
              : '16px',
            padding: '14px 16px',
            fontSize: '14px',
            lineHeight: '24px',
            wordBreak: 'break-word',
          }}
        >
          {/* Content */}
          <div
            style={{
              fontSize: '14px',
              lineHeight: '24px',
            }}
          >
            {children}
          </div>

          {/* Timestamp */}
          {timestamp && (
            <div
              style={{
                marginTop: '10px',
                fontSize: '11px',
                fontWeight: 500,
                color: isAi
                  ? '#6B7280'
                  : '#BFDBFE',
              }}
            >
              {timestamp}
            </div>
          )}
        </div>

        {/* User Avatar */}
        {!isAi && (
          <div
            style={{
              width: '36px',
              height: '36px',
              minWidth: '36px',
              borderRadius: '999px',
              background: '#475569',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2px',
            }}
          >
            {avatar || <User size={16} />}
          </div>
        )}
      </div>
    );
  }
);

ChatBubble.displayName = 'ChatBubble';

export default ChatBubble;