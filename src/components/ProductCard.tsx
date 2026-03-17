import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      style={{
        background: 'var(--clr-white)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all var(--transition-mid)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--clr-grey-light)' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
          }}
        />

        {/* Badge */}
        {product.badge && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: product.badge === 'Sale' ? 'var(--clr-rust)' :
                        product.badge === 'New' ? 'var(--clr-moss)' : 'var(--clr-amber)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            {product.badge}
          </div>
        )}

        {discount > 0 && (
          <div style={{
            position: 'absolute', top: product.badge ? 44 : 12, left: 12,
            background: 'var(--clr-rust)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: 700,
          }}>
            -{discount}%
          </div>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(250,246,237,0.75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              background: 'var(--clr-text-muted)',
              color: 'white',
              padding: '8px 20px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: 600,
            }}>Out of Stock</span>
          </div>
        )}

        {/* Hover action buttons */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          display: 'flex', flexDirection: 'column', gap: 8,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(10px)',
          transition: 'all 0.3s ease',
        }}>
          <button
            onClick={() => setWishlisted(!wishlisted)}
            style={{
              width: 34, height: 34,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)',
              color: wishlisted ? 'var(--clr-rust)' : 'var(--clr-text-muted)',
              transition: 'all 0.2s',
            }}>
            <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
          <button style={{
            width: 34, height: 34,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--clr-text-muted)',
          }}>
            <Eye size={15} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        {/* Category */}
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--clr-leaf)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          {product.category}
        </span>

        {/* Name */}
        <h3 style={{
          fontFamily: 'var(--ff-display)',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--clr-text)',
          lineHeight: 1.3,
        }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? 'var(--clr-amber)' : 'none'}
                color={i < Math.floor(product.rating) ? 'var(--clr-amber)' : 'var(--clr-grey-mid)'}
              />
            ))}
          </div>
          <span style={{ fontSize: '12px', color: 'var(--clr-text-muted)' }}>
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <div>
            <span style={{
              fontFamily: 'var(--ff-display)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--clr-moss)',
            }}>
              R{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span style={{
                fontSize: '13px',
                color: 'var(--clr-text-muted)',
                textDecoration: 'line-through',
                marginLeft: 8,
              }}>
                R{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: justAdded ? 'var(--clr-fern)' :
                          !product.inStock ? 'var(--clr-grey-mid)' : 'var(--clr-moss)',
              color: 'white',
              padding: '9px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'all 0.25s ease',
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              transform: justAdded ? 'scale(0.95)' : 'scale(1)',
            }}>
            <ShoppingCart size={14} />
            {justAdded ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
