import { siteContent } from '../content/siteContent';
import { absoluteUrl, getSiteOrigin } from './siteOrigin';
import genesysLogo from '../../assets/genesys-logo.svg';

/** Schema.org Organization + LocalBusiness — jobb megjelenés keresőben és AI-felületeken */
export function JsonLdOrg() {
  const { company, contact, meta, home, servicesCatalog } = siteContent;
  const phone = contact.phones[0]?.tel;
  const origin = getSiteOrigin();
  const logoUrl = origin ? `${origin}${genesysLogo}` : genesysLogo;
  const organizationId = `${absoluteUrl('/')}#organization`;
  const websiteId = `${absoluteUrl('/')}#website`;
  const serviceGraph = servicesCatalog.map((service) => ({
    '@type': 'Service',
    '@id': `${absoluteUrl(`/servicii/${service.slug}`)}#service`,
    name: service.title,
    description: service.description,
    url: absoluteUrl(`/servicii/${service.slug}`),
    provider: { '@id': organizationId },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Satu Mare',
      },
      {
        '@type': 'Country',
        name: 'România',
      },
    ],
    serviceType: service.title,
    category: 'Servicii tehnice pentru instalații electrice, fotovoltaice și securitate',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} - livrabile`,
      itemListElement: service.features.map((feature, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: feature,
        },
      })),
    },
  }));

  const pageGraph = [
    {
      '@type': 'WebPage',
      '@id': `${absoluteUrl('/')}#webpage`,
      url: absoluteUrl('/'),
      name: meta.title,
      description: meta.description,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      inLanguage: 'ro-RO',
    },
    {
      '@type': 'ContactPage',
      '@id': `${absoluteUrl('/contact')}#webpage`,
      url: absoluteUrl('/contact'),
      name: 'Contact GENE SYS SECURITY SRL',
      description: 'Formular de contact, telefon, adresă și hartă pentru solicitări de ofertă.',
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      inLanguage: 'ro-RO',
    },
    {
      '@type': 'CollectionPage',
      '@id': `${absoluteUrl('/proiecte')}#webpage`,
      url: absoluteUrl('/proiecte'),
      name: 'Proiecte GENE SYS SECURITY SRL',
      description: 'Exemple reprezentative de lucrări pentru instalații electrice, fotovoltaice și securitate.',
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      inLanguage: 'ro-RO',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': organizationId,
        name: company.name,
        description: meta.description,
        url: absoluteUrl('/'),
        logo: logoUrl,
        image: logoUrl,
        keywords: meta.keywords,
        knowsAbout: [
          'instalații electrice',
          'proiectare instalații electrice',
          'sisteme fotovoltaice',
          'supraveghere video CCTV',
          'detecție la efracție',
          'mentenanță tehnică',
          'infrastructură electrică',
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.street,
          addressLocality: company.locality,
          addressRegion: company.county,
          postalCode: company.postalCode,
          addressCountry: 'RO',
        },
        ...(phone ? { telephone: phone } : {}),
        contactPoint: phone
          ? {
              '@type': 'ContactPoint',
              telephone: phone,
              contactType: 'sales',
              areaServed: 'RO',
              availableLanguage: ['ro', 'hu'],
            }
          : undefined,
        taxID: company.cui.replace(/^RO\s*/i, ''),
        foundingDate: company.founded,
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'România',
        },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: absoluteUrl('/'),
        name: meta.ogTitle,
        description: meta.description,
        publisher: { '@id': organizationId },
        inLanguage: 'ro-RO',
      },
      {
        '@type': 'ItemList',
        '@id': `${absoluteUrl('/')}#services`,
        name: 'Servicii GENE SYS SECURITY SRL',
        itemListElement: servicesCatalog.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: absoluteUrl(`/servicii/${service.slug}`),
          name: service.title,
        })),
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
      ...serviceGraph,
      ...pageGraph,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
