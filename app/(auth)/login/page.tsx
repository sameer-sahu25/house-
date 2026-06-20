'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, ArrowRight, Home, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showLogoutBanner, setShowLogoutBanner] = useState(false);

  useEffect(() => {
    // Show success banner if redirected from logout
    if (searchParams.get('loggedOut') === '1') {
      setShowLogoutBanner(true);
      const t = setTimeout(() => setShowLogoutBanner(false), 5000);
      return () => clearTimeout(t);
    }
  }, [searchParams]);

  const handleStart = () => {
    router.push('/intake');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #072B84 0%, #0f3fa8 50%, #1a52cc 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      }}
    >
      {/* Background decorative circles */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '240px', height: '240px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '8%', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

      {/* Logout success banner */}
      {showLogoutBanner && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            background: '#10B981',
            color: '#FFFFFF',
            borderRadius: '10px',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            fontWeight: 600,
            boxShadow: '0 8px 32px rgba(16,185,129,0.4)',
            whiteSpace: 'nowrap',
            animation: 'fadeSlide 0.3s ease',
          }}
        >
          <CheckCircle2 size={18} />
          You have been logged out successfully.
          <button
            onClick={() => setShowLogoutBanner(false)}
            style={{ marginLeft: '8px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: 0 }}
          >
            ×
          </button>
        </div>
      )}

      {/* Main Card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '20px',
          padding: '48px 40px',
          maxWidth: '460px',
          width: '100%',
          boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #072B84, #1a52cc)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 24px rgba(7,43,132,0.35)',
          }}
        >
          <Shield size={36} color="#FFFFFF" />
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#072B84', marginBottom: '8px', letterSpacing: '-0.5px' }}>
          Stability AI
        </h1>

        <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '32px', lineHeight: '22px' }}>
          AI-powered housing stability platform.<br />
          Get your personalized eviction defense action plan.
        </p>

        {/* Features list */}
        <div
          style={{
            background: '#F8FAFF',
            border: '1px solid #E8F0FF',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '28px',
            textAlign: 'left',
          }}
        >
          {[
            'AI-generated personalized action plan',
            'Eviction risk score & legal timeline',
            'Landlord letter generator',
            'Local legal aid & resource finder',
          ].map((feature, i) => (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#374151', marginBottom: i < 3 ? '10px' : 0 }}
            >
              <CheckCircle2 size={15} color="#10B981" style={{ flexShrink: 0 }} />
              {feature}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          id="start-session-button"
          onClick={handleStart}
          style={{
            width: '100%',
            height: '52px',
            background: 'linear-gradient(135deg, #072B84, #1a52cc)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 4px 16px rgba(7,43,132,0.35)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(7,43,132,0.45)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(7,43,132,0.35)'; }}
        >
          <Home size={18} />
          Start New Assessment
          <ArrowRight size={18} />
        </button>

        <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '14px' }}>
          Anonymous session — no account required
        </p>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
