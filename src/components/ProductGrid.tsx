import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, PackageOpen } from 'lucide-react';
import { gsap, revealAll } from '../lib/motion';
import { Department } from '../data/site';
import { ProductRow, supabase } from '../lib/supabase';
import ProductQuickView, { Item, QuickAdd, StockBadge, priceLabel, rowToItem } from './ProductQuickView';
import ProductImage from './ProductImage';

type Status = 'loading' | 'ready';

/** A department's products: anything listed in site.ts plus what admins add in /dssa-portals. */
const ProductGrid: React.FC<{ department: Department; waHref: string }> = ({ department: d, waHref }) => {
  const root = useRef<HTMLElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [active, setActive] = useState<Item | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fromSite: Item[] = d.products.map(p => ({ key: `site-${p.name}`, ...p }));
    setStatus('loading');
    supabase
      .from('products')
      .select('*')
      .eq('department_slug', d.slug)
      .order('name')
      .then(({ data, error }) => {
        if (cancelled) return;
        // If the database can't be reached, still show whatever is in site.ts
        const fromDb: Item[] = error ? [] : (data as ProductRow[]).map(rowToItem);
        setItems([...fromDb, ...fromSite]);
        setStatus('ready');
      });
    return () => {
      cancelled = true;
    };
  }, [d]);

  // Content arrives after the page mounts, so run this section's reveals once it's in
  useLayoutEffect(() => {
    if (status !== 'ready') return;
    const ctx = gsap.context(() => revealAll(root.current!), root);
    return () => ctx.revert();
  }, [status]);

  return (
    <section className="dproducts" ref={root}>
      {active && <ProductQuickView product={active} onClose={() => setActive(null)} />}

      <div className="container">
        <span className="eyebrow eyebrow--amber">Products</span>

        {status === 'loading' ? (
          <ul className="dproducts__grid" aria-busy="true" aria-label="Loading products">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="pcard pcard--skeleton">
                <div className="pcard__media" />
                <div className="pcard__body"><i /><i /></div>
              </li>
            ))}
          </ul>
        ) : items.length > 0 ? (
          <>
            <h2 className="display" data-reveal="lines">
              Shop <em>{d.title.toLowerCase()}.</em>
            </h2>
            <ul className="dproducts__grid" data-stagger>
              {items.map(p => (
                <li className="pcard" key={p.key}>
                  <button type="button" className="pcard__btn" onClick={() => setActive(p)} aria-haspopup="dialog">
                    <div className="pcard__media">
                      {p.image ? <ProductImage src={p.image} alt={p.name} width={300} /> : <PackageOpen size={40} />}
                    </div>
                    <div className="pcard__body">
                      <h3>{p.name}</h3>
                      <div className="pcard__foot">
                        <span className="pcard__price">{priceLabel(p)}</span>
                        <StockBadge inStock={p.inStock} />
                      </div>
                    </div>
                  </button>
                  <QuickAdd product={p} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="dproducts__empty" data-reveal>
            <PackageOpen size={34} />
            <div>
              <h3>Product catalogue coming soon</h3>
              <p>
                We're busy adding our {d.title.toLowerCase()} range to the website. In the meantime, our team can tell
                you what's in stock and what it costs.
              </p>
            </div>
            <a href={waHref} target="_blank" rel="noreferrer" className="btn btn--amber">
              Ask what's in stock <ArrowUpRight size={18} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
