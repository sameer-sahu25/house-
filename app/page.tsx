'use client';

import React from 'react';
import Header from '../components/Header';
import {
  Plus,
  CheckCircle2,
  Calendar,
  Users,
  ListTodo,
} from 'lucide-react';

import Button from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import {
  Card,
  CardContent,
} from '../components/ui/Card';

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

function StatCard({
  icon,
  title,
  value,
}: StatCardProps) {
  return (
    <Card>
      <CardContent style={{ paddingTop: '20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '8px',
              border:
                '1px solid #D9DDE5',
              background: '#F9FAFB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </div>

          <div>
            <p
              style={{
                fontSize: '11px',
                color: '#6B7280',
                fontWeight: 600,
                marginBottom: '4px',
              }}
            >
              {title}
            </p>

            <h3
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#111827',
              }}
            >
              {value}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <span
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '999px',
          background: color,
        }}
      />

      <span>{label}</span>
    </div>
  );
}

function AchievementBadge({
  title,
  active = false,
}: {
  title: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        border: active
          ? '1px solid rgba(255,255,255,.2)'
          : '1px solid rgba(255,255,255,.08)',
        background: active
          ? 'rgba(255,255,255,.10)'
          : 'rgba(255,255,255,.04)',
        borderRadius: '8px',
        padding: '14px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '22px',
          marginBottom: '8px',
        }}
      >
        {active ? '🏆' : '🔒'}
      </div>

      <div
        style={{
          fontSize: '12px',
          opacity: active ? 1 : 0.6,
        }}
      >
        {title}
      </div>
    </div>
  );
}

function TimelineItem({
  date,
  title,
  desc,
  active = false,
}: {
  date: string;
  title: string;
  desc: string;
  active?: boolean;
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
          left: '-22px',
          top: '4px',
          width: '12px',
          height: '12px',
          borderRadius: '999px',
          background: active
            ? '#072B84'
            : '#D1D5DB',
          border: '2px solid #FFFFFF',
        }}
      />

      <div
        style={{
          fontSize: '12px',
          color: '#6B7280',
          marginBottom: '4px',
        }}
      >
        {date}
      </div>

      <div
        style={{
          fontWeight: 600,
          marginBottom: '4px',
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: '14px',
          color: '#6B7280',
          lineHeight: '22px',
        }}
      >
        {desc}
      </div>
    </div>
  );
}

function TaskCard({
  title,
  desc,
  due,
  urgent = false,
}: {
  title: string;
  desc: string;
  due?: string;
  urgent?: boolean;
}) {
  return (
    <div
      style={{
        border: '1px solid #D9DDE5',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        gap: '12px',
      }}
    >
      <input
        type="checkbox"
        style={{
          width: '16px',
          height: '16px',
          marginTop: '2px',
        }}
      />

      <div>
        <div
          style={{
            fontWeight: 600,
            marginBottom: '4px',
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: '14px',
            color: '#6B7280',
            lineHeight: '22px',
          }}
        >
          {desc}
        </div>

        {due && (
          <div
            style={{
              marginTop: '10px',
              fontSize: '12px',
              fontWeight: 600,
              color: urgent
                ? '#DC2626'
                : '#6B7280',
            }}
          >
            {due}
          </div>
        )}
      </div>
    </div>
  );
}

const activityData = [20, 45, 15, 80, 40, 10, 30];

const progress = 68;

const stats = [
  {
    title: 'TASKS COMPLETED',
    value: '24 / 32',
    icon: <CheckCircle2 size={20} color="#2563EB" />,
  },
  {
    title: 'REMAINING',
    value: '8',
    icon: <ListTodo size={20} color="#6B7280" />,
  },
  {
    title: 'DEADLINES',
    value: '3 Soon',
    icon: <Calendar size={20} color="#EF4444" />,
  },
  {
    title: 'RESOURCES',
    value: '12 Contacted',
    icon: <Users size={20} color="#6B7280" />,
  },
];

