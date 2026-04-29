import React, { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, Star } from 'lucide-react';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const LOGO_LIGHT_GREEN = '#8FBF3A';
  const HERO_VIDEO = '/hero-video.mp4';
  const HERO_POSTER = '/hero.webp'; // ✅ FIXED: was 'hero-video.webp'

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const headline = 'Where the land\ncomes first.';
  const sub =
    'Premium agrivet supplies for South African farms — from animal health to precision crop care.';

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '80px',
        // ✅ Poster image always visible as the base layer — no flicker
        backgroundImage: `url(${HERO_POSTER})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* VIDEO BACKGROUND — fades IN on top of the poster once ready */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto" // ✅ FIXED: was 'metadata' — now buffers eagerly
        poster={HERO_POSTER}
        onLoadedData={() => setVideoReady(true)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          // ✅ Starts invisible, crossfades in once ready — poster stays visible underneath
          opacity: videoReady ? 1 : 0,
          transition: 'opacity 0.8s ease',
          // ✅ Removed the scale animation so video snaps to same frame as poster
          transform: 'scale(1)',
        }}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(105deg, rgba(26,18,8,0.88) 0%, rgba(45,80,22,0.55) 55%, rgba(26,18,8,0.15) 100%)',
        }}
      />

      {/* Grain */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      {/* Circles */}
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
          pointerEvents: 'none',
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
          pointerEvents: 'none',
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
              borderRadius: '999px',
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
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.08,
              whiteSpace: 'pre-line',
              marginBottom: 24,
            }}
          >
            {headline}
          </h1>

          {/* Line */}
          <div
            style={{
              width: 80,
              height: 3,
              background: `linear-gradient(90deg, ${LOGO_LIGHT_GREEN}, transparent)`,
              marginBottom: 20,
            }}
          />

          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.78)',
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 500,
            }}
          >
            {sub}
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#products">
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: LOGO_LIGHT_GREEN,
                  color: '#1a1208',
                  padding: '14px 32px',
                  borderRadius: '999px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Shop Now <ArrowRight size={18} />
              </button>
            </a>

            <a href="#about">
              <button
                style={{
                  background: 'transparent',
                  color: 'white',
                  padding: '13px 28px',
                  borderRadius: '999px',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  cursor: 'pointer',
                }}
              >
                Our Story
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
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