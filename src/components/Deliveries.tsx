import React, { useLayoutEffect, useRef } from 'react';
import { Clock, MapPin, Package, Truck } from 'lucide-react';
import { gsap, ScrollTrigger, revealAll, prefersReducedMotion } from '../lib/motion';

const STOPS = [
  {
    icon: <MapPin size={22} />,
    title: 'Nationwide Delivery',
    text: 'We deliver to every province across South Africa. Delivery charge is based on distance from Mooilande AgriVet.',
  },
  { icon: <Package size={22} />, title: 'Secure Packaging', text: 'Orders packed carefully to arrive in perfect condition.' },
  { icon: <Truck size={22} />, title: 'Hassle-Free Process', text: 'Simply contact us and we handle everything from there.' },
  { icon: <Clock size={22} />, title: 'Quick Turnaround', text: 'Fast dispatch so your farm never runs short.' },
];

/** A delivery route that draws itself as you scroll, lighting up each stop as the truck passes. */
const Deliveries: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      revealAll(el);
      const stops = gsap.utils.toArray<HTMLElement>('.stop');

      if (prefersReducedMotion()) {
        stops.forEach(s => s.classList.add('is-on'));
        gsap.set('.route__fill', { scaleY: 1 });
        return;
      }

      const route = el.querySelector<HTMLElement>('.route')!;
      gsap.timeline({
        scrollTrigger: { trigger: route, start: 'top 60%', end: 'bottom 60%', scrub: 0.5 },
      })
        .fromTo('.route__fill', { scaleY: 0 }, { scaleY: 1, ease: 'none' }, 0)
        .fromTo('.route__truck', { y: 0 }, { y: () => route.offsetHeight - 48, ease: 'none' }, 0);

      stops.forEach(stop => {
        ScrollTrigger.create({
          trigger: stop,
          start: 'top 62%',
          onEnter: () => stop.classList.add('is-on'),
          onLeaveBack: () => stop.classList.remove('is-on'),
        });
        gsap.from(stop, {
          x: 60,
          autoAlpha: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: stop, start: 'top 85%', once: true },
        });
      });

      // Slow-turning topographic rings in the background
      gsap.to('.deliv__topo', {
        rotate: 40,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="deliveries" className="deliv" ref={root}>
      <svg className="deliv__topo" viewBox="0 0 600 600" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <ellipse key={i} cx="300" cy="300" rx={60 + i * 32} ry={40 + i * 26} transform={`rotate(${i * 7} 300 300)`} />
        ))}
      </svg>

      <div className="container deliv__grid">
        <div className="deliv__intro">
          <span className="eyebrow eyebrow--lime" data-reveal>Hassle-free delivery</span>
          <h2 className="display display--light" data-reveal="lines">
            Nationwide courier &amp; <em>delivery services.</em>
          </h2>
          <p data-reveal>
            Delivery rates are based on distance from Mooilande AgriVet. Contact us to arrange your delivery today.
          </p>
          <div className="deliv__note" data-reveal>
            <strong>Shipping &amp; courier services</strong> on feed loads and other applicable large items are
            available at the discretion of Mooilande AgriVet. <span>Additional charges may apply.</span>
          </div>
          <a href="#contact" className="btn btn--lime" data-reveal>Arrange a delivery</a>
        </div>

        <div className="route">
          <div className="route__line">
            <div className="route__fill" />
          </div>
          <div className="route__truck" aria-hidden="true">
            <Truck size={20} />
          </div>
          {STOPS.map((s, i) => (
            <a href="#contact" className="stop" key={s.title}>
              <span className="stop__pin" />
              <div className="stop__card">
                <div className="stop__icon">{s.icon}</div>
                <div>
                  <small>Stop 0{i + 1}</small>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deliveries;
