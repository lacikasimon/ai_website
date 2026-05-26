import { useLocation } from 'react-router';
import { siteContent } from '../content/siteContent';
import { absoluteUrl } from './siteOrigin';

function humanizeSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getBreadcrumbName(path: string, segment: string) {
  const staticNames: Record<string, string> = {
    '/contact': 'Contact',
    '/proiecte': 'Proiecte',
    '/finantare-ue': 'Finanțare UE',
    '/blog': 'Blog',
    '/politica-cookie-uri': siteContent.cookiePolicy.title,
    '/termeni-si-conditii': 'Termeni și condiții',
    '/politica-de-retur': 'Politica de retur',
    '/gdpr': siteContent.gdprPolicy.title,
    '/admin': 'Admin',
  };

  if (staticNames[path]) return staticNames[path];

  if (path.startsWith('/servicii/')) {
    return siteContent.servicesCatalog.find((service) => service.slug === segment)?.title ?? humanizeSlug(segment);
  }

  if (path.startsWith('/pagini/')) {
    return humanizeSlug(segment);
  }

  if (path.startsWith('/blog/')) {
    return humanizeSlug(segment);
  }

  return humanizeSlug(segment);
}

export function BreadcrumbJsonLd() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const items =
    segments[0] === 'servicii' && segments[1]
      ? [
          { name: 'Acasă', path: '/' },
          { name: 'Servicii', path: '/#servicii' },
          {
            name: getBreadcrumbName(location.pathname, segments[1]),
            path: location.pathname,
          },
        ]
      : segments[0] === 'pagini' && segments[1]
        ? [
            { name: 'Acasă', path: '/' },
            {
              name: getBreadcrumbName(location.pathname, segments[1]),
              path: location.pathname,
            },
          ]
        : segments[0] === 'blog' && segments[1]
          ? [
              { name: 'Acasă', path: '/' },
              { name: 'Blog', path: '/blog' },
              {
                name: getBreadcrumbName(location.pathname, segments[1]),
                path: location.pathname,
              },
            ]
        : [
            { name: 'Acasă', path: '/' },
            ...segments.map((segment, index) => {
              const path = `/${segments.slice(0, index + 1).join('/')}`;
              return {
                name: getBreadcrumbName(path, segment),
                path,
              };
            }),
          ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
