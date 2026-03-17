import React, { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  const LOGO_LIGHT_GREEN = '#8FBF3A';
  //const LOGO_ORANGE = '#D97A1E';

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const slides = [
    {
      headline: 'Where the land\ncomes first.',
      sub: 'Premium agrivet supplies for South African farms — from animal health to precision crop care.',
      img: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1400&q=85',
    },
  ];

  const { headline, sub, img } = slides[0];

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          transform: loaded ? 'scale(1)' : 'scale(1.06)',
          transition: 'transform 1.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg, rgba(26,18,8,0.88) 0%, rgba(45,80,22,0.55) 55%, rgba(26,18,8,0.15) 100%)',
        }}
      />

      {/* Grain texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          right: '8%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 420,
          height: 420,
          border: `1px solid rgba(143,191,58,0.2)`,
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 'calc(8% + 40px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 340,
          height: 340,
          border: `1px solid rgba(143,191,58,0.1)`,
          borderRadius: '50%',
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{ position: 'relative', zIndex: 2, padding: '80px 32px' }}
      >
        <div style={{ maxWidth: 620 }}>
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(143,191,58,0.15)',
              border: '1px solid rgba(143,191,58,0.4)',
              borderRadius: 'var(--radius-full)',
              padding: '6px 16px',
              marginBottom: 28,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s ease 0.1s',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: LOGO_LIGHT_GREEN,
                display: 'inline-block',
              }}
            />
            <span
              style={{
                color: LOGO_LIGHT_GREEN,
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Trusted AgriVet Partner
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--ff-display)',
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 700,
              color: 'var(--clr-white)',
              lineHeight: 1.08,
              whiteSpace: 'pre-line',
              marginBottom: 24,
            }}
          >
            {headline}
          </h1>

          {/* Decorative rule */}
          <div
            style={{
              width: 80,
              height: 3,
              background: `linear-gradient(90deg, ${LOGO_LIGHT_GREEN}, transparent)`,
              marginBottom: 20,
              borderRadius: 2,
            }}
          />

          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.78)',
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 500,
              fontWeight: 300,
            }}
          >
            {sub}
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#products">
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: LOGO_LIGHT_GREEN,
                  color: '#1a1208',
                  padding: '14px 32px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 700,
                  fontSize: '15px',
                  letterSpacing: '0.02em',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(143,191,58,0.35)',
                }}
              >
                Shop Now <ArrowRight size={18} />
              </button>
            </a>

            <a href="#about">
              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'transparent',
                  color: 'white',
                  padding: '13px 28px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 500,
                  fontSize: '15px',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  cursor: 'pointer',
                }}
              >
                Our Story
              </button>
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40, marginTop: 56 }}>
            {[
              { num: '500+', label: 'Products' },
              { num: '12k+', label: 'Happy Farmers' },
              { num: '9', label: 'Provinces' },
            ].map(stat => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: 'var(--ff-display)',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: LOGO_LIGHT_GREEN,
                  }}
                >
                  {stat.num}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust badges strip */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: LOGO_LIGHT_GREEN,
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'center',
          gap: 48,
          flexWrap: 'wrap',
        }}
      >
        {[
          { icon: <Truck size={16} />, text: 'Fast Nationwide Delivery' },
          { icon: <ShieldCheck size={16} />, text: 'Vet-Approved Products' },
          { icon: <Star size={16} />, text: '4.8★ Customer Rating' },
        ].map(b => (
          <div
            key={b.text}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'white',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            {b.icon}
            {b.text}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;