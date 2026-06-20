'use client';

import { useState } from 'react';

import Header from '../../components/Header';
import Button from '../../components/ui/Button';

import {
  Card,
  CardContent,
} from '../../components/ui/Card';

import {
  Search,
  ChevronDown,
  Shield,
  AlertTriangle,
  Scale,
  HelpCircle,
  FileText,
  Sparkles,
  Upload,
} from 'lucide-react';

type RightsTab =
  | 'Eviction Process'
  | 'Security Deposits'
  | 'Repairs & Habitability';

const tabs: RightsTab[] = [
  'Eviction Process',
  'Security Deposits',
  'Repairs & Habitability',
];

const rightsData: Record<
  RightsTab,
  RightsCardData[]
> = {
  'Eviction Process': [
    {
      category: 'High Urgency',
      title: '3-Day Notice to Pay or Quit',
      description:
        'You have a limited period to pay outstanding rent or respond before eviction procedures may continue.',
      code: 'Civ. Code § 1161(2)',
      detail: '72 Hour Response',
      variant: 'danger',
    },

    {
      category: 'General Right',
      title: 'Right to Quiet Enjoyment',
      description:
        'You have the right to use your home without unreasonable landlord interference.',
      code: 'Civ. Code § 1927',
      detail: 'Permanent Right',
      variant: 'primary',
    },

    {
      category: 'Landlord Entry',
      title: '24-Hour Notice of Entry',
      description:
        'Except for emergencies, written notice is generally required before entry.',
      code: 'Civ. Code § 1954',
      detail: '24h Notice',
      variant: 'purple',
    },
  ],

  'Security Deposits': [
    {
      category: 'Deposits',
      title: 'Security Deposit Return',
      description:
        'Landlords generally must return deposits or provide itemized deductions within required timelines.',
      code: 'State Deposit Rules',
      detail: '21 Days',
      variant: 'warning',
    },

    {
      category: 'Deductions',
      title: 'Itemized Statements',
      description:
        'Tenants are entitled to explanations and supporting documentation for many deductions.',
      code: 'Deposit Compliance',
      detail: 'Required',
      variant: 'primary',
    },
  ],

  'Repairs & Habitability': [
    {
      category: 'Habitability',
      title: 'Safe Living Conditions',
      description:
        'Landlords are responsible for maintaining habitable living conditions.',
      code: 'Habitability Standards',
      detail: 'Protected',
      variant: 'success',
    },

    {
      category: 'Repairs',
      title: 'Repair Requests',
      description:
        'Document repair requests and communications to preserve evidence.',
      code: 'Repair Rights',
      detail: 'Written Records',
      variant: 'warning',
    },
  ],
};

function RightsCard({
  category,
  title,
  description,
  code,
  detail,
  variant,
}: RightsCardData) {
  const styles = {
    danger: {
      bg: '#FEF2F2',
      text: '#DC2626',
      icon: (
        <AlertTriangle
          size={16}
        />
      ),
    },

    primary: {
      bg: '#EFF6FF',
      text: '#2563EB',
      icon: (
        <Shield size={16} />
      ),
    },

    warning: {
      bg: '#FFFBEB',
      text: '#D97706',
      icon: (
        <HelpCircle
          size={16}
        />
      ),
    },

    success: {
      bg: '#ECFDF5',
      text: '#10B981',
      icon: (
        <Shield size={16} />
      ),
    },

    purple: {
      bg: '#F5F3FF',
      text: '#7C3AED',
      icon: (
        <Scale size={16} />
      ),
    },
  };

  const current =
    styles[variant];

  return (
    <Card>
      <CardContent
        style={{
          height: '100%',
          display: 'flex',
          flexDirection:
            'column',
          justifyContent:
            'space-between',
          paddingTop: '20px',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems:
                'center',
              marginBottom:
                '14px',
            }}
          >
            <span
              style={{
                background:
                  current.bg,
                color:
                  current.text,
                borderRadius:
                  '999px',
                padding:
                  '4px 10px',
                fontSize:
                  '10px',
                fontWeight:
                  700,
                textTransform:
                  'uppercase',
              }}
            >
              {category}
            </span>

            <div
              style={{
                color:
                  current.text,
              }}
            >
              {current.icon}
            </div>
          </div>

          <h3
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#111827',
              marginBottom: '10px',
            }}
          >
            {title}
          </h3>

          <p
            style={{
              fontSize: '13px',
              color: '#6B7280',
              lineHeight: '22px',
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            borderTop:
              '1px solid #EEF1F5',
            marginTop: '20px',
            paddingTop: '14px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              marginBottom:
                '8px',
              fontSize:
                '12px',
            }}
          >
            <span
              style={{
                color:
                  '#6B7280',
              }}
            >
              Detail
            </span>

            <span
              style={{
                fontWeight: 700,
                color:
                  current.text,
              }}
            >
              {detail}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              fontSize:
                '12px',
            }}
          >
            <span
              style={{
                color:
                  '#6B7280',
              }}
            >
              Code
            </span>

            <span
              style={{
                fontWeight: 600,
                color:
                  '#111827',
              }}
            >
              {code}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type RightsCardData = {
  category: string;
  title: string;
  description: string;
  code: string;
  detail: string;
  variant:
    | 'danger'
    | 'primary'
    | 'warning'
    | 'success'
    | 'purple';
};

