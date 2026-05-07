import { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  Menu as MenuIcon,
  Newspaper,
  Plus,
  RotateCcw,
  Save,
  Star,
  Trash2,
} from 'lucide-react';
import {
  CmsBlogPost,
  CmsBlogPostInput,
  CmsImage,
  CmsMenuInput,
  CmsMenuItem,
  CmsPage,
  CmsPageInput,
  defaultMenuItems,
  deleteCmsBlogPostManaged,
  deleteCmsMenuItemManaged,
  deleteCmsPageManaged,
  loadCmsAdminContent,
  moveCmsMenuItemManaged,
  resetCmsMenuItemsManaged,
  saveCmsBlogPostManaged,
  saveCmsMenuItemManaged,
  saveCmsPageManaged,
  slugify,
} from '../utils/contentManagement';

const emptyPageForm: CmsPageInput = {
  slug: '',
  title: '',
  summary: '',
  body: '',
  status: 'published',
  showInMenu: true,
  menuLabel: '',
};

const emptyMenuForm: CmsMenuInput = {
  label: '',
  href: '/',
  kind: 'internal',
  visible: true,
};

function createEmptyBlogForm(): CmsBlogPostInput {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return {
    slug: '',
    title: '',
    excerpt: '',
    body: '',
    status: 'published',
    category: 'Noutăți',
    tags: '',
    author: 'GENE SYS SECURITY SRL',
    coverImageId: '',
    featured: false,
    publishedAt: local.toISOString().slice(0, 16),
  };
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Operațiunea nu a putut fi efectuată.';
}

function confirmAction(message: string) {
  return window.confirm(message);
}

function pageToForm(page: CmsPage): CmsPageInput {
  return {
    id: page.id,
    slug: page.slug,
    title: page.title,
    summary: page.summary,
    body: page.body,
    status: page.status,
    showInMenu: page.showInMenu,
    menuLabel: page.menuLabel,
  };
}

function menuToForm(item: CmsMenuItem): CmsMenuInput {
  return {
    id: item.id,
    label: item.label,
    href: item.href,
    kind: item.kind,
    visible: item.visible,
    order: item.order,
  };
}

function toDatetimeLocal(value: string) {
  const date = value ? new Date(value) : new Date();
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;
  const local = new Date(safeDate.getTime() - safeDate.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

function formatAdminDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'fără dată';
  }

  return new Intl.DateTimeFormat('ro-RO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function blogToForm(post: CmsBlogPost): CmsBlogPostInput {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    body: post.body,
    status: post.status,
    category: post.category,
    tags: post.tags.join(', '),
    author: post.author,
    coverImageId: post.coverImageId,
    featured: post.featured,
    publishedAt: toDatetimeLocal(post.publishedAt),
  };
}

