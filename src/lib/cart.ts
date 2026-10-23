import { useSyncExternalStore } from 'react';
import { CONTACT } from '../data/site';

/**
 * Enquiry cart: visitors collect products with quantities, then send the whole list to the
 * shop as one WhatsApp message. Kept in this browser's localStorage so it survives page changes.
 */

export interface CartItem {
  key: string;
  name: string;
  brand?: string | null;
  /** Including VAT, as captured when the item was added */
  price: number | null;
  qty: number;
}

interface CartState {
  items: CartItem[];
  open: boolean;
}

const STORAGE_KEY = 'mooilande-cart';
const MAX_QTY = 999;

const load = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const items = raw ? (JSON.parse(raw) as CartItem[]) : [];
    return Array.isArray(items) ? items.filter(i => i && i.key && i.name && i.qty > 0) : [];
  } catch {
    return [];
  }
};

let state: CartState = { items: load(), open: false };
const listeners = new Set<() => void>();

const setState = (next: Partial<CartState>) => {
  state = { ...state, ...next };
  if (next.items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Private mode or storage blocked: the cart still works for this visit
    }
  }
  listeners.forEach(l => l());
};

const clampQty = (n: number) => Math.min(MAX_QTY, Math.max(1, Math.floor(n) || 1));

export const cart = {
  add(item: Omit<CartItem, 'qty'>, qty = 1) {
    const existing = state.items.find(i => i.key === item.key);
    setState({
      items: existing
        ? state.items.map(i => (i.key === item.key ? { ...i, ...item, qty: clampQty(i.qty + qty) } : i))
        : [...state.items, { ...item, qty: clampQty(qty) }],
    });
  },
  setQty(key: string, qty: number) {
    setState({ items: state.items.map(i => (i.key === key ? { ...i, qty: clampQty(qty) } : i)) });
  },
  remove(key: string) {
    setState({ items: state.items.filter(i => i.key !== key) });
  },
  clear() {
    setState({ items: [] });
  },
  open() {
    setState({ open: true });
  },
  close() {
    setState({ open: false });
  },
};

// Another tab changed the cart
if (typeof window !== 'undefined') {
  window.addEventListener('storage', e => e.key === STORAGE_KEY && setState({ items: load() }));
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const useCart = () => useSyncExternalStore(subscribe, () => state);

export const cartCount = (items: CartItem[]) => items.reduce((n, i) => n + i.qty, 0);

/** Total of the priced items; items "on request" are left out. */
export const cartTotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + (i.price ?? 0) * i.qty, 0);

export const formatPrice = (price: number | null) =>
  price == null ? null : `R ${price.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** The WhatsApp message listing every product, quantity and price. */
export function enquiryMessage(items: CartItem[]) {
  const lines = items.map((i, n) => {
    const name = i.brand ? `${i.name} (${i.brand})` : i.name;
    const price =
      i.price == null
        ? 'Price on request'
        : `${formatPrice(i.price)} each = *${formatPrice(i.price * i.qty)}*`;
    return `${n + 1}. *${name}*\n    Qty: ${i.qty} × ${price}`;
  });
  const hasUnpriced = items.some(i => i.price == null);
  return [
    "Hi Mooilande AgriVet, I'd like to enquire about the following products:",
    '',
    ...lines,
    '',
    `*Estimated total: ${formatPrice(cartTotal(items))} incl. VAT*${hasUnpriced ? ' (excluding items priced on request)' : ''}`,
    '',
    'Please confirm availability and the final price. Thank you!',
  ].join('\n');
}

export const enquiryHref = (items: CartItem[]) =>
  `${CONTACT.whatsappHref}?text=${encodeURIComponent(enquiryMessage(items))}`;
