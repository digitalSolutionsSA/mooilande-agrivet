import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap, getLenis, prefersReducedMotion } from '../lib/motion';

interface Props {
  onDone: () => void;
}

const Preloader: React.FC<Props> = ({ onDone }) => {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    document.documentElement.classList.add('is-loading');
    window.scrollTo(0, 0);

    const finish = () => {
      document.documentElement.classList.remove('is-loading');
      getLenis()?.start();
      setGone(true);
    };

    if (prefersReducedMotion()) {
      onDone();
      finish();
      return;
    }

    getLenis()?.stop();
    // First visit plays the full intro (a little brisker); later visits this session get a quick version
    let seen = false;
    try {
      seen = sessionStorage.getItem('ml-intro') === '1';
      sessionStorage.setItem('ml-intro', '1');
    } catch {
      /* storage blocked: just play the normal intro */
    }
    const speed = seen ? 2.6 : 1.35;
    const counter = { v: 0 };
    const num = el.querySelector('.preloader__count span') as HTMLElement;

    const loaded = new Promise<void>(res => {
      if (document.readyState === 'complete') res();
      else window.addEventListener('load', () => res(), { once: true });
      setTimeout(res, seen ? 600 : 1600); // never hold the page back longer than this
    });

    const ctx = gsap.context(() => {
      gsap.set('.preloader__mark', { scale: 0.6, autoAlpha: 0, rotate: -40 });
      const intro = gsap.timeline().timeScale(speed);
      intro
        .to('.preloader__mark', { scale: 1, autoAlpha: 1, rotate: 0, duration: 1.1, ease: 'back.out(1.6)' })
        .from('.preloader__word span', { yPercent: 110, duration: 0.8, ease: 'expo.out', stagger: 0.04 }, '-=0.6')
        .to(counter, {
          v: 86,
          duration: 1.3,
          ease: 'power2.inOut',
          onUpdate: () => {
            num.textContent = String(Math.round(counter.v));
          },
        }, 0);

      Promise.all([loaded, intro.then()]).then(() => {
        gsap.timeline({ onComplete: finish }).timeScale(speed)
          .to(counter, {
            v: 100,
            duration: 0.4,
            ease: 'power1.out',
            onUpdate: () => {
              num.textContent = String(Math.round(counter.v));
            },
          })
          .to('.preloader__mark', { scale: 0.8, autoAlpha: 0, duration: 0.5, ease: 'power3.in' })
          .to('.preloader__word span, .preloader__count', { yPercent: -110, autoAlpha: 0, duration: 0.5, ease: 'power3.in', stagger: 0.02 }, '<')
          .add(onDone, '-=0.1')
          .to('.preloader__panel', {
            yPercent: -100,
            duration: 1.1,
            ease: 'expo.inOut',
            stagger: 0.08,
          }, '-=0.15');
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__panel preloader__panel--a" />
      <div className="preloader__panel preloader__panel--b" />
      <div className="preloader__inner">
        <div className="preloader__mark">
          <img src="/animals-logo.webp" alt="" />
        </div>
        <div className="preloader__word">
          {'Veld tot Voorraad'.split('').map((c, i) => (
            <span key={i}>{c === ' ' ? ' ' : c}</span>
          ))}
        </div>
        <div className="preloader__count">
          <span>0</span>%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
