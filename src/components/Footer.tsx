import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const LOGO_GREEN = '#3F6B2A';
  const LOGO_ORANGE = '#D97A1E';

  const links = {
    Shop: ['Animal Health', 'Crop & Plant', 'Equipment', 'Feed & Nutrition', 'Special Offers'],
    Company: ['About Us', 'Our Team', 'Careers', 'Blog', 'Contact'],
    Support: ['FAQ', 'Delivery Info', 'Returns Policy', 'Track Order', 'Wholesale Enquiries'],
  };

  return (
    <footer
      style={{
        background: LOGO_GREEN,
        color: 'rgba(255,255,255,0.85)',
        paddingTop: '64px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05) 0%, transparent 40%), radial-gradient(circle at 80% 40%, rgba(255,255,255,0.04) 0%, transparent 40%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
            gap: 48,
            paddingBottom: 48,
            borderBottom: '1px solid rgba(255,255,255,0.15)',
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'white',
                  border: `2px solid ${LOGO_ORANGE}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                }}
              >
                <img
                  src="/logo.jpeg"
                  alt="Mooilande AgriVet"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: 'var(--clr-white)',
                    lineHeight: 1.1,
                  }}
                >
                  Mooilande
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: LOGO_ORANGE,
                  }}
                >
                  AgriVet
                </div>
              </div>
            </div>

            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.8,
                maxWidth: 280,
                marginBottom: 24,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              Rooted in South African soil. Supplying premium agricultural and veterinary
              products to farms across all nine provinces.
            </p>

            <div style={{ display: 'flex', gap: 8 }}>
              {['🇿🇦', '🌱', '🐄'].map((emoji, i) => (
                <span key={i} style={{ fontSize: '20px' }}>
                  {emoji}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4
                style={{
                  fontFamily: 'var(--ff-display)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: LOGO_ORANGE,
                  letterSpacing: '0.05em',
                  marginBottom: 20,
                  textTransform: 'uppercase',
                }}
              >
                {heading}
              </h4>

              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  padding: 0,
                  margin: 0,
                }}
              >
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.75)',
                        transition: 'color 0.2s',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = LOGO_ORANGE)}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            padding: '20px 0',
            fontSize: '13px',
          }}
        >
          <span style={{ color: 'rgba(255,255,255,0.75)' }}>
            © {year} Mooilande AgriVet (Pty) Ltd. All rights reserved.
          </span>

          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map(link => (
              <a
                key={link}
                href="#"
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = LOGO_ORANGE)}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 550px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;