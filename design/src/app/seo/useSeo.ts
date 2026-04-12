import { useLayoutEffect } from 'react';
import { absoluteUrl, getSiteOrigin } from './siteOrigin';

export type SeoOptions = {
  title: string;
  description: string;
  /** Útvonal a canonicalhoz, pl. /contact */
  path: string;
  /** Open Graph / Twitter kép */
  ogImage?: string;
  /** Opcionális kulcsszavak (vesszővel) */
  keywords?: string;
  /** true = noindex (pl. tesztoldal) */
  noindex?: boolean;
};

function setMetaAttr(selector: string, attr: string, key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`${selector}[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLinkRel(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Oldalankénti title, meta description, Open Graph, Twitter, canonical.
 * Segíti a keresőket és az AI-alapú linkelemzőket (preview, összefoglalók).
 */
export function useSeo(opts: SeoOptions) {
  const { title, description, path, ogImage, keywords, noindex } = opts;

  useLayoutEffect(() => {
    document.title = title;

    setMetaAttr('meta', 'name', 'description', description);

    const kwEl = document.head.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    if (keywords !== undefined) {
      if (keywords) {
        setMetaAttr('meta', 'name', 'keywords', keywords);
      } else {
        kwEl?.remove();
      }
    }

    setMetaAttr('meta', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    const url = absoluteUrl(path);
    setMetaAttr('meta', 'property', 'og:title', title);
    setMetaAttr('meta', 'property', 'og:description', description);
    setMetaAttr('meta', 'property', 'og:type', 'website');
    setMetaAttr('meta', 'property', 'og:url', url);
    setMetaAttr('meta', 'property', 'og:locale', 'ro_RO');
    if (ogImage) {
      setMetaAttr('meta', 'property', 'og:image', ogImage);
    }

    setMetaAttr('meta', 'name', 'twitter:card', ogImage ? 'summary_large_image' : 'summary');
    setMetaAttr('meta', 'name', 'twitter:title', title);
    setMetaAttr('meta', 'name', 'twitter:description', description);
    if (ogImage) {
      setMetaAttr('meta', 'name', 'twitter:image', ogImage);
    }

    const origin = getSiteOrigin();
    if (origin) {
      setLinkRel('canonical', url);
    }
  }, [title, description, path, ogImage, keywords, noindex]);
}
