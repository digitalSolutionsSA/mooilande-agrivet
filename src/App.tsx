import React, { Suspense, lazy, useEffect, useState } from 'react';
import { ScrollTrigger, useSmoothScroll } from './lib/motion';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import About from './components/About';
import Departments from './components/Departments';
import Team from './components/Team';
import Channel from './components/Channel';
import Deliveries from './components/Deliveries';
import Contact from './components/Contact';
import Terms from './components/Terms';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { usePath, useLinkInterception, useRouteScroll } from './lib/router';
import { DEPARTMENTS } from './data/site';

// Department pages (and the database client they use) load separately from the homepage
const loadDepartmentPage = () => import('./components/DepartmentPage');
const DepartmentPage = lazy(loadDepartmentPage);

const App: React.FC = () => {
  const [ready, setReady] = useState(false);
  const path = usePath();
  useSmoothScroll();
  useLinkInterception();
  useRouteScroll(path);

  // /products/<slug> opens that department's page; anything else is the home page
  const slug = path.match(/^\/products\/([^/]+)\/?$/)?.[1];
  const department = DEPARTMENTS.find(d => d.slug === slug);

  // Pinned sections depend on final image/font sizes
  useEffect(() => {
    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  // Once the page is idle, fetch the department page code in the background so clicks feel instant
  useEffect(() => {
    const warm = () => void loadDepartmentPage();
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const id = ric ? ric(warm) : window.setTimeout(warm, 3000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Navbar ready={ready} />

      <main>
        {department ? (
          <Suspense fallback={<div className="page-loading" />}>
            <DepartmentPage key={department.slug} department={department} />
          </Suspense>
        ) : (
          <>
            <Hero ready={ready} />
            <Ticker />
            <About />
            <Departments />
            <Team />
            <Channel />
            <Deliveries />
            <Contact />
            <Terms />
          </>
        )}
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
};

export default App;
