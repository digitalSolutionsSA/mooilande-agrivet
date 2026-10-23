import React, { useLayoutEffect, useRef } from 'react';
import { Leaf, Sprout } from 'lucide-react';
import { gsap, SplitText, revealAll, prefersReducedMotion } from '../lib/motion';
import { TEAM } from '../data/site';

const STATS = [
  { value: 1000, suffix: '+', label: 'Happy farmers' },
  { value: 17, suffix: '', label: 'Departments under one roof' },
  { value: 9, suffix: '', label: 'Provinces we deliver to' },
  { value: TEAM.length, suffix: '', label: 'People on our team' },
];

const About: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current!;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      revealAll(el);
      if (reduced) return;

      // Manifesto: words fill in as you read
      const split = SplitText.create('.about__manifesto', { type: 'words' });
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.about__manifesto', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      );

      // Frame opens up from a small window to full bleed.
      // Phones get a short landscape frame, so the photo settles unzoomed and doesn't drift: the whole store stays in view.
      const phone = window.matchMedia('(max-width: 760px)').matches;
      const frameTl = gsap.timeline({
        scrollTrigger: { trigger: '.about__frame', start: 'top 90%', end: 'center center', scrub: 1 },
      });
      frameTl
        .fromTo('.about__frame', { clipPath: 'inset(18% 26% 18% 26% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'none' }, 0)
        .fromTo('.about__frame img', { scale: phone ? 1.25 : 1.45 }, { scale: phone ? 1 : 1.05, ease: 'none' }, 0)
        .fromTo('.about__frame-caption', { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: 'power2.out' }, 0.5);

      if (!phone) {
        gsap.to('.about__frame img', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: '.about__frame', start: 'center center', end: 'bottom top', scrub: true },
        });
      }

      // Count-up stats
      gsap.utils.toArray<HTMLElement>('.stat__num').forEach(n => {
        const target = Number(n.dataset.value);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: { trigger: n, start: 'top 90%', once: true },
          onUpdate: () => {
            n.textContent = Math.round(obj.v).toLocaleString('en-ZA');
          },
        });
      });

      // Floating leaves drift at different speeds
      gsap.utils.toArray<HTMLElement>('.about__leaf').forEach((leaf, i) => {
        gsap.to(leaf, {
          yPercent: -120 - i * 60,
          rotate: i % 2 ? 50 : -40,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={root}>
      <Leaf className="about__leaf about__leaf--1" aria-hidden="true" />
      <Sprout className="about__leaf about__leaf--2" aria-hidden="true" />
      <Leaf className="about__leaf about__leaf--3" aria-hidden="true" />

      <div className="container">
        <div className="about__intro">
          <span className="eyebrow" data-reveal>Who we are</span>
          <h2 className="display about__title" data-reveal="lines">
            Rooted in the land, <em>driven by your success.</em>
          </h2>
        </div>

        <p className="about__manifesto">
          Mooilande AgriVet was born from a deep love for the South African landscape and the
          hardworking farmers who tend it. From feed and animal health to fencing, pumps and the
          braai at the end of a long day — we stock what keeps your farm, home and animals going.
        </p>
      </div>

      <div className="about__frame-wrap">
        <figure className="about__frame">
          <img
            src="/store-aerial.webp"
            srcSet="/store-aerial-sm.webp 800w, /store-aerial.webp 1600w"
            sizes="(max-width: 1600px) 100vw, 1600px"
            width={1600}
            height={901}
            decoding="async"
            alt="Aerial view of the Mooilande AgriVet store in Meyerton"
            loading="lazy"
          />
          <figcaption className="about__frame-caption">
            <span>Plot 16, River Park AH</span>
            <strong>Mooilande, Meyerton</strong>
          </figcaption>
        </figure>
      </div>

      <div className="container">
        <div className="stats" data-stagger>
          {STATS.map(s => (
            <div className="stat" key={s.label}>
              <div className="stat__value">
                <span className="stat__num" data-value={s.value}>{s.value.toLocaleString('en-ZA')}</span>
                {s.suffix}
              </div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="about__pills" data-stagger>
          <span><Leaf size={16} /> Eco-conscious sourcing</span>
          <span><Sprout size={16} /> Expert animal nutrition advice</span>
        </div>
      </div>
    </section>
  );
};

export default About;
