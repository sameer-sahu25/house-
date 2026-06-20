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
  MapPin,
  Home,
  Scale,
  Utensils,
  Phone,
  Globe,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

type ResourceType =
  | 'rental'
  | 'shelter'
  | 'legal'
  | 'utility'
  | 'food';

interface Resource {
  id: number;
  title: string;
  category: string;
  distance: string;
  eligibility: string;
  description: string;
  status: string;
  type: ResourceType;
}

const resources: Resource[] = [
  {
    id: 1,
    title: 'Metropolitan Housing Alliance',
    category:
      'Rental Assistance & Eviction Prevention',
    distance: '1.2 miles away',
    eligibility:
      'Low Income, Single Parents',
    description:
      'Providing immediate financial aid for families facing eviction notices.',
    status: 'Now Accepting',
    type: 'rental',
  },

  {
    id: 2,
    title: 'Safe Haven Transitional Home',
    category:
      'Emergency Shelter & Rehousing',
    distance: '3.5 miles away',
    eligibility:
      'Unsheltered Individuals',
    description:
      'Overnight shelter services with integrated case management.',
    status: 'Limited Availability',
    type: 'shelter',
  },

  {
    id: 3,
    title:
      'Community Food & Resource Bank',
    category:
      'Food, Supplies & Utility Vouchers',
    distance: '4.1 miles away',
    eligibility:
      'All County Residents',
    description:
      'Distribution of pantry items and utility support.',
    status: 'Open 24/7',
    type: 'food',
  },

  {
    id: 4,
    title: 'Legal Rights Defense Foundation',
    category:
      'Housing Legal Advocacy',
    distance: '2.0 miles away',
    eligibility:
      'Eviction Defense Cases',
    description:
      'Free legal representation and housing consultations.',
    status: 'High Match',
    type: 'legal',
  },
];

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        fontSize: '14px',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChange(e.target.checked)
        }
      />

      <span>{label}</span>
    </label>
  );
}

