import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/motion';

/** Soft follower ring that swells over links and shows a label over [data-cursor] items. */
const Cursor: React.FC = () => {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    document.documentElement.classList.add('has-cursor');

    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3.out' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3.out' });
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.1 });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.1 });

    const move = (e: MouseEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const tagged = t.closest<HTMLElement>('[data-cursor]');
      const link = t.closest('a, button, input, textarea, label');
      const r = ring.current!;
      r.classList.toggle('is-label', !!tagged);
      r.classList.toggle('is-link', !tagged && !!link);
      label.current!.textContent = tagged?.dataset.cursor ?? '';
    };

    const leave = () => gsap.to([ring.current, dot.current], { autoAlpha: 0, duration: 0.3 });
    const enter = () => gsap.to([ring.current, dot.current], { autoAlpha: 1, duration: 0.3 });

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={ring} aria-hidden="true">
        <span ref={label} />
      </div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
};

export default Cursor;
