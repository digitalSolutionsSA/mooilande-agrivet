import React, { useEffect, useRef, useState } from 'react';
import { ImagePlus, Trash2, X } from 'lucide-react';
import { DEPARTMENTS } from '../data/site';
import { PRODUCT_BUCKET, ProductRow, productImageUrl, supabase } from '../lib/supabase';

interface Props {
  product: ProductRow | null; // null = new product
  defaultDept: string;
  onClose: () => void;
  onSaved: (p: ProductRow, isNew: boolean) => void;
}

const MAX_BYTES = 15 * 1024 * 1024;
const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
const MAX_SIDE = 1600;

/**
 * Phone photos are often 3–10 MB. Scale to at most 1600px and re-encode as WebP before upload,
 * so the stored original is small too. Keeps the original if the browser can't, or if it isn't smaller.
 */
async function shrinkImage(file: File): Promise<{ blob: Blob; type: string; ext: string }> {
  const original = { blob: file as Blob, type: file.type, ext: file.name.split('.').pop()?.toLowerCase() || 'jpg' };
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/webp', 0.82));
    return blob && blob.type === 'image/webp' && blob.size < file.size ? { blob, type: 'image/webp', ext: 'webp' } : original;
  } catch {
    return original;
  }
}

const ProductForm: React.FC<Props> = ({ product, defaultDept, onClose, onSaved }) => {
  const isNew = !product;
  const [form, setForm] = useState({
    department_slug: product?.department_slug ?? defaultDept,
    name: product?.name ?? '',
    brand: product?.brand ?? '',
    description: product?.description ?? '',
    price: product?.price != null ? String(product.price) : '',
    in_stock: product?.in_stock ?? true,
    published: product?.published ?? true,
  });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(productImageUrl(product?.image_path ?? null));
  const [removeImage, setRemoveImage] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const brands = DEPARTMENTS.find(d => d.slug === form.department_slug)?.brands ?? [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !busy && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [busy, onClose]);

  // Revoke local preview URLs when they're replaced
  useEffect(() => () => {
    if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
  }, [preview]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  const pick = (f: File | undefined) => {
    if (!f) return;
    if (!TYPES.includes(f.type)) return setError('Please use a JPG, PNG, WebP or AVIF image.');
    if (f.size > MAX_BYTES) return setError('That image is over 15 MB. Please use a smaller one.');
    setError('');
    setFile(f);
    setRemoveImage(false);
    setPreview(URL.createObjectURL(f));
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = form.price.trim() === '' ? null : Number(form.price.replace(',', '.'));
    if (price != null && (Number.isNaN(price) || price < 0)) return setError('Price must be a number, or leave it empty.');
    setBusy(true);
    setError('');

    // 1. Upload a new photo first, so a failed upload never leaves the product without one
    let image_path = removeImage ? null : product?.image_path ?? null;
    let uploaded: string | null = null;
    if (file) {
      const { blob, type, ext } = await shrinkImage(file);
      uploaded = `${form.department_slug}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(PRODUCT_BUCKET)
        .upload(uploaded, blob, { contentType: type, cacheControl: '31536000' });
      if (upErr) {
        setBusy(false);
        return setError(`Image upload failed: ${upErr.message}`);
      }
      image_path = uploaded;
    }

    // 2. Save the product
    const payload = {
      department_slug: form.department_slug,
      name: form.name.trim(),
      brand: form.brand.trim() || null,
      description: form.description.trim() || null,
      price,
      in_stock: form.in_stock,
      published: form.published,
      image_path,
    };
    const result = isNew
      ? await supabase.from('products').insert(payload).select().single()
      : await supabase.from('products').update(payload).eq('id', product!.id).select().single();

    if (result.error) {
      if (uploaded) await supabase.storage.from(PRODUCT_BUCKET).remove([uploaded]);
      setBusy(false);
      return setError(result.error.message);
    }

    // 3. Tidy up the old photo if it was replaced or removed
    const old = product?.image_path;
    if (old && old !== image_path) await supabase.storage.from(PRODUCT_BUCKET).remove([old]);

    setBusy(false);
    onSaved(result.data as ProductRow, isNew);
  };

  return (
    <div className="adm-drawer" role="dialog" aria-modal="true" aria-labelledby="pf-title">
      <div className="adm-drawer__backdrop" onClick={() => !busy && onClose()} />
      <form className="adm-drawer__panel" onSubmit={save}>
        <header className="adm-drawer__head">
          <h2 id="pf-title">{isNew ? 'Add product' : 'Edit product'}</h2>
          <button type="button" className="adm-icon" onClick={onClose} disabled={busy} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        <div className="adm-drawer__body">
          <div
            className={`adm-drop ${dragging ? 'is-drag' : ''} ${preview ? 'has-image' : ''}`}
            onClick={() => fileInput.current?.click()}
            onDragOver={e => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => {
              e.preventDefault();
              setDragging(false);
              pick(e.dataTransfer.files[0]);
            }}
          >
            {preview ? (
              <>
                <img src={preview} alt="" />
                <button
                  type="button"
                  className="adm-drop__remove"
                  onClick={e => {
                    e.stopPropagation();
                    setFile(null);
                    setPreview(null);
                    setRemoveImage(true);
                  }}
                >
                  <Trash2 size={15} /> Remove photo
                </button>
              </>
            ) : (
              <div className="adm-drop__empty">
                <ImagePlus size={30} />
                <strong>Add a product photo</strong>
                <span>Drag an image here or click to choose · JPG, PNG or WebP up to 15 MB (resized automatically)</span>
              </div>
            )}
            <input
              ref={fileInput}
              type="file"
              accept={TYPES.join(',')}
              hidden
              onChange={e => {
                pick(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
          </div>

          <label className="adm-field">
            <span>Product name *</span>
            <input required maxLength={200} value={form.name} onChange={set('name')} placeholder="e.g. Multimin 500 ml" />
          </label>

          <div className="adm-grid2">
            <label className="adm-field">
              <span>Department *</span>
              <select value={form.department_slug} onChange={set('department_slug')}>
                {DEPARTMENTS.map(d => (
                  <option key={d.slug} value={d.slug}>{d.title}</option>
                ))}
              </select>
            </label>
            <label className="adm-field">
              <span>Brand</span>
              <input list="pf-brands" maxLength={120} value={form.brand} onChange={set('brand')} placeholder="Choose or type a brand" />
              <datalist id="pf-brands">
                {brands.map(b => <option key={b.name} value={b.name} />)}
              </datalist>
            </label>
          </div>

          <label className="adm-field">
            <span>Description</span>
            <textarea rows={4} maxLength={2000} value={form.description} onChange={set('description')} placeholder="Size, use, dosage notes…" />
          </label>

          <label className="adm-field">
            <span>Price (R)</span>
            <input inputMode="decimal" value={form.price} onChange={set('price')} placeholder="Leave empty for “price on request”" />
          </label>

          <div className="adm-toggles">
            <label className="adm-switch">
              <input type="checkbox" checked={form.in_stock} onChange={set('in_stock')} />
              <i />
              <span>In stock</span>
            </label>
            <label className="adm-switch">
              <input type="checkbox" checked={form.published} onChange={set('published')} />
              <i />
              <span>Visible on website</span>
            </label>
          </div>

          {error && <p className="adm-alert adm-alert--error">{error}</p>}
        </div>

        <footer className="adm-drawer__foot">
          <button type="button" className="adm-btn adm-btn--ghost" onClick={onClose} disabled={busy}>Cancel</button>
          <button className="adm-btn adm-btn--primary" disabled={busy}>
            {busy ? 'Saving…' : isNew ? 'Add product' : 'Save changes'}
          </button>
        </footer>
      </form>
    </div>
  );
};

export default ProductForm;
