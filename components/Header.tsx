'use client';

import { Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({
  title,
  subtitle,
}: HeaderProps) {
  return (
    <header
      style={{
        height: '72px',
        background: '#FFFFFF',
        borderBottom: '1px solid #D9DDE5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Left Side */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#072B84',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>

        {subtitle && (
          <span
            style={{
              fontSize: '12px',
              color: '#6B7280',
              marginTop: 2,
            }}
          >
            {subtitle}
          </span>
        )}
      </div>

      {/* Right Side */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Search Box */}
        <div
          style={{
            position: 'relative',
            width: '260px',
          }}
          className="header-search"
        >
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF',
            }}
          />

          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
            style={{
              width: '100%',
              height: '40px',
              border: '1px solid #D9DDE5',
              borderRadius: '6px',
              paddingLeft: '36px',
              paddingRight: '12px',
              fontSize: '14px',
              background: '#FFFFFF',
              color: '#111827',
            }}
          />
        </div>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            border: '1px solid #D9DDE5',
            background: '#FFFFFF',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bell
            size={18}
            color="#6B7280"
          />

          <span
            style={{
              position: 'absolute',
              top: '9px',
              right: '10px',
              width: '8px',
              height: '8px',
              borderRadius: '999px',
              background: '#EF4444',
            }}
          />
        </button>

        {/* User */}
        <button
          aria-label="User Profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#FFFFFF',
            border: '1px solid #D9DDE5',
            borderRadius: '8px',
            padding: '6px 10px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '999px',
              background: '#072B84',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <User size={16} />
          </div>

          <div
            style={{
              textAlign: 'left',
            }}
            className="header-user-info"
          >
            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#111827',
              }}
            >
              Jordan
            </div>

            <div
              style={{
                fontSize: '11px',
                color: '#6B7280',
              }}
            >
              Tenant
            </div>
          </div>
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          header {
            padding-left: 72px !important;
          }

          .header-search {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .header-user-info {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}