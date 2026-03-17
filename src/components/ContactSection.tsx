import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock, Send, Facebook, Instagram } from 'lucide-react';

const LOGO_GREEN = '#3F6B2A';
const LOGO_ORANGE = '#D97A1E';

const ContactSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <>
      {/* Newsletter banner */}
      <section
        style={{
          background: LOGO_GREEN,
          padding: '72px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -100,
            top: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: LOGO_ORANGE,
              display: 'block',
              marginBottom: 12,
            }}
          >
            Stay in the know
          </span>

          <h2
            style={{
              fontFamily: 'var(--ff-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: 'white',
              marginBottom: 12,
            }}
          >
            Farm smarter, not harder
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.85)',
              marginBottom: 32,
              maxWidth: 480,
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}
          >
            Subscribe to receive seasonal tips, product deals, and farming insights straight to your inbox.
          </p>

          {subscribed ? (
            <div
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: `1px solid ${LOGO_ORANGE}`,
                borderRadius: 'var(--radius-full)',
                padding: '14px 32px',
                color: LOGO_ORANGE,
                fontWeight: 600,
                display: 'inline-block',
              }}
            >
              ✓ You're subscribed! Welcome to the Mooilande family.
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 0,
                maxWidth: 480,
                margin: '0 auto',
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  border: 'none',
                  borderRadius: 'var(--radius-full) 0 0 var(--radius-full)',
                  fontSize: '14px',
                  outline: 'none',
                  fontFamily: 'var(--ff-body)',
                  background: 'rgba(255,255,255,0.18)',
                  color: 'white',
                  backdropFilter: 'blur(8px)',
                }}
              />

              <button
                onClick={handleSubscribe}
                style={{
                  background: LOGO_ORANGE,
                  color: 'white',
                  border: 'none',
                  padding: '14px 24px',
                  borderRadius: '0 var(--radius-full) var(--radius-full) 0',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                Subscribe <Send size={14} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" style={{ padding: 'var(--space-2xl) 0', background: 'var(--clr-cream)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: LOGO_ORANGE,
                display: 'block',
                marginBottom: 12,
              }}
            >
              Get in Touch
            </span>

            <h2
              style={{
                fontFamily: 'var(--ff-display)',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--clr-text)',
              }}
            >
              We're here to help
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 48,
              alignItems: 'start',
            }}
            className="contact-grid"
          >
            {/* Contact info */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {[
                  { icon: <MapPin size={20} />, title: 'Visit Us', text: 'Gauteng, South Africa\n(Exact address on request)' },
                  { icon: <Phone size={20} />, title: 'Call Us', text: '+27 (0) 12 000 0000\nMon – Fri: 7:30am – 5:00pm' },
                  { icon: <Mail size={20} />, title: 'Email Us', text: 'info@mooilandeagrivet.co.za' },
                  { icon: <Clock size={20} />, title: 'Trading Hours', text: 'Mon – Fri: 07:30 – 17:00\nSat: 08:00 – 13:00\nSun: Closed' },
                ].map((item) => (
                  <div key={item.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        flexShrink: 0,
                        background: 'rgba(0,0,0,0.05)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: LOGO_GREEN,
                      }}
                    >
                      {item.icon}
                    </div>

                    <div>
                      <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--clr-text)', marginBottom: 4 }}>
                        {item.title}
                      </div>
                      <div style={{ color: 'var(--clr-text-muted)', fontSize: '14px', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
                <a href="https://www.facebook.com/profile.php?id=61565854067847" target="_blank" rel="noreferrer">
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: '#1877f2',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 600,
                      fontSize: '14px',
                    }}
                  >
                    <Facebook size={16} /> Facebook
                  </button>
                </a>

                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#e1306c',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                >
                  <Instagram size={16} /> Instagram
                </button>
              </div>
            </div>

            {/* Contact form */}
            <div
              style={{
                background: 'var(--clr-white)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--ff-display)',
                  fontSize: '1.4rem',
                  marginBottom: 24,
                  color: 'var(--clr-text)',
                }}
              >
                Send us a message
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Full Name', type: 'text', placeholder: 'Jan van der Berg' },
                  { label: 'Email Address', type: 'email', placeholder: 'jan@myfarm.co.za' },
                  { label: 'Phone Number', type: 'tel', placeholder: '+27 82 000 0000' },
                ].map((field) => (
                  <div key={field.label}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--clr-text)',
                        marginBottom: 6,
                      }}
                    >
                      {field.label}
                    </label>

                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      style={{
                        width: '100%',
                        padding: '11px 16px',
                        border: '1.5px solid var(--clr-grey-light)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '14px',
                        outline: 'none',
                        fontFamily: 'var(--ff-body)',
                        color: 'var(--clr-text)',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = LOGO_ORANGE)}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--clr-grey-light)')}
                    />
                  </div>
                ))}

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--clr-text)',
                      marginBottom: 6,
                    }}
                  >
                    Message
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Tell us about your farm and how we can help…"
                    style={{
                      width: '100%',
                      padding: '11px 16px',
                      border: '1.5px solid var(--clr-grey-light)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '14px',
                      outline: 'none',
                      fontFamily: 'var(--ff-body)',
                      color: 'var(--clr-text)',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = LOGO_ORANGE)}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--clr-grey-light)')}
                  />

                </div>

                <button
                  style={{
                    background: LOGO_GREEN,
                    color: 'white',
                    padding: '13px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                  }}
                >
                  Send Message <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default ContactSection;