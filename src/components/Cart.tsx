import React from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { CartItem } from '../data/products';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal > 1200 ? 0 : 129;
  const total = subtotal + shipping;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(26,18,8,0.55)',
          backdropFilter: 'blur(4px)',
          zIndex: 1999,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(420px, 100vw)',
        background: 'var(--clr-cream)',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '-8px 0 64px rgba(26,18,8,0.15)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px',
          borderBottom: '1px solid var(--clr-grey-light)',
          background: 'var(--clr-white)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingBag size={20} color="var(--clr-moss)" />
            <h2 style={{
              fontFamily: 'var(--ff-display)',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--clr-text)',
            }}>
              Your Cart
            </h2>
            {items.length > 0 && (
              <span style={{
                background: 'var(--clr-moss)',
                color: 'white',
                borderRadius: 'var(--radius-full)',
                padding: '2px 10px',
                fontSize: '12px',
                fontWeight: 700,
              }}>
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'var(--clr-grey-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--clr-text-muted)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--clr-grey-mid)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--clr-grey-light)')}
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--clr-text-muted)' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <p style={{ fontFamily: 'var(--ff-display)', fontSize: '1.1rem' }}>Your cart is empty</p>
              <p style={{ fontSize: '14px', marginTop: 8 }}>Add some products to get started</p>
              <button onClick={onClose} style={{
                marginTop: 24,
                background: 'var(--clr-moss)',
                color: 'white',
                padding: '10px 24px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '14px',
                transition: 'background 0.2s',
              }}>
                Browse Products
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map(item => (
                <div key={item.id} style={{
                  background: 'var(--clr-white)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  display: 'flex',
                  gap: 12,
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 72, height: 72, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--clr-text)', lineHeight: 1.3 }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--clr-text-muted)', marginTop: 2 }}>
                      {item.category}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                      {/* Quantity */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          style={{
                            width: 28, height: 28,
                            background: 'var(--clr-grey-light)',
                            borderRadius: '8px 0 0 8px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--clr-text-muted)',
                            fontSize: '16px',
                          }}>
                          <Minus size={12} />
                        </button>
                        <span style={{
                          width: 32, height: 28,
                          background: 'var(--clr-grey-light)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: 700,
                          borderLeft: '1px solid var(--clr-grey-mid)',
                          borderRight: '1px solid var(--clr-grey-mid)',
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          style={{
                            width: 28, height: 28,
                            background: 'var(--clr-grey-light)',
                            borderRadius: '0 8px 8px 0',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--clr-text-muted)',
                          }}>
                          <Plus size={12} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, color: 'var(--clr-moss)', fontSize: '15px' }}>
                          R{(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button onClick={() => onRemove(item.id)} style={{ color: 'var(--clr-grey-mid)', transition: 'color 0.2s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'var(--clr-rust)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--clr-grey-mid)')}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div style={{
            borderTop: '1px solid var(--clr-grey-light)',
            padding: '20px 24px',
            background: 'var(--clr-white)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--clr-text-muted)' }}>
                <span>Subtotal</span>
                <span>R{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--clr-text-muted)' }}>
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? 'var(--clr-fern)' : undefined }}>
                  {shipping === 0 ? 'FREE' : `R${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p style={{ fontSize: '12px', color: 'var(--clr-leaf)', background: 'rgba(90,140,42,0.08)', padding: '6px 10px', borderRadius: 6 }}>
                  Add R{(1200 - subtotal).toFixed(2)} more for free delivery!
                </p>
              )}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontWeight: 700,
                fontSize: '18px',
                color: 'var(--clr-text)',
                borderTop: '1px solid var(--clr-grey-light)',
                paddingTop: 12,
                fontFamily: 'var(--ff-display)',
              }}>
                <span>Total</span>
                <span style={{ color: 'var(--clr-moss)' }}>R{total.toFixed(2)}</span>
              </div>
            </div>

            <button style={{
              width: '100%',
              background: 'var(--clr-moss)',
              color: 'white',
              padding: '15px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--clr-fern)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--clr-moss)')}>
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--clr-text-muted)', marginTop: 12 }}>
              🔒 Secure checkout · Accepts EFT, Card & SnapScan
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
