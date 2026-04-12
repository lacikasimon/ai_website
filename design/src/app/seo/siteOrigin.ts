/** Abszolút origin (canonical, OG URL). Állítsd: VITE_SITE_URL=https://pelda.ro a .env-ben */
export function getSiteOrigin(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;
  if (fromEnv?.trim()) {
    return fromEnv.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
}

export function absoluteUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '') || '';
  const p = path.startsWith('/') ? path : `/${path}`;
  const origin = getSiteOrigin();
  if (!origin) {
    return `${base}${p}` || p;
  }
  return `${origin}${base}${p}`;
}
