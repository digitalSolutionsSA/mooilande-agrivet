import React from 'react';
import { Leaf, Users } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section
      id="about"
      style={{
        padding: 'var(--space-2xl) 0',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: "url('/overhead.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 68%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(
              to right,
              rgba(250,246,237,0.96) 0%,
              rgba(250,246,237,0.93) 30%,
              rgba(250,246,237,0.82) 55%,
              rgba(250,246,237,0.58) 78%,
              rgba(250,246,237,0.38) 100%
            )
          `,
        }}
      />

      <div className="container" style={{ position: 'relative' }}>
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
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--clr-text-muted)',
                  fontWeight: 500,
                }}
              >
                Years of Service
              </div>
            </div>
          </div>

          {/* Text */}
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
              Mooilande AgriVet was born from a deep love for the South African
              landscape and the hardworking farmers who tend it.
            </p>

            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
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
  );
};

export default FeaturesSection;
export { FeaturesSection };