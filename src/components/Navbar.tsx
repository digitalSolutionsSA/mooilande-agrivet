import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { CartItem } from '../data/products';

interface NavbarProps {
  cartItems: CartItem[];
  onCartOpen: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const Navbar: React.FC<NavbarProps> = (_props) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Departments', href: '#departments' },
    { label: 'Deliveries', href: '#deliveries' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <div
        style={{
          background: 'var(--clr-moss)',
          color: 'var(--clr-cream)',
          textAlign: 'center',
          padding: '8px 16px',
          fontSize: '13px',
          letterSpacing: '0.05em',
          fontWeight: 500,
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        We offer Delivery & Courier Services Nationwide. For any inquiries feel
        free to contact us!
      </div>

      <nav
        style={{
          position: 'sticky',
          top: 37,
          zIndex: 1002,
          background: scrolled ? 'rgba(250,246,237,0.97)' : 'var(--clr-cream)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: `1px solid ${
            scrolled ? 'rgba(168,200,69,0.3)' : 'transparent'
          }`,
          transition: 'all 0.4s ease',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          overflow: 'visible',
        }}
      >
        <div
          className="container navbar-inner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 32px',
            gap: 16,
            position: 'relative',
            minHeight: 72,
            overflow: 'visible',
          }}
        >
          <a
            href="#hero"
            className="navbar-logo"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              position: 'relative',
              flexShrink: 0,
              minWidth: 380,
              height: 72,
              overflow: 'visible',
            }}
          >
            <img
              src="/animals-logo.png"
              alt="Mooilande Logo"
              className="animals-logo"
              style={{
                position: 'absolute',
                left: -370,
                top: -164,
                width: 300,
                height: 500,
                objectFit: 'contain',
                display: 'block',
                zIndex: 2003,
                pointerEvents: 'none',
              }}
            />

            <img
              src="/name-logo.png"
              alt="Mooilande AgriVet"
              className="name-logo"
              style={{
                height: 128,
                objectFit: 'contain',
                display: 'block',
                marginLeft: -92,
                marginTop: 4,
                position: 'relative',
                zIndex: 3,
              }}
            />
          </a>

          <div
            className="desktop-nav"
            style={{
              display: 'flex',
              gap: 32,
              alignItems: 'center',
              marginLeft: 'auto',
            }}
          >
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--clr-text-muted)',
                  transition: 'color 0.2s',
                  position: 'relative',
                  textDecoration: 'none',
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.color = 'var(--clr-moss)')
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.color = 'var(--clr-text-muted)')
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className="navbar-contact-actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginLeft: 24,
              flexShrink: 0,
            }}
          >
            <a
              href="tel:0161100861"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--clr-moss)',
                textDecoration: 'none',
                padding: '10px 14px',
                border: '1.5px solid rgba(46, 90, 23, 0.18)',
                borderRadius: '999px',
                background: 'rgba(168, 200, 69, 0.08)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(168, 200, 69, 0.16)';
                e.currentTarget.style.borderColor = 'rgba(46, 90, 23, 0.32)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(168, 200, 69, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(46, 90, 23, 0.18)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Phone size={15} />
              <span>016 110 0861</span>
            </a>

            <a
              href="https://wa.me/27789337152"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: '14px',
                fontWeight: 700,
                color: 'white',
                textDecoration: 'none',
                padding: '10px 16px',
                borderRadius: '999px',
                background: 'var(--clr-moss)',
                border: '1.5px solid var(--clr-moss)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                boxShadow: '0 8px 18px rgba(46, 90, 23, 0.18)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                e.currentTarget.style.boxShadow =
                  '0 12px 24px rgba(46, 90, 23, 0.24)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow =
                  '0 8px 18px rgba(46, 90, 23, 0.18)';
              }}
            >
              <span>WhatsApp Us</span>
            </a>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                color: 'var(--clr-text)',
                display: 'flex',
                alignItems: 'center',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            style={{
              background: 'var(--clr-cream)',
              borderTop: '1px solid var(--clr-grey-light)',
              padding: '16px 24px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'var(--clr-text)',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--clr-grey-light)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            ))}

            <a
              href="tel:0161100861"
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: 'var(--clr-moss)',
                textDecoration: 'none',
                padding: '12px 0 4px',
              }}
            >
              Call: 016 110 0861
            </a>

            <a
              href="https://wa.me/27789337152"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--clr-moss)',
                textDecoration: 'none',
                padding: '4px 0 0',
              }}
            >
              WhatsApp: 078 933 7152
            </a>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 1280px) {
          .desktop-nav {
            gap: 22px !important;
          }

          .navbar-contact-actions a {
            font-size: 13px !important;
            padding: 9px 12px !important;
          }
        }

        @media (max-width: 1100px) {
          .navbar-logo {
            min-width: 320px !important;
          }

          .animals-logo {
            left: -78px !important;
            top: -48px !important;
            width: 108px !important;
            height: 108px !important;
          }

          .name-logo {
            height: 34px !important;
            margin-left: 18px !important;
          }

          .desktop-nav {
            gap: 18px !important;
          }

          .navbar-contact-actions {
            gap: 8px !important;
          }

          .navbar-contact-actions a:first-child {
            padding: 9px 10px !important;
          }

          .navbar-contact-actions a:last-of-type {
            padding: 9px 12px !important;
          }
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }

          .navbar-contact-actions a {
            display: none !important;
          }

          .navbar-inner {
            min-height: 74px !important;
            padding: 12px 20px !important;
          }

          .navbar-logo {
            min-width: auto !important;
            height: 64px !important;
          }

          .animals-logo {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            width: 104px !important;
            height: 104px !important;
            pointerEvents: auto !important;
          }

          .name-logo {
            height: 44px !important;
            margin-left: 16px !important;
            margin-top: 0 !important;
          }
        }

        @media (max-width: 600px) {
          .animals-logo {
            width: 92px !important;
            height: 92px !important;
          }

          .name-logo {
            height: 40px !important;
            margin-left: 14px !important;
          }
        }

        @media (min-width: 901px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;