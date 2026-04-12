import { siteContent } from '../content/siteContent';
import { absoluteUrl, getSiteOrigin } from './siteOrigin';
import genesysLogo from '../../assets/genesys-logo.svg';

/** Schema.org Organization + LocalBusiness — jobb megjelenés keresőben és AI-felületeken */
export function JsonLdOrg() {
  const { company, contact, meta, home } = siteContent;
  const phone = contact.phones[0]?.tel;
  const origin = getSiteOrigin();
  const logoUrl = origin ? `${origin}${genesysLogo}` : genesysLogo;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': `${absoluteUrl('/')}#organization`,
        name: company.name,
        description: meta.description,
        url: absoluteUrl('/'),
        logo: logoUrl,
        image: logoUrl,
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.street,
          addressLocality: company.locality,
          addressRegion: company.county,
          postalCode: company.postalCode,
          addressCountry: 'RO',
        },
        ...(phone ? { telephone: phone } : {}),
        taxID: company.cui.replace(/^RO\s*/i, ''),
        foundingDate: company.founded,
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'România',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${absoluteUrl('/')}#website`,
        url: absoluteUrl('/'),
        name: meta.ogTitle,
        description: meta.description,
        publisher: { '@id': `${absoluteUrl('/')}#organization` },
        inLanguage: 'ro-RO',
      },
      {
        '@type': 'FAQPage',
        '@id': `${absoluteUrl('/')}#faq`,
        url: absoluteUrl('/'),
        mainEntity: home.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
