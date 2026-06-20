'use client';

import { useState } from 'react';
import {
  Building2,
  Home,
  Users,
  Tent,
  AlertTriangle,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Info,
  Building,
} from 'lucide-react';

import Header from '../../components/Header';
import Button from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import {
  Card,
  CardContent,
} from '../../components/ui/Card';

interface HousingCardProps {
  icon: React.ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
}

function HousingCard({
  icon,
  title,
  active,
  onClick,
}: HousingCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: '100%',
        minHeight: '88px',
        border: active
          ? '1px solid #072B84'
          : '1px solid #D9DDE5',
        background: active
          ? '#E8F0FF'
          : '#FFFFFF',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          minWidth: '40px',
          borderRadius: '8px',
          background: '#F5F6FA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4B5563',
        }}
      >
        {icon}
      </div>

      <span
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#111827',
          lineHeight: '20px',
        }}
      >
        {title}
      </span>
    </button>
  );
}

interface ProgressItemProps {
  label: string;
  complete?: boolean;
  active?: boolean;
}

function ProgressItem({
  label,
  complete = false,
  active = false,
}: ProgressItemProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {complete ? (
        <CheckCircle2
          size={16}
          color="#10B981"
        />
      ) : active ? (
        <div
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '999px',
            border: '2px solid #072B84',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '999px',
              background: '#072B84',
            }}
          />
        </div>
      ) : (
        <Circle
          size={16}
          color="#D1D5DB"
        />
      )}

      <span
        style={{
          fontSize: '13px',
          fontWeight: active
            ? 600
            : 500,
          color: active
            ? '#111827'
            : '#6B7280',
        }}
      >
        {label}
      </span>
    </div>
  );
}

type HousingType =
  | 'apartment'
  | 'single-family'
  | 'shared'
  | 'shelter'
  | 'unstable'
  | '';

const steps = [
  { id: 1, label: 'Housing' },
  { id: 2, label: 'Eviction' },
  { id: 3, label: 'Financial' },
  { id: 4, label: 'Documents' },
  { id: 5, label: 'Review' },
];

