export type CmsPageStatus = 'published' | 'draft';

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
const cmsEndpoint = import.meta.env.VITE_CMS_ENDPOINT?.trim() || '/api/cms.php';

export const defaultMenuItems: CmsMenuItem[] = [
  { id: 'home', label: 'Acasă', href: '/', kind: 'internal', visible: true, order: 10 },
  { id: 'shop', label: 'Magazin', href: 'https://shop.syshub.ro/', kind: 'external', visible: true, order: 20 },
  { id: 'projects', label: 'Proiecte', href: '/proiecte', kind: 'internal', visible: true, order: 30 },
  { id: 'funding', label: 'Finanțare UE', href: '/finantare-ue', kind: 'internal', visible: true, order: 40 },
  { id: 'about', label: 'Despre Noi', href: '/#despre-noi', kind: 'internal', visible: true, order: 50 },
  { id: 'services', label: 'Servicii', href: '/#servicii', kind: 'internal', visible: true, order: 60 },
  { id: 'process', label: 'Proces', href: '/#proces', kind: 'internal', visible: true, order: 70 },
  { id: 'certifications', label: 'Certificări', href: '/#certificari', kind: 'internal', visible: true, order: 80 },
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

  return {
    id: candidate.id,
    label: candidate.label,
    href: candidate.href,
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

function normalizeDefaultMenuLabels(items: CmsMenuItem[]) {
  return items.map((item) => {
    const defaultItem = defaultMenuItems.find((candidate) => candidate.id === item.id);
    const legacyLabels = legacyDefaultMenuLabels[item.id] || [];
    if (defaultItem && legacyLabels.includes(item.label)) {
      return { ...item, label: defaultItem.label };
    }

    return item;
  });
}

export function getCmsPages() {
  return readJsonArray(pagesKey, normalizePage).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getCmsImages() {
  return readJsonArray(imagesKey, normalizeImage).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getCmsImage(imageId: string) {
  return getCmsImages().find((image) => image.id === imageId) || null;
}

export function getPublishedCmsPage(slug: string) {
  return getCmsPages().find((page) => page.slug === slug && page.status === 'published') || null;
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
  const nextItem: CmsMenuItem = {
    id: previous?.id || createId('menu'),
    label: input.label.trim(),
    href: input.href.trim(),
    kind: input.kind,
    visible: input.visible,
    order: input.order ?? previous?.order ?? (items.length + 1) * 10,
  };

  if (!nextItem.label || !nextItem.href) {
    throw new Error('Eticheta și link-ul sunt obligatorii.');
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
  menuItems?: unknown[];
  images?: unknown[];
  page?: unknown;
  image?: unknown;
};

export type CmsAdminContent = {
  pages: CmsPage[];
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
      menuItems: normalizeMenuItems(data.menuItems),
      images: normalizeImages(data.images),
      usingServer: true,
    };
  } catch {
    return {
      pages: getCmsPages(),
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