export default function TenantRightsPage() {
  const [activeTab, setActiveTab] =
    useState<RightsTab>(
      'Eviction Process'
    );

  return (
    <>
      <Header
        title="Tenant Rights Library"
        subtitle="Localized Housing Protections"
      />

      <main className="page-container">
        {/* Intro */}
        <section
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              maxWidth: '760px',
            }}
          >
            <h1
              style={{
                fontSize: '40px',
                fontWeight: 700,
                color: '#072B84',
                marginBottom: '8px',
              }}
            >
              Your Rights, Explained.
            </h1>

            <p
              style={{
                color: '#6B7280',
                lineHeight: '24px',
                fontSize: '14px',
              }}
            >
              Access localized legal protections,
              deadlines, and tenant safeguards
              relevant to your housing situation.
            </p>
          </div>

          {/* Jurisdiction */}
          <div
            style={{
              width: '280px',
            }}
          >
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#6B7280',
                textTransform: 'uppercase',
              }}
            >
              Select Jurisdiction
            </label>

            <div
              style={{
                position: 'relative',
              }}
            >
              <select
                aria-label="Select Jurisdiction"
                style={{
                  width: '100%',
                  height: '44px',
                  border:
                    '1px solid #D9DDE5',
                  borderRadius: '6px',
                  padding:
                    '0 40px 0 12px',
                  background: '#FFFFFF',
                  appearance: 'none',
                }}
              >
                <option>
                  California (Statewide)
                </option>

                <option>
                  New York (Statewide)
                </option>

                <option>
                  Texas (Statewide)
                </option>
              </select>

              <ChevronDown
                size={16}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '14px',
                  color: '#6B7280',
                }}
              />
            </div>
          </div>
        </section>

        {/* Tabs + Search */}
        <section
          style={{
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '24px',
            borderBottom:
              '1px solid #D9DDE5',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            {tabs.map((tab) => {
              const active =
                activeTab === tab;

              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={active}
                  onClick={() =>
                    setActiveTab(tab)
                  }
                  style={{
                    paddingBottom: '12px',
                    border: 'none',
                    background:
                      'transparent',
                    fontWeight: active
                      ? 700
                      : 600,
                    color: active
                      ? '#072B84'
                      : '#6B7280',
                    borderBottom: active
                      ? '2px solid #072B84'
                      : '2px solid transparent',
                    cursor: 'pointer',
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div
            style={{
              position: 'relative',
              width: '380px',
              maxWidth: '100%',
              marginBottom: '8px',
            }}
          >
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '14px',
                color: '#9CA3AF',
              }}
            />

            <input
              id="rightsSearch"
              placeholder="Search rights, codes, or keywords..."
              style={{
                width: '100%',
                height: '44px',
                border:
                  '1px solid #D9DDE5',
                borderRadius: '6px',
                padding:
                  '0 12px 0 38px',
              }}
            />
          </div>
        </section>

        {/* Rights Grid */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(320px,1fr))',
            gap: '20px',
          }}
          className="rights-grid"
        >
                      {rightsData[activeTab].map(
            (item, index) => (
              <RightsCard
                key={index}
                {...item}
              />
            )
          )}

          {/* Legal Aid Hero Card */}
          <Card
            variant="accent"
            style={{
              position: 'relative',
              minHeight: '260px',
            }}
          >
            <CardContent
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent:
                  'space-between',
                paddingTop: '20px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  right: '-20px',
                  bottom: '-20px',
                  opacity: 0.08,
                }}
              >
                <Scale size={120} />
              </div>

              <div>
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    marginBottom: '10px',
                    color: '#FFFFFF',
                  }}
                >
                  Need Legal Aid?
                </h3>

                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: '24px',
                    opacity: 0.9,
                    maxWidth: '320px',
                  }}
                >
                  Connect with housing
                  advocates, legal aid
                  providers, and
                  pro-bono attorneys in
                  your local area.
                </p>
              </div>

              <Button
                variant="secondary"
                icon={
                  <FileText
                    size={16}
                  />
                }
              >
                Find a Lawyer
              </Button>
            </CardContent>
          </Card>
        </section>
                {/* AI Legal Summarizer */}
        <section
          style={{
            marginTop: '24px',
          }}
        >
          <Card>
            <CardContent
              style={{
                paddingTop: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                  gap: '24px',
                  flexWrap: 'wrap',
                }}
                className="rights-ai-panel"
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      minWidth: '64px',
                      borderRadius: '12px',
                      background: '#072B84',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    <Sparkles size={26} />
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        marginBottom: '6px',
                        color: '#111827',
                      }}
                    >
                      AI Legal Summarizer
                    </h3>

                    <p
                      style={{
                        fontSize: '14px',
                        color: '#6B7280',
                        lineHeight: '24px',
                        maxWidth: '700px',
                      }}
                    >
                      Upload an eviction notice,
                      lease document, legal letter,
                      or landlord communication and
                      receive a simplified summary
                      of deadlines, obligations,
                      and next recommended actions.
                    </p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  icon={<Upload size={16} />}
                >
                  Upload Notice
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer Notice */}
        <section
          style={{
            marginTop: '24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#9CA3AF',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Rights information may vary by city,
            county, and state. Always verify with
            local legal resources.
          </p>
        </section>

        {/* Responsive Styles */}
        <style jsx>{`
          @media (max-width: 1100px) {
            .rights-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 768px) {
            .rights-ai-panel {
              flex-direction: column !important;
              align-items: flex-start !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}