export default function IntakeWizardPage() {
  const [currentStep] = useState(1);

  const [housingType, setHousingType] =
    useState<HousingType>('');

  const [rentAmount, setRentAmount] =
    useState('0.00');

  return (
    <>
      <Header
        title="Intake Wizard"
        subtitle="Housing Stability Assessment"
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
            Housing Stability Assessment
          </h1>

          <p
            style={{
              maxWidth: '760px',
              color: '#6B7280',
              fontSize: '14px',
              lineHeight: '24px',
            }}
          >
            Complete this assessment to receive
            a personalized legal action plan and
            connect with emergency rental
            assistance programs in your area.
          </p>
        </section>

        {/* Stepper */}
        <Card
          style={{
            marginBottom: '24px',
          }}
        >
          <CardContent
            style={{
              paddingTop: '20px',
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                maxWidth: '900px',
                margin: '0 auto',
              }}
            >
              {/* Background Line */}
              <div
                style={{
                  position: 'absolute',
                  left: '40px',
                  right: '40px',
                  top: '24px',
                  height: '2px',
                  background: '#E5E7EB',
                  zIndex: 0,
                }}
              />

              {steps.map((step) => {
                const isActive =
                  step.id === currentStep;

                const isCompleted =
                  step.id < currentStep;

                return (
                  <div
                    key={step.id}
                    style={{
                      position:
                        'relative',
                      zIndex: 2,
                      display: 'flex',
                      flexDirection:
                        'column',
                      alignItems:
                        'center',
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius:
                          '999px',
                        display: 'flex',
                        alignItems:
                          'center',
                        justifyContent:
                          'center',
                        fontWeight: 700,
                        fontSize: '14px',
                        border:
                          isActive
                            ? '2px solid #072B84'
                            : isCompleted
                            ? '2px solid #072B84'
                            : '2px solid #D9DDE5',
                        background:
                          isActive
                            ? '#072B84'
                            : isCompleted
                            ? '#E8F0FF'
                            : '#FFFFFF',
                        color:
                          isActive
                            ? '#FFFFFF'
                            : isCompleted
                            ? '#072B84'
                            : '#9CA3AF',
                      }}
                    >
                      {step.id}
                    </div>

                    <span
                      style={{
                        marginTop: '10px',
                        fontSize: '12px',
                        fontWeight: isActive
                          ? 700
                          : 600,
                        color: isActive
                          ? '#072B84'
                          : '#6B7280',
                      }}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Layout */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns:
              '2.4fr 1fr',
            gap: '24px',
          }}
          className="intake-layout"
        >
          {/* LEFT PANEL */}
          <Card>
            <CardContent
              style={{
                paddingTop: '20px',
              }}
            >
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#072B84',
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom:
                    '1px solid #EEF1F5',
                }}
              >
                Current Housing Situation
              </h2>

              {/* State + Zip */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    '1fr 1fr',
                  gap: '16px',
                  marginBottom: '24px',
                }}
                className="intake-grid-two"
              >
                <div>
                  <label
                    style={{
                      display: 'block',
                      marginBottom:
                        '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#6B7280',
                      textTransform:
                        'uppercase',
                    }}
                  >
                    State of Residence
                  </label>

                  <div
                    style={{
                      position:
                        'relative',
                    }}
                  >
                    <select
                      style={{
                        width: '100%',
                        height: '44px',
                        border:
                          '1px solid #D9DDE5',
                        borderRadius:
                          '6px',
                        padding:
                          '0 40px 0 12px',
                        background:
                          '#FFFFFF',
                        appearance:
                          'none',
                      }}
                    >
                      <option>
                        Select State
                      </option>
                      <option>
                        California
                      </option>
                      <option>
                        New York
                      </option>
                      <option>
                        Texas
                      </option>
                    </select>

                    <ChevronDown
                      size={16}
                      style={{
                        position:
                          'absolute',
                        right: '12px',
                        top: '14px',
                        color:
                          '#6B7280',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      marginBottom:
                        '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#6B7280',
                      textTransform:
                        'uppercase',
                    }}
                  >
                    Zip Code
                  </label>

                  <input
                    type="text"
                    placeholder="10001"
                    style={{
                      width: '100%',
                      height: '44px',
                      border:
                        '1px solid #D9DDE5',
                      borderRadius:
                        '6px',
                      padding:
                        '0 12px',
                    }}
                  />
                </div>
              </div>

              {/* Housing Type */}
              <div
                style={{
                  marginBottom: '24px',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    marginBottom:
                      '12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#6B7280',
                    textTransform:
                      'uppercase',
                  }}
                >
                  Current Housing Type
                </label>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      '1fr 1fr',
                    gap: '12px',
                  }}
                  className="intake-grid-two"
                >
                  <HousingCard
                    icon={<Building2 size={18} />}
                    title="Apartment / Multi-family"
                    active={
                      housingType ===
                      'apartment'
                    }
                    onClick={() =>
                      setHousingType(
                        'apartment'
                      )
                    }
                  />

                  <HousingCard
                    icon={<Home size={18} />}
                    title="Single Family House"
                    active={
                      housingType ===
                      'single-family'
                    }
                    onClick={() =>
                      setHousingType(
                        'single-family'
                      )
                    }
                  />
                                    <HousingCard
                    icon={<Users size={18} />}
                    title="Shared Housing"
                    active={
                      housingType ===
                      'shared'
                    }
                    onClick={() =>
                      setHousingType(
                        'shared'
                      )
                    }
                  />

                  <HousingCard
                    icon={<Tent size={18} />}
                    title="Shelter / Temporary"
                    active={
                      housingType ===
                      'shelter'
                    }
                    onClick={() =>
                      setHousingType(
                        'shelter'
                      )
                    }
                  />
                </div>

                {/* Unstable Housing Option */}
                <div
                  onClick={() =>
                    setHousingType(
                      'unstable'
                    )
                  }
                  style={{
                    marginTop: '12px',
                    border:
                      housingType ===
                      'unstable'
                        ? '1px solid #072B84'
                        : '1px solid #D9DDE5',
                    background:
                      housingType ===
                      'unstable'
                        ? '#E8F0FF'
                        : '#FFFFFF',
                    borderRadius: '8px',
                    padding: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius:
                        '8px',
                      background:
                        '#FEF3C7',
                      display: 'flex',
                      alignItems:
                        'center',
                      justifyContent:
                        'center',
                    }}
                  >
                    <AlertTriangle
                      size={18}
                      color="#D97706"
                    />
                  </div>

                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        color:
                          '#111827',
                      }}
                    >
                      Unstable / No
                      Permanent Address
                    </div>

                    <div
                      style={{
                        fontSize:
                          '13px',
                        color:
                          '#6B7280',
                        marginTop:
                          '2px',
                      }}
                    >
                      Couch surfing,
                      hotel, vehicle,
                      or no stable
                      housing.
                    </div>
                  </div>
                </div>
              </div>

              {/* Rent Amount */}
              <div
                style={{
                  borderTop:
                    '1px solid #EEF1F5',
                  paddingTop: '20px',
                  marginTop: '20px',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    marginBottom:
                      '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#6B7280',
                    textTransform:
                      'uppercase',
                  }}
                >
                  Monthly Rent Amount
                </label>

                <div
                  style={{
                    position:
                      'relative',
                    maxWidth:
                      '320px',
                  }}
                >
                  <span
                    style={{
                      position:
                        'absolute',
                      left: '12px',
                      top: '12px',
                      color:
                        '#6B7280',
                      fontWeight: 600,
                    }}
                  >
                    $
                  </span>

                  <input
                    value={rentAmount}
                    onChange={(e) =>
                      setRentAmount(
                        e.target.value
                      )
                    }
                    style={{
                      width: '100%',
                      height: '44px',
                      border:
                        '1px solid #D9DDE5',
                      borderRadius:
                        '6px',
                      padding:
                        '0 12px 0 28px',
                      fontWeight: 600,
                    }}
                  />
                </div>

                <p
                  style={{
                    marginTop: '8px',
                    fontSize: '12px',
                    color: '#6B7280',
                  }}
                >
                  If rent is shared,
                  enter only your
                  portion.
                </p>
              </div>

              {/* Navigation */}
              <div
                style={{
                  borderTop:
                    '1px solid #EEF1F5',
                  marginTop: '28px',
                  paddingTop: '24px',
                  display: 'flex',
                  justifyContent:
                    'space-between',
                }}
              >
                <Button
                  variant="secondary"
                  icon={
                    <ArrowLeft
                      size={16}
                    />
                  }
                >
                  Back
                </Button>

                <Button
                  variant="primary"
                  icon={
                    <ArrowRight
                      size={16}
                    />
                  }
                  iconPosition="right"
                >
                  Next Step
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* RIGHT SIDEBAR */}
          <div
            style={{
              display: 'flex',
              flexDirection:
                'column',
              gap: '16px',
            }}
          >
            {/* Why We Ask */}
            <Card variant="accent">
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
                      '12px',
                  }}
                >
                  <Info size={16} />

                  <h3
                    style={{
                      fontSize:
                        '14px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                    }}
                  >
                    Why We Ask
                  </h3>
                </div>

                <p
                  style={{
                    fontSize:
                      '13px',
                    lineHeight:
                      '22px',
                    opacity: 0.95,
                  }}
                >
                  Housing laws vary
                  by state and
                  location. Your
                  housing type helps
                  us identify tenant
                  protections,
                  eviction defenses,
                  and emergency
                  assistance programs
                  that may apply.
                </p>
              </CardContent>
            </Card>

            {/* Progress Tracker */}
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
                    marginBottom:
                      '16px',
                  }}
                >
                  Assessment Progress
                </h3>

                <ProgressBar
                  value={20}
                  showLabel
                  customLabel="Step 1 of 5"
                />

                <div
                  style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection:
                      'column',
                    gap: '12px',
                  }}
                >
                  <ProgressItem
                    complete
                    label="Privacy Agreement Signed"
                  />

                  <ProgressItem
                    active
                    label="Housing Information"
                  />

                  <ProgressItem
                    label="Legal Risk Check"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Banner */}
            <Card
              variant="accent"
              style={{
                minHeight: '180px',
                position:
                  'relative',
              }}
            >
              <CardContent
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection:
                    'column',
                  justifyContent:
                    'flex-end',
                  paddingTop: '20px',
                }}
              >
                <div
                  style={{
                    position:
                      'absolute',
                    top: '24px',
                    right: '24px',
                    opacity: 0.15,
                  }}
                >
                  <Building
                    size={80}
                  />
                </div>

                <p
                  style={{
                    fontSize:
                      '14px',
                    fontWeight: 600,
                    lineHeight:
                      '24px',
                  }}
                >
                  Ensuring every
                  neighbor has a
                  place to call home.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
                <style jsx>{`
          @media (max-width: 1024px) {
            .intake-layout {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 768px) {
            .intake-grid-two {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </main>
    </>
  );
}