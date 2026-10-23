import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { gsap, SplitText, revealAll, magnetic, pauseOffscreen, prefersReducedMotion } from '../lib/motion';
import { CONTACT, DEPARTMENTS, Department, departmentHref, deptImage } from '../data/site';
import Contact from './Contact';
import ProductGrid from './ProductGrid';

interface Props {
  department: Department;
}

const DepartmentPage: React.FC<Props> = ({ department: d }) => {
  const root = useRef<HTMLDivElement>(null);
  const index = DEPARTMENTS.indexOf(d);
  const others = DEPARTMENTS.filter(o => o !== d);
  // Repeat short brand lists so one pass of the marquee is always wider than the screen
  const reel = d.brands?.length
    ? Array.from({ length: Math.ceil(14 / d.brands.length) }, () => d.brands!).flat()
    : [];
  const waHref = `${CONTACT.whatsappHref}?text=${encodeURIComponent(`Hi Mooilande AgriVet, I'd like to enquire about ${d.title}.`)}`;

  useEffect(() => {
    const prev = document.title;
    document.title = `${d.title} – Mooilande AgriVet`;
    return () => {
      document.title = prev;
    };
  }, [d]);

  useLayoutEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      revealAll(el);
      gsap.set('.dhero__content', { autoAlpha: 1 });
      if (prefersReducedMotion()) return;

      // Banner: photo settles from a zoom, title rises line by line
      const split = SplitText.create('.dhero__title', { type: 'lines,words', mask: 'lines' });
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .fromTo('.dhero__media img', { scale: 1.25 }, { scale: 1.05, duration: 2.2 }, 0)
        .from('.dhero__crumbs, .dhero__index', { y: 20, autoAlpha: 0, duration: 1 }, 0.15)
        .from(split.words, { yPercent: 115, duration: 1.2, stagger: 0.05 }, 0.2)
        .from('.dhero__lead, .dhero__actions > *', { y: 30, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.55);

      // Brand marquee: slides in, then loops; slows right down while hovered
      const track = el.querySelector<HTMLElement>('.dhero__marquee-track');
      if (track) {
        gsap.from('.dhero__marquee', { yPercent: 100, autoAlpha: 0, duration: 1.2, ease: 'expo.out', delay: 0.9 });
        const loop = gsap.fromTo(track, { xPercent: 0 }, { xPercent: -50, duration: 45, ease: 'none', repeat: -1 });
        const strip = el.querySelector<HTMLElement>('.dhero__marquee')!;
        pauseOffscreen(strip, [loop]);
        strip.addEventListener('mouseenter', () => gsap.to(loop, { timeScale: 0.15, duration: 0.6 }));
        strip.addEventListener('mouseleave', () => gsap.to(loop, { timeScale: 1, duration: 0.6 }));
      }

      gsap.to('.dhero__media img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: '.dhero', start: 'top top', end: 'bottom top', scrub: true },
      });
    }, el);

    const offs = Array.from(el.querySelectorAll<HTMLElement>('[data-magnetic]')).map(b => magnetic(b, 0.25));
    return () => {
      offs.forEach(o => o());
      ctx.revert();
    };
  }, [d]);

  return (
    <div className="dpage" ref={root}>
      <section className="dhero">
        <div className="dhero__media">
          <img
            src={d.image}
            srcSet={`${deptImage(d, 'sm')} 760w, ${d.image} 1920w`}
            sizes="100vw"
            alt=""
            // React 18 doesn't know fetchPriority yet; the lowercase attribute reaches the browser as-is
            {...{ fetchpriority: 'high' }}
          />
        </div>
        <div className="dhero__shade" />
        <div className="container dhero__content">
          <nav className="dhero__crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <a href="/#departments">Departments</a>
            <span>/</span>
            <span aria-current="page">{d.title}</span>
          </nav>
          <span className="dhero__index">
            Department {String(index + 1).padStart(2, '0')} / {DEPARTMENTS.length}
          </span>
          <h1 className="dhero__title">{d.title}</h1>
          <p className="dhero__lead">{d.description}.</p>
          <div className="dhero__actions">
            <a href={waHref} target="_blank" rel="noreferrer" className="btn btn--lime" data-magnetic>
              <MessageCircle size={18} /> Enquire on WhatsApp
            </a>
            <a href="#contact" className="btn btn--ghost" data-magnetic>
              Send a message
            </a>
          </div>
        </div>

        {d.brands && d.brands.length > 0 && (
          <div className="dhero__marquee">
            <span className="dhero__marquee-label">Brands we stock</span>
            <div className="dhero__marquee-window">
              <div className="dhero__marquee-track">
                {[0, 1].map(k => (
                  <ul className="dhero__marquee-group" key={k} aria-hidden={k === 1}>
                    {reel.map((b, i) => (
                      <li key={i} className={`dhero__logo${b.tall ? ' dhero__logo--tall' : ''}`}>
                        <img src={b.logo} alt={k === 0 && i < d.brands!.length ? b.name : ''} decoding="async" />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <ProductGrid department={d} waHref={waHref} />

      <section className="dmore">
        <div className="container dmore__head">
          <h2 data-reveal>More departments</h2>
          <a href="/#departments" className="link-arrow">
            <ArrowLeft size={14} /> All departments
          </a>
        </div>
        <div className="dmore__rail" data-stagger>
          {others.map(o => (
            <a key={o.slug} href={departmentHref(o)} className="dmini" data-cursor="View">
              <img src={deptImage(o, 'sm')} alt="" loading="lazy" decoding="async" />
              <span>{o.title}</span>
            </a>
          ))}
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default DepartmentPage;
