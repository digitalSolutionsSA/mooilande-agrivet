import React, { useState, useMemo } from 'react';
import { products, categories, Product } from '../data/products';
import ProductCard from './ProductCard';

interface ProductsSectionProps {
  searchQuery: string;
  onAddToCart: (product: Product) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ searchQuery, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== 'All') list = list.filter(p => p.category === activeCategory);
    if (searchQuery) list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section id="products" style={{ padding: 'var(--space-2xl) 0', background: 'var(--clr-cream)' }}>
      <div className="container">
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--clr-leaf)',
            marginBottom: 12,
          }}>
            Our Range
          </span>
          <h2 style={{
            fontFamily: 'var(--ff-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            color: 'var(--clr-text)',
            marginBottom: 16,
          }}>
            Everything your farm needs
          </h2>
          <p style={{
            color: 'var(--clr-text-muted)',
            maxWidth: 520,
            margin: '0 auto',
            fontSize: '1.05rem',
            fontWeight: 300,
          }}>
            Carefully selected products from trusted local and international suppliers — vet-approved and farmer-tested.
          </p>
        </div>

        {/* Filter bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 40,
          padding: '20px 24px',
          background: 'var(--clr-white)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  background: activeCategory === cat ? 'var(--clr-moss)' : 'var(--clr-grey-light)',
                  color: activeCategory === cat ? 'white' : 'var(--clr-text-muted)',
                  border: activeCategory === cat ? '1.5px solid var(--clr-moss)' : '1.5px solid transparent',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--clr-grey-mid)',
              background: 'var(--clr-white)',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--clr-text-muted)',
              outline: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--ff-body)',
            }}
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Results count */}
        {searchQuery && (
          <p style={{ color: 'var(--clr-text-muted)', fontSize: '14px', marginBottom: 20 }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "<strong>{searchQuery}</strong>"
          </p>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 24,
          }}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--clr-text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🌾</div>
            <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: '1.5rem', marginBottom: 8 }}>No products found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
