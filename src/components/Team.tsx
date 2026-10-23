import React, { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, revealAll, pauseOffscreen, prefersReducedMotion } from '../lib/motion';
import { TEAM } from '../data/site';

/** Endless team reel: drifts on its own, rushes with scroll speed and follows scroll direction. */
const Team: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      revealAll(el);
      if (prefersReducedMotion()) return;

      const loop = gsap.fromTo('.reel__track', { xPercent: 0 }, { xPercent: -50, duration: 55, ease: 'none', repeat: -1 });
      pauseOffscreen(el.querySelector('.reel')!, [loop]);
      const speed = { v: 1 };
      let dir = 1;
      let hovering = false;
      const apply = () => {
        loop.timeScale((hovering ? 0.15 : 1) * speed.v * dir);
      };

      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: self => {
          dir = self.direction;
          const v = Math.min(Math.abs(self.getVelocity()) / 220, 8);
          gsap.to(speed, {
            v: 1 + v,
            duration: 0.25,
            overwrite: true,
            onUpdate: apply,
            onComplete: () => {
              gsap.to(speed, { v: 1, duration: 1.2, ease: 'power2.out', onUpdate: apply });
            },
          });
          gsap.to('.member', {
            skewX: gsap.utils.clamp(-8, 8, self.getVelocity() / -250),
            duration: 0.3,
            overwrite: true,
            onComplete: () => {
              gsap.to('.member', { skewX: 0, duration: 0.8, ease: 'power3.out' });
            },
          });
        },
      });

      const reel = el.querySelector('.reel')!;
      reel.addEventListener('mouseenter', () => { hovering = true; apply(); });
      reel.addEventListener('mouseleave', () => { hovering = false; apply(); });

      // Cards rise in a wave when the section enters
      gsap.from('.member', {
        yPercent: 40,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: { each: 0.04, from: 'start' },
        scrollTrigger: { trigger: '.reel', start: 'top 85%', once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="team" className="team" ref={root}>
      <div className="container team__head">
        <div>
          <span className="eyebrow" data-reveal>Meet the team</span>
          <h2 className="display" data-reveal="lines">
            The people behind <em>Mooilande AgriVet.</em>
          </h2>
        </div>
        <p data-reveal>
          Meet the team that keeps Mooilande AgriVet moving every day — real people who know farming, animals and
          the products on our shelves.
        </p>
      </div>

      <div className="reel">
        <div className="reel__track">
          {[...TEAM, ...TEAM].map((m, i) => (
            <article className="member" key={`${m.name}-${i}`} aria-hidden={i >= TEAM.length}>
              <div className="member__photo">
                <img src={m.image} alt={m.name} loading="lazy" decoding="async" width={400} height={500} />
              </div>
              <div className="member__info">
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
