import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryBanner from './components/CategoryBanner';
import FeaturesSection from './components/FeaturesSection';
import ProductsSection from './components/ProductsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Cart from './components/Cart';
import { Product, CartItem } from './data/products';

const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Brief flash of cart
    setCartOpen(true);
    setTimeout(() => {}, 300);
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev
        .map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const handleRemove = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <>
      <Navbar
        cartItems={cartItems}
        onCartOpen={() => setCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main>
        <Hero />
        <CategoryBanner />
        <ProductsSection searchQuery={searchQuery} onAddToCart={handleAddToCart} />
        <FeaturesSection />
        <ContactSection />
      </main>

      <Footer />

      <Cart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />
    </>
  );
};

export default App;
