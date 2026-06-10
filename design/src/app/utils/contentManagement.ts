export type CmsPageStatus = 'published' | 'draft';
export type CmsBlogStatus = 'published' | 'draft';

export type CmsPage = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  status: CmsPageStatus;
  showInMenu: boolean;
  menuLabel: string;
  createdAt: string;
  updatedAt: string;
};

export type CmsBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  status: CmsBlogStatus;
  category: string;
  tags: string[];
  author: string;
  coverImageId: string;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type CmsMenuKind = 'internal' | 'external' | 'page';

export type CmsMenuItem = {
  id: string;
  label: string;
  href: string;
  kind: CmsMenuKind;
  visible: boolean;
  order: number;
};

export type CmsPageInput = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  status: CmsPageStatus;
  showInMenu: boolean;
  menuLabel: string;
};

export type CmsBlogPostInput = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  status: CmsBlogStatus;
  category: string;
  tags: string;
  author: string;
  coverImageId: string;
  featured: boolean;
  publishedAt: string;
};

export type CmsMenuInput = {
  id?: string;
  label: string;
  href: string;
  kind: CmsMenuKind;
  visible: boolean;
  order?: number;
};

export type CmsImage = {
  id: string;
  title: string;
  alt: string;
  fileName: string;
  mimeType: string;
  size: number;
  dataUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type CmsImageInput = {
  id?: string;
  title: string;
  alt: string;
  fileName: string;
  mimeType: string;
  size: number;
  dataUrl: string;
};

export const cmsContentChangedEvent = 'genesys-cms-content-changed';

const pagesKey = 'genesys-cms-pages-v1';
const menuKey = 'genesys-cms-menu-v1';
const imagesKey = 'genesys-cms-images-v1';
const blogPostsKey = 'genesys-cms-blog-posts-v1';
const cmsEndpoint = import.meta.env.VITE_CMS_ENDPOINT?.trim() || '/admin/cms.php';

export const defaultMenuItems: CmsMenuItem[] = [
  { id: 'home', label: 'Acasă', href: '/', kind: 'internal', visible: true, order: 10 },
  { id: 'shop', label: 'Magazin', href: 'https://shop.syshub.ro/', kind: 'external', visible: true, order: 20 },
  { id: 'projects', label: 'Proiecte', href: '/proiecte', kind: 'internal', visible: true, order: 30 },
  { id: 'gallery', label: 'Galerie', href: '/#galerie-lucrari', kind: 'internal', visible: true, order: 32 },
  { id: 'blog', label: 'Blog', href: '/blog', kind: 'internal', visible: true, order: 35 },
  { id: 'funding', label: 'Finanțare UE', href: '/finantare-ue', kind: 'internal', visible: true, order: 40 },
  { id: 'about', label: 'Despre Noi', href: '/#despre-noi', kind: 'internal', visible: true, order: 50 },
  { id: 'services', label: 'Servicii', href: '/#servicii', kind: 'internal', visible: true, order: 60 },
  { id: 'process', label: 'Proces', href: '/#proces', kind: 'internal', visible: true, order: 70 },
  { id: 'certifications', label: 'Certificări', href: '/#certificari', kind: 'internal', visible: true, order: 80 },
];

const defaultBlogPosts: CmsBlogPost[] = [
  {
    id: 'blog-fotovoltaice-on-grid-off-grid',
    slug: 'sisteme-fotovoltaice-on-grid-off-grid',
    title: 'Sisteme fotovoltaice on-grid și off-grid: cum alegeți soluția potrivită',
    excerpt:
      'Un ghid practic despre diferențele dintre sistemele fotovoltaice conectate la rețea și cele independente, cu criterii utile pentru dimensionare și exploatare.',
    body: `Sistemele fotovoltaice au devenit o soluție tot mai relevantă pentru locuințe, spații comerciale și obiective industriale. Alegerea între o configurație on-grid, off-grid sau hibridă nu ține doar de buget, ci și de consumul real, disponibilitatea rețelei, spațiul de montaj și nivelul de autonomie dorit.

## Ce înseamnă on-grid

Un sistem on-grid este conectat la rețeaua de distribuție a energiei electrice. Energia produsă este folosită în primul rând pentru consumul propriu al clădirii, iar surplusul poate fi gestionat conform cadrului aplicabil prosumatorilor. Este o soluție potrivită pentru clădiri racordate la rețea, cu consum constant în timpul zilei sau cu obiectiv clar de reducere a facturilor.

Avantajele principale sunt investiția inițială mai eficientă față de sistemele cu stocare, monitorizarea ușoară a producției și posibilitatea de integrare treptată cu alte echipamente. Pentru o dimensionare corectă se analizează consumul anual, profilul orar, orientarea acoperișului, umbrirea și puterea disponibilă în instalația electrică existentă.

## Când are sens off-grid

Un sistem off-grid funcționează independent de rețeaua publică și include, de regulă, baterii pentru stocarea energiei. Este recomandat pentru locații izolate, cabane, anexe, ferme, echipamente tehnice sau obiective unde racordarea la rețea este dificilă ori costisitoare.

În acest caz, analiza trebuie să fie mai atentă: se calculează consumatorii critici, autonomia necesară, perioadele cu producție redusă și modul în care se gestionează vârfurile de sarcină. O soluție off-grid subdimensionată poate crea întreruperi, iar una supradimensionată poate bloca inutil capital.

## Varianta hibridă

Sistemele hibride combină avantajele soluțiilor on-grid cu stocarea în baterii. Ele pot ajuta la creșterea autoconsumului, la susținerea consumatorilor importanți în anumite scenarii și la o mai bună gestionare a energiei produse. Pentru clădiri cu activitate importantă sau cu echipamente sensibile, varianta hibridă merită analizată încă din faza de proiect.

## Pașii recomandați înainte de ofertare

- analiza facturilor și a consumului estimat;
- verificarea tabloului electric și a traseelor disponibile;
- evaluarea acoperișului sau a terenului pentru montaj;
- stabilirea tipului de invertor și a necesarului de protecții;
- estimarea producției și a perioadei de recuperare;
- planificarea mentenanței și a monitorizării.

GENE SYS SECURITY SRL abordează proiectele fotovoltaice integrat: evaluare tehnică, dimensionare, execuție și recomandări pentru exploatare. Scopul este ca sistemul să fie eficient, sigur și adaptat modului real în care clădirea consumă energie.`,
    status: 'published',
    category: 'Fotovoltaice',
    tags: ['fotovoltaice', 'on-grid', 'off-grid', 'prosumator', 'energie regenerabilă'],
    author: 'GENE SYS SECURITY SRL',
    coverImageId: '',
    featured: true,
    publishedAt: '2026-05-26T08:00:00.000Z',
    createdAt: '2026-05-26T08:00:00.000Z',
    updatedAt: '2026-05-26T08:00:00.000Z',
  },
  {
    id: 'blog-instalatii-electrice-civile-industriale',
    slug: 'instalatii-electrice-constructii-civile-industriale',
    title: 'Instalații electrice pentru construcții civile și industriale: de la proiectare la execuție',
    excerpt:
      'De ce contează proiectarea corectă, alegerea materialelor și verificările de recepție în lucrările electrice pentru clădiri noi sau modernizări.',
    body: `O instalație electrică sigură începe cu o proiectare corectă. În construcțiile civile și industriale, fiecare circuit, tablou, protecție și traseu de cablu trebuie gândit în funcție de consumatori, regim de utilizare, extinderi posibile și cerințe de exploatare pe termen lung.

## De ce proiectarea este etapa critică

În faza de proiect se stabilesc încărcările electrice, împărțirea circuitelor, poziția tablourilor, protecțiile, traseele, soluțiile de iluminat și condițiile de punere în funcțiune. Pentru spații industriale sau comerciale, proiectarea trebuie să țină cont și de echipamente tehnologice, continuitatea operațională, mentenanță și acces facil la intervenții.

Un proiect bine făcut reduce improvizațiile din șantier, limitează costurile neprevăzute și oferă o bază clară pentru recepție. În plus, documentația tehnică ajută beneficiarul să știe ce primește și cum poate extinde instalația în viitor.

## Execuția trebuie să respecte realitatea din teren

Chiar și cel mai bun proiect are nevoie de execuție disciplinată. Pe șantier apar deseori modificări de arhitectură, schimbări de echipamente sau ajustări de trasee. Important este ca aceste modificări să fie verificate tehnic și documentate, nu rezolvate prin soluții rapide care pot crea probleme ulterior.

Lucrările de calitate includ cablare corectă, protecții dimensionate, tablouri ordonate, etichetare, verificări și probe înainte de predare. Pentru beneficiar, aceste detalii înseamnă siguranță, intervenții mai rapide și costuri mai previzibile în exploatare.

## Ce ar trebui să includă o ofertă clară

- descrierea lucrărilor și a zonelor acoperite;
- materiale și echipamente propuse;
- etape de execuție și termene estimative;
- responsabilități privind documentația și accesul în șantier;
- probe, verificări și documente de predare;
- condiții de garanție și recomandări de mentenanță.

GENE SYS SECURITY SRL oferă servicii complete de proiectare și execuție pentru instalații electrice în construcții civile și industriale. Abordarea noastră urmărește siguranța, conformitatea și o predare clară, astfel încât instalația să poată fi exploatată fără ambiguități.`,
    status: 'published',
    category: 'Instalații electrice',
    tags: ['instalații electrice', 'proiectare electrică', 'execuție', 'construcții civile', 'industrial'],
    author: 'GENE SYS SECURITY SRL',
    coverImageId: '',
    featured: false,
    publishedAt: '2026-05-20T08:00:00.000Z',
    createdAt: '2026-05-20T08:00:00.000Z',
    updatedAt: '2026-05-20T08:00:00.000Z',
  },
  {
    id: 'blog-mentenanta-tehnica-preventiva',
    slug: 'mentenanta-tehnica-preventiva-cladiri-echipamente',
    title: 'Mentenanță tehnică preventivă: siguranță, continuitate și costuri controlate',
    excerpt:
      'Mentenanța planificată ajută clădirile și echipamentele să funcționeze optim, reducând riscul de opriri neprevăzute și intervenții costisitoare.',
    body: `Mentenanța tehnică nu înseamnă doar intervenție atunci când apare o defecțiune. Pentru clădiri, spații comerciale și obiective industriale, mentenanța preventivă este o metodă de control al riscului: verifici periodic instalațiile, identifici uzura și corectezi problemele înainte să devină blocaje.

## Ce urmărește mentenanța preventivă

Un plan de mentenanță bine construit verifică elementele critice ale instalațiilor electrice, sistemelor de securitate, echipamentelor de monitorizare și componentelor care susțin activitatea zilnică. Scopul este simplu: funcționare sigură, durată de viață mai mare pentru echipamente și intervenții mai bine planificate.

Pentru administratorii de clădiri, avantajul major este predictibilitatea. O verificare programată este mai ușor de gestionat decât o oprire bruscă într-un moment aglomerat. În plus, rapoartele de mentenanță oferă o imagine clară asupra stării tehnice și pot susține deciziile de modernizare.

## Elemente verificate frecvent

- tablouri electrice, conexiuni și protecții;
- trasee, prize, circuite și consumatori importanți;
- camere CCTV, surse, stocare și conexiuni de rețea;
- centrale de alarmă, senzori și sirene;
- echipamente fotovoltaice și monitorizare producție;
- recomandări pentru înlocuiri sau optimizări.

## Mentenanța la cerere versus contractul periodic

Intervenția la cerere este utilă pentru situații punctuale, dar nu înlocuiește verificarea planificată. Un contract periodic stabilește frecvența vizitelor, responsabilitățile, prioritățile și modul de raportare. Pentru obiective cu activitate continuă, această structură poate reduce semnificativ riscurile operaționale.

GENE SYS SECURITY SRL oferă servicii de mentenanță tehnică adaptate nevoilor fiecărui client. Începem cu evaluarea instalațiilor existente, apoi propunem un plan realist de verificări, intervenții și îmbunătățiri, în funcție de nivelul de risc și de importanța obiectivului.`,
    status: 'published',
    category: 'Mentenanță',
    tags: ['mentenanță tehnică', 'mentenanță preventivă', 'service', 'clădiri', 'echipamente'],
    author: 'GENE SYS SECURITY SRL',
    coverImageId: '',
    featured: false,
    publishedAt: '2026-05-14T08:00:00.000Z',
    createdAt: '2026-05-14T08:00:00.000Z',
    updatedAt: '2026-05-14T08:00:00.000Z',
  },
  {
    id: 'blog-detectie-efractie-sisteme-alarma',
    slug: 'sisteme-detectie-efractie-alarma',
    title: 'Sisteme de detecție la efracție: protecție activă pentru perimetre și clădiri',
    excerpt:
      'Un sistem de alarmare eficient trebuie proiectat în funcție de riscuri, acces, zone protejate și modul real de utilizare a spațiului.',
    body: `Sistemele de detecție la efracție au rolul de a identifica rapid o încercare de pătrundere într-un spațiu protejat și de a transmite informații utile pentru reacție. Eficiența lor depinde de proiectare, de alegerea senzorilor, de amplasare și de modul în care sistemul este folosit zi de zi.

## Evaluarea riscului înainte de instalare

Primul pas este analiza obiectivului: puncte de acces, ferestre, zone vulnerabile, program de lucru, flux de persoane și bunuri protejate. O locuință, un birou, un depozit sau un spațiu industrial au riscuri diferite, iar soluția trebuie adaptată acestor diferențe.

Pe baza evaluării se stabilesc zonele de detecție, tipurile de senzori, poziționarea centralei, sirenele, tastaturile, modulele de comunicare și scenariile de armare. Un sistem bine împărțit pe zone este mai ușor de administrat și reduce alarmele false.

## Componente importante

- centrală de alarmă și module de comunicație;
- senzori de mișcare, contacte magnetice și bariere perimetrale;
- sirene interioare sau exterioare;
- tastaturi, telecomenzi sau control prin aplicație;
- acumulatori și surse de alimentare;
- integrare cu CCTV sau control acces, unde este necesar.

## De ce contează mentenanța

Un sistem de alarmă trebuie verificat periodic. Senzorii se pot deregla, acumulatorii își pierd capacitatea, iar modificările din spațiu pot influența detecția. Mentenanța reduce riscul de alarme false și ajută sistemul să rămână pregătit atunci când este nevoie.

GENE SYS SECURITY SRL proiectează, instalează și întreține sisteme de detecție la efracție pentru obiective civile și industriale. Punem accent pe soluții clare, configurate pe riscul real al locației și pe exploatare simplă pentru utilizatori.`,
    status: 'published',
    category: 'Securitate',
    tags: ['detecție efracție', 'alarmă', 'securitate', 'senzori', 'protecție perimetrală'],
    author: 'GENE SYS SECURITY SRL',
    coverImageId: '',
    featured: false,
    publishedAt: '2026-05-08T08:00:00.000Z',
    createdAt: '2026-05-08T08:00:00.000Z',
    updatedAt: '2026-05-08T08:00:00.000Z',
  },
  {
    id: 'blog-cctv-supraveghere-video',
    slug: 'sisteme-supraveghere-video-cctv',
    title: 'Sisteme de supraveghere video CCTV: monitorizare eficientă pentru proprietăți și infrastructuri',
    excerpt:
      'Supravegherea video modernă combină camere potrivite, stocare sigură, acces controlat și mentenanță pentru protecție continuă.',
    body: `Sistemele CCTV sunt esențiale pentru monitorizarea proprietăților, spațiilor comerciale, halelor, depozitelor și obiectivelor cu cerințe ridicate de securitate. O soluție video eficientă nu se rezumă la numărul camerelor, ci la calitatea imaginii, poziționare, stocare, acces și mentenanță.

## Proiectarea sistemului CCTV

Înainte de instalare se stabilesc zonele care trebuie monitorizate: intrări, parcări, căi de acces, zone de încărcare, spații tehnice sau perimetre exterioare. Apoi se aleg camerele în funcție de lumină, distanță, unghi, rezoluție, condiții meteo și nivelul de detaliu necesar.

Un proiect bun elimină zonele oarbe, evită suprapuneri inutile și asigură imagini utile atunci când trebuie analizat un eveniment. Pentru obiectivele critice, se iau în calcul redundanța, alimentarea, protecția cablurilor și accesul rapid la înregistrări.

## Elemente care influențează performanța

- camere potrivite mediului interior sau exterior;
- rezoluție și lentile alese după distanță și scop;
- NVR, stocare și perioadă de păstrare a imaginilor;
- rețea stabilă și protejată;
- acces remote configurat controlat;
- mentenanță periodică pentru curățare, update și verificări.

## CCTV și prevenția riscurilor

Supravegherea video are un rol preventiv important. Prezența camerelor poate descuraja incidentele, iar monitorizarea corectă ajută la identificarea rapidă a situațiilor neobișnuite. În același timp, sistemul trebuie folosit responsabil, cu acces limitat și reguli clare privind imaginile înregistrate.

GENE SYS SECURITY SRL instalează sisteme CCTV adaptate fiecărui obiectiv, de la proprietăți private la spații comerciale și infrastructuri industriale. Punem accent pe acoperire eficientă, echipamente de calitate și suport tehnic după punerea în funcțiune.`,
    status: 'published',
    category: 'CCTV',
    tags: ['CCTV', 'supraveghere video', 'securitate video', 'monitorizare', 'NVR'],
    author: 'GENE SYS SECURITY SRL',
    coverImageId: '',
    featured: false,
    publishedAt: '2026-05-02T08:00:00.000Z',
    createdAt: '2026-05-02T08:00:00.000Z',
    updatedAt: '2026-05-02T08:00:00.000Z',
  },
];

const legacyDefaultMenuLabels: Record<string, string[]> = {
  home: ['Home'],
  shop: ['Shop'],
};

function hasStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function dispatchCmsChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(cmsContentChangedEvent));
  }
}

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function normalizePage(value: unknown): CmsPage | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Partial<CmsPage>;
  if (
    typeof candidate.id !== 'string' ||
    typeof candidate.slug !== 'string' ||
    typeof candidate.title !== 'string' ||
    typeof candidate.body !== 'string'
  ) {
    return null;
  }

  return {
    id: candidate.id,
    slug: slugify(candidate.slug),
    title: candidate.title,
    summary: typeof candidate.summary === 'string' ? candidate.summary : '',
    body: candidate.body,
    status: candidate.status === 'draft' ? 'draft' : 'published',
    showInMenu: Boolean(candidate.showInMenu),
    menuLabel: typeof candidate.menuLabel === 'string' ? candidate.menuLabel : candidate.title,
    createdAt: typeof candidate.createdAt === 'string' ? candidate.createdAt : new Date().toISOString(),
    updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : new Date().toISOString(),
  };
}

