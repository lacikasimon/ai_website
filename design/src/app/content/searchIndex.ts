import { siteContent } from './siteContent';
import { getCmsPages, getPublishedCmsBlogPosts } from '../utils/contentManagement';

export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  category: string;
  keywords?: string;
  content?: string;
};

function collectSearchText(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map(collectSearchText).filter(Boolean).join(' ');
  }
  if (typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).map(collectSearchText).filter(Boolean).join(' ');
  }
  return '';
}

const serviceKeywordsBySlug: Record<string, string> = {
  'instalatii-electrice':
    'electric electrician electricieni instalații instalatii proiectare cablare cabluri prize priza iluminat tablouri tablou racord branșament bransament ANRE apartament casa hale industriale verificări verificari recepție receptie',
  fotovoltaice:
    'fotovoltaice panouri solare panou solar energie verde prosumator invertor baterii stocare on-grid off-grid hibrid producție productie rentabilitate racord mentenanță mentenanta',
  'securitate-cctv':
    'CCTV camere video camera supraveghere sistem video securitate NVR DVR monitorizare remote telefon acces la distanță distanta cablare înregistrare inregistrare IGPR',
  'detectie-efractie':
    'alarmă alarma antiefracție antiefractie efracție efractie detectie detecție senzori sirenă sirena perimetru interior locuință locuinta casa birou depozit notificări notificari',
  mentenanta:
    'mentenanță mentenanta service intervenții interventii reparații reparatii verificări verificari întreținere intretinere preventiv urgență urgenta checklist raport vizită vizita',
  consultanta:
    'consultanță consultanta audit infrastructură infrastructura electrică electrica branșamente bransamente avize dosare rețea retea studiu fezabilitate optimizare consum cost durată durata',
};

const projectsSearchContent = [
  'Complex Rezidențial Green Valley instalații electrice complete apartamente iluminat inteligent infrastructură modernă',
  'Parc Solar Fotovoltaic sistem fotovoltaic on-grid 500 kW clădire birouri reducere costuri energetice panouri solare',
  'Centru Comercial Security Plus supraveghere video CCTV camere 4K analiză video AI stocare cloud',
  'Fabrică Producție Industrială proiectare execuție instalații electrice industriale tablouri electrice medie joasă tensiune',
  'Sistem de Alarmare Bancă detecție la efracție senzori perimetrali detectori mișcare alarmare centralizată',
  'Contract Mentenanță Multisite mentenanță preventivă corectivă retail intervenții disponibilitate',
].join(' ');

const fundingSearchContent = [
  'Proiect finanțat prin Programul Regional Nord-Vest 2021-2027',
  'Investiții pentru digitalizarea societății GENE SYS SECURITY SRL, cod SMIS 334780',
  'Obiectivul general al proiectului este de a valorifica avantajele digitalizării în beneficiul companiei',
  'CAEN 4321 Lucrări de instalații electrice',
  'laptop-uri monitoare telefoane mobile soluție cloud privat imprimantă multifuncțională securitate cibernetică ERP CRM robot software RPA',
  'website adaptat activității de e-commerce prezență activă pe rețelele sociale promovare online',
  '28.11.2025 Semnare Contract de finanțare',
  '29.12.2025 Publicare comunicat de presă demarare proiect PresaSM',
  'www.oportunitati-ue.gov.ro Investim în viitorul regiunii',
].join(' ');

const termsSearchContent = [
  'Termeni și condiții magazin online comenzi confirmarea contractului produse servicii disponibilitate',
  'prețuri facturare plată livrare drept de retragere retur OUG 34/2014 garanții reclamații',
  'servicii tehnice proiectare instalare mentenanță consultanță ANPC date personale cookie-uri',
].join(' ');

const returnPolicySearchContent = [
  'Politica de retur drept de retragere 14 zile consumatori OUG 34/2014',
  'cum se solicită returul comandă factură produs primit cost transport rambursare',
  'produse exceptate personalizate aduse special la comandă servicii executate integral',
  'produse neconforme deteriorate la livrare reclamații garanții persoane juridice',
].join(' ');

