'use client';

import { useState } from 'react';

import Header from '../../components/Header';
import Button from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import {
  Card,
  CardContent,
} from '../../components/ui/Card';

import {
  AlertTriangle,
  Download,
  Share2,
  Sparkles,
  FileText,
} from 'lucide-react';

const riskScore = 92;

function TimelineStep({
  number,
  title,
  description,
  badge,
  urgent = false,
  inactive = false,
}: {
  number: number;
  title: string;
  description: string;
  badge?: string;
  urgent?: boolean;
  inactive?: boolean;
}) {
  return (
    <div
      style={{
        position: 'relative',
        marginBottom: '24px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '-25px',
          top: '0',
          width: '22px',
          height: '22px',
          borderRadius: '999px',
          background: inactive
            ? '#D1D5DB'
            : urgent
            ? '#DF7100'
            : '#072B84',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 700,
        }}
      >
        {number}
      </div>

      <div>
        <div
          style={{
            display: 'flex',
            justifyContent:
              'space-between',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '4px',
          }}
        >
          <strong>{title}</strong>

          {badge && (
            <span
              style={{
                background: '#FEE2E2',
                color: '#DC2626',
                borderRadius:
                  '999px',
                padding:
                  '2px 8px',
                fontSize: '10px',
                fontWeight: 700,
              }}
            >
              {badge}
            </span>
          )}
        </div>

        <div
          style={{
            fontSize: '13px',
            color: '#6B7280',
            lineHeight: '22px',
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}

function ChecklistCategory({
  title,
  items,
}: {
  title: string;
  items: {
    label: string;
    checked?: boolean;
  }[];
}) {
  return (
    <div>
      <h4
        style={{
          fontSize: '11px',
          fontWeight: 700,
          color: '#9CA3AF',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}
      >
        {title}
      </h4>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {items.map(
          (item, index) => (
            <label
              key={index}
              style={{
                display: 'flex',
                gap: '8px',
                alignItems:
                  'flex-start',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              <input
                type="checkbox"
                defaultChecked={
                  item.checked
                }
              />

              <span
                style={{
                  color:
                    item.checked
                      ? '#9CA3AF'
                      : '#4B5563',
                  textDecoration:
                    item.checked
                      ? 'line-through'
                      : 'none',
                }}
              >
                {item.label}
              </span>
            </label>
          )
        )}
      </div>
    </div>
  );
}

function AssistanceItem({
  icon,
  title,
  subtitle,
  note,
}: {
  icon: string;
  title: string;
  subtitle: string;
  note?: string;
}) {
  return (
    <div
      style={{
        border: '1px solid #EEF1F5',
        borderRadius: '8px',
        padding: '14px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          fontSize: '20px',
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontWeight: 700,
            marginBottom: '4px',
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: '13px',
            color: '#6B7280',
          }}
        >
          {subtitle}
        </div>

        {note && (
          <div
            style={{
              marginTop: '6px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#DF7100',
              textTransform:
                'uppercase',
            }}
          >
            {note}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ActionPlanPage() {
  const [activeTab, setActiveTab] =
    useState('Repair Request');

  return (
    <>
      {/* Risk Banner */}
      <section
        style={{
          background: '#DF7100',
          color: '#FFFFFF',
          padding: '10px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            <AlertTriangle size={16} />
            <span>
              Your Situation: High Risk
            </span>
          </div>

          <span
            style={{
              fontSize: '12px',
              opacity: 0.9,
            }}
          >
            Immediate action recommended
            within the next 48 hours.
          </span>
        </div>
      </section>

      <Header
        title="Action Plan Results"
        subtitle="Personalized Housing Stability Strategy"
      />

      <main className="page-container">
        {/* Intro */}
        <section
          style={{
            marginBottom: '24px',
          }}
        >
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 700,
              color: '#072B84',
              marginBottom: '8px',
            }}
          >
            Personalized Action Plan
          </h1>

          <p
            style={{
              color: '#6B7280',
              maxWidth: '760px',
              lineHeight: '24px',
              fontSize: '14px',
            }}
          >
            Based on your intake,
            documentation, and legal
            assessment, we've created a
            prioritized action plan to
            improve housing stability and
            reduce legal risk.
          </p>
        </section>

        {/* Main Layout */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns:
              '2fr 1fr',
            gap: '24px',
          }}
          className="action-plan-layout"
        >
          {/* LEFT COLUMN */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Assessment Card */}
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
                    alignItems:
                      'flex-start',
                    gap: '16px',
                    flexWrap: 'wrap',
                    marginBottom:
                      '20px',
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize:
                          '24px',
                        fontWeight:
                          700,
                        color:
                          '#072B84',
                        marginBottom:
                          '8px',
                      }}
                    >
                      Personalized Stability
                      Assessment
                    </h2>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems:
                          'center',
                        gap: '6px',
                        background:
                          '#EFF6FF',
                        color:
                          '#2563EB',
                        borderRadius:
                          '999px',
                        padding:
                          '4px 10px',
                        fontSize:
                          '11px',
                        fontWeight:
                          700,
                      }}
                    >
                      <Sparkles
                        size={12}
                      />
                      AI Analysis Engine
                      v4.2
                    </div>
                  </div>

                  <div
                    style={{
                      minWidth:
                        '220px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent:
                          'space-between',
                        marginBottom:
                          '8px',
                      }}
                    >
                      <span
                        style={{
                          fontSize:
                            '12px',
                          color:
                            '#6B7280',
                        }}
                      >
                        Displacement Risk
                      </span>

                      <span
                        style={{
                          fontWeight:
                            700,
                          color:
                            '#DC2626',
                        }}
                      >
                        {riskScore}%
                      </span>
                    </div>

                    <ProgressBar
                      value={riskScore}
                      variant="danger"
                    />
                  </div>
                </div>

                <div
                  style={{
                    color: '#6B7280',
                    lineHeight: '26px',
                    fontSize: '14px',
                  }}
                >
                  <p
                    style={{
                      marginBottom:
                        '16px',
                    }}
                  >
                    Based on your recent
                    court summons and
                    financial intake data,
                    our analysis identifies a
                    <strong
                      style={{
                        color:
                          '#DC2626',
                        marginLeft:
                          '4px',
                      }}
                    >
                      92% risk of housing
                      displacement
                    </strong>{" "}
                    within the next 21 days.
                  </p>

                  <p>
                    Your strongest defense
                    appears to be the
                    Warranty of Habitability
                    due to documented
                    unresolved maintenance
                    issues and repair delays.
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                    marginTop: '24px',
                  }}
                >
                  <Button
                    variant="primary"
                    icon={
                      <Download
                        size={16}
                      />
                    }
                  >
                    Download Report
                  </Button>

                  <Button
                    variant="secondary"
                    icon={
                      <Share2
                        size={16}
                      />
                    }
                  >
                    Share With Legal Aid
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Timeline + Checklist Area */}
            <section
              style={{
                display: 'grid',
                gridTemplateColumns:
                  '1fr 1fr',
                gap: '24px',
              }}
              className="action-plan-subgrid"
            >
                              {/* Action Timeline */}
              <Card>
                <CardContent
                  style={{
                    paddingTop: '20px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#072B84',
                      marginBottom: '24px',
                    }}
                  >
                    Action Timeline
                  </h3>

                  <div
                    style={{
                      position: 'relative',
                      paddingLeft: '20px',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        left: '5px',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: '#E5E7EB',
                      }}
                    />

                    <TimelineStep
                      number={1}
                      urgent
                      title="File Answer"
                      badge="Due in 24h"
                      description="Respond to the summons at City Court Room 302."
                    />

                    <TimelineStep
                      number={2}
                      title="Document Damages"
                      description="Take photos of ceiling leaks and mold growth."
                    />

                    <TimelineStep
                      number={3}
                      title="Notify Landlord"
                      description="Send a certified repair request notice."
                    />

                    <TimelineStep
                      number={4}
                      inactive
                      title="Apply for One-Shot"
                      description="Submit emergency housing assistance application."
                    />

                    <TimelineStep
                      number={5}
                      inactive
                      title="Hearing Prep"
                      description="Meet with pro bono attorney for representation."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Priority Checklist */}
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
                      marginBottom: '20px',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#072B84',
                      }}
                    >
                      Priority Checklist
                    </h3>

                    <span
                      style={{
                        background: '#F5F6FA',
                        border:
                          '1px solid #D9DDE5',
                        borderRadius:
                          '999px',
                        padding:
                          '4px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#6B7280',
                      }}
                    >
                      2 / 12 Tasks Done
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(3,1fr)',
                      gap: '20px',
                    }}
                    className="checklist-grid"
                  >
                    <ChecklistCategory
                      title="⚖️ Legal"
                      items={[
                        {
                          label:
                            'File defensive motion',
                        },
                        {
                          label:
                            'Request discovery docs',
                        },
                      ]}
                    />

                    <ChecklistCategory
                      title="💳 Financial"
                      items={[
                        {
                          label:
                            'Gather 3 pay stubs',
                          checked: true,
                        },
                        {
                          label:
                            'Open escrow account',
                        },
                      ]}
                    />

                    <ChecklistCategory
                      title="🏠 Housing"
                      items={[
                        {
                          label:
                            'Request inspection',
                          checked: true,
                        },
                        {
                          label:
                            'List secondary options',
                        },
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Letter Generator */}
            <Card>
              <CardContent
                style={{
                  padding: 0,
                }}
              >
                <div
                  style={{
                    background: '#072B84',
                    color: '#FFFFFF',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                    }}
                  >
                    Landlord Letter Generator
                  </h3>

                  <Sparkles size={16} />
                </div>

                {/* Tabs */}
                <div
                  style={{
                    display: 'flex',
                    borderBottom:
                      '1px solid #E5E7EB',
                    background: '#F9FAFB',
                  }}
                >
                  {[
                    'Repair Request',
                    'Payment Plan',
                    'Lease Termination',
                  ].map((tab) => (
                    <button
                      key={tab}
                      onClick={() =>
                        setActiveTab(tab)
                      }
                      style={{
                        flex: 1,
                        padding: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        background:
                          activeTab === tab
                            ? '#FFFFFF'
                            : 'transparent',
                        borderBottom:
                          activeTab === tab
                            ? '2px solid #072B84'
                            : '2px solid transparent',
                        fontSize: '12px',
                        fontWeight: 700,
                        color:
                          activeTab === tab
                            ? '#072B84'
                            : '#6B7280',
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Letter Preview */}
                <div
                  style={{
                    padding: '16px',
                    background: '#F9FAFB',
                  }}
                >
                  <div
                    style={{
                      background: '#FFFFFF',
                      border:
                        '1px solid #E5E7EB',
                      borderRadius: '8px',
                      padding: '16px',
                      fontFamily:
                        'Georgia, serif',
                      fontSize: '13px',
                      lineHeight: '24px',
                      maxHeight: '220px',
                      overflowY: 'auto',
                    }}
                  >
                    {activeTab === 'Repair Request' && (
                      <>
                        <p style={{ marginBottom: '12px' }}>
                          Dear{' '}
                          <strong>
                            [Landlord Name]
                          </strong>,
                        </p>

                        <p style={{ marginBottom: '12px' }}>
                          This letter serves
                          as formal notice
                          regarding unresolved
                          maintenance issues
                          at{' '}
                          <strong>
                            [Property Address]
                          </strong>
                          .
                        </p>

                        <p style={{ marginBottom: '12px' }}>
                          Specifically, the
                          ceiling leak and
                          resulting water
                          damage remain
                          unresolved despite
                          previous requests.
                        </p>

                        <p style={{ marginBottom: 0 }}>
                          Please address these
                          issues before{' '}
                          <strong>
                            [Date]
                          </strong>{' '}
                          to avoid escalation
                          to housing
                          authorities.
                        </p>
                      </>
                    )}

                    {activeTab === 'Payment Plan' && (
                      <>
                        <p style={{ marginBottom: '12px' }}>
                          Dear{' '}
                          <strong>
                            [Landlord Name]
                          </strong>,
                        </p>

                        <p style={{ marginBottom: '12px' }}>
                          I am writing regarding
                          my lease agreement at{' '}
                          <strong>
                            [Property Address]
                          </strong>{" "}
                          to request a temporary
                          payment plan for
                          outstanding rent.
                        </p>

                        <p style={{ marginBottom: '12px' }}>
                          Due to temporary
                          financial difficulties,
                          I propose paying the
                          balance of{' '}
                          <strong>
                            [Amount]
                          </strong>{" "}
                          in monthly installments
                          of{' '}
                          <strong>
                            [Installment]
                          </strong>{" "}
                          starting on{' '}
                          <strong>
                            [Date]
                          </strong>.
                        </p>

                        <p style={{ marginBottom: 0 }}>
                          I appreciate your
                          understanding and
                          cooperation in helping
                          maintain my tenancy.
                        </p>
                      </>
                    )}

                    {activeTab === 'Lease Termination' && (
                      <>
                        <p style={{ marginBottom: '12px' }}>
                          Dear{' '}
                          <strong>
                            [Landlord Name]
                          </strong>,
                        </p>

                        <p style={{ marginBottom: '12px' }}>
                          Please accept this
                          letter as formal
                          notice that I will be
                          terminating my lease
                          agreement for the
                          property at{' '}
                          <strong>
                            [Property Address]
                          </strong>.
                        </p>

                        <p style={{ marginBottom: '12px' }}>
                          My final day of
                          tenancy will be{' '}
                          <strong>
                            [Date]
                          </strong>,
                          which complies with
                          the notice period
                          required by our lease
                          agreement.
                        </p>

                        <p style={{ marginBottom: 0 }}>
                          Please coordinate a
                          time for a move-out
                          inspection and
                          provide instructions
                          for the return of my
                          security deposit.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div
                  style={{
                    padding: '16px',
                    borderTop:
                      '1px solid #E5E7EB',
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#6B7280',
                    }}
                  >
                    AI-verified legal
                    language
                  </span>

                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                    }}
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={
                        <FileText
                          size={14}
                        />
                      }
                    >
                      Refine
                    </Button>

                    <Button
                      variant="primary"
                      size="sm"
                    >
                      Send Certified
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            {/* Assistance Hub */}
            <Card>
              <CardContent
                style={{
                  paddingTop: '20px',
                }}
              >
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#072B84',
                    textTransform:
                      'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '20px',
                  }}
                >
                  Immediate Assistance
                </h3>

                <div
                  style={{
                    display: 'flex',
                    flexDirection:
                      'column',
                    gap: '16px',
                  }}
                >
                  <AssistanceItem
                    icon="📞"
                    title="Tenant Legal Hotline"
                    subtitle="(800) 555-0199"
                    note="Estimated Wait: 4 Minutes"
                  />

                  <AssistanceItem
                    icon="💳"
                    title="Rental Relief Fund"
                    subtitle="housing.gov/emergency-grant"
                  />

                  <AssistanceItem
                    icon="👥"
                    title="Local Tenant Union"
                    subtitle="District 4 Chapter"
                    note="Open 24/7"
                  />
                </div>

                <div
                  style={{
                    marginTop: '20px',
                    background: '#EFF6FF',
                    borderRadius: '8px',
                    padding: '12px',
                    display: 'flex',
                    gap: '8px',
                    alignItems:
                      'flex-start',
                  }}
                >
                  <AlertTriangle
                    size={14}
                    color="#2563EB"
                  />

                  <p
                    style={{
                      fontSize: '12px',
                      color: '#1E40AF',
                      lineHeight: '20px',
                    }}
                  >
                    Contacts are matched
                    to your location and
                    housing profile.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

        </section>

        <style jsx>{`
          @media (max-width: 1100px) {
            .action-plan-layout {
              grid-template-columns: 1fr !important;
            }

            .action-plan-subgrid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 768px) {
            .checklist-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}