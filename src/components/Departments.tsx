import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { gsap, revealAll, prefersReducedMotion } from '../lib/motion';
import { CONTACT, DEPARTMENTS, departmentHref, deptImage } from '../data/site';

/** Pinned horizontal gallery on every screen size: scrolling down slides the departments sideways. */
const Departments: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      revealAll(el);
      if (prefersReducedMotion()) return;

      // Phones held sideways are too short to pin: there the row simply swipes sideways (see CSS)
      gsap.matchMedia().add('(min-height: 501px)', () => {
        const t = track.current!;
        const distance = () => t.scrollWidth - window.innerWidth;

        const scroll = gsap.to(t, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '.depts__pin',
            start: 'top top',
            end: () => '+=' + distance(),
            pin: true,
            refreshPriority: 5,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: self => gsap.set('.depts__progress-bar', { scaleX: self.progress }),
          },
        });

        // Each card's photo drifts against the scroll; card tilts in as it enters
        gsap.utils.toArray<HTMLElement>('.dept').forEach(card => {
          gsap.fromTo(
            card.querySelector('img'),
            { xPercent: -12 },
            {
              xPercent: 12,
              ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: scroll, start: 'left right', end: 'right left', scrub: true },
            },
          );
          gsap.from(card, {
            rotateY: -18,
            y: 60,
            opacity: 0.3,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, containerAnimation: scroll, start: 'left 105%', end: 'left 70%', scrub: true },
          });
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="departments" className="depts" ref={root}>
      <div className="depts__pin">
        <div className="depts__track" ref={track}>
          <header className="depts__head">
            <span className="eyebrow eyebrow--amber" data-reveal>Browse by department</span>
            <h2 className="display depts__title" data-reveal="lines">
              Everything the farm needs, <em>under one roof.</em>
            </h2>
            <p className="depts__lead" data-reveal>
              Explore Mooilande AgriVet's full range of departments for farm, home, garden, pet and outdoor needs.
            </p>
            <div className="depts__notice" data-reveal>
              <strong>Online catalogue coming soon.</strong> For anything you need right now,{' '}
              <a href="#contact">send us a message</a> or{' '}
              <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" className="wa">
                <MessageCircle size={13} /> WhatsApp us
              </a>
              .
            </div>
            <div className="depts__hint" aria-hidden="true">
              <span>Scroll</span>
              <i />
            </div>
          </header>

          {DEPARTMENTS.map((d, i) => (
            <a href={departmentHref(d)} className="dept" key={d.slug} data-cursor="View">
              <div className="dept__media">
                <img src={deptImage(d, 'sm')} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="dept__shade" />
              <span className="dept__num">{String(i + 1).padStart(2, '0')}</span>
              <div className="dept__body">
                <h3>{d.title}</h3>
                <p>{d.description}</p>
                <span className="dept__cta">
                  View department <ArrowUpRight size={16} />
                </span>
              </div>
            </a>
          ))}

          <div className="depts__end">
            <p>Can't see what you're looking for?</p>
            <a href="#contact" className="btn btn--amber">Ask our team <ArrowUpRight size={18} /></a>
          </div>
        </div>

        <div className="depts__progress" aria-hidden="true">
          <div className="depts__progress-bar" />
        </div>
      </div>
    </section>
  );
};

export default Departments;