function normalizeTags(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .filter((tag): tag is string => typeof tag === 'string')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 12);
  }

  if (typeof value !== 'string') {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return normalizeTags(parsed);
    }
  } catch {
    // Etichetele vechi pot fi salvate ca listă separată prin virgulă.
  }

  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function normalizeBlogPost(value: unknown): CmsBlogPost | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Partial<CmsBlogPost>;
  if (
    typeof candidate.id !== 'string' ||
    typeof candidate.slug !== 'string' ||
    typeof candidate.title !== 'string' ||
    typeof candidate.body !== 'string'
  ) {
    return null;
  }

  return {
    id: candidate.id,
    slug: slugify(candidate.slug),
    title: candidate.title,
    excerpt: typeof candidate.excerpt === 'string' ? candidate.excerpt : '',
    body: candidate.body,
    status: candidate.status === 'draft' ? 'draft' : 'published',
    category: typeof candidate.category === 'string' && candidate.category.trim() ? candidate.category : 'Noutăți',
    tags: normalizeTags(candidate.tags),
    author: typeof candidate.author === 'string' && candidate.author.trim() ? candidate.author : 'GENE SYS SECURITY SRL',
    coverImageId: typeof candidate.coverImageId === 'string' ? candidate.coverImageId : '',
    featured: Boolean(candidate.featured),
    publishedAt: typeof candidate.publishedAt === 'string' ? candidate.publishedAt : new Date().toISOString(),
    createdAt: typeof candidate.createdAt === 'string' ? candidate.createdAt : new Date().toISOString(),
    updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : new Date().toISOString(),
  };
}

