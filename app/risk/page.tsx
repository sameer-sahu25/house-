'use client';

import Header from '../../components/Header';
import Button from '../../components/ui/Button';
import {
  Card,
  CardContent,
} from '../../components/ui/Card';

import {
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Calendar,
  Zap,
  AlertTriangle,
  Clock,
  Info,
  CheckCircle2,
} from 'lucide-react';

function RiskGauge({
  value,
}: {
  value: number;
}) {
  const radius = 54;
  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (value / 100) * circumference;

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'relative',
        width: '140px',
        height: '140px',
      }}
    >
      <svg
        width="140"
        height="140"
      >
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#FEE2E2"
          strokeWidth="10"
        />

        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#DC2626"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
        />
      </svg>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection:
            'column',
          alignItems: 'center',
          justifyContent:
            'center',
        }}
      >
        <div
          style={{
            fontSize: '30px',
            fontWeight: 700,
            color: '#111827',
          }}
        >
          {value}%
        </div>

        <div
          style={{
            fontSize: '10px',
            fontWeight: 700,
            color: '#DC2626',
            textTransform:
              'uppercase',
            letterSpacing:
              '1px',
          }}
        >
          High Risk
        </div>
      </div>
    </div>
  );
}

function RiskVector({
  icon,
  title,
  description,
  level,
  color,
  background,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  level: string;
  color: string;
  background: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent:
          'space-between',
        gap: '16px',
        border:
          '1px solid #EEF1F5',
        borderRadius: '8px',
        padding: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flex: 1,
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background,
            color,
            display: 'flex',
            alignItems:
              'center',
            justifyContent:
              'center',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        <div>
          <div
            style={{
              fontWeight: 700,
              marginBottom:
                '4px',
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize:
                '13px',
              color:
                '#6B7280',
              lineHeight:
                '22px',
            }}
          >
            {description}
          </div>
        </div>
      </div>

      <span
        style={{
          height: 'fit-content',
          background,
          color,
          borderRadius:
            '999px',
          padding:
            '4px 10px',
          fontSize: '11px',
          fontWeight: 700,
          whiteSpace:
            'nowrap',
        }}
      >
        {level}
      </span>
    </div>
  );
}

function TimelineStep({
  title,
  date,
  description,
  active = false,
}: {
  title: string;
  date: string;
  description: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        position:
          'relative',
        marginBottom:
          '24px',
      }}
    >
      <div
        style={{
          position:
            'absolute',
          left: '-20px',
          top: '4px',
          width: '12px',
          height: '12px',
          borderRadius:
            '999px',
          background: active
            ? '#DC2626'
            : '#D1D5DB',
          border:
            '2px solid #FFFFFF',
        }}
      />

      <div
        style={{
          fontSize:
            '11px',
          fontWeight: 700,
          textTransform:
            'uppercase',
          color: active
            ? '#DC2626'
            : '#6B7280',
          marginBottom:
            '4px',
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontWeight: 700,
          marginBottom:
            '4px',
        }}
      >
        {date}
      </div>

      <div
        style={{
          fontSize:
            '13px',
          color:
            '#6B7280',
          lineHeight:
            '22px',
        }}
      >
        {description}
      </div>
    </div>
  );
}
function SummaryRow({
  label,
  value,
  danger = false,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '10px',
        borderBottom: '1px solid #EEF1F5',
      }}
    >
      <span
        style={{
          fontSize: '13px',
          color: '#6B7280',
        }}
      >
        {label}
      </span>

      <span
        style={{
          fontSize: '13px',
          fontWeight: 700,
          color: danger
            ? '#DC2626'
            : '#111827',
        }}
      >
        {value}
      </span>
    </div>
  );
}

const riskScore = 74;

