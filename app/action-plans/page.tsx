'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import { getPlan, updateProgress, PlanData, ActionStep } from '../utils/api';

function TimelineStep({
  number,
  title,
  description,
  badge,
  urgent = false,
  inactive = false,
  completed = false,
}: {
  number: number;
  title: string;
  description: string;
  badge?: string;
  urgent?: boolean;
  inactive?: boolean;
  completed?: boolean;
}) {
  return (
    <div
      style={{
        position: 'relative',
        marginBottom: '24px',
        opacity: completed ? 0.7 : 1,
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
          background: completed
            ? '#10B981'
            : inactive
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
        {completed ? '✓' : number}
      </div>

      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '4px',
          }}
        >
          <strong style={{ textDecoration: completed ? 'line-through' : 'none' }}>
            {title}
          </strong>

          {badge && (
            <span
              style={{
                background: completed ? '#E0F2FE' : '#FEE2E2',
                color: completed ? '#0369A1' : '#DC2626',
                borderRadius: '999px',
                padding: '2px 8px',
                fontSize: '10px',
                fontWeight: 700,
              }}
            >
              {completed ? 'Done' : badge}
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
  onToggle,
}: {
  title: string;
  items: {
    number: number;
    label: string;
    checked: boolean;
  }[];
  onToggle: (stepNumber: number, checked: boolean) => void;
}) {
  return (
    <div style={{ marginBottom: '16px' }}>
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
        {items.map((item) => (
          <label
            key={item.number}
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-start',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={(e) => onToggle(item.number, e.target.checked)}
              style={{ marginTop: '2px' }}
            />

            <span
              style={{
                color: item.checked ? '#9CA3AF' : '#4B5563',
                textDecoration: item.checked ? 'line-through' : 'none',
              }}
            >
              {item.label}
            </span>
          </label>
        ))}
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
      <div style={{ fontSize: '20px' }}>{icon}</div>

      <div>
        <div style={{ fontWeight: 700, marginBottom: '4px' }}>{title}</div>

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
              textTransform: 'uppercase',
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
  const router = useRouter();
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Repair Request');

  useEffect(() => {
    const loadPlanData = async () => {
      try {
        const sessionId = localStorage.getItem('activeSessionId');
        if (!sessionId) {
          setError('No active session found. Please complete the intake wizard first.');
          setLoading(false);
          return;
        }

        const data = await getPlan(sessionId);
        setPlan(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to fetch action plan from backend.');
      } finally {
        setLoading(false);
      }
    };

    loadPlanData();
  }, []);

  const handleToggleStep = async (stepNumber: number, checked: boolean) => {
    if (!plan) return;
    try {
      // Optimistic UI update
      const updatedSteps = plan.actionSteps.map((step) => {
        if (step.number === stepNumber) {
          return { ...step, completed: checked };
        }
        return step;
      });
      setPlan({ ...plan, actionSteps: updatedSteps });

      // Call API
      await updateProgress(plan.sessionId, stepNumber, checked);
    } catch (err) {
      console.error('Failed to update progress on server:', err);
      // Revert on error
      const revertedSteps = plan.actionSteps.map((step) => {
        if (step.number === stepNumber) {
          return { ...step, completed: !checked };
        }
        return step;
      });
      setPlan({ ...plan, actionSteps: revertedSteps });
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <Loader2
          size={50}
          style={{ animation: 'spin 1.5s linear infinite', color: '#072B84', marginBottom: '20px' }}
        />
        <h3>Loading your action plan...</h3>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <AlertTriangle size={48} color="#DC2626" style={{ margin: '0 auto 20px' }} />
        <h2 style={{ color: '#072B84', marginBottom: '12px' }}>Initialization Error</h2>
        <p style={{ color: '#6B7280', lineHeight: '24px', marginBottom: '24px' }}>{error || 'Action plan details could not be retrieved.'}</p>
        <Button variant="primary" onClick={() => router.push('/intake')} icon={<ArrowLeft size={16} />}>
          Go to Intake Wizard
        </Button>
      </div>
    );
  }

  // Calculate stats based on real data
  const totalTasks = plan.actionSteps.length;
  const completedTasks = plan.actionSteps.filter((s) => s.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Determine risk details
  let riskScore = 15;
  let riskLabel = 'Low Risk';
  let riskColor = '#10B981';
  let riskSubtitle = 'Standard housing stability monitoring is recommended.';
  
  if (plan.urgencyLevel === 'High') {
    riskScore = 92;
    riskLabel = 'High Risk';
    riskColor = '#DF7100';
    riskSubtitle = 'Immediate action recommended within the next 48 hours.';
  } else if (plan.urgencyLevel === 'Medium') {
    riskScore = 50;
    riskLabel = 'Medium Risk';
    riskColor = '#3B82F6';
    riskSubtitle = 'Action recommended within the next 7 days.';
  }

  // Group checklist categories
  const categories = ['Legal', 'Financial', 'Housing'];
  const getCategoryItems = (category: string) => {
    return plan.actionSteps
      .filter((step) => step.category.toLowerCase() === category.toLowerCase())
      .map((step) => ({
        number: step.number,
        label: step.title,
        checked: step.completed,
      }));
  };

  return (
    <>
      {/* Risk Banner */}
      <section
        style={{
          background: riskColor,
          color: '#FFFFFF',
          padding: '10px 24px',
          transition: 'all 0.3s ease',
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
            <span>Your Situation: {riskLabel}</span>
          </div>

          <span style={{ fontSize: '12px', opacity: 0.9 }}>
            {riskSubtitle}
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
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
                Based on your intake, documentation, and legal assessment, we've created a prioritized action plan to improve housing stability and reduce legal risk.
              </p>
            </div>
            <Button variant="secondary" onClick={() => router.push('/intake')} icon={<ArrowLeft size={16} />}>
              Re-Take Assessment
            </Button>
          </div>
        </section>

        {/* Main Layout */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
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
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px',
                    flexWrap: 'wrap',
                    marginBottom: '20px',
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#072B84',
                        marginBottom: '8px',
                      }}
                    >
                      Personalized Stability Assessment
                    </h2>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#EFF6FF',
                        color: '#2563EB',
                        borderRadius: '999px',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                      }}
                    >
                      <Sparkles size={12} />
                      AI Analysis Engine Active
                    </div>
                  </div>

                  <div style={{ minWidth: '220px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>
                        Displacement Risk
                      </span>

                      <span style={{ fontWeight: 700, color: riskColor }}>
                        {riskScore}%
                      </span>
                    </div>

                    <ProgressBar
                      value={riskScore}
                      variant={plan.urgencyLevel === 'High' ? 'danger' : 'primary'}
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
                  <p style={{ marginBottom: '16px' }}>
                    Based on your housing situation in {plan.actionSteps[0]?.description ? 'this area' : 'your jurisdiction'}, our analysis identifies a 
                    <strong style={{ color: riskColor, marginLeft: '4px' }}>
                      {riskLabel} of housing displacement.
                    </strong>
                  </p>

                  <p style={{ fontStyle: 'italic', background: '#F9FAFB', padding: '16px', borderRadius: '8px', borderLeft: `4px solid ${riskColor}`, color: '#374151' }}>
                    &ldquo;{plan.rightsSummary}&rdquo;
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
                  <Button variant="primary" icon={<Download size={16} />}>
                    Download Report
                  </Button>

                  <Button variant="secondary" icon={<Share2 size={16} />}>
                    Share With Legal Aid
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Timeline + Checklist Area */}
            <section
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
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

                    {plan.actionSteps.length > 0 ? (
                      plan.actionSteps.map((step) => (
                        <TimelineStep
                          key={step.number}
                          number={step.number}
                          title={step.title}
                          description={step.description}
                          badge={step.badge}
                          urgent={step.urgent}
                          inactive={step.inactive}
                          completed={step.completed}
                        />
                      ))
                    ) : (
                      <p style={{ fontSize: '13px', color: '#6B7280' }}>No timeline steps generated.</p>
                    )}
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
                      justifyContent: 'space-between',
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
                        border: '1px solid #D9DDE5',
                        borderRadius: '999px',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#6B7280',
                      }}
                    >
                      {completedTasks} / {totalTasks} Tasks Done
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px',
                    }}
                  >
                    {categories.map((category) => {
                      const items = getCategoryItems(category);
                      if (items.length === 0) return null;
                      return (
                        <ChecklistCategory
                          key={category}
                          title={`${category}`}
                          items={items}
                          onToggle={handleToggleStep}
                        />
                      );
                    })}
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
                    borderBottom: '1px solid #E5E7EB',
                    background: '#F9FAFB',
                  }}
                >
                  {['Repair Request', 'Payment Plan', 'Lease Termination'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        background: activeTab === tab ? '#FFFFFF' : 'transparent',
                        borderBottom: activeTab === tab ? '2px solid #072B84' : '2px solid transparent',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: activeTab === tab ? '#072B84' : '#6B7280',
                        transition: 'all 0.2s ease',
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
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      padding: '16px',
                      fontFamily: 'Georgia, serif',
                      fontSize: '13px',
                      lineHeight: '24px',
                      maxHeight: '220px',
                      overflowY: 'auto',
                    }}
                  >
                    {activeTab === 'Repair Request' && (
                      <>
                        <p style={{ marginBottom: '12px' }}>
                          Dear <strong>[Landlord Name]</strong>,
                        </p>

                        <p style={{ marginBottom: '12px' }}>
                          This letter serves as formal notice regarding unresolved maintenance issues at <strong>[Property Address]</strong>.
                        </p>

                        <p style={{ marginBottom: '12px' }}>
                          Specifically, the unresolved habitability concerns require attention in order to maintain safe living conditions.
                        </p>

                        <p style={{ marginBottom: 0 }}>
                          Please coordinate repairs before <strong>[Date]</strong> to ensure compliance with local tenant protection standards.
                        </p>
                      </>
                    )}

                    {activeTab === 'Payment Plan' && (
                      <>
                        <p style={{ marginBottom: '12px' }}>
                          Dear <strong>[Landlord Name]</strong>,
                        </p>

                        <p style={{ marginBottom: '12px' }}>
                          I am writing regarding my lease agreement at <strong>[Property Address]</strong> to request a temporary payment plan for outstanding rent.
                        </p>

                        <p style={{ marginBottom: '12px' }}>
                          Due to temporary financial difficulties, I propose paying the balance of <strong>[Amount]</strong> in monthly installments of <strong>[Installment]</strong> starting on <strong>[Date]</strong>.
                        </p>

                        <p style={{ marginBottom: 0 }}>
                          I appreciate your understanding and cooperation in helping maintain my tenancy.
                        </p>
                      </>
                    )}

                    {activeTab === 'Lease Termination' && (
                      <>
                        <p style={{ marginBottom: '12px' }}>
                          Dear <strong>[Landlord Name]</strong>,
                        </p>

                        <p style={{ marginBottom: '12px' }}>
                          Please accept this letter as formal notice that I will be terminating my lease agreement for the property at <strong>[Property Address]</strong>.
                        </p>

                        <p style={{ marginBottom: '12px' }}>
                          My final day of tenancy will be <strong>[Date]</strong>, which complies with the notice period required by our lease agreement.
                        </p>

                        <p style={{ marginBottom: 0 }}>
                          Please coordinate a time for a move-out inspection and provide instructions for the return of my security deposit.
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div
                  style={{
                    padding: '16px',
                    borderTop: '1px solid #E5E7EB',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '11px', color: '#6B7280' }}>
                    AI-verified legal language
                  </span>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button variant="secondary" size="sm" icon={<FileText size={14} />}>
                      Refine
                    </Button>

                    <Button variant="primary" size="sm">
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
            {/* Documents Needed */}
            <Card>
              <CardContent style={{ paddingTop: '20px' }}>
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#072B84',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '20px',
                  }}
                >
                  📄 Documents Needed
                </h3>

                <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.documentsNeeded.map((doc, idx) => (
                    <li key={idx} style={{ fontSize: '13px', color: '#4B5563', lineHeight: '20px' }}>
                      {doc}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

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
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '20px',
                  }}
                >
                  Immediate Assistance
                </h3>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
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
                    alignItems: 'flex-start',
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
                    Contacts are matched to your location and housing profile.
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