import React, { useLayoutEffect, useRef } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { gsap, SplitText, magnetic, prefersReducedMotion } from '../lib/motion';
import { CONTACT } from '../data/site';

const RING = 'Seasonal tips • Product deals • Farming insights • ';

/** WhatsApp channel call-to-action with a scroll-scrubbed headline and spinning badge. */
const Channel: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      const split = SplitText.create('.channel__title', { type: 'chars,words', charsClass: 'char' });
      gsap.from(split.chars, {
        yPercent: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.03,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 25%', scrub: 1 },
      });

      gsap.to('.channel__ring', {
        rotate: 360,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });

      gsap.fromTo('.channel__blob', { scale: 0.6 }, {
        scale: 1.25,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      gsap.from('.channel__sub, .channel__cta', {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.channel__sub', start: 'top 90%', once: true },
      });
    }, el);

    const cta = el.querySelector<HTMLElement>('.channel__cta');
    const off = cta ? magnetic(cta, 0.25) : () => {};
    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <section className="channel" ref={root}>
      <div className="channel__blob" aria-hidden="true" />
      <div className="channel__blob channel__blob--2" aria-hidden="true" />

      <svg className="channel__ring" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="ring-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#ring-path">{RING + RING}</textPath>
        </text>
      </svg>

      <div className="container channel__inner">
        <span className="eyebrow eyebrow--light">Stay in the know</span>
        <h2 className="channel__title">Farm smarter, not harder.</h2>
        <p className="channel__sub">Join our WhatsApp channel for seasonal tips, product deals and farming insights.</p>
        <a href={CONTACT.channelHref} target="_blank" rel="noreferrer" className="channel__cta">
          <span className="channel__cta-label">
            <MessageCircle size={18} /> Join our WhatsApp Channel
          </span>
          <span className="channel__cta-go">
            Join now <Send size={15} />
          </span>
        </a>
      </div>
    </section>
  );
};

export default Channel;