function buildBaseSearchEntries(): SearchEntry[] {
  const services = siteContent.servicesCatalog.map((service) => ({
    title: service.title,
    description: `${service.description} ${service.features.join(' ')}`,
    href: `/servicii/${service.slug}`,
    category: 'Servicii',
    keywords: serviceKeywordsBySlug[service.slug] ?? '',
    content: collectSearchText(service),
  }));

  const faqEntries = siteContent.home.faq.items.map((item) => ({
    title: item.q,
    description: item.a,
    href: '/#intrebari',
    category: 'Întrebări frecvente',
    content: collectSearchText(item),
  }));

  return [
    {
      title: 'GENE SYS SECURITY SRL',
      description: siteContent.meta.description,
      href: '/',
      category: 'Acasă',
      keywords: siteContent.meta.keywords,
      content: collectSearchText({
        company: siteContent.company,
        home: siteContent.home,
        stats: siteContent.statsKpi,
        services: siteContent.servicesCatalog,
      }),
    },
    {
      title: 'Contact și oferte',
      description: `Telefon ${siteContent.contact.phones[0].display}, program ${siteContent.contact.hours.join(', ')}, adresă ${siteContent.contact.addressLines.join(', ')}.`,
      href: '/contact#contact',
      category: 'Contact',
      keywords: 'telefon mobil ofertă oferta formular adresă adresa program suport client hartă harta maps Baritiu Barițiu 86 Satu Mare contact',
      content: collectSearchText({ company: siteContent.company, contact: siteContent.contact }),
    },
    {
      title: 'Formular contact',
      description: 'Trimiteți detaliile proiectului pentru ofertare, consultanță sau intervenții tehnice.',
      href: '/contact#formular-contact',
      category: 'Contact',
      keywords: 'formular mesaj ofertă oferta cerere consultanță consultanta proiect lucrare intervenție interventie deviz estimare contact',
      content: collectSearchText({ contact: siteContent.contact, process: siteContent.home.process }),
    },
    {
      title: 'Proiecte realizate',
      description: 'Exemple reprezentative de lucrări pentru instalații electrice, fotovoltaice și sisteme de securitate.',
      href: '/proiecte',
      category: 'Proiecte',
      keywords: 'portofoliu referințe lucrări proiecte',
      content: projectsSearchContent,
    },
    {
      title: 'Finanțare UE',
      description:
        'Investiții pentru digitalizarea societății GENE SYS SECURITY SRL, cod SMIS 334780, proiect finanțat prin Programul Regional Nord-Vest 2021-2027.',
      href: '/finantare-ue',
      category: 'Informare',
      keywords:
        'finanțare finantare UE Uniunea Europeană Europeana REGIO Nord-Vest ADR Guvernul României Romaniei proiect finanțat finantat SMIS 334780 digitalizare digitalizarea investiții investitii comunicat presă presa lansare demarare oportunitati Programul Regional',
      content: fundingSearchContent,
    },
    {
      title: 'Blog',
      description: 'Articole și recomandări tehnice despre instalații electrice, sisteme fotovoltaice, securitate și mentenanță.',
      href: '/blog',
      category: 'Blog',
      keywords: 'blog articole noutăți recomandări tehnice instalații electrice fotovoltaice securitate',
      content: collectSearchText({ faq: siteContent.home.faq, services: siteContent.servicesCatalog }),
    },
    {
      title: siteContent.cookiePolicy.title,
      description: 'Informații despre cookie-uri, preferințe și prelucrarea datelor pe site.',
      href: '/politica-cookie-uri',
      category: 'Legal',
      keywords: 'cookie GDPR date personale confidențialitate preferințe consimțământ',
      content: collectSearchText(siteContent.cookiePolicy),
    },
    {
      title: 'Termeni și condiții',
      description: 'Reguli privind comenzile, livrarea, returul, garanțiile, plata și reclamațiile.',
      href: '/termeni-si-conditii',
      category: 'Legal',
      keywords: 'termeni condiții conditii livrare retur garanție garantie comandă comanda plată plata rambursare reclamații reclamatii ANPC OUG 34/2014',
      content: termsSearchContent,
    },
    {
      title: 'Politica de retur',
      description: 'Informații despre dreptul de retragere, pașii pentru retur, costuri, rambursare și excepții.',
      href: '/politica-de-retur',
      category: 'Legal',
      keywords: 'politica retur retragere 14 zile rambursare produse neconforme deteriorate comandă comanda factură factura transport OUG 34/2014',
      content: returnPolicySearchContent,
    },
    {
      title: siteContent.gdprPolicy.title,
      description: 'Informare privind protecția datelor personale, temeiuri legale, destinatari și drepturile persoanelor vizate.',
      href: '/gdpr',
      category: 'Legal',
      keywords: 'GDPR protecția datelor personale confidențialitate drepturi ANSPDCP operator date',
      content: collectSearchText(siteContent.gdprPolicy),
    },
    ...services,
    ...faqEntries,
  ];
}

