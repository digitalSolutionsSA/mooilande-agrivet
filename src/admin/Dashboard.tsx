import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { ExternalLink, Eye, EyeOff, LogOut, Package, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { DEPARTMENTS } from '../data/site';
import { PRODUCT_BUCKET, ProductRow, formatPrice, productImageUrl, supabase } from '../lib/supabase';
import ProductImage from '../components/ProductImage';
import ProductForm from './ProductForm';

interface Props {
  session: Session;
}

const deptTitle = (slug: string) => DEPARTMENTS.find(d => d.slug === slug)?.title ?? slug;

const Dashboard: React.FC<Props> = ({ session }) => {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dept, setDept] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<ProductRow | 'new' | null>(null);
  const [toast, setToast] = useState('');

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('department_slug')
      .order('name');
    if (error) setError(error.message);
    else setProducts(data as ProductRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    products.forEach(p => (c[p.department_slug] = (c[p.department_slug] ?? 0) + 1));
    return c;
  }, [products]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      p =>
        (dept === 'all' || p.department_slug === dept) &&
        (!q || [p.name, p.brand, p.description].some(v => v?.toLowerCase().includes(q))),
    );
  }, [products, dept, query]);

  const togglePublished = async (p: ProductRow) => {
    const { error } = await supabase.from('products').update({ published: !p.published }).eq('id', p.id);
    if (error) return setError(error.message);
    setProducts(list => list.map(x => (x.id === p.id ? { ...x, published: !p.published } : x)));
    setToast(p.published ? `"${p.name}" hidden from the website` : `"${p.name}" is now visible`);
  };

  const remove = async (p: ProductRow) => {
    if (!window.confirm(`Delete "${p.name}"? This can't be undone.`)) return;
    const { error } = await supabase.from('products').delete().eq('id', p.id);
    if (error) return setError(error.message);
    if (p.image_path) await supabase.storage.from(PRODUCT_BUCKET).remove([p.image_path]);
    setProducts(list => list.filter(x => x.id !== p.id));
    setToast(`"${p.name}" deleted`);
  };

  const onSaved = (saved: ProductRow, isNew: boolean) => {
    setProducts(list => (isNew ? [...list, saved] : list.map(x => (x.id === saved.id ? saved : x))));
    setEditing(null);
    setToast(isNew ? `"${saved.name}" added` : `"${saved.name}" saved`);
  };

  return (
    <div className="adm adm-shell">
      <header className="adm-top">
        <a href="/dssa-portals" className="adm-top__brand">
          <img src="/animals-logo.webp" alt="" />
          <span>
            <strong>Mooilande AgriVet</strong>
            <small>Admin portal</small>
          </span>
        </a>
        <div className="adm-top__actions">
          <a href="/" target="_blank" rel="noreferrer" className="adm-btn adm-btn--ghost adm-btn--sm">
            <ExternalLink size={15} /> View website
          </a>
          <span className="adm-top__user">{session.user.email}</span>
          <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => supabase.auth.signOut()}>
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </header>

      <aside className="adm-side">
        <span className="adm-eyebrow">Departments</span>
        <button className={`adm-side__item ${dept === 'all' ? 'is-active' : ''}`} onClick={() => setDept('all')}>
          All products <em>{products.length}</em>
        </button>
        {DEPARTMENTS.map(d => (
          <button
            key={d.slug}
            className={`adm-side__item ${dept === d.slug ? 'is-active' : ''}`}
            onClick={() => setDept(d.slug)}
          >
            {d.title} <em>{counts[d.slug] ?? 0}</em>
          </button>
        ))}
      </aside>

      <main className="adm-main">
        <div className="adm-main__head">
          <div>
            <h1>{dept === 'all' ? 'All products' : deptTitle(dept)}</h1>
            <p>
              {visible.length} product{visible.length === 1 ? '' : 's'}
              {dept !== 'all' && (
                <>
                  {' · '}
                  <a href={`/products/${dept}`} target="_blank" rel="noreferrer">See department page</a>
                </>
              )}
            </p>
          </div>
          <div className="adm-main__tools">
            <label className="adm-search">
              <Search size={16} />
              <input placeholder="Search products" value={query} onChange={e => setQuery(e.target.value)} />
            </label>
            <button className="adm-btn adm-btn--primary" onClick={() => setEditing('new')}>
              <Plus size={17} /> Add product
            </button>
          </div>
        </div>

        {error && (
          <p className="adm-alert adm-alert--error">
            {error} <button className="adm-link" onClick={() => setError('')}>Dismiss</button>
          </p>
        )}

        {loading ? (
          <div className="adm-center adm-center--inline"><div className="adm-spinner" /></div>
        ) : visible.length === 0 ? (
          <div className="adm-empty">
            <Package size={36} />
            <h2>{query ? 'No products match your search' : 'No products here yet'}</h2>
            <p>Products you add appear on the department page straight away (unless you hide them).</p>
            <button className="adm-btn adm-btn--primary" onClick={() => setEditing('new')}>
              <Plus size={17} /> Add the first product
            </button>
          </div>
        ) : (
          <ul className="adm-list">
            {visible.map(p => {
              const img = productImageUrl(p.image_path);
              return (
                <li key={p.id} className={`adm-row ${p.published ? '' : 'is-hidden'}`}>
                  <div className="adm-row__img">{img ? <ProductImage src={img} width={56} /> : <Package size={22} />}</div>
                  <div className="adm-row__main">
                    <strong>{p.name}</strong>
                    <span>
                      {[p.brand, dept === 'all' ? deptTitle(p.department_slug) : null].filter(Boolean).join(' · ') || '—'}
                    </span>
                  </div>
                  <div className="adm-row__meta">
                    <span className="adm-price">{formatPrice(p.price) ?? 'Price on request'}</span>
                    <span className={`adm-badge ${p.in_stock ? 'adm-badge--ok' : 'adm-badge--warn'}`}>
                      {p.in_stock ? 'In stock' : 'Out of stock'}
                    </span>
                    {!p.published && <span className="adm-badge">Hidden</span>}
                  </div>
                  <div className="adm-row__actions">
                    <button className="adm-icon" title={p.published ? 'Hide from website' : 'Show on website'} onClick={() => togglePublished(p)}>
                      {p.published ? <Eye size={17} /> : <EyeOff size={17} />}
                    </button>
                    <button className="adm-icon" title="Edit" onClick={() => setEditing(p)}>
                      <Pencil size={17} />
                    </button>
                    <button className="adm-icon adm-icon--danger" title="Delete" onClick={() => remove(p)}>
                      <Trash2 size={17} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>

      {editing && (
        <ProductForm
          product={editing === 'new' ? null : editing}
          defaultDept={dept === 'all' ? DEPARTMENTS[0].slug : dept}
          onClose={() => setEditing(null)}
          onSaved={onSaved}
        />
      )}

      {toast && <div className="adm-toast">{toast}</div>}
    </div>
  );
};

export default Dashboard;