export default function LegalRiskProfilerPage() {
  return (
    <>
      <Header
        title="Legal Risk Profiler"
        subtitle="Automated Housing Risk Assessment"
      />

      <main className="page-container">
        {/* Page Intro */}
        <section
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#072B84',
                marginBottom: '8px',
              }}
            >
              Eviction Risk Analysis
            </h1>

            <p
              style={{
                maxWidth: '760px',
                color: '#6B7280',
                fontSize: '14px',
                lineHeight: '24px',
              }}
            >
              Our automated system analyzes your
              timeline, jurisdiction rules, and
              landlord correspondence to evaluate
              your current legal vulnerability.
            </p>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #D9DDE5',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#6B7280',
              textTransform: 'uppercase',
            }}
          >
            Last Updated: Just Now
          </div>
        </section>

        {/* Risk Overview */}
        <section
          style={{
            marginBottom: '24px',
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
                  display: 'grid',
                  gridTemplateColumns:
                    '1fr 2fr 1fr',
                  gap: '24px',
                  alignItems: 'center',
                }}
                className="risk-overview-grid"
              >
                {/* Gauge */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'center',
                  }}
                >
                  <RiskGauge
                    value={riskScore}
                  />
                </div>

                {/* Summary */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems:
                        'center',
                      gap: '10px',
                      marginBottom:
                        '12px',
                      color:
                        '#DC2626',
                    }}
                  >
                    <ShieldAlert
                      size={20}
                    />

                    <h2
                      style={{
                        fontSize:
                          '20px',
                        fontWeight:
                          700,
                        margin: 0,
                      }}
                    >
                      Immediate Action
                      Advised
                    </h2>
                  </div>

                  <p
                    style={{
                      fontSize:
                        '14px',
                      color:
                        '#6B7280',
                      lineHeight:
                        '24px',
                    }}
                  >
                    Your risk score is
                    elevated due to an
                    unresolved{' '}
                    <strong
                      style={{
                        color:
                          '#111827',
                      }}
                    >
                      3-Day Notice to
                      Pay or Quit
                    </strong>{' '}
                    combined with
                    limited documented
                    communication.
                    Immediate action
                    can significantly
                    reduce legal
                    exposure.
                  </p>
                </div>

                {/* Critical Action */}
                <Card
                  style={{
                    background:
                      '#FEF2F2',
                    border:
                      '1px solid #FECACA',
                  }}
                >
                  <CardContent
                    style={{
                      paddingTop:
                        '20px',
                    }}
                  >
                    <div
                      style={{
                        fontSize:
                          '11px',
                        fontWeight:
                          700,
                        textTransform:
                          'uppercase',
                        color:
                          '#B91C1C',
                        marginBottom:
                          '8px',
                      }}
                    >
                      Critical Factor
                    </div>

                    <p
                      style={{
                        fontSize:
                          '13px',
                        lineHeight:
                          '22px',
                        color:
                          '#991B1B',
                        marginBottom:
                          '16px',
                      }}
                    >
                      72-Hour response
                      window closes in
                      less than 24
                      hours.
                    </p>

                    <Button
                      variant="primary"
                      fullWidth
                      icon={
                        <ArrowRight
                          size={16}
                        />
                      }
                      iconPosition="right"
                    >
                      Mitigate Risk Now
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Main Content Grid */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns:
              '2fr 1fr',
            gap: '24px',
          }}
          className="risk-main-grid"
        >
                  {/* LEFT COLUMN */}
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
                  marginBottom: '24px',
                  paddingBottom: '12px',
                  borderBottom:
                    '1px solid #EEF1F5',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems:
                      'center',
                    gap: '8px',
                  }}
                >
                  <TrendingUp
                    size={18}
                    color="#072B84"
                  />

                  <h3
                    style={{
                      fontSize:
                        '16px',
                      fontWeight:
                        700,
                      color:
                        '#072B84',
                    }}
                  >
                    Vulnerability Risk
                    Vectors
                  </h3>
                </div>

                <span
                  style={{
                    fontSize:
                      '12px',
                    color:
                      '#6B7280',
                  }}
                >
                  4 Categories
                  Monitored
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection:
                    'column',
                  gap: '16px',
                }}
              >
                <RiskVector
                  icon={
                    <AlertTriangle
                      size={16}
                    />
                  }
                  title="Formal Legal Notices"
                  description="A written statutory notice has been issued. This starts the formal legal eviction timeline."
                  level="Critical"
                  color="#DC2626"
                  background="#FEF2F2"
                />

                <RiskVector
                  icon={
                    <Clock
                      size={16}
                    />
                  }
                  title="Financial Arrears Timeline"
                  description="Outstanding balance exceeds one rental cycle and continues accumulating penalties."
                  level="Warning"
                  color="#D97706"
                  background="#FFFBEB"
                />

                <RiskVector
                  icon={
                    <Info
                      size={16}
                    />
                  }
                  title="Communication Audit Trail"
                  description="Most landlord communication is undocumented and occurring outside written channels."
                  level="Elevated"
                  color="#2563EB"
                  background="#EFF6FF"
                />

                <RiskVector
                  icon={
                    <CheckCircle2
                      size={16}
                    />
                  }
                  title="Lease & Habitability Compliance"
                  description="Lease documentation is verified and available for legal review."
                  level="Secure"
                  color="#10B981"
                  background="#ECFDF5"
                />
              </div>
            </CardContent>
          </Card>

          {/* RIGHT COLUMN */}
          <div
            style={{
              display: 'flex',
              flexDirection:
                'column',
              gap: '16px',
            }}
          >
            {/* Timeline */}
            <Card>
              <CardContent
                style={{
                  paddingTop: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems:
                      'center',
                    gap: '8px',
                    marginBottom:
                      '20px',
                  }}
                >
                  <Calendar
                    size={18}
                    color="#072B84"
                  />

                  <h3
                    style={{
                      fontSize:
                        '16px',
                      fontWeight:
                        700,
                    }}
                  >
                    Urgent Timeline
                  </h3>
                </div>

                <div
                  style={{
                    position:
                      'relative',
                    paddingLeft:
                      '20px',
                  }}
                >
                  <div
                    style={{
                      position:
                        'absolute',
                      left: '5px',
                      top: 0,
                      bottom: 0,
                      width: '2px',
                      background:
                        '#E5E7EB',
                    }}
                  />

                  <TimelineStep
                    active
                    title="Notice Expiration"
                    date="October 12th (Tomorrow)"
                    description="Landlord gains right to move case toward court filing."
                  />

                  <TimelineStep
                    title="Legal Summons Response"
                    date="Within 5 Days of Filing"
                    description="Failure to respond may result in default judgment."
                  />
                </div>
              </CardContent>
            </Card>
                        {/* AI Recommendation */}
            <Card variant="accent">
              <CardContent
                style={{
                  paddingTop: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px',
                  }}
                >
                  <Zap
                    size={16}
                    color="#FCD34D"
                  />

                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      opacity: 0.85,
                    }}
                  >
                    Recommended Next Tool
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    marginBottom: '10px',
                    lineHeight: '28px',
                    color: '#FFFFFF',
                  }}
                >
                  Generate a
                  Proof-of-Rent Letter
                </h3>

                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: '22px',
                    opacity: 0.9,
                    marginBottom: '20px',
                  }}
                >
                  Our system recommends creating a
                  formal written payment timeline
                  report and extension request
                  before legal procedures advance.
                </p>

                <Button
                  variant="secondary"
                  fullWidth
                >
                  Launch Document Builder
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent
                style={{
                  paddingTop: '20px',
                }}
              >
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    marginBottom: '16px',
                  }}
                >
                  Risk Summary
                </h3>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <SummaryRow
                    label="Jurisdiction"
                    value="California"
                  />

                  <SummaryRow
                    label="Risk Level"
                    value="High"
                    danger
                  />

                  <SummaryRow
                    label="Notice Status"
                    value="Active"
                  />

                  <SummaryRow
                    label="Documents Verified"
                    value="Yes"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Disclaimer */}
        <section
          style={{
            marginTop: '28px',
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
            Stability AI provides guidance,
            not legal advice.
          </p>
        </section>

        <style jsx>{`
          @media (max-width: 1100px) {
            .risk-overview-grid {
              grid-template-columns: 1fr !important;
            }

            .risk-main-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}