function normalizeMenuItem(value: unknown): CmsMenuItem | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Partial<CmsMenuItem>;
  if (
    typeof candidate.id !== 'string' ||
    typeof candidate.label !== 'string' ||
    typeof candidate.href !== 'string'
  ) {
    return null;
  }

  const href = normalizeMenuHref(candidate.href);
  if (!href) {
    return null;
  }

  return {
    id: candidate.id,
    label: candidate.label,
    href,
    kind: candidate.kind === 'external' || candidate.kind === 'page' ? candidate.kind : 'internal',
    visible: candidate.visible !== false,
    order: typeof candidate.order === 'number' ? candidate.order : 100,
  };
}

function normalizeImage(value: unknown): CmsImage | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Partial<CmsImage>;
  if (
    typeof candidate.id !== 'string' ||
    typeof candidate.title !== 'string' ||
    typeof candidate.fileName !== 'string' ||
    typeof candidate.mimeType !== 'string' ||
    typeof candidate.dataUrl !== 'string'
  ) {
    return null;
  }

  return {
    id: candidate.id,
    title: candidate.title,
    alt: typeof candidate.alt === 'string' ? candidate.alt : candidate.title,
    fileName: candidate.fileName,
    mimeType: candidate.mimeType,
    size: typeof candidate.size === 'number' ? candidate.size : 0,
    dataUrl: candidate.dataUrl,
    createdAt: typeof candidate.createdAt === 'string' ? candidate.createdAt : new Date().toISOString(),
    updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : new Date().toISOString(),
  };
}

