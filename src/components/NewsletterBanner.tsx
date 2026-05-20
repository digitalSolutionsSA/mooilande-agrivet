import React from 'react';
import { Send, MessageCircle } from 'lucide-react';

const LOGO_ORANGE = '#D97A1E';

const NewsletterBanner: React.FC = () => {
  return (
    <section
      style={{
        background: LOGO_ORANGE,
        padding: '72px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -100,
          top: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.82)',
            display: 'block',
            marginBottom: 12,
          }}
        >
          Stay in the know
        </span>

        <h2
          style={{
            fontFamily: 'var(--ff-display)',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: 12,
          }}
        >
          Farm smarter, not harder
        </h2>

        <p
          style={{
            color: 'rgba(255,255,255,0.9)',
            maxWidth: 480,
            margin: '0 auto 32px',
            lineHeight: 1.6,
          }}
        >
          Join our WhatsApp channel for seasonal tips, product deals, and farming insights.
        </p>

        <a
          href="https://whatsapp.com/channel/0029Vb8FMqtHAdNQyvwQpx1C"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-block', maxWidth: 480, width: '100%' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: 0, maxWidth: 480, margin: '0 auto' }}>
            <div
              style={{
                flex: 1,
                padding: '14px 20px',
                borderRadius: 'var(--radius-full) 0 0 var(--radius-full)',
                fontSize: '14px',
                fontFamily: 'var(--ff-body)',
                background: 'rgba(255,255,255,0.18)',
                color: 'white',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <MessageCircle size={16} /> Join our WhatsApp Channel
            </div>

            <div
              style={{
                background: '#b96316',
                color: 'white',
                border: 'none',
                padding: '14px 24px',
                borderRadius: '0 var(--radius-full) var(--radius-full) 0',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
              }}
            >
              Join Now <Send size={14} />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default NewsletterBanner;
