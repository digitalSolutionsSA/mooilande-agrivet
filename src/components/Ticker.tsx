import React, { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, pauseOffscreen, prefersReducedMotion } from '../lib/motion';
import { DEPARTMENTS } from '../data/site';

/** Two counter-running rows of department names that speed up with scroll velocity. */
const Ticker: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const names = DEPARTMENTS.map(d => d.title);
  const rowA = names.slice(0, 9);
  const rowB = names.slice(9);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>('.ticker__track');
      const loops = rows.map((row, i) =>
        gsap.fromTo(
          row,
          { xPercent: i % 2 ? -50 : 0 },
          { xPercent: i % 2 ? 0 : -50, duration: 40, ease: 'none', repeat: -1 },
        ),
      );

      pauseOffscreen(root.current!, loops);

      const boost = { v: 1 };
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: self => {
          const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 300);
          gsap.to(boost, {
            v: 1 + Math.abs(v),
            duration: 0.2,
            overwrite: true,
            onUpdate: () => loops.forEach(l => l.timeScale(boost.v)),
            onComplete: () => {
              gsap.to(boost, { v: 1, duration: 1, onUpdate: () => loops.forEach(l => l.timeScale(boost.v)) });
            },
          });
          gsap.to('.ticker__row', {
            skewX: -v * 1.5,
            duration: 0.3,
            overwrite: true,
            onComplete: () => {
              gsap.to('.ticker__row', { skewX: 0, duration: 0.8, ease: 'power3.out' });
            },
          });
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const Row = ({ items, outline }: { items: string[]; outline?: boolean }) => (
    <div className={`ticker__row ${outline ? 'ticker__row--outline' : ''}`}>
      <div className="ticker__track">
        {[0, 1].map(k => (
          <div className="ticker__group" key={k} aria-hidden={k === 1}>
            {items.map(n => (
              <span className="ticker__item" key={n}>
                {n}
                <svg viewBox="0 0 24 24" className="ticker__star" aria-hidden="true">
                  <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="ticker" ref={root}>
      <Row items={rowA} />
      <Row items={rowB} outline />
    </div>
  );
};

export default Ticker;
