import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Phone } from 'lucide-react';
import { CartItem } from '../data/products';

interface NavbarProps {
  cartItems: CartItem[];
  onCartOpen: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onCartOpen,
  searchQuery,
  onSearchChange,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Animal Health', href: '#animal-health' },
    { label: 'Crop & Plant', href: '#crop' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Announcement bar */}
      <div
        style={{
          background: 'var(--clr-moss)',
          color: 'var(--clr-cream)',
          textAlign: 'center',
          padding: '8px 16px',
          fontSize: '13px',
          letterSpacing: '0.05em',
          fontWeight: 500,
        }}
      >
        🚜 Free delivery on orders over R1,200 — Serving all of South Africa
        <span style={{ margin: '0 16px', opacity: 0.4 }}>|</span>
        <span>
          <Phone size={12} style={{ display: 'inline', marginRight: 4 }} />
          +27 (0) 12 000 0000
        </span>
      </div>

      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(250,246,237,0.97)' : 'var(--clr-cream)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: `1px solid ${
            scrolled ? 'rgba(168,200,69,0.3)' : 'transparent'
          }`,
          transition: 'all 0.4s ease',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 32px',
            gap: 16,
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexShrink: 0,
              textDecoration: 'none',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--clr-lime)',
                background: 'var(--clr-white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
            >
              <img
                src="/logo.jpeg"
                alt="Mooilande AgriVet"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: 'var(--clr-moss)',
                  lineHeight: 1.1,
                }}
              >
                Mooilande
              </div>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  color: 'var(--clr-text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                AgriVet
              </div>
            </div>
          </a>

          {/* Desktop nav links */}
          <div
            style={{ display: 'flex', gap: 32, alignItems: 'center' }}
            className="desktop-nav"
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

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Search */}
            {searchOpen ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={e => onSearchChange(e.target.value)}
                  style={{
                    border: '1.5px solid var(--clr-lime)',
                    borderRadius: 'var(--radius-full)',
                    padding: '6px 14px',
                    fontSize: '14px',
                    background: 'var(--clr-white)',
                    outline: 'none',
                    width: 200,
                    fontFamily: 'var(--ff-body)',
                  }}
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    onSearchChange('');
                  }}
                  style={{
                    color: 'var(--clr-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                style={{
                  color: 'var(--clr-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.2s',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.color = 'var(--clr-moss)')
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.color = 'var(--clr-text-muted)')
                }
              >
                <Search size={20} />
              </button>
            )}

            {/* Cart */}
            <button
              onClick={onCartOpen}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                background: 'var(--clr-moss)',
                color: 'var(--clr-white)',
                borderRadius: 'var(--radius-full)',
                transition: 'background 0.2s, transform 0.15s',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'var(--clr-fern)';
                (e.currentTarget as HTMLButtonElement).style.transform =
                  'scale(1.05)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  'var(--clr-moss)';
                (e.currentTarget as HTMLButtonElement).style.transform =
                  'scale(1)';
              }}
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    background: 'var(--clr-rust)',
                    color: 'white',
                    borderRadius: '50%',
                    width: 18,
                    height: 18,
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fadeIn 0.3s ease',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
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

        {/* Mobile drawer */}
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
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;