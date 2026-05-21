import React from 'react';
import { Truck, MapPin, Package, Clock } from 'lucide-react';

const LOGO_GREEN = '#3F6B2A';
const LOGO_LIGHT_GREEN = '#8FBF3A';

const DeliveriesSection: React.FC = () => {
  return (
    <section id="deliveries">
      <div
        style={{
          background: `linear-gradient(135deg, ${LOGO_GREEN} 0%, #2a4a1c 100%)`,
          padding: '80px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute', right: -80, top: -80,
            width: 340, height: 340,
            borderRadius: '50%',
            border: '1px solid rgba(143,191,58,0.18)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute', right: -30, top: -30,
            width: 220, height: 220,
            borderRadius: '50%',
            border: '1px solid rgba(143,191,58,0.1)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute', left: -60, bottom: -60,
            width: 260, height: 260,
            borderRadius: '50%',
            background: 'rgba(143,191,58,0.06)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(143,191,58,0.15)',
                border: '1px solid rgba(143,191,58,0.4)',
                borderRadius: '999px',
                padding: '6px 16px',
                marginBottom: 20,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: LOGO_LIGHT_GREEN }} />
              <span
                style={{
                  color: LOGO_LIGHT_GREEN,
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Hassle-Free Delivery
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.15,
                marginBottom: 16,
              }}
            >
              Nationwide Courier &amp;<br />Delivery Services
            </h2>

            <div
              style={{
                width: 80, height: 3,
                background: `linear-gradient(90deg, transparent, ${LOGO_LIGHT_GREEN}, transparent)`,
                margin: '0 auto 20px',
              }}
            />

            <p
              style={{
                color: 'rgba(255,255,255,0.78)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                maxWidth: 600,
                margin: '0 auto',
              }}
            >
              Delivery rates are based on distance from Mooilande AgriVet. Contact us to arrange your delivery today.
            </p>
          </div>

          {/* Feature cards — each links to #contact */}
          <div className="delivery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              {
                icon: <MapPin size={26} />,
                title: 'Nationwide Delivery',
                text: 'We deliver to every province across South Africa. Delivery charge is based on distance from Mooilande AgriVet.',
              },
              {
                icon: <Package size={26} />,
                title: 'Secure Packaging',
                text: 'Orders packed carefully to arrive in perfect condition.',
              },
              {
                icon: <Truck size={26} />,
                title: 'Hassle-Free Process',
                text: 'Simply contact us and we handle everything from there.',
              },
              {
                icon: <Clock size={26} />,
                title: 'Quick Turnaround',
                text: 'Fast dispatch so your farm never runs short.',
              },
            ].map(card => (
              <a
                key={card.title}
                href="#contact"
                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <div
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '16px',
                    padding: '28px 24px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
                    height: '100%',
                    boxSizing: 'border-box',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.13)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(143,191,58,0.45)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.07)';
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.12)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      width: 54, height: 54,
                      background: 'rgba(143,191,58,0.15)',
                      border: '1px solid rgba(143,191,58,0.35)',
                      borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 16px',
                      color: LOGO_LIGHT_GREEN,
                    }}
                  >
                    {card.icon}
                  </div>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: '15px', marginBottom: 8 }}>
                    {card.title}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.6 }}>
                    {card.text}
                  </div>
                </div>
              </a>
            ))}
          </div>
          {/* Large-item notice */}
          <div
            style={{
              marginTop: 32,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(143,191,58,0.3)',
              borderRadius: '12px',
              padding: '18px 28px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              <span style={{ color: LOGO_LIGHT_GREEN, fontWeight: 700 }}>Shipping &amp; courier services</span> on feed loads and other applicable large items are available at the discretion of Mooilande AgriVet.{' '}
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>Additional charges may apply.</span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .delivery-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .delivery-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default DeliveriesSection;
