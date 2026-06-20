import './globals.css';
import type { Metadata } from 'next';
import Sidebar from '../components/Sidebar';

export const metadata: Metadata = {
  title: 'Stability AI',
  description: 'AI-powered Housing Stability Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#F5F6FA',
          }}
        >
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <div
            style={{
              flex: 1,
              marginLeft: '280px',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              width: 'calc(100% - 280px)',
            }}
          >
            {/* Page Content */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {children}
            </div>

            {/* Global Footer */}
            <footer
              style={{
                borderTop: '1px solid #D9DDE5',
                background: '#FFFFFF',
                padding: '20px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  color: '#6B7280',
                }}
              >
                <strong style={{ color: '#111827' }}>
                  Stability AI
                </strong>{' '}
                © 2026 Housing Stability Platform. All rights reserved.
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  flexWrap: 'wrap',
                }}
              >
                <a
                  href="#"
                  style={{
                    fontSize: '12px',
                    color: '#6B7280',
                  }}
                >
                  Privacy Policy
                </a>

                <a
                  href="#"
                  style={{
                    fontSize: '12px',
                    color: '#6B7280',
                  }}
                >
                  Terms of Service
                </a>

                <a
                  href="#"
                  style={{
                    fontSize: '12px',
                    color: '#6B7280',
                  }}
                >
                  Accessibility
                </a>

                <a
                  href="#"
                  style={{
                    fontSize: '12px',
                    color: '#6B7280',
                  }}
                >
                  Contact Support
                </a>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}