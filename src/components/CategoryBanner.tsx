import React from 'react';
import { ArrowRight } from 'lucide-react';

const CategoryBanner: React.FC = () => {
  const categories = [
    {
      title: 'Animal Feeds',
      description: 'Feed for livestock, poultry, horses and general farm animals',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
      color: 'rgba(28, 66, 22, 0.82)',
      accent: '#f0a53a',
      href: '#contact',
    },
    {
      title: 'Animal Health',
      description: 'Vaccines, dewormers, wound care, supplements and health essentials',
      image: '../categories/animalhealth.jpg',
      color: 'rgba(28, 66, 22, 0.82)',
      accent: '#f0a53a',
      href: '#contact',
    },
    {
      title: 'Gardening, Irrigation & Pool',
      description: 'Watering tools, irrigation parts and gardening essentials',
      image: '../categories/gardening.webp',
      color: 'rgba(28, 66, 22, 0.82)',
      accent: '#f0a53a',
      href: '#contact',
    },
    {
      title: 'Farm Supplies',
      description: 'Practical essentials for daily farm operations and maintenance',
      image: '../categories/farmsupplies.webp',
      color: 'rgba(28, 66, 22, 0.82)',
      accent: '#f0a53a',
      href: '#contact',
    },
    {
      title: 'Hardware',
      description: 'Tools, fittings, fasteners and workshop essentials',
      image: '../categories/hardware.jpg',
      color: 'rgba(28, 66, 22, 0.82)',
      accent: '#f0a53a',
      href: '#contact',
    },
    {
      title: 'Autoshop',
      description: 'Automotive products, accessories and maintenance basics',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
      color: 'rgba(28, 66, 22, 0.82)',
      accent: '#f0a53a',
      href: '#contact',
    },
    {
      title: 'Household',
      description: 'Everyday household goods and practical home-use products',
      image: '../categories/cleaning.jpg',
      color: 'rgba(28, 66, 22, 0.82)',
      accent: '#f0a53a',
      href: '#contact',
    },
    {
      title: 'Pastures',
      description: 'Products and inputs to support healthy pasture growth and grazing',
      image: '../categories/pastures.jpg',
      color: 'rgba(28, 66, 22, 0.82)',
      accent: '#f0a53a',
      href: '#contact',
    },
    {
      title: 'Braai',
      description: 'Braai gear, fire starters, accessories and outdoor cooking basics',
      image: '../categories/braai.jpg',
      color: 'rgba(28, 66, 22, 0.82)',
      accent: '#f0a53a',
      href: '#contact',
    },
    {
      title: 'Outdoor & Clothing',
      description: 'Useful products for outdoor living, farm use and general utility',
      image: '../categories/camp.webp',
      color: 'rgba(28, 66, 22, 0.82)',
      accent: '#f0a53a',
      href: '#contact',
    },
    {
      title: 'Pet Food, Treats & Accessories',
      description: 'Pet nutrition, snacks, collars, bowls and everyday pet essentials',
      image: '../categories/petfood.jpeg',
      color: 'rgba(28, 66, 22, 0.82)',
      accent: '#f0a53a',
      href: '#contact',
    },
    {
      title: 'Plumbing',
      description: 'Pipes, fittings, repair parts and water system essentials',
      image: '../categories/plumbing.jpg',
      color: 'rgba(28, 66, 22, 0.82)',
      accent: '#f0a53a',
      href: '#contact',
    },
    {
      title: 'Pesticides & Fertilizers',
      description: 'Crop protection products, pest control and plant nutrition',
      image: '../categories/rats.jpg',
      color: 'rgba(28, 66, 22, 0.82)',
      accent: '#f0a53a',
      href: '#contact',
    },
    {
  title: 'Centrifugal Pumps & Pressure Pumps',
  description: 'Reliable pumping solutions for water supply, irrigation and pressure systems',
  image: '../categories/pumps.jpeg',
  color: 'rgba(28, 66, 22, 0.82)',
  accent: '#f0a53a',
  href: '#contact',
},
{
  title: 'Fencing, Steel & Wire',
  description: 'Quality fencing materials, steel posts, and wire solutions for farm boundaries and livestock management',
  image: '../categories/fencing.jpg',
  color: 'rgba(28, 66, 22, 0.82)',
  accent: '#f0a53a',
  href: '#contact',
},
{
  title: 'Equine Supplements & Accessories',
  description: 'Premium health supplements, feeds, and accessories to keep your horses performing at their best',
  image: '../categories/horses.jpg',
  color: 'rgba(28, 66, 22, 0.82)',
  accent: '#f0a53a',
  href: '#contact',
},
{
  title: 'Safety & PPE',
  description: 'Protective clothing, boots, gloves, and safety gear for farm workers and agricultural environments',
  image: '../categories/safety.jpg',
  color: 'rgba(28, 66, 22, 0.82)',
  accent: '#f0a53a',
  href: '#contact',
},
  ];

  return (
    <section
      style={{
        padding: 'var(--space-xl) 0 var(--space-2xl)',
        background: '#2d5016',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          paddingLeft: '32px',
          paddingRight: '32px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#f0a53a',
              display: 'block',
              marginBottom: 12,
            }}
          >
            Browse by Category
          </span>

          <h2
            style={{
              fontFamily: 'var(--ff-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: 10,
            }}
          >
            Find what you need
          </h2>

          <p
            style={{
              maxWidth: 760,
              margin: '0 auto',
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.85)',
            }}
          >
            Explore Mooilande AgriVet’s full range of departments for farm, home,
            garden, pet and outdoor needs.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
          }}
        >
          {categories.map((cat) => (
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

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  image,
  color,
  accent,
  href,
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <a href={href} style={{ textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'relative',
          borderRadius: '18px',
          overflow: 'hidden',
          aspectRatio: '3 / 4',
          cursor: 'pointer',
          boxShadow: hovered
            ? '0 18px 38px rgba(0,0,0,0.22)'
            : '0 10px 24px rgba(0,0,0,0.14)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all var(--transition-mid)',
          border: '1px solid rgba(255,255,255,0.1)',
          minHeight: '280px',
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, ${color} 100%)`,
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            padding: '16px',
          }}
        >
          <h3 style={{ color: '#fff', marginBottom: 6 }}>{title}</h3>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>
            {description}
          </p>

          <div style={{ marginTop: 10, color: accent, fontWeight: 600 }}>
            Enquire <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </a>
  );
};

export default CategoryBanner;