import React from 'react';
import { Truck, ShieldCheck, Phone, Award, Leaf, Users } from 'lucide-react';
import { testimonials } from '../data/products';

const FeaturesSection: React.FC = () => {
  const LOGO_ORANGE = '#D97A1E';

  const features = [
    {
      icon: <Truck size={28} />,
      title: 'Same-Day Dispatch',
      description: 'Orders before 2pm ship same day. Nationwide coverage via reliable courier partners.',
    },
    {
      icon: <ShieldCheck size={28} />,
      title: 'Vet-Approved Stock',
      description: 'Every product is sourced from certified suppliers and approved by registered veterinarians.',
    },
    {
      icon: <Phone size={28} />,
      title: 'Expert Agri-Advice',
      description: 'Our team includes qualified agronomists and vets — real advice for real farming challenges.',
    },
    {
      icon: <Award size={28} />,
      title: 'Quality Guarantee',
      description: '30-day no-hassle return policy on all unopened stock. Your satisfaction is our priority.',
    },
  ];

  return (
    <>
      {/* Features strip */}
      <section
        style={{
          background: 'var(--clr-moss)',
          padding: '64px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(168,200,69,0.15) 0%, transparent 60%),
                            radial-gradient(circle at 80% 50%, rgba(168,200,69,0.08) 0%, transparent 60%)`,
          }}
        />

        <div className="container" style={{ position: 'relative' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 40,
            }}
          >
            {features.map(f => (
              <div key={f.title} style={{ textAlign: 'center', padding: '0 16px' }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'rgba(168,200,69,0.15)',
                    border: '1px solid rgba(168,200,69,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: 'var(--clr-lime)',
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--ff-display)',
                    color: 'var(--clr-white)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: 1.6 }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" style={{ padding: 'var(--space-2xl) 0', background: 'var(--clr-cream)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 80,
              alignItems: 'center',
            }}
            className="about-grid"
          >
            {/* Image collage */}
            <div style={{ position: 'relative', paddingBottom: '10%' }}>
              <div
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
                  alt="Farm field"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating secondary image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: -24,
                  width: '45%',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '4px solid var(--clr-cream)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80"
                  alt="Vet care"
                  style={{ width: '100%', objectFit: 'cover', aspectRatio: '4/3' }}
                />
              </div>

              {/* Stat card */}
              <div
                style={{
                  position: 'absolute',
                  top: 32,
                  left: -24,
                  background: 'var(--clr-white)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 20px',
                  boxShadow: 'var(--shadow-md)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--ff-display)',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--clr-moss)',
                  }}
                >
                  15+
                </div>
                <div style={{ fontSize: '12px', color: 'var(--clr-text-muted)', fontWeight: 500 }}>
                  Years of Service
                </div>
              </div>
            </div>

            {/* Text content */}
            <div>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--clr-leaf)',
                  display: 'block',
                  marginBottom: 12,
                }}
              >
                Who We Are
              </span>
              <h2
                style={{
                  fontFamily: 'var(--ff-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                  fontWeight: 700,
                  color: 'var(--clr-text)',
                  marginBottom: 20,
                  lineHeight: 1.2,
                }}
              >
                Rooted in the land,
                <br />
                <em style={{ fontStyle: 'italic', color: 'var(--clr-moss)' }}>
                  driven by your success.
                </em>
              </h2>

              <div
                style={{
                  width: 60,
                  height: 3,
                  background: 'linear-gradient(90deg, var(--clr-lime), transparent)',
                  marginBottom: 24,
                  borderRadius: 2,
                }}
              />

              <p
                style={{
                  color: 'var(--clr-text-muted)',
                  lineHeight: 1.8,
                  marginBottom: 20,
                  fontSize: '1.02rem',
                }}
              >
                Mooilande AgriVet was born from a deep love for the South African landscape and the hardworking farmers who tend it. Based in Gauteng, we serve producers across all nine provinces with an ever-growing range of animal health, crop care, and farm equipment products.
              </p>
              <p
                style={{
                  color: 'var(--clr-text-muted)',
                  lineHeight: 1.8,
                  marginBottom: 32,
                  fontSize: '1.02rem',
                }}
              >
                Our team combines veterinary expertise with practical agricultural know-how — because we believe great products should always come with great advice.
              </p>

              <div style={{ display: 'flex', gap: 32 }}>
                {[
                  { icon: <Leaf size={18} />, label: 'Eco-conscious sourcing' },
                  { icon: <Users size={18} />, label: '12,000+ happy farmers' },
                ].map(b => (
                  <div
                    key={b.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: 'var(--clr-text-muted)',
                      fontSize: '14px',
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ color: 'var(--clr-moss)' }}>{b.icon}</span>
                    {b.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        style={{
          background: LOGO_ORANGE,
          padding: 'var(--space-2xl) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.035'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.16) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.78)',
                display: 'block',
                marginBottom: 12,
              }}
            >
              Farmer Reviews
            </span>
            <h2
              style={{
                fontFamily: 'var(--ff-display)',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--clr-white)',
              }}
            >
              What our farmers say
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.14)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.10)',
                }}
              >
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(t.rating)].map((_, j) => (
                    <span key={j} style={{ color: '#FFE2B8', fontSize: '14px' }}>
                      ★
                    </span>
                  ))}
                </div>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                    marginBottom: 24,
                    fontSize: '15px',
                  }}
                >
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(255,255,255,0.85)',
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--clr-white)', fontSize: '14px' }}>
                      {t.name}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.82)', fontSize: '12px' }}>
                      {t.farm}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default FeaturesSection;