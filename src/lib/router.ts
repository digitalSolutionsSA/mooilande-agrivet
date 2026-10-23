import { useEffect, useLayoutEffect, useSyncExternalStore } from 'react';
import { ScrollTrigger, getLenis } from './motion';

/**
 * Tiny client-side router: real URLs (/products/animal-health) via the History API.
 * Same-origin link clicks are handled here, including "#section" and "/#section",
 * so they scroll smoothly on the current page or switch pages and then scroll.
 */

const listeners = new Set<() => void>();
let pendingHash = '';

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener('popstate', cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('popstate', cb);
  };
};

export const usePath = () => useSyncExternalStore(subscribe, () => window.location.pathname);

export function scrollToHash(hash: string, immediate = false) {
  const target = hash.length > 1 ? document.querySelector<HTMLElement>(hash) : null;
  if (!target) return false;
  const lenis = getLenis();
  // The page may have just changed length (new route); let Lenis re-measure before scrolling
  lenis?.resize();
  if (lenis) lenis.scrollTo(target, { offset: -70, duration: immediate ? 0 : 1.6, immediate, force: true });
  else target.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
  return true;
}

export function navigate(to: string) {
  const url = new URL(to, window.location.href);
  if (url.pathname === window.location.pathname) {
    if (url.hash) scrollToHash(url.hash);
    else getLenis()?.scrollTo(0, { duration: 1.4, force: true });
    return;
  }
  history.pushState(null, '', url.pathname + url.hash);
  pendingHash = url.hash;
  listeners.forEach(l => l());
}

/** Intercepts internal link clicks; call once near the app root. */
export function useLinkInterception() {
  useEffect(() => {
    history.scrollRestoration = 'manual';
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href || /^(mailto:|tel:|https?:)/.test(href)) return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}

/** After a page switch: re-measure scroll animations, then land at the top or the requested section. */
export function useRouteScroll(path: string) {
  useLayoutEffect(() => {
    const hash = pendingHash || window.location.hash;
    pendingHash = '';
    getLenis()?.resize();
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    // Wait a frame so the new page's ScrollTriggers (pins especially) exist before measuring
    const id = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      if (hash) scrollToHash(hash, true);
    });
    return () => cancelAnimationFrame(id);
  }, [path]);
}