export function AdminContentManager() {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [blogPosts, setBlogPosts] = useState<CmsBlogPost[]>([]);
  const [cmsImages, setCmsImages] = useState<CmsImage[]>([]);
  const [menuItems, setMenuItems] = useState<CmsMenuItem[]>([]);
  const [blogForm, setBlogForm] = useState<CmsBlogPostInput>(() => createEmptyBlogForm());
  const [pageForm, setPageForm] = useState<CmsPageInput>(emptyPageForm);
  const [menuForm, setMenuForm] = useState<CmsMenuInput>(emptyMenuForm);
  const [blogMessage, setBlogMessage] = useState('');
  const [pageMessage, setPageMessage] = useState('');
  const [menuMessage, setMenuMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [usingServer, setUsingServer] = useState(false);

  const refreshContent = async () => {
    const content = await loadCmsAdminContent();
    setPages(content.pages);
    setBlogPosts(content.blogPosts);
    setCmsImages(content.images);
    setMenuItems(content.menuItems);
    setUsingServer(content.usingServer);
  };

  useEffect(() => {
    let cancelled = false;

    async function loadContent() {
      setLoading(true);
      try {
        const content = await loadCmsAdminContent();
        if (!cancelled) {
          setPages(content.pages);
          setBlogPosts(content.blogPosts);
          setCmsImages(content.images);
          setMenuItems(content.menuItems);
          setUsingServer(content.usingServer);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(getErrorMessage(loadError));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadContent();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleBlogSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setBlogMessage('');
    setSaving(true);

    try {
      setBlogPosts(await saveCmsBlogPostManaged(blogForm, usingServer));
      await refreshContent();
      setBlogForm(createEmptyBlogForm());
      setBlogMessage('Articolul a fost salvat.');
    } catch (saveError) {
      setError(getErrorMessage(saveError));
    } finally {
      setSaving(false);
    }
  };

  const handlePageSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setPageMessage('');
    setSaving(true);

    try {
      setPages(await saveCmsPageManaged(pageForm, usingServer));
      await refreshContent();
      setPageForm(emptyPageForm);
      setPageMessage('Pagina a fost salvată.');
    } catch (saveError) {
      setError(getErrorMessage(saveError));
    } finally {
      setSaving(false);
    }
  };

  const handleMenuSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMenuMessage('');
    setSaving(true);

    try {
      setMenuItems(await saveCmsMenuItemManaged(menuForm, usingServer));
      await refreshContent();
      setMenuForm(emptyMenuForm);
      setMenuMessage('Elementul de meniu a fost salvat.');
    } catch (saveError) {
      setError(getErrorMessage(saveError));
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBlogPost = async (postId: string) => {
    if (!confirmAction('Sigur ștergeți acest articol? Operațiunea nu poate fi anulată.')) {
      return;
    }

    setError('');
    setSaving(true);
    try {
      setBlogPosts(await deleteCmsBlogPostManaged(postId, usingServer));
      await refreshContent();
      setBlogForm((previous) => (previous.id === postId ? createEmptyBlogForm() : previous));
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (!confirmAction('Sigur ștergeți această pagină? Operațiunea nu poate fi anulată.')) {
      return;
    }

    setError('');
    setSaving(true);
    try {
      setPages(await deleteCmsPageManaged(pageId, usingServer));
      await refreshContent();
      setPageForm((previous) => (previous.id === pageId ? emptyPageForm : previous));
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMenuItem = async (itemId: string) => {
    if (!confirmAction('Sigur ștergeți acest link din meniu? Operațiunea nu poate fi anulată.')) {
      return;
    }

    setError('');
    setSaving(true);
    try {
      setMenuItems(await deleteCmsMenuItemManaged(itemId, usingServer));
      setMenuForm((previous) => (previous.id === itemId ? emptyMenuForm : previous));
    } catch (deleteError) {
      setError(getErrorMessage(deleteError));
    } finally {
      setSaving(false);
    }
  };

  const handleMoveMenuItem = async (itemId: string, direction: 'up' | 'down') => {
    setError('');
    try {
      setMenuItems(await moveCmsMenuItemManaged(itemId, direction, usingServer));
    } catch (moveError) {
      setError(getErrorMessage(moveError));
    }
  };

  const handleResetMenu = async () => {
    if (!confirmAction('Sigur resetați meniul la valorile implicite? Ordinea și linkurile personalizate vor fi înlocuite.')) {
      return;
    }

    setError('');
    setSaving(true);
    try {
      setMenuItems(await resetCmsMenuItemsManaged(usingServer));
      setMenuForm(emptyMenuForm);
      setMenuMessage('Meniul a fost resetat.');
    } catch (resetError) {
      setError(getErrorMessage(resetError));
    } finally {
      setSaving(false);
    }
  };

  const handleToggleMenuItem = async (item: CmsMenuItem) => {
    setError('');
    try {
      setMenuItems(await saveCmsMenuItemManaged({ ...item, visible: !item.visible }, usingServer));
    } catch (saveError) {
      setError(getErrorMessage(saveError));
    }
  };

  return (
    <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-blue-950">Conținut, blog și meniu</h2>
            <p className="mt-1 text-sm text-slate-500">
              {usingServer
                ? 'Conținut salvat în MySQL pentru articole, pagini publicate și navigație.'
                : 'Conținut local de test. Pe Apache/cPanel se activează automat MySQL după configurare.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-slate-100 px-3 py-1.5 font-semibold text-slate-700">
              {usingServer ? 'MySQL' : 'local'}
            </span>
            <span className="rounded-full bg-blue-50 px-3 py-1.5 font-semibold text-blue-800">
              {pages.length} pagini
            </span>
            <span className="rounded-full bg-teal-50 px-3 py-1.5 font-semibold text-teal-800">
              {blogPosts.length} articole
            </span>
            <span className="rounded-full bg-blue-50 px-3 py-1.5 font-semibold text-blue-800">
              {menuItems.filter((item) => item.visible).length} linkuri vizibile
            </span>
          </div>
        </div>
      </div>

      {loading && <div className="border-b border-blue-100 bg-blue-50 px-5 py-3 text-sm text-blue-800">Se încarcă CMS...</div>}
      {error && <div className="border-b border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{error}</div>}

      <div className="border-b border-slate-200 p-5">
        <div className="rounded-xl border border-slate-200 bg-slate-950 text-white shadow-sm">
          <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:p-6">
            <form onSubmit={handleBlogSubmit} className="rounded-lg border border-white/10 bg-white/95 p-4 text-slate-900">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-semibold text-blue-950">
                    <Newspaper className="h-5 w-5" />
                    Editor blog
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Articole publicate, SEO on-page și conținut vizual din biblioteca media.
                  </p>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50"
                >
                  <Eye className="h-4 w-4" />
                  Vezi blogul
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div>
                  <label htmlFor="cms-blog-title" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Titlu articol
                  </label>
                  <input
                    id="cms-blog-title"
                    value={blogForm.title}
                    onChange={(event) => {
                      const title = event.target.value;
                      setBlogForm((previous) => ({
                        ...previous,
                        title,
                        slug: previous.id ? previous.slug : slugify(title),
                      }));
                    }}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cms-blog-slug" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Slug
                  </label>
                  <input
                    id="cms-blog-slug"
                    value={blogForm.slug}
                    onChange={(event) =>
                      setBlogForm((previous) => ({ ...previous, slug: slugify(event.target.value) }))
                    }
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                    required
                  />
                </div>
              </div>

              <div className="mt-3">
                <label htmlFor="cms-blog-excerpt" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Rezumat SEO
                </label>
                <textarea
                  id="cms-blog-excerpt"
                  value={blogForm.excerpt}
                  onChange={(event) => setBlogForm((previous) => ({ ...previous, excerpt: event.target.value }))}
                  rows={3}
                  className="w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                  placeholder="Un rezumat scurt, afișat pe blog și folosit în meta description."
                />
              </div>

              <div className="mt-3">
                <label htmlFor="cms-blog-body" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Conținut articol
                </label>
                <textarea
                  id="cms-blog-body"
                  value={blogForm.body}
                  onChange={(event) => setBlogForm((previous) => ({ ...previous, body: event.target.value }))}
                  rows={10}
                  className="w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                  placeholder="Folosiți paragrafe separate prin rând gol. Titluri: ## Subtitlu. Liste: - element."
                  required
                />
                <p className="mt-1 text-xs text-slate-500">
                  Pentru imagini în articol folosiți codul din meniul `Imagini`, de exemplu `[[image:...]]`, pe linie separată.
                </p>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                <div>
                  <label htmlFor="cms-blog-status" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Stare
                  </label>
                  <select
                    id="cms-blog-status"
                    value={blogForm.status}
                    onChange={(event) =>
                      setBlogForm((previous) => ({
                        ...previous,
                        status: event.target.value === 'draft' ? 'draft' : 'published',
                      }))
                    }
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                  >
                    <option value="published">Publicat</option>
                    <option value="draft">Ciornă</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="cms-blog-category" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Categorie
                  </label>
                  <input
                    id="cms-blog-category"
                    value={blogForm.category}
                    onChange={(event) => setBlogForm((previous) => ({ ...previous, category: event.target.value }))}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label htmlFor="cms-blog-date" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Data publicării
                  </label>
                  <input
                    id="cms-blog-date"
                    type="datetime-local"
                    value={blogForm.publishedAt}
                    onChange={(event) => setBlogForm((previous) => ({ ...previous, publishedAt: event.target.value }))}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                  />
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                <div>
                  <label htmlFor="cms-blog-author" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Autor
                  </label>
                  <input
                    id="cms-blog-author"
                    value={blogForm.author}
                    onChange={(event) => setBlogForm((previous) => ({ ...previous, author: event.target.value }))}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label htmlFor="cms-blog-tags" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Etichete
                  </label>
                  <input
                    id="cms-blog-tags"
                    value={blogForm.tags}
                    onChange={(event) => setBlogForm((previous) => ({ ...previous, tags: event.target.value }))}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                    placeholder="fotovoltaice, securitate"
                  />
                </div>
                <div>
                  <label htmlFor="cms-blog-cover" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Imagine copertă ID
                  </label>
                  <input
                    id="cms-blog-cover"
                    list="cms-blog-cover-options"
                    value={blogForm.coverImageId}
                    onChange={(event) => setBlogForm((previous) => ({ ...previous, coverImageId: event.target.value }))}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                    placeholder="image-..."
                  />
                  <datalist id="cms-blog-cover-options">
                    {cmsImages.map((image) => (
                      <option key={image.id} value={image.id}>
                        {image.title}
                      </option>
                    ))}
                  </datalist>
                </div>
              </div>

              <label className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={blogForm.featured}
                  onChange={(event) => setBlogForm((previous) => ({ ...previous, featured: event.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300"
                />
                Marchează ca articol recomandat
              </label>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save className="h-4 w-4" />
                  Salvează articol
                </button>
                <button
                  type="button"
                  onClick={() => setBlogForm(createEmptyBlogForm())}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <Plus className="h-4 w-4" />
                  Articol nou
                </button>
              </div>
              {blogMessage && <p className="mt-3 text-sm text-emerald-700">{blogMessage}</p>}
            </form>

            <div className="flex min-h-full flex-col">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-white">Articole salvate</h3>
                  <p className="mt-1 text-sm text-blue-100">Editare rapidă, previzualizare și publicare controlată.</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white">
                  {blogPosts.filter((post) => post.status === 'published').length} publicate
                </span>
              </div>

              <div className="space-y-3 overflow-hidden">
                {blogPosts.length > 0 ? (
                  blogPosts.map((post) => (
                    <article key={post.id} className="rounded-lg border border-white/10 bg-white p-4 text-slate-900">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            post.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {post.status === 'published' ? 'Publicat' : 'Ciornă'}
                        </span>
                        {post.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-900">
                            <Star className="h-3.5 w-3.5" />
                            Recomandat
                          </span>
                        )}
                        <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800">
                          {post.category}
                        </span>
                      </div>
                      <h4 className="mt-3 text-lg font-semibold text-blue-950">{post.title}</h4>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-4 w-4" />
                          {formatAdminDate(post.publishedAt)}
                        </span>
                        <span>/blog/{post.slug}</span>
                      </div>
                      {post.excerpt && <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{post.excerpt}</p>}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.status === 'published' && (
                          <Link
                            to={`/blog/${post.slug}`}
                            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                          >
                            <Eye className="h-4 w-4" />
                            Previzualizare
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => setBlogForm(blogToForm(post))}
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-blue-100 bg-white px-3 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50"
                        >
                          <Edit3 className="h-4 w-4" />
                          Editează
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBlogPost(post.id)}
                          disabled={saving}
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 className="h-4 w-4" />
                          Șterge
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-8 text-center text-sm text-blue-50">
                    Nu există articole salvate. Primul articol publicat va apărea automat pe pagina Blog.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 p-5 2xl:grid-cols-2">
        <div className="space-y-5">
          <form onSubmit={handlePageSubmit} className="rounded-lg border border-blue-100 bg-blue-50/40 p-4">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-blue-950">
              <FileText className="h-5 w-5" />
              Editor pagină
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label htmlFor="cms-page-title" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Titlu
                </label>
                <input
                  id="cms-page-title"
                  value={pageForm.title}
                  onChange={(event) => {
                    const title = event.target.value;
                    setPageForm((previous) => ({
                      ...previous,
                      title,
                      slug: previous.id ? previous.slug : slugify(title),
                      menuLabel: previous.menuLabel || title,
                    }));
                  }}
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="cms-page-slug" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Slug
                </label>
                <input
                  id="cms-page-slug"
                  value={pageForm.slug}
                  onChange={(event) =>
                    setPageForm((previous) => ({ ...previous, slug: slugify(event.target.value) }))
                  }
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                  required
                />
              </div>
            </div>

            <div className="mt-3">
              <label htmlFor="cms-page-summary" className="mb-1.5 block text-sm font-medium text-slate-700">
                Rezumat
              </label>
              <input
                id="cms-page-summary"
                value={pageForm.summary}
                onChange={(event) => setPageForm((previous) => ({ ...previous, summary: event.target.value }))}
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              />
            </div>

            <div className="mt-3">
              <label htmlFor="cms-page-body" className="mb-1.5 block text-sm font-medium text-slate-700">
                Conținut
              </label>
              <textarea
                id="cms-page-body"
                value={pageForm.body}
                onChange={(event) => setPageForm((previous) => ({ ...previous, body: event.target.value }))}
                rows={8}
                className="w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                Inserare imagine: copiați codul din meniul `Imagini`, de exemplu `[[image:...]]`, pe o linie separată.
              </p>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
              <div>
                <label htmlFor="cms-page-status" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Stare
                </label>
                <select
                  id="cms-page-status"
                  value={pageForm.status}
                  onChange={(event) =>
                    setPageForm((previous) => ({
                      ...previous,
                      status: event.target.value === 'draft' ? 'draft' : 'published',
                    }))
                  }
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                >
                  <option value="published">Publicat</option>
                  <option value="draft">Ciornă</option>
                </select>
              </div>
              <div>
                <label htmlFor="cms-page-menu-label" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Etichetă meniu
                </label>
                <input
                  id="cms-page-menu-label"
                  value={pageForm.menuLabel}
                  onChange={(event) => setPageForm((previous) => ({ ...previous, menuLabel: event.target.value }))}
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                />
              </div>
              <label className="flex items-end gap-2 pb-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={pageForm.showInMenu}
                  onChange={(event) =>
                    setPageForm((previous) => ({ ...previous, showInMenu: event.target.checked }))
                  }
                  className="h-4 w-4 rounded border-slate-300"
                />
                Afișează în meniu
              </label>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                Salvează pagina
              </button>
              <button
                type="button"
                onClick={() => setPageForm(emptyPageForm)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" />
                Pagină nouă
              </button>
            </div>
            {pageMessage && <p className="mt-3 text-sm text-emerald-700">{pageMessage}</p>}
          </form>

          <div className="overflow-hidden rounded-lg border border-slate-200">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
              Pagini salvate
            </div>
            <div className="divide-y divide-slate-200">
              {pages.length > 0 ? (
                pages.map((page) => (
                  <article key={page.id} className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold text-slate-950">{page.title}</h4>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            page.status === 'published'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {page.status === 'published' ? 'Publicat' : 'Ciornă'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">/pagini/{page.slug}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {page.status === 'published' && (
                        <Link
                          to={`/pagini/${page.slug}`}
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                        >
                          <Eye className="h-4 w-4" />
                          Previzualizare
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => setPageForm(pageToForm(page))}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-blue-100 bg-white px-3 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50"
                      >
                        <Edit3 className="h-4 w-4" />
                        Editează
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePage(page.id)}
                        disabled={saving}
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <Trash2 className="h-4 w-4" />
                        Șterge
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="px-4 py-6 text-sm text-slate-500">Nu există pagini salvate.</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <form onSubmit={handleMenuSubmit} className="rounded-lg border border-blue-100 bg-blue-50/40 p-4">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-blue-950">
              <MenuIcon className="h-5 w-5" />
              Editor meniu
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label htmlFor="cms-menu-label" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Etichetă
                </label>
                <input
                  id="cms-menu-label"
                  value={menuForm.label}
                  onChange={(event) => setMenuForm((previous) => ({ ...previous, label: event.target.value }))}
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="cms-menu-kind" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Tip
                </label>
                <select
                  id="cms-menu-kind"
                  value={menuForm.kind}
                  onChange={(event) =>
                    setMenuForm((previous) => ({ ...previous, kind: event.target.value as CmsMenuInput['kind'] }))
                  }
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                >
                  <option value="internal">Intern</option>
                  <option value="external">Extern</option>
                  <option value="page">Pagină CMS</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="cms-menu-href" className="mb-1.5 block text-sm font-medium text-slate-700">
                Link
              </label>
              <input
                id="cms-menu-href"
                value={menuForm.href}
                onChange={(event) => setMenuForm((previous) => ({ ...previous, href: event.target.value }))}
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
                placeholder="/contact sau https://..."
                required
              />
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={menuForm.visible}
                onChange={(event) => setMenuForm((previous) => ({ ...previous, visible: event.target.checked }))}
                className="h-4 w-4 rounded border-slate-300"
              />
              Link vizibil
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                Salvează link
              </button>
              <button
                type="button"
                onClick={() => setMenuForm(emptyMenuForm)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Plus className="h-4 w-4" />
                Link nou
              </button>
              <button
                type="button"
                onClick={handleResetMenu}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-amber-200 bg-white px-4 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-50"
              >
                <RotateCcw className="h-4 w-4" />
                Reset meniu
              </button>
            </div>
            {menuMessage && <p className="mt-3 text-sm text-emerald-700">{menuMessage}</p>}
          </form>

          <div className="overflow-hidden rounded-lg border border-slate-200">
            <div className="grid grid-cols-[3rem_minmax(0,1fr)_7rem_8rem] gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 max-lg:hidden">
              <span>Ord.</span>
              <span>Link</span>
              <span>Stare</span>
              <span className="text-right">Acțiuni</span>
            </div>
            <div className="divide-y divide-slate-200">
              {menuItems.map((item, index) => (
                <article
                  key={item.id}
                  className="grid grid-cols-1 gap-3 px-4 py-4 lg:grid-cols-[3rem_minmax(0,1fr)_7rem_8rem] lg:items-center"
                >
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveMenuItem(item.id, 'up')}
                      disabled={index === 0}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Mută sus"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveMenuItem(item.id, 'down')}
                      disabled={index === menuItems.length - 1}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Mută jos"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-950">{item.label}</h4>
                    <p className="mt-1 break-all text-sm text-slate-500">{item.href}</p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        item.visible ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                      {item.visible ? 'Vizibil' : 'Ascuns'}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleMenuItem(item)}
                      className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      {item.visible ? 'Ascunde' : 'Arată'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMenuForm(menuToForm(item))}
                      className="inline-flex h-9 items-center justify-center rounded-md border border-blue-100 bg-white px-3 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50"
                    >
                      Editează
                    </button>
                    {!defaultMenuItems.some((defaultItem) => defaultItem.id === item.id) && (
                      <button
                        type="button"
                        onClick={() => handleDeleteMenuItem(item.id)}
                        className="inline-flex h-9 items-center justify-center rounded-md border border-red-200 bg-white px-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
                      >
                        Șterge
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
