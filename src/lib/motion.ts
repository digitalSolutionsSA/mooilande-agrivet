import { useLayoutEffect, useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);
// Phones resize the viewport as the address bar shows/hides; don't re-measure pinned sections mid-scroll
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

export const getLenis = () => lenis;

/** Smooth scroll driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    if (document.documentElement.classList.contains('is-loading')) lenis.stop();

    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // In-page and cross-page link clicks are handled by lib/router

    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

/** Run GSAP setup scoped to a ref; everything is reverted on unmount. */
export function useGsap(
  scope: RefObject<HTMLElement>,
  setup: (self: gsap.Context) => void,
  deps: unknown[] = [],
) {
  useLayoutEffect(() => {
    if (!scope.current) return;
    const ctx = gsap.context(setup, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Generic scroll reveals driven by data attributes:
 *  [data-reveal]          fade + rise
 *  [data-reveal="lines"]  split into masked lines that slide up
 *  [data-reveal="words"]  split into words that slide up
 *  [data-reveal="clip"]   image wipes in from bottom
 *  [data-stagger]         children fade + rise one after another
 */
export function revealAll(root: HTMLElement) {
  const reduced = prefersReducedMotion();

  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
    const type = el.dataset.reveal;
    if (reduced) {
      gsap.set(el, { autoAlpha: 1 });
      return;
    }
    const trigger = { trigger: el, start: 'top 88%', once: true };

    if (type === 'lines' || type === 'words') {
      SplitText.create(el, {
        type: type === 'lines' ? 'lines' : 'words,lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { autoAlpha: 1 });
          return gsap.from(type === 'lines' ? self.lines : self.words, {
            yPercent: 110,
            rotate: 2,
            duration: 1.1,
            ease: 'expo.out',
            stagger: type === 'lines' ? 0.1 : 0.035,
            scrollTrigger: trigger,
          });
        },
      });
    } else if (type === 'clip') {
      gsap.fromTo(
        el,
        { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 1 },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: trigger },
      );
    } else {
      gsap.fromTo(
        el,
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', scrollTrigger: trigger },
      );
    }
  });

  root.querySelectorAll<HTMLElement>('[data-stagger]').forEach(el => {
    const kids = Array.from(el.children);
    if (reduced) return;
    // fromTo with explicit end values: safe even if a child has its own CSS transitions
    gsap.fromTo(kids, { y: 50, autoAlpha: 0 }, {
      y: 0,
      autoAlpha: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

/** Pause an endless loop while its element is off screen, so it costs nothing there. */
export function pauseOffscreen(el: Element, tweens: gsap.core.Animation[]) {
  ScrollTrigger.create({
    trigger: el,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: self => tweens.forEach(t => t.paused(!self.isActive)),
  });
}

/** Buttons that lean toward the cursor. */
export function magnetic(el: HTMLElement, strength = 0.35) {
  if (prefersReducedMotion() || window.matchMedia('(hover: none)').matches) return () => {};
  const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
  const move = (e: MouseEvent) => {
    const r = el.getBoundingClientRect();
    xTo((e.clientX - (r.left + r.width / 2)) * strength);
    yTo((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    xTo(0);
    yTo(0);
  };
  el.addEventListener('mousemove', move);
  el.addEventListener('mouseleave', leave);
  return () => {
    el.removeEventListener('mousemove', move);
    el.removeEventListener('mouseleave', leave);
  };
}