function buildCmsSearchEntries(): SearchEntry[] {
  try {
    const pages = getCmsPages()
      .filter((page) => page.status === 'published')
      .map<SearchEntry>((page) => ({
        title: page.title,
        description: page.summary || page.body.slice(0, 180),
        href: `/pagini/${page.slug}`,
        category: 'Pagini',
        keywords: page.menuLabel,
        content: collectSearchText(page),
      }));

    const posts = getPublishedCmsBlogPosts().map<SearchEntry>((post) => ({
      title: post.title,
      description: post.excerpt || post.body.slice(0, 180),
      href: `/blog/${post.slug}`,
      category: post.category || 'Blog',
      keywords: post.tags.join(' '),
      content: collectSearchText(post),
    }));

    return [...pages, ...posts];
  } catch {
    return [];
  }
}

function dedupeSearchEntries(entries: SearchEntry[]) {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    const key = `${entry.href}|${entry.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getSearchEntries() {
  return dedupeSearchEntries([...buildBaseSearchEntries(), ...buildCmsSearchEntries()]);
}

export const searchEntries: SearchEntry[] = getSearchEntries();

function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const ignoredSearchTokens = new Set([
  'a',
  'al',
  'ale',
  'cu',
  'de',
  'din',
  'dupa',
  'in',
  'la',
  'o',
  'pe',
  'pentru',
  'prin',
  'sau',
  'si',
]);

function tokenizeSearch(value: string) {
  return normalizeSearch(value)
    .split(' ')
    .filter((token) => token.length > 1 && !ignoredSearchTokens.has(token));
}

function fieldScore(field: string, token: string, exactScore: number, partialScore: number) {
  if (!field) return 0;

  const words = field.split(' ');
  if (words.includes(token)) return exactScore;
  if (
    token.length >= 3 &&
    words.some((word) => word.length >= 3 && (word.startsWith(token) || token.startsWith(word)))
  ) {
    return Math.max(partialScore, exactScore - 2);
  }
  if (token.length >= 5 && field.includes(token)) return partialScore;

  return 0;
}

export function searchSite(query: string, limit = 8, entries = getSearchEntries()) {
  const tokens = tokenizeSearch(query);
  if (tokens.length === 0) return [];
  const normalizedQuery = normalizeSearch(query);

  return entries
    .map((entry) => {
      const title = normalizeSearch(entry.title);
      const description = normalizeSearch(entry.description);
      const category = normalizeSearch(entry.category);
      const keywords = normalizeSearch(entry.keywords ?? '');
      const content = normalizeSearch(entry.content ?? '');

      let score = 0;
      let matchedTokens = 0;

      for (const token of tokens) {
        const tokenScore = Math.max(
          fieldScore(title, token, 14, 10),
          fieldScore(keywords, token, 12, 8),
          fieldScore(category, token, 8, 5),
          fieldScore(description, token, 6, 3),
          fieldScore(content, token, 4, 2),
        );

        if (tokenScore > 0) {
          matchedTokens += 1;
          score += tokenScore;
        }
      }

      if (matchedTokens === 0) {
        return null;
      }

      if (tokens.length > 1 && matchedTokens === tokens.length) score += 10;
      if (title.includes(normalizedQuery)) score += 16;
      if (keywords.includes(normalizedQuery)) score += 12;
      if (description.includes(normalizedQuery)) score += 8;
      if (content.includes(normalizedQuery)) score += 6;
      if (entry.category === 'Servicii') score += 4;
      if (entry.category === 'Informare' || entry.category === 'Contact') score += 3;

      return { ...entry, score, matchedTokens };
    })
    .filter((entry): entry is SearchEntry & { score: number; matchedTokens: number } => entry !== null)
    .sort(
      (a, b) =>
        b.matchedTokens - a.matchedTokens ||
        b.score - a.score ||
        a.title.localeCompare(b.title, 'ro'),
    )
    .slice(0, limit);
}
