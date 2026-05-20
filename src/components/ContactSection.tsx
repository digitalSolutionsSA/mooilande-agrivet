import React from 'react';
import { Mail, MapPin, Phone, Clock, Send, Facebook, Instagram, MessageCircle } from 'lucide-react';

const LOGO_GREEN = '#3F6B2A';
const LOGO_ORANGE = '#D97A1E';

const ContactSection: React.FC = () => {
  return (
    <>
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
                  {
                    icon: <MapPin size={20} />,
                    title: 'Visit Us',
                    text: 'Plot 16, River Park AH, Mooilande, Meyerton, 1960',
                  },
                  {
                    icon: <Phone size={20} />,
                    title: 'Call Us',
                    text: 'Landline: 016 110 0861\nCell / WhatsApp: 078 933 7152',
                  },
                  {
                    icon: <Mail size={20} />,
                    title: 'Email Us',
                    text: 'info@mooilandeagrivet.co.za',
                  },
                  {
                    icon: <Clock size={20} />,
                    title: 'Business Hours',
                    text: 'Monday - Friday: 07h30 - 17h00\nSaturdays: 07h30 - 13h00\nPublic holidays: TBA',
                  },
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

              <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://www.facebook.com/profile.php?id=61565854067847" target="_blank" rel="noreferrer">
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: '#1877f2',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 600,
                      fontSize: '14px',
                      cursor: 'pointer',
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
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  <Instagram size={16} /> Instagram
                </button>

                <a href="https://whatsapp.com/channel/0029Vb8FMqtHAdNQyvwQpx1C" target="_blank" rel="noreferrer">
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      background: '#25D366',
                      color: 'white',
                      padding: '10px 20px',
                      border: 'none',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 600,
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    <MessageCircle size={16} /> WhatsApp Channel
                  </button>
                </a>
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
                    placeholder="Tell us how we can help…"
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
                    background: LOGO_ORANGE,
                    color: 'white',
                    padding: '13px',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    cursor: 'pointer',
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