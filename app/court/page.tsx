'use client';

import { useState } from 'react';

import Header from '../../components/Header';
import Button from '../../components/ui/Button';
import ChatBubble from '../../components/ui/ChatBubble';

import {
  Card,
  CardContent,
} from '../../components/ui/Card';

import {
  Info,
  Scale,
  Send,
  CheckSquare,
  FileText,
  AlertTriangle,
} from 'lucide-react';

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: React.ReactNode;
  timestamp: string;
}

function ChecklistItem({
  label,
  checked = false,
}: {
  label: string;
  checked?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <div
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '4px',
          border: checked
            ? '1px solid #10B981'
            : '1px solid #D9DDE5',
          background: checked
            ? '#10B981'
            : '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontSize: '10px',
          fontWeight: 700,
        }}
      >
        {checked ? '✓' : ''}
      </div>

      <span
        style={{
          fontSize: '13px',
          color: checked
            ? '#111827'
            : '#6B7280',
          fontWeight: checked
            ? 600
            : 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}


export default function CourtPrepPage() {
  const [inputValue, setInputValue] =
    useState('');

  const suggestedPrompts = [
    'What documents should I bring?',
    'What happens at my hearing?',
    'How do I address the judge?',
  ];

  const [messages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      timestamp: '10:02 AM',
      content: (
        <>
          Hello! I'm your Housing Stability
          Assistant. I've reviewed your case
          file. We should start by preparing
          your documentation.

          <br />
          <br />

          Would you like to know what
          documents you need to bring to
          court, or would you like to
          practice answering potential
          questions from the judge?
        </>
      ),
    },

    {
      id: 2,
      type: 'user',
      timestamp: '10:03 AM',
      content:
        'What documents should I bring?',
    },

    {
      id: 3,
      type: 'ai',
      timestamp: '10:03 AM',
      content: (
        <>
          <p
            style={{
              marginBottom: '12px',
            }}
          >
            Based on your case, you should
            organize three copies of the
            following:
          </p>

          <ul
            style={{
              paddingLeft: '18px',
              marginBottom: '12px',
              lineHeight: '26px',
            }}
          >
            <li>
              Your written lease agreement
            </li>

            <li>
              Receipts or bank statements
              showing rent payments
            </li>

            <li>
              Photos or videos of
              maintenance issues
            </li>

            <li>
              Copies of written landlord
              communications
            </li>
          </ul>

          Would you like me to generate a
          printable checklist?
        </>
      ),
    },
  ]);

  return (
    <>
      <Header
        title="Court Prep Assistant"
        subtitle="Practice and prepare for your hearing"
      />

      <main className="page-container">
        {/* Page Intro */}
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
            Court Preparation Simulator
          </h1>

          <p
            style={{
              color: '#6B7280',
              fontSize: '14px',
              lineHeight: '24px',
              maxWidth: '760px',
            }}
          >
            Review hearing procedures,
            organize documents, and practice
            answering common court questions.
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
          className="court-layout"
        >
          {/* CHAT COLUMN */}
          <div>
            {/* Alert Banner */}
            <Card
              style={{
                marginBottom: '20px',
              }}
            >
              <CardContent
                style={{
                  paddingTop: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems:
                      'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      minWidth: '42px',
                      borderRadius: '8px',
                      background:
                        '#E8F0FF',
                      color: '#072B84',
                      display: 'flex',
                      alignItems:
                        'center',
                      justifyContent:
                        'center',
                    }}
                  >
                    <Info size={20} />
                  </div>

                  <div>
                    <h3
                      style={{
                        fontSize:
                          '15px',
                        fontWeight:
                          700,
                        marginBottom:
                          '6px',
                      }}
                    >
                      Preparing for your
                      hearing?
                    </h3>

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
                      Your hearing is
                      currently scheduled
                      for October 12th.
                      We can review
                      documents, rehearse
                      testimony, and
                      identify evidence
                      gaps.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chat Feed */}
            <Card>
              <CardContent
                style={{
                  paddingTop: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection:
                      'column',
                    gap: '18px',
                  }}
                >
                  {messages.map(
                    (message) => (
                      <ChatBubble
                        key={
                          message.id
                        }
                        variant={
                          message.type
                        }
                        timestamp={
                          message.timestamp
                        }
                      >
                        {message.content}
                      </ChatBubble>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
                    {/* RIGHT COLUMN */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Hearing Readiness */}
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
                    gap: '10px',
                    marginBottom: '12px',
                  }}
                >
                  <Scale size={18} />

                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                    }}
                  >
                    Hearing Readiness
                  </h3>
                </div>

                <div
                  style={{
                    fontSize: '42px',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}
                >
                  82%
                </div>

                <div
                  style={{
                    fontSize: '12px',
                    opacity: 0.8,
                    marginBottom: '18px',
                  }}
                >
                  Preparation Score
                </div>

                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: '22px',
                    opacity: 0.9,
                  }}
                >
                  Your documentation is
                  mostly complete. Focus
                  on gathering payment
                  records and organizing
                  communications.
                </p>
              </CardContent>
            </Card>

            {/* Evidence Checklist */}
            <Card>
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
                    marginBottom: '18px',
                  }}
                >
                  <CheckSquare
                    size={18}
                    color="#072B84"
                  />

                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                    }}
                  >
                    Evidence Checklist
                  </h3>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection:
                      'column',
                    gap: '12px',
                  }}
                >
                  <ChecklistItem
                    checked
                    label="Lease Agreement"
                  />

                  <ChecklistItem
                    checked
                    label="Eviction Notice"
                  />

                  <ChecklistItem
                    checked
                    label="Landlord Emails"
                  />

                  <ChecklistItem
                    label="Payment Records"
                  />

                  <ChecklistItem
                    label="Repair Photos"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Suggested Questions */}
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
                  Suggested Questions
                </h3>

                <div
                  style={{
                    display: 'flex',
                    flexDirection:
                      'column',
                    gap: '10px',
                  }}
                >
                  {suggestedPrompts.map(
                    (
                      prompt,
                      index
                    ) => (
                      <button
                        key={index}
                        onClick={() =>
                          setInputValue(
                            prompt
                          )
                        }
                        style={{
                          textAlign:
                            'left',
                          border:
                            '1px solid #D9DDE5',
                          borderRadius:
                            '8px',
                          padding:
                            '12px',
                          background:
                            '#FFFFFF',
                          cursor:
                            'pointer',
                          fontSize:
                            '13px',
                          fontWeight:
                            600,
                        }}
                      >
                        {prompt}
                      </button>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Court Tools */}
            <Card>
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
                    marginBottom: '16px',
                  }}
                >
                  <FileText
                    size={18}
                    color="#072B84"
                  />

                  <h3
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                    }}
                  >
                    Preparation Tools
                  </h3>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection:
                      'column',
                    gap: '10px',
                  }}
                >
                  <Button
                    variant="secondary"
                    fullWidth
                  >
                    Generate Checklist
                  </Button>

                  <Button
                    variant="secondary"
                    fullWidth
                  >
                    Practice Testimony
                  </Button>

                  <Button
                    variant="primary"
                    fullWidth
                  >
                    Build Hearing Packet
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Warning Card */}
            <Card
              style={{
                border:
                  '1px solid #FECACA',
                background:
                  '#FEF2F2',
              }}
            >
              <CardContent
                style={{
                  paddingTop: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  <AlertTriangle
                    size={18}
                    color="#DC2626"
                  />

                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        color:
                          '#B91C1C',
                        marginBottom:
                          '6px',
                      }}
                    >
                      Upcoming Deadline
                    </div>

                    <p
                      style={{
                        fontSize:
                          '13px',
                        color:
                          '#991B1B',
                        lineHeight:
                          '22px',
                      }}
                    >
                      Court appearance
                      scheduled for
                      October 12th at
                      9:00 AM.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
                {/* Chat Input Area */}
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
                  gap: '10px',
                  marginBottom: '14px',
                  overflowX: 'auto',
                }}
              >
                {suggestedPrompts.map(
                  (prompt, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setInputValue(
                          prompt
                        )
                      }
                      style={{
                        whiteSpace:
                          'nowrap',
                        border:
                          '1px solid #D9DDE5',
                        background:
                          '#FFFFFF',
                        borderRadius:
                          '999px',
                        padding:
                          '8px 14px',
                        fontSize:
                          '12px',
                        fontWeight:
                          600,
                        cursor:
                          'pointer',
                      }}
                    >
                      {prompt}
                    </button>
                  )
                )}
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems:
                    'flex-end',
                }}
              >
                <textarea
                  rows={3}
                  value={inputValue}
                  onChange={(e) =>
                    setInputValue(
                      e.target.value
                    )
                  }
                  placeholder="Ask a court preparation question..."
                  style={{
                    flex: 1,
                    resize: 'none',
                    border:
                      '1px solid #D9DDE5',
                    borderRadius:
                      '8px',
                    padding: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    minHeight:
                      '90px',
                  }}
                />

                <Button
                  variant="primary"
                  icon={
                    <Send
                      size={16}
                    />
                  }
                >
                  Send
                </Button>
              </div>

              <p
                style={{
                  marginTop: '14px',
                  textAlign: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#9CA3AF',
                  letterSpacing:
                    '1px',
                  textTransform:
                    'uppercase',
                }}
              >
                Stability AI provides
                guidance, not legal advice.
              </p>
            </CardContent>
          </Card>
        </section>

        <style jsx>{`
          @media (max-width: 1100px) {
            .court-layout {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 768px) {
            .court-layout textarea {
              min-height: 80px;
            }
          }
        `}</style>
      </main>
    </>
  );
}