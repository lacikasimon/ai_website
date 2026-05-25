import { siteContent } from './siteContent';

export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  category: string;
  keywords?: string;
};

const services = siteContent.servicesCatalog.map((service) => ({
  title: service.title,
  description: `${service.description} ${service.features.join(' ')}`,
  href: `/servicii/${service.slug}`,
  category: 'Servicii',
  keywords: service.features.join(' '),
}));

const faqEntries = siteContent.home.faq.items.map((item) => ({
  title: item.q,
  description: item.a,
  href: '/#intrebari',
  category: 'Întrebări frecvente',
  keywords: `${item.q} ${item.a}`,
}));

export const searchEntries: SearchEntry[] = [
  {
    title: 'GENE SYS SECURITY SRL',
    description: siteContent.meta.description,
    href: '/',
    category: 'Acasă',
    keywords: siteContent.meta.keywords,
  },
  {
    title: 'Contact și oferte',
    description: `Telefon ${siteContent.contact.phones[0].display}, program ${siteContent.contact.hours.join(', ')}, adresă ${siteContent.contact.addressLines.join(', ')}.`,
    href: '/contact#contact',
    category: 'Contact',
    keywords: 'telefon ofertă formular adresă program suport client',
  },
  {
    title: 'Formular contact',
    description: 'Trimiteți detaliile proiectului pentru ofertare, consultanță sau intervenții tehnice.',
    href: '/contact#formular-contact',
    category: 'Contact',
    keywords: 'formular mesaj ofertă consultanță proiect',
  },
  {
    title: 'Proiecte realizate',
    description: 'Exemple reprezentative de lucrări pentru instalații electrice, fotovoltaice și sisteme de securitate.',
    href: '/proiecte',
    category: 'Proiecte',
    keywords: 'portofoliu referințe lucrări proiecte',
  },
  {
    title: 'Finanțare UE',
    description:
      'Investiții pentru digitalizarea societății GENE SYS SECURITY SRL, cod SMIS 334780, proiect finanțat prin Programul Regional Nord-Vest 2021-2027.',
    href: '/finantare-ue',
    category: 'Informare',
    keywords: 'finanțare UE REGIO Nord-Vest ADR proiect finanțat SMIS 334780 digitalizare',
  },
  {
    title: 'Blog',
    description: 'Articole și recomandări tehnice despre instalații electrice, sisteme fotovoltaice, securitate și mentenanță.',
    href: '/blog',
    category: 'Blog',
    keywords: 'blog articole noutăți recomandări tehnice instalații electrice fotovoltaice securitate',
  },
  {
    title: 'Politică cookie',
    description: 'Informații despre cookie-uri, preferințe și prelucrarea datelor pe site.',
    href: '/politica-cookie-uri',
    category: 'Legal',
    keywords: 'cookie GDPR date personale confidențialitate',
  },
  {
    title: 'GDPR',
    description: 'Informare privind protecția datelor personale, temeiuri legale, destinatari și drepturile persoanelor vizate.',
    href: '/gdpr',
    category: 'Legal',
    keywords: 'GDPR protecția datelor personale confidențialitate drepturi ANSPDCP operator date',
  },
  ...services,
  ...faqEntries,
];

function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function searchSite(query: string, limit = 8) {
  const tokens = normalizeSearch(query).split(' ').filter(Boolean);
  if (tokens.length === 0) return [];

  return searchEntries
    .map((entry) => {
      const title = normalizeSearch(entry.title);
      const description = normalizeSearch(entry.description);
      const category = normalizeSearch(entry.category);
      const keywords = normalizeSearch(entry.keywords ?? '');
      const haystack = `${title} ${description} ${category} ${keywords}`;

      if (!tokens.every((token) => haystack.includes(token))) {
        return null;
      }

      const score = tokens.reduce((sum, token) => {
        if (title.includes(token)) return sum + 8;
        if (keywords.includes(token)) return sum + 5;
        if (category.includes(token)) return sum + 3;
        return sum + 1;
      }, 0);

      return { ...entry, score };
    })
    .filter((entry): entry is SearchEntry & { score: number } => entry !== null)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, 'ro'))
    .slice(0, limit);
}
