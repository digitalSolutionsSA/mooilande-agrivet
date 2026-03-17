import React from 'react';
import { ArrowRight } from 'lucide-react';

const CategoryBanner: React.FC = () => {
  const categories = [
    {
      title: 'Animal Health',
      description: 'Vaccines, dewormers, wound care & vitamins',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80',
      color: 'rgba(45,30,15,0.7)',
      accent: '#A8C845',
      href: '#products',
    },
    {
      title: 'Crop & Plant Care',
      description: 'Herbicides, fertilizers & soil health',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
      color: 'rgba(20,45,10,0.7)',
      accent: '#E8952A',
      href: '#products',
    },
    {
      title: 'Farm Equipment',
      description: 'Sprayers, irrigation & handling gear',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
      color: 'rgba(26,18,8,0.72)',
      accent: '#C45D2A',
      href: '#products',
    },
    {
      title: 'Feed & Nutrition',
      description: 'Pellets, lucerne, minerals & supplements',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80',
      color: 'rgba(50,30,5,0.72)',
      accent: '#A8C845',
      href: '#products',
    },
  ];

  return (
    <section style={{ padding: 'var(--space-xl) 0 var(--space-2xl)', background: 'var(--clr-cream)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--clr-leaf)', display: 'block', marginBottom: 12,
          }}>
            Browse by Category
          </span>
          <h2 style={{
            fontFamily: 'var(--ff-display)',
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--clr-text)',
          }}>
            Find what you need
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
        }}>
          {categories.map(cat => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  color: string;
  accent: string;
  href: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, image, color, accent, href }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <a href={href} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          aspectRatio: '3/4',
          cursor: 'pointer',
          boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all var(--transition-mid)',
        }}
      >
        {/* Background image */}
        <img
          src={image}
          alt={title}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
          }}
        />

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered
            ? `linear-gradient(180deg, transparent 20%, ${color.replace('0.7', '0.88')} 100%)`
            : `linear-gradient(180deg, transparent 30%, ${color} 100%)`,
          transition: 'background 0.4s ease',
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: '24px 20px',
        }}>
          {/* Accent line */}
          <div style={{
            width: hovered ? 40 : 24,
            height: 3,
            background: accent,
            borderRadius: 2,
            marginBottom: 10,
            transition: 'width 0.35s ease',
          }} />

          <h3 style={{
            fontFamily: 'var(--ff-display)',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--clr-white)',
            marginBottom: 6,
            lineHeight: 1.2,
          }}>
            {title}
          </h3>

          <p style={{
            fontSize: '13px',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.5,
            marginBottom: 14,
          }}>
            {description}
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: accent,
            fontSize: '13px',
            fontWeight: 700,
            opacity: hovered ? 1 : 0.6,
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'all 0.3s ease',
          }}>
            Shop now <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </a>
  );
};

export default CategoryBanner;
