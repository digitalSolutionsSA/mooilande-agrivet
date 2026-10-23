import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { MessageCircle, ShoppingCart, Trash2, X } from 'lucide-react';
import { gsap, getLenis } from '../lib/motion';
import { cart, cartCount, cartTotal, enquiryHref, formatPrice, useCart } from '../lib/cart';
import QtyStepper from './QtyStepper';

/** Slide-in cart: review quantities, then send the whole list to the shop on WhatsApp. */
const CartDrawer: React.FC = () => {
  const { items, open } = useCart();
  const root = useRef<HTMLDivElement>(null);
  const count = cartCount(items);
  const hasUnpriced = items.some(i => i.price == null);

  useLayoutEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    document.documentElement.classList.add('modal-open');
    const ctx = gsap.context(() => {
      gsap.from('.cart__backdrop', { opacity: 0, duration: 0.4 });
      gsap.from('.cart__panel', { xPercent: 100, duration: 0.7, ease: 'expo.out' });
    }, root);
    return () => {
      document.documentElement.classList.remove('modal-open');
      getLenis()?.start();
      ctx.revert();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && cart.close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="cart" ref={root} role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="cart__backdrop" onClick={cart.close} />
      <aside className="cart__panel">
        <header className="cart__head">
          <h2 id="cart-title">
            Your enquiry list {count > 0 && <span>({count} {count === 1 ? 'item' : 'items'})</span>}
          </h2>
          <button type="button" className="modal__close" onClick={cart.close} aria-label="Close cart">
            <X size={20} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart__empty">
            <ShoppingCart size={38} />
            <p>Your cart is empty.</p>
            <small>Open any product and tap “Add to cart” to build a list, then send it to us in one WhatsApp message.</small>
          </div>
        ) : (
          <>
            <ul className="cart__list" data-lenis-prevent>
              {items.map(i => (
                <li key={i.key} className="cart__item">
                  <div className="cart__info">
                    {i.brand && <small>{i.brand}</small>}
                    <strong>{i.name}</strong>
                    <span>{i.price == null ? 'Price on request' : `${formatPrice(i.price)} each`}</span>
                  </div>
                  <div className="cart__controls">
                    <QtyStepper size="sm" value={i.qty} onChange={q => cart.setQty(i.key, q)} label={i.name} />
                    <span className="cart__line">{i.price == null ? '—' : formatPrice(i.price * i.qty)}</span>
                    <button type="button" className="cart__remove" onClick={() => cart.remove(i.key)} aria-label={`Remove ${i.name}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="cart__foot">
              <div className="cart__total">
                <span>Estimated total</span>
                <strong>
                  {formatPrice(cartTotal(items))} <small className="vat">incl. VAT</small>
                </strong>
              </div>
              {hasUnpriced && <p className="cart__note">Items priced on request aren’t included in the total.</p>}
              <a href={enquiryHref(items)} target="_blank" rel="noreferrer" className="btn btn--green cart__send">
                <MessageCircle size={18} /> Send enquiry on WhatsApp
              </a>
              <button type="button" className="cart__clear" onClick={cart.clear}>
                Clear cart
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
