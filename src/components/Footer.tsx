import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight, Briefcase, Facebook, MessageCircle, X } from 'lucide-react';
import { gsap, SplitText, getLenis, prefersReducedMotion } from '../lib/motion';
import { CONTACT, VACANCIES, Vacancy } from '../data/site';

const EXPLORE = [
  { label: 'Departments', href: '/#departments' },
  { label: 'About us', href: '/#about' },
  { label: 'Our team', href: '/#team' },
  { label: 'Delivery info', href: '/#deliveries' },
  { label: 'Returns & T&Cs', href: '/#terms' },
  { label: 'Contact', href: '/#contact' },
];

const VacancyModal: React.FC<{ vacancy: Vacancy; onClose: () => void }> = ({ vacancy, onClose }) => {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    getLenis()?.stop();
    const ctx = gsap.context(() => {
      gsap.from('.modal__backdrop', { opacity: 0, duration: 0.4 });
      gsap.from('.modal__card', { y: 60, scale: 0.94, opacity: 0, duration: 0.7, ease: 'expo.out' });
    }, root);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      getLenis()?.start();
      ctx.revert();
    };
  }, [onClose]);

  return (
    <div className="modal" ref={root} role="dialog" aria-modal="true" aria-labelledby="vacancy-title">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__card">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <span className="eyebrow eyebrow--amber">Now hiring</span>
        <h3 id="vacancy-title">{vacancy.title}</h3>
        <p>{vacancy.description}</p>
        <a href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Application: ' + vacancy.title)}`} className="btn btn--amber">
          Send your CV <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Vacancy | null>(null);
  const year = new Date().getFullYear();

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const split = SplitText.create('.footer__word', { type: 'chars', charsClass: 'char' });
      gsap.from(split.chars, {
        yPercent: 100,
        ease: 'expo.out',
        stagger: 0.04,
        duration: 1.4,
        scrollTrigger: { trigger: '.footer__word', start: 'top 95%', once: true },
      });
      gsap.from('.footer__col', {
        y: 40,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer__cols', start: 'top 90%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('modal-open', !!active);
  }, [active]);

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {active && <VacancyModal vacancy={active} onClose={() => setActive(null)} />}

      <footer className="footer" ref={root}>
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <img src="/animals-logo.webp" alt="" className="footer__mark" loading="lazy" decoding="async" />
              <p>
                Veld tot Voorraad. Animal feeds, animal health, gardening, irrigation, farm supplies, hardware, autoshop,
                household and pastures — all in Meyerton.
              </p>
            </div>
            <button className="footer__top-btn" onClick={toTop}>
              Back to top <ArrowUp size={16} />
            </button>
          </div>

          <div className="footer__cols">
            <div className="footer__col">
              <h4>Visit</h4>
              <p>{CONTACT.address}</p>
              <dl className="hours hours--light">
                {CONTACT.hours.map(h => (
                  <React.Fragment key={h.day}>
                    <dt>{h.day}</dt>
                    <dd>{h.time}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
            <div className="footer__col">
              <h4>Contact</h4>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">{CONTACT.cell} (WhatsApp)</a>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              <div className="footer__social">
                <a href={CONTACT.facebookHref} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
                <a href={CONTACT.channelHref} target="_blank" rel="noreferrer" aria-label="WhatsApp Channel"><MessageCircle size={18} /></a>
              </div>
            </div>
            <div className="footer__col">
              <h4>Explore</h4>
              {EXPLORE.map(l => (
                <a key={l.href} href={l.href}>{l.label}</a>
              ))}
            </div>
            <div className="footer__col">
              <h4>Vacancies</h4>
              {VACANCIES.length === 0 && <p>No open positions at the moment.</p>}
              {VACANCIES.map(v => (
                <button key={v.title} className="footer__job" onClick={() => setActive(v)}>
                  <Briefcase size={16} /> {v.title} <ArrowUpRight size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__word" aria-hidden="true">Mooilande</div>

        <div className="container footer__bottom">
          <span>© {year} Mooilande AgriVet (Pty) Ltd. All rights reserved.</span>
          <a href="/#terms">Terms &amp; Conditions</a>
        </div>

        <a
          className="footer__credit"
          href="https://digitalsolutionssa.co.za"
          target="_blank"
          rel="noreferrer"
          aria-label="Site proudly built by Digital Solutions SA"
        >
          {/* Phones get a stacked version so the text stays readable */}
          <picture>
            <source media="(max-width: 640px)" srcSet="/built-by-digital-solutions-sa-mobile.png" />
            <img src="/built-by-digital-solutions-sa.png" alt="Site proudly built by Digital Solutions SA" loading="lazy" />
          </picture>
        </a>
      </footer>
    </>
  );
};

export default Footer;
