import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, PackageOpen, Plus, ShoppingCart, X } from 'lucide-react';
import { gsap, getLenis } from '../lib/motion';
import { CONTACT } from '../data/site';
import { ProductRow, formatPrice, productImageUrl } from '../lib/supabase';
import { cart, useCart } from '../lib/cart';
import QtyStepper from './QtyStepper';
import ProductImage from './ProductImage';

/** A product as the website shows it, whether it came from the database or site.ts. */
export interface Item {
  key: string;
  name: string;
  image: string | null;
  brand?: string | null;
  description?: string | null;
  price?: number | null;
  inStock?: boolean;
}

export const rowToItem = (p: ProductRow): Item => ({
  key: p.id,
  name: p.name,
  image: productImageUrl(p.image_path),
  brand: p.brand,
  description: p.description,
  price: p.price,
  inStock: p.in_stock,
});

const enquireHref = (name: string) =>
  `${CONTACT.whatsappHref}?text=${encodeURIComponent(`Hi Mooilande AgriVet, I'd like to enquire about ${name}.`)}`;

/** Prices are stored including VAT. */
export const priceLabel = (p: Item) => {
  const price = formatPrice(p.price ?? null);
  return price ? (
    <>
      {price} <small className="vat">incl. VAT</small>
    </>
  ) : (
    'Price on request'
  );
};

/** Only shown when stock is known: site.ts products don't track it. */
export const StockBadge: React.FC<{ inStock?: boolean }> = ({ inStock }) =>
  inStock === undefined ? null : (
    <span className={`stock ${inStock ? 'stock--in' : 'stock--out'}`}>{inStock ? 'In stock' : 'Out of stock'}</span>
  );

/** One-tap "add 1 to cart"; sits beside a clickable card, not inside it. */
export const QuickAdd: React.FC<{ product: Item; className?: string }> = ({ product: p, className = 'pcard__add' }) => {
  const [added, setAdded] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const add = () => {
    cart.add({ key: p.key, name: p.name, brand: p.brand, price: p.price ?? null });
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button type="button" className={`${className} ${added ? 'is-added' : ''}`} onClick={add} aria-label={`Add ${p.name} to cart`}>
      {added ? <Check size={16} /> : <Plus size={16} />}
      <span>{added ? 'Added' : 'Add'}</span>
    </button>
  );
};

/** Product quick view: photo, description, quantity and add to cart. */
const ProductQuickView: React.FC<{ product: Item; onClose: () => void }> = ({ product: p, onClose }) => {
  const root = useRef<HTMLDivElement>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const inCart = useCart().items.find(i => i.key === p.key);

  const addToCart = () => {
    cart.add({ key: p.key, name: p.name, brand: p.brand, price: p.price ?? null }, qty);
    setAdded(true);
    setQty(1);
    window.setTimeout(() => setAdded(false), 1800);
  };

  useLayoutEffect(() => {
    getLenis()?.stop();
    document.documentElement.classList.add('modal-open');
    const ctx = gsap.context(() => {
      gsap.from('.modal__backdrop', { opacity: 0, duration: 0.4 });
      gsap.from('.modal__card', { y: 60, scale: 0.94, opacity: 0, duration: 0.7, ease: 'expo.out' });
    }, root);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('modal-open');
      getLenis()?.start();
      ctx.revert();
    };
  }, [onClose]);

  return (
    <div className="modal" ref={root} role="dialog" aria-modal="true" aria-labelledby="product-title">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__card qview">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <div className="qview__media">
          {p.image ? <ProductImage src={p.image} alt={p.name} width={420} loading="eager" /> : <PackageOpen size={48} />}
        </div>
        <div className="qview__info">
          {p.brand && <span className="eyebrow eyebrow--amber">{p.brand}</span>}
          <h3 id="product-title">{p.name}</h3>
          <div className="qview__meta">
            <span className="pcard__price">{priceLabel(p)}</span>
            <StockBadge inStock={p.inStock} />
          </div>
          <p>{p.description || 'Ask our team for more details about this product.'}</p>
          <div className="qview__buy">
            <QtyStepper value={qty} onChange={setQty} label={p.name} />
            <button type="button" className="btn btn--amber" onClick={addToCart}>
              {added ? <><Check size={16} /> Added to cart</> : <><ShoppingCart size={16} /> Add to cart</>}
            </button>
          </div>
          <div className="qview__links">
            {inCart && (
              <button type="button" className="link-arrow" onClick={() => { onClose(); cart.open(); }}>
                View cart ({inCart.qty}) <ArrowUpRight size={14} />
              </button>
            )}
            <a href={enquireHref(p.name)} target="_blank" rel="noreferrer" className="link-arrow">
              Enquire about just this <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;
