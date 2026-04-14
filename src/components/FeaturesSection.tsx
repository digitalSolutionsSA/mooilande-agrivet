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
        minHeight: '65vh', // 👈 makes section taller
        display: 'flex',   // 👈 enables vertical centering
        alignItems: 'center',
        backgroundImage: "url('/overhead.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 60%', // 👈 shows more of building
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
              rgba(250,246,237,0.88) 0%,
              rgba(250,246,237,0.82) 30%,
              rgba(250,246,237,0.68) 55%,
              rgba(250,246,237,0.48) 78%,
              rgba(250,246,237,0.28) 100%
            )
          `,
        }}
      />

      <div className="container" style={{ position: 'relative', width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 40,
            alignItems: 'center',
            maxWidth: 700,
          }}
        >
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