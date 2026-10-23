import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ShieldCheck, Star, Truck } from 'lucide-react';
import { gsap, SplitText, ScrollTrigger, magnetic, prefersReducedMotion } from '../lib/motion';
import type { FieldScene } from '../three/FieldScene';

interface Props {
  ready: boolean;
}

const Hero: React.FC<Props> = ({ ready }) => {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<FieldScene | null>(null);
  const introRef = useRef(prefersReducedMotion() ? 1 : 0);
  const [fallback, setFallback] = useState(false);

  // Three.js field, loaded as its own chunk so the rest of the page isn't waiting on it
  useEffect(() => {
    const canvas = canvasRef.current!;
    let cancelled = false;
    let scene: FieldScene | null = null;
    let io: IntersectionObserver | null = null;

    // Data saver on, or a low-memory phone: show the still photo and skip downloading the 3D engine
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    if (nav.connection?.saveData || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2)) {
      setFallback(true);
      return;
    }

    import('../three/FieldScene').then(({ FieldScene, webglAvailable }) => {
      if (cancelled) return;
      if (!webglAvailable()) {
        setFallback(true);
        return;
      }
      const mobile = window.matchMedia('(max-width: 768px), (hover: none)').matches;
      try {
        scene = new FieldScene(canvas, mobile);
      } catch {
        setFallback(true);
        return;
      }
      sceneRef.current = scene;
      scene.setIntro(introRef.current);

      // Only render while the hero is on screen
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) scene?.start();
        else scene?.stop();
      });
      io.observe(root.current!);
    });

    return () => {
      cancelled = true;
      io?.disconnect();
      scene?.dispose();
      sceneRef.current = null;
    };
  }, []);

  // Scroll: pin the hero and walk the camera down the trail between the grass
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const proxy = { p: 0 };
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=170%',
          pin: true,
          refreshPriority: 10, // measure first: everything below sits after this pin
          scrub: 0.6,
          onUpdate: self => sceneRef.current?.setProgress(self.progress),
        },
      });
      tl.to(proxy, { p: 1, duration: 1 }, 0)
        .to('.hero__layer--content', { yPercent: -18, opacity: 0, duration: 0.3, ease: 'power2.in' }, 0)
        .to('.hero__layer--meta', { y: 40, opacity: 0, duration: 0.2 }, 0)
        .to('.hero__shade', { opacity: 0.35, duration: 0.35 }, 0.05)
        .to('.hero__fade', { opacity: 1, duration: 0.2, ease: 'power1.in' }, 0.8);
      if (root.current!.querySelector('.hero__fallback')) tl.to('.hero__fallback', { scale: 1.15, duration: 1 }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  // Intro once the preloader lifts
  useLayoutEffect(() => {
    if (!ready) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.set('.hero__content, .hero__meta', { autoAlpha: 1 });
      if (reduced) return;

      const split = SplitText.create('.hero__title', { type: 'lines,chars', mask: 'lines' });
      const grow = { v: 0 };
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .to(grow, { v: 1, duration: 2.6, ease: 'power3.out', onUpdate: () => {
          introRef.current = grow.v;
          sceneRef.current?.setIntro(grow.v);
        } }, 0)
        .from('.hero__eyebrow', { y: 20, autoAlpha: 0, duration: 1 }, 0.3)
        .from(split.chars, { yPercent: 120, rotate: 8, duration: 1.3, stagger: 0.025 }, 0.35)
        .from('.hero__rule', { scaleX: 0, transformOrigin: 'left', duration: 1.2 }, 0.9)
        .from('.hero__sub', { y: 30, autoAlpha: 0, duration: 1.1 }, 1)
        .from('.hero__actions > *', { y: 30, autoAlpha: 0, duration: 1, stagger: 0.1 }, 1.1)
        .from('.hero__meta > *', { y: 20, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 1.3)
        .add(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });
    }, root);

    const cleanups = Array.from(root.current!.querySelectorAll<HTMLElement>('[data-magnetic]')).map(el => magnetic(el));
    return () => {
      cleanups.forEach(c => c());
      ctx.revert();
    };
  }, [ready]);

  return (
    <section id="hero" className="hero" ref={root}>
      {fallback ? (
        <div className="hero__fallback" style={{ backgroundImage: 'url(/hero-sm.webp)' }} />
      ) : (
        <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
      )}
      <div className="hero__shade" />
      <div className="hero__fade" />
      <div className="grain" />

      <div className="hero__layer hero__layer--content">
        <div className="hero__content container">
          <div className="hero__eyebrow">
            <span className="dot" /> Trusted AgriVet Partner · Meyerton
          </div>

          <h1 className="hero__title">
            Where the land
            <br />
            <em>comes first.</em>
          </h1>

          <div className="hero__rule" />

          <p className="hero__sub">
            Premium agrivet supplies for South African farms — from animal health to precision crop care.
          </p>

          <div className="hero__actions">
            <a href="#departments" className="btn btn--lime" data-magnetic>
              Explore departments <ArrowRight size={18} />
            </a>
            <a href="#about" className="btn btn--ghost" data-magnetic>
              Our story
            </a>
          </div>
        </div>
      </div>

      <div className="hero__layer hero__layer--meta">
        <div className="hero__meta container">
          <div className="hero__badges">
            <span><Truck size={16} /> Fast Nationwide Delivery</span>
            <span><ShieldCheck size={16} /> Vet-Approved Products</span>
            <span><Star size={16} /> 4.8★ Customer Rating</span>
          </div>
          <a href="#about" className="hero__scroll" aria-label="Scroll to content">
            <ArrowDown size={16} />
            <span>Scroll</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
