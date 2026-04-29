import { useEffect } from 'react';
import { useLocation } from 'react-router';

const HEADER_OFFSET = 96;

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  const element = document.getElementById(id);

  if (!element) {
    return false;
  }

  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: 'auto' });
  return true;
}

export function RouteScroll() {
  const location = useLocation();

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (location.hash) {
        if (!scrollToHash(location.hash)) {
          window.setTimeout(() => scrollToHash(location.hash), 100);
        }
        return;
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.pathname, location.hash, location.key]);

  return null;
}
