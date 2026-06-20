'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Loader2,
} from 'lucide-react';
import { getPlan, PlanData } from '../utils/api';

function RiskGauge({
  value,
  level = 'High Risk',
  color = '#DC2626',
  bg = '#FEE2E2',
}: {
  value: number;
  level?: string;
  color?: string;
  bg?: string;
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
          stroke={bg}
          strokeWidth="10"
        />

        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
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
            color: color,
            textTransform:
              'uppercase',
            letterSpacing:
              '1px',
          }}
        >
          {level}
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
  const router = useRouter();
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const sessionId = localStorage.getItem('activeSessionId');
        if (sessionId) {
          const data = await getPlan(sessionId);
          setPlan(data);
        }
      } catch (err) {
        console.error('Failed to fetch plan for risk profiling:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
        }}
      >
        <Loader2
          size={48}
          style={{ animation: 'spin 1.5s linear infinite', color: '#072B84', marginBottom: '20px' }}
        />
        <h3>Analyzing your legal risk profile...</h3>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // CASE 1: No active plan exists
  if (!plan) {
    return (
      <>
        <Header
          title="Legal Risk Profiler"
          subtitle="Automated Housing Risk Assessment"
        />

        <main className="page-container" style={{ maxWidth: '800px', margin: '40px auto' }}>
          <Card style={{ border: '1px dashed #072B84', background: '#F0F4FF', padding: '24px' }}>
            <CardContent style={{ textAlign: 'center', paddingTop: '20px' }}>
              <div style={{ display: 'inline-flex', padding: '16px', background: '#E8F0FF', borderRadius: '50%', color: '#072B84', marginBottom: '20px' }}>
                <ShieldAlert size={32} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#072B84', marginBottom: '12px' }}>
                No Active Risk Profile Available
              </h2>
              <p style={{ color: '#6B7280', fontSize: '15px', lineHeight: '24px', marginBottom: '24px' }}>
                Complete the stability assessment in the Intake Wizard first. Our system will analyze your timeline and legal notices to generate your eviction risk profile.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/intake')}
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                Start Housing Assessment
              </Button>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  // Derive values from plan
  let riskScore = 15;
  let riskLabel = 'Low Risk';
  let riskColor = '#10B981';
  let riskBg = '#ECFDF5';
  let riskDescription = 'Standard housing stability monitoring is recommended. No immediate eviction notices are pending.';
  let criticalFactor = 'No active deadlines pending within the next 14 days.';
  let noticeStatus = 'Inactive';

  if (plan.urgencyLevel === 'High') {
    riskScore = 92;
    riskLabel = 'High Risk';
    riskColor = '#DC2626';
    riskBg = '#FEF2F2';
    riskDescription = 'Your risk score is critically elevated due to an active landlord notice and urgent timeline. Immediate response recommended.';
    criticalFactor = '72-Hour response window closes in less than 24 hours.';
    noticeStatus = 'Active';
  } else if (plan.urgencyLevel === 'Medium') {
    riskScore = 50;
    riskLabel = 'Medium Risk';
    riskColor = '#D97706';
    riskBg = '#FFFBEB';
    riskDescription = 'Your risk score is elevated due to pending rent or maintenance timelines. Quick mitigation can reduce further legal exposure.';
    criticalFactor = 'Deadline is approaching in less than 14 days. Mitigation recommended.';
    noticeStatus = 'Active';
  }

  let jurisdiction = 'California';
  const match = plan.rightsSummary.match(/Under\s+([A-Za-z\s]+)\s+state/i);
  if (match && match[1]) {
    jurisdiction = match[1].trim();
  }

  // Extract notice step date or tomorrow
  const noticeSteps = plan.actionSteps.filter(s => s.urgent && !s.completed);
  const timelineSteps = plan.actionSteps.slice(0, 2);

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
                    level={riskLabel}
                    color={riskColor}
                    bg={riskBg}
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
                      color: riskColor,
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
                      {riskLabel === 'Low Risk' ? 'Housing Status Secure' : 'Immediate Action Advised'}
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
                    {riskDescription}
                  </p>
                </div>

                {/* Critical Action */}
                <Card
                  style={{
                    background: riskBg,
                    border: `1px solid ${riskColor}40`,
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
                        color: riskColor,
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
                        color: riskColor,
                        marginBottom:
                          '16px',
                      }}
                    >
                      {criticalFactor}
                    </p>

                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => router.push('/action-plans')}
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
                  description="A written notice or active timeline step requires your urgent attention."
                  level={riskLabel === 'High Risk' ? 'Critical' : 'Minimal'}
                  color={riskLabel === 'High Risk' ? '#DC2626' : '#10B981'}
                  background={riskLabel === 'High Risk' ? '#FEF2F2' : '#ECFDF5'}
                />

                <RiskVector
                  icon={
                    <Clock
                      size={16}
                    />
                  }
                  title="Financial Arrears Timeline"
                  description="Tracking how income and rent ratio impacts your housing stability."
                  level={plan.actionSteps.some(s => s.category === 'Financial' && !s.completed) ? 'Warning' : 'Secure'}
                  color={plan.actionSteps.some(s => s.category === 'Financial' && !s.completed) ? '#D97706' : '#10B981'}
                  background={plan.actionSteps.some(s => s.category === 'Financial' && !s.completed) ? '#FFFBEB' : '#ECFDF5'}
                />

                <RiskVector
                  icon={
                    <Info
                      size={16}
                    />
                  }
                  title="Communication Audit Trail"
                  description="Documenting landlord correspondence and proof of payments."
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
                  description="Required lease and proof of residence documents gathered."
                  level={plan.documentsNeeded.length > 0 ? 'Secure' : 'Incomplete'}
                  color={plan.documentsNeeded.length > 0 ? '#10B981' : '#D97706'}
                  background={plan.documentsNeeded.length > 0 ? '#ECFDF5' : '#FFFBEB'}
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

                  {timelineSteps.length > 0 ? (
                    timelineSteps.map((step, idx) => (
                      <TimelineStep
                        key={step.number}
                        active={idx === 0 && plan.urgencyLevel === 'High'}
                        title={step.title}
                        date={step.badge || 'Pending'}
                        description={step.description}
                      />
                    ))
                  ) : (
                    <p style={{ fontSize: '13px', color: '#6B7280' }}>No timeline steps generated.</p>
                  )}
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
                  Generate a Landlord Letter
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
                  onClick={() => router.push('/action-plans')}
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
                    value={jurisdiction}
                  />

                  <SummaryRow
                    label="Risk Level"
                    value={plan.urgencyLevel}
                    danger={plan.urgencyLevel === 'High'}
                  />

                  <SummaryRow
                    label="Notice Status"
                    value={noticeStatus}
                  />

                  <SummaryRow
                    label="Documents Verified"
                    value={plan.documentsNeeded.length > 0 ? 'Yes' : 'No'}
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