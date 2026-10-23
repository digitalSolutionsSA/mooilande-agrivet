import React, { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, MessageCircle, Phone, Search, ShoppingCart } from 'lucide-react';
import { gsap, ScrollTrigger, getLenis } from '../lib/motion';
import { CONTACT, DEPARTMENTS, departmentHref, deptImage } from '../data/site';
import { usePath } from '../lib/router';
import { cart, cartCount, useCart } from '../lib/cart';

// Search pulls in the database client, so it loads only when first opened
const SearchPanel = lazy(() => import('./Search'));

// Departments has its own dropdown; these are the plain links after it
const LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Team', href: '/#team' },
  { label: 'Deliveries', href: '/#deliveries' },
  { label: 'Contact', href: '/#contact' },
];

interface Props {
  ready: boolean;
}

const Navbar: React.FC<Props> = ({ ready }) => {
  const root = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [deptsOpen, setDeptsOpen] = useState(false); // desktop dropdown
  const [mobileDepts, setMobileDepts] = useState(false); // expanded list in the mobile menu
  const closeTimer = useRef<number>();
  const tl = useRef<gsap.core.Timeline>();
  const path = usePath();
  const count = cartCount(useCart().items);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoaded, setSearchLoaded] = useState(false); // load the search code on first use

  const openSearch = useCallback(() => {
    setOpen(false);
    setDeptsOpen(false);
    setSearchLoaded(true);
    setSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // "/" or Ctrl/⌘+K opens search from anywhere, unless the visitor is typing in a field
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement).closest?.('input, textarea, select, [contenteditable]');
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openSearch]);

  // Close everything whenever the page changes
  useEffect(() => {
    setDeptsOpen(false);
    setOpen(false);
  }, [path]);

  // Escape closes the dropdown
  useEffect(() => {
    if (!deptsOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDeptsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [deptsOpen]);

  // Hover opens straight away; a short delay before closing lets the pointer cross the gap
  const hoverOpen = () => {
    window.clearTimeout(closeTimer.current);
    setDeptsOpen(true);
  };
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setDeptsOpen(false), 160);
  };

  // Entrance, condensed state, hide on scroll down / show on scroll up (desktop only)
  useLayoutEffect(() => {
    if (!ready) return;
    const el = root.current!;
    const ctx = gsap.context(() => {
      // Entrance animates the inner bar, hide/show animates the header, so they never fight
      gsap.from('.nav__inner', { yPercent: -160, duration: 1.2, ease: 'expo.out', delay: 0.6 });

      let hidden = false;
      const setHidden = (h: boolean) => {
        if (h === hidden) return;
        hidden = h;
        gsap.to(el, { yPercent: h ? -130 : 0, duration: 0.45, ease: 'power3.inOut', overwrite: true });
      };

      // Phones and tablets keep the bar on screen the whole time (search, cart and menu stay in reach)
      const phone = window.matchMedia('(max-width: 960px)');

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: self => {
          const y = self.scroll();
          el.classList.toggle('is-solid', y > 80);
          setHidden(!phone.matches && self.direction === 1 && y > 600);
        },
        onLeaveBack: () => {
          el.classList.remove('is-solid');
          setHidden(false);
        },
      });
    }, el);
    return () => ctx.revert();
  }, [ready]);

  // Fullscreen mobile menu
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true })
        .set(menu.current, { visibility: 'visible' })
        .fromTo(menu.current, { clipPath: 'circle(0% at calc(100% - 40px) 40px)' }, { clipPath: 'circle(150% at calc(100% - 40px) 40px)', duration: 0.9, ease: 'expo.inOut' })
        .from('.menu__link', { yPercent: 120, duration: 0.8, ease: 'expo.out', stagger: 0.06 }, '-=0.4')
        .from('.menu__foot > *', { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.06 }, '-=0.5');
    }, menu);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (open) {
      tl.current?.timeScale(1).play();
      getLenis()?.stop();
    } else {
      tl.current?.timeScale(1.6).reverse();
      getLenis()?.start();
    }
  }, [open]);

  return (
    <>
      {searchLoaded && (
        <Suspense fallback={null}>
          <SearchPanel open={searchOpen} onClose={closeSearch} />
        </Suspense>
      )}
      <header className="nav" ref={root}>
        <div className="nav__inner">
          <a href="/" className="nav__brand" aria-label="Mooilande AgriVet home">
            <img src="/animals-logo.webp" alt="" className="nav__mark" width={40} height={40} />
            <img src="/name-logo.webp" alt="Mooilande AgriVet" className="nav__name" height={28} />
          </a>

          <nav className="nav__links" aria-label="Main">
            <div className="nav__dd" onMouseEnter={hoverOpen} onMouseLeave={hoverClose}>
              <button
                className={`nav__link nav__dd-toggle ${deptsOpen ? 'is-open' : ''}`}
                onClick={() => setDeptsOpen(o => !o)}
                aria-expanded={deptsOpen}
                aria-controls="nav-departments"
              >
                <span data-text="Departments">Departments</span>
                <ChevronDown size={15} className="nav__dd-caret" />
              </button>
            </div>
            {LINKS.map(l => (
              <a key={l.href} href={l.href} className="nav__link">
                <span data-text={l.label}>{l.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a href={CONTACT.phoneHref} className="nav__phone">
              <Phone size={15} /> {CONTACT.phone}
            </a>
            <button type="button" className="nav__cart" onClick={cart.open} aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
              <ShoppingCart size={19} />
              {count > 0 && <span key={count} className="nav__cart-count">{count > 99 ? '99+' : count}</span>}
            </button>
            <button type="button" className="nav__search" onClick={openSearch} aria-label="Search products" aria-haspopup="dialog">
              <Search size={18} />
              <span>Search products…</span>
            </button>
            <button
              className={`nav__burger ${open ? 'is-open' : ''}`}
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span />
              <span />
            </button>
          </div>

          {/* Departments dropdown: spans the width of the bar */}
          <div
            id="nav-departments"
            className={`ddpanel ${deptsOpen ? 'is-open' : ''}`}
            onMouseEnter={hoverOpen}
            onMouseLeave={hoverClose}
            onBlur={e => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setDeptsOpen(false);
            }}
          >
            <div className="ddpanel__intro">
              <span className="eyebrow eyebrow--lime">Shop by department</span>
              <p className="ddpanel__title">Everything the farm needs, under one roof.</p>
              <a href="/#departments" className="btn btn--sm btn--lime" onClick={() => setDeptsOpen(false)}>
                All departments <ArrowUpRight size={15} />
              </a>
            </div>
            <ul className="ddpanel__grid">
              {DEPARTMENTS.map((d, i) => (
                <li key={d.slug} style={{ '--i': i } as React.CSSProperties}>
                  <a
                    href={departmentHref(d)}
                    className={`ddpanel__item ${path === departmentHref(d) ? 'is-current' : ''}`}
                    onClick={() => setDeptsOpen(false)}
                    tabIndex={deptsOpen ? 0 : -1}
                  >
                    <img src={deptImage(d, 'xs')} alt="" loading="lazy" decoding="async" width={40} height={40} />
                    <span>{d.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div className="menu" ref={menu} aria-hidden={!open} data-lenis-prevent>
        <nav className="menu__nav">
          <div className="menu__row">
            <button
              className={`menu__link menu__toggle ${mobileDepts ? 'is-open' : ''}`}
              onClick={() => setMobileDepts(o => !o)}
              aria-expanded={mobileDepts}
            >
              <small>01</small>
              Departments
              <ChevronDown size={28} className="menu__caret" />
            </button>
          </div>
          <ul className={`menu__depts ${mobileDepts ? 'is-open' : ''}`}>
            {DEPARTMENTS.map(d => (
              <li key={d.slug}>
                <a href={departmentHref(d)} onClick={() => setOpen(false)}>
                  <img src={deptImage(d, 'xs')} alt="" loading="lazy" decoding="async" width={40} height={40} />
                  {d.title}
                </a>
              </li>
            ))}
          </ul>
          {LINKS.map((l, i) => (
            <div key={l.href} className="menu__row">
              <a href={l.href} className="menu__link" onClick={() => setOpen(false)}>
                <small>0{i + 2}</small>
                {l.label}
              </a>
            </div>
          ))}
        </nav>
        <div className="menu__foot">
          <a href={CONTACT.phoneHref}><Phone size={16} /> {CONTACT.phone}</a>
          <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={16} /> {CONTACT.cell}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