function readJsonArray<T>(key: string, normalize: (value: unknown) => T | null) {
  if (!hasStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(normalize).filter((item): item is T => Boolean(item));
  } catch {
    return [];
  }
}

function persistJsonArray<T>(key: string, value: T[]) {
  if (!hasStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    dispatchCmsChange();
  } catch {
    // Dacă browserul blochează localStorage, editorul rămâne deschis fără persistență.
  }
}

function sortMenu(items: CmsMenuItem[]) {
  return [...items].sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
}

function sortBlogPosts(posts: CmsBlogPost[]) {
  return [...posts].sort((a, b) => {
    const aDate = a.publishedAt || a.updatedAt;
    const bDate = b.publishedAt || b.updatedAt;
    return bDate.localeCompare(aDate);
  });
}

function normalizeDefaultMenuLabels(items: CmsMenuItem[]) {
  const normalizedItems = items.map((item) => {
    const defaultItem = defaultMenuItems.find((candidate) => candidate.id === item.id);
    const legacyLabels = legacyDefaultMenuLabels[item.id] || [];
    if (defaultItem && legacyLabels.includes(item.label)) {
      return { ...item, label: defaultItem.label };
    }

    return item;
  });

  const missingDefaults = defaultMenuItems.filter(
    (defaultItem) => !normalizedItems.some((item) => item.id === defaultItem.id),
  );

  return [...normalizedItems, ...missingDefaults];
}