export default function Dashboard() {
  return (
    <>
      <Header
        title="Progress Tracker"
        subtitle="Monitor your housing stability journey"
      />

      <main className="page-container">
        {/* Welcome Section */}
        <section
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#072B84',
                marginBottom: '6px',
              }}
            >
              Hello, Jordan
            </h1>

            <p
              style={{
                color: '#6B7280',
                fontSize: '14px',
              }}
            >
              Your housing stability journey is 68%
              complete. You're making excellent
              progress.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            icon={<Plus size={18} />}
          >
            New Task
          </Button>
        </section>

        {/* Stats Grid */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(240px,1fr))',
            gap: '24px',
            marginBottom: '24px',
          }}
        >
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </section>

        {/* Progress Section */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns:
              '2fr 1fr',
            gap: '24px',
            marginBottom: '24px',
          }}
          className="dashboard-progress-grid"
        >
          {/* Main Progress Card */}
          <Card>
            <CardContent style={{ paddingTop: '20px' }}>
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
                    color: '#111827',
                  }}
                >
                  Overall Plan Progress
                </h3>

                <span
                  style={{
                    color: '#072B84',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  {progress}% Total
                </span>
              </div>

              <ProgressBar
                value={progress}
                size="md"
                variant="primary"
              />

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '18px',
                  marginTop: '18px',
                  marginBottom: '30px',
                  fontSize: '12px',
                }}
              >
                <Legend
                  color="#072B84"
                  label="Legal Intake (100%)"
                />

                <Legend
                  color="#2563EB"
                  label="Financial Aid (60%)"
                />

                <Legend
                  color="#1E40AF"
                  label="Housing Search (35%)"
                />
              </div>

              {/* Activity Chart */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    alignItems: 'center',
                    marginBottom: '18px',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '14px',
                      color: '#6B7280',
                    }}
                  >
                    Activity Level
                    (Last 7 Days)
                  </h4>

                  <span
                    style={{
                      fontSize: '12px',
                      color: '#6B7280',
                    }}
                  >
                    +12% vs last week
                  </span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '8px',
                    height: '140px',
                  }}
                >
                  {activityData.map(
                    (value, index) => (
                      <div
                        key={index}
                        style={{
                          flex: 1,
                          height: `${value}%`,
                          background:
                            value === 80
                              ? '#072B84'
                              : '#D9DDE5',
                          borderRadius:
                            '4px 4px 0 0',
                        }}
                      />
                    )
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    marginTop: '10px',
                    fontSize: '12px',
                    color: '#6B7280',
                  }}
                >
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
                </div>
              </div>
            </CardContent>
          </Card>
                    {/* Achievements */}
          <Card
            variant="accent"
            style={{
              minHeight: '100%',
            }}
          >
            <CardContent style={{ paddingTop: '20px' }}>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '24px',
                  color: '#FFFFFF',
                }}
              >
                Achievements
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(2,minmax(0,1fr))',
                  gap: '12px',
                }}
              >
                <AchievementBadge
                  title="First Steps Complete"
                  active
                />

                <AchievementBadge
                  title="Rights Advocate"
                  active
                />

                <AchievementBadge
                  title="Stability Master"
                />

                <AchievementBadge
                  title="Legal Expert"
                />
              </div>

              <div
                style={{
                  marginTop: '20px',
                  background:
                    'rgba(255,255,255,.12)',
                  borderRadius: '8px',
                  padding: '14px',
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: '11px',
                      opacity: 0.8,
                      marginBottom: '4px',
                    }}
                  >
                    Next Reward
                  </div>

                  <strong>
                    Stability Toolkit v2
                  </strong>
                </div>

                <span
                  style={{
                    fontSize: '22px',
                  }}
                >
                  🔒
                </span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Bottom Section */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns:
              '1fr 1fr',
            gap: '24px',
          }}
          className="dashboard-bottom-grid"
        >
          {/* Timeline */}
          <Card>
            <CardContent style={{ paddingTop: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                  }}
                >
                  Action History
                </h3>
              </div>

              <div
                style={{
                  position: 'relative',
                  paddingLeft: '22px',
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

                <TimelineItem
                  active
                  date="Today, 2:15 PM"
                  title="Completed Housing Stability Survey"
                  desc="Automated risk scores updated based on new rental data."
                />

                <TimelineItem
                  date="Yesterday, 9:00 AM"
                  title="Legal Document Uploaded"
                  desc="Lease_Agreement_2024.pdf processed successfully."
                />

                <TimelineItem
                  date="Oct 24, 4:45 PM"
                  title="Court Prep Consultation Scheduled"
                  desc="Meeting with pro bono counsel confirmed."
                />
              </div>
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card>
            <CardContent style={{ paddingTop: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                  }}
                >
                  Priority Next Steps
                </h3>

                <span
                  style={{
                    background: '#FEE2E2',
                    color: '#DC2626',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding:
                      '4px 10px',
                    borderRadius:
                      '999px',
                  }}
                >
                  URGENT
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection:
                    'column',
                  gap: '12px',
                }}
              >
                <TaskCard
                  urgent
                  title="Review Tenant Rights Brief"
                  desc="Crucial for your upcoming Section 8 consultation."
                  due="Due in 2 days"
                />

                <TaskCard
                  title="Contact Resource Hub"
                  desc="Ask about emergency utility assistance."
                  due="Due in 5 days"
                />

                <TaskCard
                  title="Upload Income Statements"
                  desc="Needed for updated financial eligibility calculations."
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <style jsx>{`
          @media (max-width: 1100px) {
            .dashboard-progress-grid {
              grid-template-columns: 1fr !important;
            }

            .dashboard-bottom-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}