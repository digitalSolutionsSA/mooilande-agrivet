import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, Loader2, PackageOpen, Search as SearchIcon, X } from 'lucide-react';
import { gsap, getLenis } from '../lib/motion';
import { DEPARTMENTS, departmentHref } from '../data/site';
import { ProductRow, supabase } from '../lib/supabase';
import ProductQuickView, { Item, QuickAdd, StockBadge, priceLabel, rowToItem } from './ProductQuickView';
import ProductImage from './ProductImage';

interface Result extends Item {
  department: string;
}

// Remembered between openings, so closing a quick view and reopening search keeps your place
let lastQuery = '';

const deptTitle = (slug: string) => DEPARTMENTS.find(d => d.slug === slug)?.title ?? '';

// Characters that would break a PostgREST filter; the rest is matched literally
const cleanWord = (w: string) => w.replace(/[,()*%\\:."']/g, '');

/** Every word must appear in the product's name or brand. */
async function searchProducts(query: string): Promise<Result[]> {
  const words = query.split(/\s+/).map(cleanWord).filter(Boolean).slice(0, 6);
  if (words.length === 0) return [];
  let req = supabase.from('products').select('*').eq('published', true);
  for (const w of words) req = req.or(`name.ilike.*${w}*,brand.ilike.*${w}*`);
  const { data, error } = await req.order('name').limit(40);
  if (error) throw error;
  return (data as ProductRow[]).map(p => ({ ...rowToItem(p), department: deptTitle(p.department_slug) }));
}

type Status = 'idle' | 'loading' | 'done' | 'error';

/** Navbar search: live product results; picking one opens its quick view. */
const Search: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState(lastQuery);
  const [results, setResults] = useState<Result[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [picked, setPicked] = useState<Item | null>(null);

  const q = query.trim();
  const depts = q.length >= 2 ? DEPARTMENTS.filter(d => d.title.toLowerCase().includes(q.toLowerCase())) : [];

  // Debounced lookup; a newer query always wins over a slower older one
  useEffect(() => {
    lastQuery = query;
    if (!open) return;
    if (q.length < 2) {
      setResults([]);
      setStatus('idle');
      return;
    }
    let stale = false;
    setStatus('loading');
    const t = window.setTimeout(() => {
      searchProducts(q)
        .then(r => {
          if (stale) return;
          setResults(r);
          setStatus('done');
        })
        .catch(() => !stale && setStatus('error'));
    }, 220);
    return () => {
      stale = true;
      window.clearTimeout(t);
    };
  }, [q, query, open]);

  useLayoutEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    document.documentElement.classList.add('modal-open');
    input.current?.focus();
    input.current?.select();
    const ctx = gsap.context(() => {
      gsap.from('.search__backdrop', { opacity: 0, duration: 0.3 });
      gsap.from('.search__panel', { y: -30, opacity: 0, duration: 0.5, ease: 'expo.out' });
    }, root);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('modal-open');
      getLenis()?.start();
      ctx.revert();
    };
  }, [open, onClose]);

  const pick = (item: Item) => {
    onClose();
    setPicked(item);
  };

  // Arrow keys move between the input and the result rows
  const focusables = () => Array.from(list.current?.querySelectorAll<HTMLElement>('[data-result]') ?? []);
  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusables()[0]?.focus();
    } else if (e.key === 'Enter' && results[0]) {
      pick(results[0]);
    }
  };
  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const els = focusables();
    const i = els.indexOf(document.activeElement as HTMLElement);
    const next = e.key === 'ArrowDown' ? i + 1 : i - 1;
    if (next < 0) input.current?.focus();
    else els[Math.min(next, els.length - 1)]?.focus();
  };

  return (
    <>
      {open && (
        <div className="search" ref={root} role="dialog" aria-modal="true" aria-label="Search products">
          <div className="search__backdrop" onClick={onClose} />
          <div className="search__panel">
            <div className="search__bar">
              <SearchIcon size={20} />
              <input
                ref={input}
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search products or brands…"
                aria-label="Search products or brands"
                autoComplete="off"
                enterKeyHint="search"
              />
              {status === 'loading' && <Loader2 size={18} className="search__spin" />}
              <button type="button" className="search__close" onClick={onClose} aria-label="Close search">
                <X size={20} />
              </button>
            </div>

            <div className="search__body" data-lenis-prevent>
              {q.length < 2 ? (
                <div className="search__hint">
                  <p>Type at least 2 letters to search all our products, or jump to a department:</p>
                  <div className="search__chips">
                    {DEPARTMENTS.map(d => (
                      <a key={d.slug} href={departmentHref(d)} onClick={onClose}>{d.title}</a>
                    ))}
                  </div>
                </div>
              ) : (
                <ul className="search__list" ref={list} onKeyDown={onListKey}>
                  {depts.map(d => (
                    <li key={d.slug}>
                      <a href={departmentHref(d)} className="sresult sresult--dept" onClick={onClose} data-result>
                        <span className="sresult__main">
                          <strong>{d.title}</strong>
                          <small>Department</small>
                        </span>
                        <ArrowUpRight size={16} />
                      </a>
                    </li>
                  ))}
                  {results.map(r => (
                    <li key={r.key} className="sresult__row">
                      <button type="button" className="sresult" onClick={() => pick(r)} data-result>
                        <span className="sresult__thumb">
                          {r.image ? <ProductImage src={r.image} width={52} /> : <PackageOpen size={20} />}
                        </span>
                        <span className="sresult__main">
                          <strong>{r.name}</strong>
                          <small>{[r.brand, r.department].filter(Boolean).join(' · ')}</small>
                        </span>
                        <span className="sresult__side">
                          <span className="pcard__price">{priceLabel(r)}</span>
                          <StockBadge inStock={r.inStock} />
                        </span>
                      </button>
                      <QuickAdd product={r} className="sresult__add" />
                    </li>
                  ))}
                  {status === 'done' && results.length === 0 && depts.length === 0 && (
                    <li className="search__empty">
                      No products match “{q}”. Try a shorter word or a brand name, or ask us on WhatsApp.
                    </li>
                  )}
                  {status === 'error' && <li className="search__empty">Search isn't available right now. Please try again.</li>}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
      {picked && <ProductQuickView product={picked} onClose={() => setPicked(null)} />}
    </>
  );
};

export default Search;