function ResourceCard({
  resource,
}: {
  resource: Resource;
}) {
  const getIcon = () => {
    switch (resource.type) {
      case 'rental':
        return <Home size={18} />;

      case 'legal':
        return <Scale size={18} />;

      case 'food':
        return <Utensils size={18} />;

      default:
        return <Home size={18} />;
    }
  };

  return (
    <Card>
      <CardContent
        style={{
          paddingTop: '20px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent:
            'space-between',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              marginBottom: '14px',
            }}
          >
            <span
              style={{
                background: '#EFF6FF',
                color: '#2563EB',
                borderRadius: '999px',
                padding: '4px 10px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform:
                  'uppercase',
              }}
            >
              {resource.status}
            </span>

            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: '#F5F6FA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#072B84',
              }}
            >
              {getIcon()}
            </div>
          </div>

          <h3
            style={{
              fontSize: '18px',
              fontWeight: 700,
              marginBottom: '6px',
            }}
          >
            {resource.title}
          </h3>

          <p
            style={{
              fontSize: '13px',
              color: '#6B7280',
              marginBottom: '12px',
            }}
          >
            {resource.category}
          </p>

          <div
            style={{
              fontSize: '13px',
              color: '#6B7280',
              lineHeight: '22px',
              marginBottom: '12px',
            }}
          >
            📍 {resource.distance}
          </div>

          <div
            style={{
              fontSize: '13px',
              color: '#6B7280',
              lineHeight: '22px',
              marginBottom: '14px',
            }}
          >
            Eligible: {resource.eligibility}
          </div>

          <p
            style={{
              fontSize: '13px',
              lineHeight: '22px',
              color: '#6B7280',
            }}
          >
            {resource.description}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              '1fr 1fr',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          <Button
            variant="primary"
            size="sm"
            icon={<Phone size={14} />}
          >
            Call
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={<Globe size={14} />}
          >
            Website
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ResourceFinderPage() {
  const [distance, setDistance] =
    useState(10);

  const [searchTerm, setSearchTerm] =
    useState('');

  const [filters, setFilters] =
    useState({
      rental: true,
      shelter: false,
      legal: false,
      utility: false,
      food: false,
    });

  return (
    <>
      <Header
        title="Resource Finder"
        subtitle="Locate local support programs"
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
            Local Support Services
          </h1>

          <p
            style={{
              color: '#6B7280',
              maxWidth: '760px',
              lineHeight: '24px',
              fontSize: '14px',
            }}
          >
            Search housing assistance,
            legal aid, shelters, food
            support, and emergency
            services tailored to your
            current situation.
          </p>
        </section>

        {/* Layout */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns:
              '320px 1fr',
            gap: '24px',
          }}
          className="resources-layout"
        >
          {/* SIDEBAR */}
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
                  marginBottom: '20px',
                  color: '#072B84',
                }}
              >
                Search Filters
              </h3>

              {/* Location */}
              <div
                style={{
                  marginBottom: '24px',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform:
                      'uppercase',
                    color: '#6B7280',
                  }}
                >
                  Location
                </label>

                <div
                  style={{
                    position:
                      'relative',
                  }}
                >
                  <input
                    placeholder="Zip code or State"
                    defaultValue="90012"
                    style={{
                      width: '100%',
                      height: '44px',
                      border:
                        '1px solid #D9DDE5',
                      borderRadius:
                        '6px',
                      padding:
                        '0 40px 0 12px',
                    }}
                  />

                  <MapPin
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

              {/* Search */}
              <div
                style={{
                  marginBottom: '24px',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform:
                      'uppercase',
                    color: '#6B7280',
                  }}
                >
                  Search
                </label>

                <div
                  style={{
                    position:
                      'relative',
                  }}
                >
                  <Search
                    size={16}
                    style={{
                      position:
                        'absolute',
                      left: '12px',
                      top: '14px',
                      color:
                        '#9CA3AF',
                    }}
                  />

                  <input
                    value={
                      searchTerm
                    }
                    onChange={(e) =>
                      setSearchTerm(
                        e.target.value
                      )
                    }
                    placeholder="Search resources..."
                    style={{
                      width: '100%',
                      height: '44px',
                      border:
                        '1px solid #D9DDE5',
                      borderRadius:
                        '6px',
                      padding:
                        '0 12px 0 38px',
                    }}
                  />
                </div>
              </div>

              {/* Resource Types */}
              <div
                style={{
                  marginBottom: '24px',
                }}
              >
                <label
                  style={{
                    display: 'block',
                    marginBottom: '12px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform:
                      'uppercase',
                    color: '#6B7280',
                  }}
                >
                  Resource Type
                </label>
                              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <FilterCheckbox
                  label="Rental Assistance"
                  checked={filters.rental}
                  onChange={(value) =>
                    setFilters({
                      ...filters,
                      rental: value,
                    })
                  }
                />

                <FilterCheckbox
                  label="Emergency Shelter"
                  checked={filters.shelter}
                  onChange={(value) =>
                    setFilters({
                      ...filters,
                      shelter: value,
                    })
                  }
                />

                <FilterCheckbox
                  label="Legal Aid"
                  checked={filters.legal}
                  onChange={(value) =>
                    setFilters({
                      ...filters,
                      legal: value,
                    })
                  }
                />

                <FilterCheckbox
                  label="Utility Assistance"
                  checked={filters.utility}
                  onChange={(value) =>
                    setFilters({
                      ...filters,
                      utility: value,
                    })
                  }
                />

                <FilterCheckbox
                  label="Food Assistance"
                  checked={filters.food}
                  onChange={(value) =>
                    setFilters({
                      ...filters,
                      food: value,
                    })
                  }
                />
              </div>
            </div>

            {/* Distance */}
            <div
              style={{
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  marginBottom: '10px',
                }}
              >
                <label
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform:
                      'uppercase',
                    color: '#6B7280',
                  }}
                >
                  Distance
                </label>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#072B84',
                  }}
                >
                  {distance} mi
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="50"
                value={distance}
                onChange={(e) =>
                  setDistance(
                    Number(
                      e.target.value
                    )
                  )
                }
                style={{
                  width: '100%',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection:
                  'column',
                gap: '10px',
                marginTop: '20px',
              }}
            >
              <Button
                variant="primary"
                fullWidth
              >
                Apply Filters
              </Button>

              <Button
                variant="secondary"
                fullWidth
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* RESULTS PANEL */}
        <div>
          {/* Results Header */}
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
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize:
                        '18px',
                      fontWeight:
                        700,
                      color:
                        '#072B84',
                    }}
                  >
                    Resource Results
                  </h2>

                  <p
                    style={{
                      fontSize:
                        '13px',
                      color:
                        '#6B7280',
                      marginTop:
                        '4px',
                    }}
                  >
                    Showing 128 matching
                    resources
                  </p>
                </div>

                <div
                  style={{
                    position:
                      'relative',
                  }}
                >
                  <select
                    style={{
                      height:
                        '40px',
                      border:
                        '1px solid #D9DDE5',
                      borderRadius:
                        '6px',
                      padding:
                        '0 36px 0 12px',
                      appearance:
                        'none',
                    }}
                  >
                    <option>
                      Distance
                    </option>

                    <option>
                      Availability
                    </option>
                  </select>

                  <ChevronDown
                    size={16}
                    style={{
                      position:
                        'absolute',
                      right: '10px',
                      top: '12px',
                      color:
                        '#6B7280',
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit,minmax(320px,1fr))',
              gap: '20px',
              marginBottom: '24px',
            }}
          >
            {resources.map(
              (resource) => (
                <ResourceCard
                  key={
                    resource.id
                  }
                  resource={
                    resource
                  }
                />
              )
            )}
          </div>

          {/* AI Recommendation */}
          <Card
            variant="accent"
            style={{
              marginBottom:
                '24px',
            }}
          >
            <CardContent
              style={{
                paddingTop:
                  '24px',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    '2fr 1fr',
                  gap: '24px',
                }}
                className="resource-ai-grid"
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems:
                        'center',
                      gap: '8px',
                      marginBottom:
                        '10px',
                    }}
                  >
                    <Sparkles
                      size={16}
                    />

                    <span
                      style={{
                        fontSize:
                          '11px',
                        fontWeight:
                          700,
                        textTransform:
                          'uppercase',
                      }}
                    >
                      AI Recommended
                    </span>
                  </div>

                  <h2
                    style={{
                      fontSize:
                        '24px',
                      fontWeight:
                        700,
                      marginBottom:
                        '10px',
                      color: '#FFFFFF',
                    }}
                  >
                    Legal Rights
                    Defense Foundation
                  </h2>

                  <p
                    style={{
                      fontSize:
                        '13px',
                      lineHeight:
                        '24px',
                      opacity: 0.9,
                    }}
                  >
                    Based on your
                    intake results, you
                    may qualify for
                    free legal
                    representation and
                    emergency housing
                    advocacy.
                  </p>
                </div>

                <div
                  style={{
                    borderLeft:
                      '1px solid rgba(255,255,255,.15)',
                    paddingLeft:
                      '24px',
                  }}
                >
                  <div
                    style={{
                      fontSize:
                        '36px',
                      fontWeight:
                        700,
                    }}
                  >
                    98%
                  </div>

                  <div
                    style={{
                      fontSize:
                        '11px',
                      textTransform:
                        'uppercase',
                      opacity: 0.75,
                    }}
                  >
                    Match Strength
                  </div>

                  <Button
                    variant="secondary"
                    fullWidth
                    style={{
                      marginTop:
                        '16px',
                    }}
                  >
                    Get Connected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
                    {/* Pagination */}
          <Card>
            <CardContent
              style={{
                paddingTop: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  variant="secondary"
                  size="sm"
                >
                  Previous
                </Button>

                <button
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    border: '1px solid #072B84',
                    background: '#072B84',
                    color: '#FFFFFF',
                    fontWeight: 700,
                  }}
                >
                  1
                </button>

                <button
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    border: '1px solid #D9DDE5',
                    background: '#FFFFFF',
                  }}
                >
                  2
                </button>

                <button
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    border: '1px solid #D9DDE5',
                    background: '#FFFFFF',
                  }}
                >
                  3
                </button>

                <span
                  style={{
                    padding: '0 6px',
                    color: '#6B7280',
                  }}
                >
                  ...
                </span>

                <button
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '6px',
                    border: '1px solid #D9DDE5',
                    background: '#FFFFFF',
                  }}
                >
                  12
                </button>

                <Button
                  variant="secondary"
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 1100px) {
          .resources-layout {
            grid-template-columns: 1fr !important;
          }

          .resource-ai-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  </>
);
}