function normalizeMenuHref(value: string) {
  const href = value.trim();
  if (/[\u0000-\u001F\u007F]/.test(href)) {
    return '';
  }

  return /^(https?:\/\/|\/|#)/i.test(href) ? href : '';
}

export function getCmsPages() {
  return readJsonArray(pagesKey, normalizePage).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getCmsImages() {
  return readJsonArray(imagesKey, normalizeImage).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getCmsBlogPosts() {
  const storedPosts = readJsonArray(blogPostsKey, normalizeBlogPost);
  return sortBlogPosts(storedPosts.length > 0 ? storedPosts : defaultBlogPosts);
}

export function getCmsImage(imageId: string) {
  return getCmsImages().find((image) => image.id === imageId) || null;
}

export function getPublishedCmsPage(slug: string) {
  return getCmsPages().find((page) => page.slug === slug && page.status === 'published') || null;
}

export function getPublishedCmsBlogPosts() {
  return getCmsBlogPosts().filter((post) => post.status === 'published');
}

export function getPublishedCmsBlogPost(slug: string) {
  return getPublishedCmsBlogPosts().find((post) => post.slug === slug) || null;
}

export function getCmsMenuItems() {
  const storedItems = readJsonArray(menuKey, normalizeMenuItem);
  return sortMenu(storedItems.length > 0 ? normalizeDefaultMenuLabels(storedItems) : defaultMenuItems);
}

export function getVisibleCmsMenuItems() {
  const pageItems = getCmsPages()
    .filter((page) => page.status === 'published' && page.showInMenu)
    .map<CmsMenuItem>((page, index) => ({
      id: `page-${page.id}`,
      label: page.menuLabel || page.title,
      href: `/pagini/${page.slug}`,
      kind: 'page',
      visible: true,
      order: 500 + index,
    }));

  return sortMenu([...getCmsMenuItems().filter((item) => item.visible), ...pageItems]);
}

export function saveCmsPage(input: CmsPageInput) {
  const pages = getCmsPages();
  const slug = slugify(input.slug || input.title);
  if (!slug) {
    throw new Error('Slug-ul paginii este obligatoriu.');
  }

  if (pages.some((page) => page.slug === slug && page.id !== input.id)) {
    throw new Error('Există deja o pagină cu acest slug.');
  }

  const now = new Date().toISOString();
  const previous = pages.find((page) => page.id === input.id);
  const nextPage: CmsPage = {
    id: previous?.id || createId('page'),
    slug,
    title: input.title.trim(),
    summary: input.summary.trim(),
    body: input.body.trim(),
    status: input.status,
    showInMenu: input.showInMenu,
    menuLabel: input.menuLabel.trim() || input.title.trim(),
    createdAt: previous?.createdAt || now,
    updatedAt: now,
  };

  if (!nextPage.title) {
    throw new Error('Titlul paginii este obligatoriu.');
  }

  const nextPages = previous
    ? pages.map((page) => (page.id === previous.id ? nextPage : page))
    : [nextPage, ...pages];

  persistJsonArray(pagesKey, nextPages);
  return nextPages;
}

export function deleteCmsPage(pageId: string) {
  const nextPages = getCmsPages().filter((page) => page.id !== pageId);
  persistJsonArray(pagesKey, nextPages);
  return nextPages;
}

export function saveCmsBlogPost(input: CmsBlogPostInput) {
  const posts = getCmsBlogPosts();
  const slug = slugify(input.slug || input.title);
  if (!slug) {
    throw new Error('Slug-ul articolului este obligatoriu.');
  }

  if (posts.some((post) => post.slug === slug && post.id !== input.id)) {
    throw new Error('Există deja un articol cu acest slug.');
  }

  const now = new Date().toISOString();
  const previous = posts.find((post) => post.id === input.id);
  const parsedPublishedAt = input.publishedAt ? new Date(input.publishedAt) : new Date();
  const publishedAt = Number.isNaN(parsedPublishedAt.getTime()) ? now : parsedPublishedAt.toISOString();
  const nextPost: CmsBlogPost = {
    id: previous?.id || createId('blog'),
    slug,
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    body: input.body.trim(),
    status: input.status,
    category: input.category.trim() || 'Noutăți',
    tags: normalizeTags(input.tags),
    author: input.author.trim() || 'GENE SYS SECURITY SRL',
    coverImageId: input.coverImageId.trim(),
    featured: input.featured,
    publishedAt,
    createdAt: previous?.createdAt || now,
    updatedAt: now,
  };

  if (!nextPost.title || !nextPost.body) {
    throw new Error('Titlul și conținutul articolului sunt obligatorii.');
  }

  const nextPosts = previous
    ? posts.map((post) => (post.id === previous.id ? nextPost : post))
    : [nextPost, ...posts];

  persistJsonArray(blogPostsKey, nextPosts);
  return nextPosts;
}

export function deleteCmsBlogPost(postId: string) {
  const nextPosts = getCmsBlogPosts().filter((post) => post.id !== postId);
  persistJsonArray(blogPostsKey, nextPosts);
  return nextPosts;
}

export function saveCmsImage(input: CmsImageInput) {
  const images = getCmsImages();
  const now = new Date().toISOString();
  const previous = images.find((image) => image.id === input.id);
  const nextImage: CmsImage = {
    id: previous?.id || createId('image'),
    title: input.title.trim() || input.fileName,
    alt: input.alt.trim() || input.title.trim() || input.fileName,
    fileName: input.fileName,
    mimeType: input.mimeType,
    size: input.size,
    dataUrl: input.dataUrl,
    createdAt: previous?.createdAt || now,
    updatedAt: now,
  };

  if (!nextImage.dataUrl.startsWith('data:image/')) {
    throw new Error('Fișierul trebuie să fie o imagine validă.');
  }

  const nextImages = previous
    ? images.map((image) => (image.id === previous.id ? nextImage : image))
    : [nextImage, ...images];

  persistJsonArray(imagesKey, nextImages);
  return nextImages;
}

export function updateCmsImageMeta(imageId: string, changes: Pick<CmsImage, 'title' | 'alt'>) {
  const now = new Date().toISOString();
  const nextImages = getCmsImages().map((image) =>
    image.id === imageId
      ? {
          ...image,
          title: changes.title.trim() || image.title,
          alt: changes.alt.trim() || changes.title.trim() || image.alt,
          updatedAt: now,
        }
      : image,
  );
  persistJsonArray(imagesKey, nextImages);
  return nextImages;
}

export function deleteCmsImage(imageId: string) {
  const nextImages = getCmsImages().filter((image) => image.id !== imageId);
  persistJsonArray(imagesKey, nextImages);
  return nextImages;
}

export function saveCmsMenuItem(input: CmsMenuInput) {
  const items = getCmsMenuItems();
  const previous = items.find((item) => item.id === input.id);
  const href = normalizeMenuHref(input.href);
  const nextItem: CmsMenuItem = {
    id: previous?.id || createId('menu'),
    label: input.label.trim(),
    href,
    kind: input.kind,
    visible: input.visible,
    order: input.order ?? previous?.order ?? (items.length + 1) * 10,
  };

  if (!nextItem.label || !nextItem.href) {
    throw new Error('Eticheta și un link valid sunt obligatorii. Folosiți /, #, http:// sau https://.');
  }

  const nextItems = previous
    ? items.map((item) => (item.id === previous.id ? nextItem : item))
    : [...items, nextItem];

  persistJsonArray(menuKey, sortMenu(nextItems));
  return sortMenu(nextItems);
}

export function deleteCmsMenuItem(itemId: string) {
  const nextItems = getCmsMenuItems().filter((item) => item.id !== itemId);
  persistJsonArray(menuKey, nextItems);
  return nextItems;
}

export function resetCmsMenuItems() {
  persistJsonArray(menuKey, defaultMenuItems);
  return defaultMenuItems;
}

export function moveCmsMenuItem(itemId: string, direction: 'up' | 'down') {
  const items = sortMenu(getCmsMenuItems());
  const index = items.findIndex((item) => item.id === itemId);
  const swapIndex = direction === 'up' ? index - 1 : index + 1;
  if (index < 0 || swapIndex < 0 || swapIndex >= items.length) {
    return items;
  }

  const reordered = [...items];
  [reordered[index], reordered[swapIndex]] = [reordered[swapIndex], reordered[index]];
  const normalized = reordered.map((item, itemIndex) => ({ ...item, order: (itemIndex + 1) * 10 }));
  persistJsonArray(menuKey, normalized);
  return normalized;
}

type CmsApiResponse = {
  ok?: boolean;
  message?: string;
  pages?: unknown[];
  blogPosts?: unknown[];
  menuItems?: unknown[];
  images?: unknown[];
  page?: unknown;
  blogPost?: unknown;
  image?: unknown;
};

export type CmsAdminContent = {
  pages: CmsPage[];
  blogPosts: CmsBlogPost[];
  menuItems: CmsMenuItem[];
  images: CmsImage[];
  usingServer: boolean;
};

async function cmsRequest(params: URLSearchParams, init?: RequestInit): Promise<CmsApiResponse> {
  const separator = cmsEndpoint.includes('?') ? '&' : '?';
  const response = await fetch(`${cmsEndpoint}${separator}${params.toString()}`, {
    credentials: 'include',
    ...init,
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...(init?.headers || {}),
    },
  });

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('CMS API indisponibil.');
  }

  const data = (await response.json()) as CmsApiResponse;
  if (!response.ok || data.ok === false) {
    throw new Error(data.message || 'Operațiunea CMS nu a putut fi efectuată.');
  }

  return data;
}

function normalizePages(values: unknown[] | undefined) {
  return (values || []).map(normalizePage).filter((page): page is CmsPage => Boolean(page));
}

function normalizeBlogPosts(values: unknown[] | undefined) {
  return sortBlogPosts((values || []).map(normalizeBlogPost).filter((post): post is CmsBlogPost => Boolean(post)));
}

function normalizeMenuItems(values: unknown[] | undefined) {
  return sortMenu((values || []).map(normalizeMenuItem).filter((item): item is CmsMenuItem => Boolean(item)));
}

function normalizeImages(values: unknown[] | undefined) {
  return (values || []).map(normalizeImage).filter((image): image is CmsImage => Boolean(image));
}

async function postCmsAction(action: string, payload: Record<string, unknown>) {
  return cmsRequest(new URLSearchParams(), {
    method: 'POST',
    body: JSON.stringify({ action, ...payload }),
  });
}

export async function loadCmsAdminContent(): Promise<CmsAdminContent> {
  try {
    const data = await cmsRequest(new URLSearchParams({ resource: 'admin-content' }));
    return {
      pages: normalizePages(data.pages),
      blogPosts: normalizeBlogPosts(data.blogPosts),
      menuItems: normalizeMenuItems(data.menuItems),
      images: normalizeImages(data.images),
      usingServer: true,
    };
  } catch {
    return {
      pages: getCmsPages(),
      blogPosts: getCmsBlogPosts(),
      menuItems: getCmsMenuItems(),
      images: getCmsImages(),
      usingServer: false,
    };
  }
}

export async function fetchVisibleCmsMenuItems() {
  try {
    const data = await cmsRequest(new URLSearchParams({ resource: 'menu' }));
    return normalizeMenuItems(data.menuItems);
  } catch {
    return getVisibleCmsMenuItems();
  }
}

export async function fetchPublishedCmsPage(slug: string) {
  try {
    const data = await cmsRequest(new URLSearchParams({ resource: 'page', slug }));
    return data.page ? normalizePage(data.page) : null;
  } catch {
    return getPublishedCmsPage(slug);
  }
}

export async function fetchPublishedCmsBlogPosts() {
  try {
    const data = await cmsRequest(new URLSearchParams({ resource: 'blog-posts' }));
    const posts = normalizeBlogPosts(data.blogPosts);
    return posts.length > 0 ? posts : getPublishedCmsBlogPosts();
  } catch {
    return getPublishedCmsBlogPosts();
  }
}

export async function fetchPublishedCmsBlogPost(slug: string) {
  try {
    const data = await cmsRequest(new URLSearchParams({ resource: 'blog-post', slug }));
    return data.blogPost ? normalizeBlogPost(data.blogPost) : getPublishedCmsBlogPost(slug);
  } catch {
    return getPublishedCmsBlogPost(slug);
  }
}

export async function fetchCmsImage(imageId: string) {
  try {
    const data = await cmsRequest(new URLSearchParams({ resource: 'image', id: imageId }));
    return data.image ? normalizeImage(data.image) : null;
  } catch {
    return getCmsImage(imageId);
  }
}

export async function saveCmsPageManaged(input: CmsPageInput, useServer: boolean) {
  if (!useServer) {
    return saveCmsPage(input);
  }

  const data = await postCmsAction('save-page', { page: input });
  dispatchCmsChange();
  return normalizePages(data.pages);
}

export async function deleteCmsPageManaged(pageId: string, useServer: boolean) {
  if (!useServer) {
    return deleteCmsPage(pageId);
  }

  const data = await postCmsAction('delete-page', { id: pageId });
  dispatchCmsChange();
  return normalizePages(data.pages);
}

export async function saveCmsBlogPostManaged(input: CmsBlogPostInput, useServer: boolean) {
  if (!useServer) {
    return saveCmsBlogPost(input);
  }

  const data = await postCmsAction('save-blog-post', { blogPost: input });
  dispatchCmsChange();
  return normalizeBlogPosts(data.blogPosts);
}

export async function deleteCmsBlogPostManaged(postId: string, useServer: boolean) {
  if (!useServer) {
    return deleteCmsBlogPost(postId);
  }

  const data = await postCmsAction('delete-blog-post', { id: postId });
  dispatchCmsChange();
  return normalizeBlogPosts(data.blogPosts);
}

export async function saveCmsMenuItemManaged(input: CmsMenuInput, useServer: boolean) {
  if (!useServer) {
    return saveCmsMenuItem(input);
  }

  const data = await postCmsAction('save-menu-item', { item: input });
  dispatchCmsChange();
  return normalizeMenuItems(data.menuItems);
}

export async function deleteCmsMenuItemManaged(itemId: string, useServer: boolean) {
  if (!useServer) {
    return deleteCmsMenuItem(itemId);
  }

  const data = await postCmsAction('delete-menu-item', { id: itemId });
  dispatchCmsChange();
  return normalizeMenuItems(data.menuItems);
}

export async function resetCmsMenuItemsManaged(useServer: boolean) {
  if (!useServer) {
    return resetCmsMenuItems();
  }

  const data = await postCmsAction('reset-menu', { items: defaultMenuItems });
  dispatchCmsChange();
  return normalizeMenuItems(data.menuItems);
}

export async function moveCmsMenuItemManaged(itemId: string, direction: 'up' | 'down', useServer: boolean) {
  if (!useServer) {
    return moveCmsMenuItem(itemId, direction);
  }

  const data = await postCmsAction('move-menu-item', { id: itemId, direction });
  dispatchCmsChange();
  return normalizeMenuItems(data.menuItems);
}

export async function saveCmsImageManaged(input: CmsImageInput, useServer: boolean) {
  if (!useServer) {
    return saveCmsImage(input);
  }

  const data = await postCmsAction('save-image', { image: input });
  dispatchCmsChange();
  return normalizeImages(data.images);
}

export async function updateCmsImageMetaManaged(imageId: string, changes: Pick<CmsImage, 'title' | 'alt'>, useServer: boolean) {
  if (!useServer) {
    return updateCmsImageMeta(imageId, changes);
  }

  const data = await postCmsAction('update-image', { image: { id: imageId, ...changes } });
  dispatchCmsChange();
  return normalizeImages(data.images);
}

export async function deleteCmsImageManaged(imageId: string, useServer: boolean) {
  if (!useServer) {
    return deleteCmsImage(imageId);
  }

  const data = await postCmsAction('delete-image', { id: imageId });
  dispatchCmsChange();
  return normalizeImages(data.images);
}
