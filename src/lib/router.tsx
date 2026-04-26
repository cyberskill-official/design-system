import { useEffect, useState } from 'react';

/**
 * Tiny hash router — same shape as the legacy SPA so existing
 * routes ("home", "wiki/p1", "show/button" …) work unchanged.
 */
export function useHashRoute(): string {
  const [route, setRoute] = useState<string>(() =>
    location.hash.replace(/^#/, '') || 'home',
  );
  useEffect(() => {
    const onHash = () => setRoute(location.hash.replace(/^#/, '') || 'home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

export function navigate(route: string) {
  location.hash = '#' + route;
}
