import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, CalendarDays, Clock3, FileText, Star } from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { absoluteUrl } from '../seo/siteOrigin';
import { useSeo } from '../seo/useSeo';
import {
  CmsBlogPost,
  CmsImage,
  fetchCmsImage,
  fetchPublishedCmsBlogPosts,
  getCmsImage,
  getPublishedCmsBlogPosts,
} from '../utils/contentManagement';

const dateFormatter = new Intl.DateTimeFormat('ro-RO', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Data indisponibilă' : dateFormatter.format(date);
}

function readingTime(body: string) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

function getExcerpt(post: CmsBlogPost) {
  return post.excerpt || post.body.replace(/\[\[image:[^\]]+\]\]/g, '').slice(0, 180);
}

function BlogCover({ image, title, featured = false }: { image?: CmsImage | null; title: string; featured?: boolean }) {
  if (image) {
    return (
      <img
        src={image.dataUrl}
        alt={image.alt}
        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
          featured ? 'min-h-[22rem]' : 'min-h-56'
        }`}
        loading={featured ? 'eager' : 'lazy'}
      />
    );
  }

  return (
    <div
      className={`flex h-full min-h-56 items-center justify-center bg-[linear-gradient(135deg,#0f2a5f_0%,#1d4f8f_46%,#0f766e_100%)] p-8 text-center text-white ${
        featured ? 'min-h-[22rem]' : ''
      }`}
      aria-label={`Imagine decorativă pentru ${title}`}
      role="img"
    >
      <div>
        <FileText className="mx-auto h-10 w-10 opacity-90" aria-hidden />
        <p className="mt-4 text-lg font-semibold leading-7">{title}</p>
      </div>
    </div>
  );
}

export function BlogPage() {
  const [posts, setPosts] = useState(() => getPublishedCmsBlogPosts());
  const [loading, setLoading] = useState(true);
  const [imagesById, setImagesById] = useState<Record<string, CmsImage | null>>({});
  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const regularPosts = featuredPost ? posts.filter((post) => post.id !== featuredPost.id) : posts;
  const coverIds = useMemo(
    () => Array.from(new Set(posts.map((post) => post.coverImageId).filter(Boolean))),
    [posts],
  );
  const coverIdsKey = coverIds.join('|');

  useSeo({
    title: `Blog | ${siteContent.meta.ogTitle}`,
    description:
      'Articole, noutăți și recomandări tehnice de la GENE SYS SECURITY SRL despre instalații electrice, fotovoltaice, securitate și mentenanță.',
    path: '/blog',
    keywords: `${siteContent.meta.keywords}, blog instalații electrice, noutăți fotovoltaice, securitate tehnică`,
  });

  useEffect(() => {
    let active = true;

    setPosts(getPublishedCmsBlogPosts());
    setLoading(true);
    void fetchPublishedCmsBlogPosts()
      .then((nextPosts) => {
        if (active) {
          setPosts(nextPosts);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    if (coverIds.length === 0) {
      setImagesById({});
      return () => {
        active = false;
      };
    }

    setImagesById(Object.fromEntries(coverIds.map((imageId) => [imageId, getCmsImage(imageId)])));
    void Promise.all(coverIds.map(async (imageId) => [imageId, await fetchCmsImage(imageId)] as const)).then(
      (entries) => {
        if (active) {
          setImagesById(Object.fromEntries(entries));
        }
      },
    );

    return () => {
      active = false;
    };
  }, [coverIdsKey]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog GENE SYS SECURITY SRL',
    url: absoluteUrl('/blog'),
    blogPost: posts.slice(0, 12).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt || post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        '@type': 'Organization',
        name: post.author,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="container mx-auto px-4">
          <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="text-blue-700 transition-colors hover:text-blue-900">
              Acasă
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <span className="text-slate-700" aria-current="page">
              Blog
            </span>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Resurse tehnice</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-blue-950 md:text-5xl">
                Blog GENE SYS SECURITY SRL
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                Noutăți, recomandări și actualizări utile pentru proiecte electrice, fotovoltaice, securitate și
                mentenanță tehnică.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-3xl font-semibold text-blue-950">{posts.length}</p>
                  <p className="mt-1 text-sm text-slate-600">articole publicate</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-blue-950">
                    {posts.filter((post) => post.featured).length}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">recomandate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {featuredPost ? (
          <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <Link to={`/blog/${featuredPost.slug}`} className="block overflow-hidden" aria-label={featuredPost.title}>
                <BlogCover image={imagesById[featuredPost.coverImageId]} title={featuredPost.title} featured />
              </Link>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-900">
                    <Star className="h-4 w-4" aria-hidden />
                    Recomandat
                  </span>
                  <span className="rounded-full bg-teal-50 px-3 py-1 font-semibold text-teal-800">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-blue-950 md:text-4xl">
                  <Link to={`/blog/${featuredPost.slug}`} className="transition-colors hover:text-blue-700">
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-600">{getExcerpt(featuredPost)}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" aria-hidden />
                    {formatDate(featuredPost.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4" aria-hidden />
                    {readingTime(featuredPost.body)} min citire
                  </span>
                </div>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="mt-7 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-md bg-blue-800 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-900"
                >
                  Citește articolul
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </article>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <FileText className="mx-auto h-12 w-12 text-blue-800" aria-hidden />
            <h2 className="mt-4 text-2xl font-semibold text-blue-950">
              {loading ? 'Se încarcă articolele' : 'Nu există articole publicate încă'}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              {loading
                ? 'Verificăm articolele salvate în CMS.'
                : 'Articolele salvate ca publicate în admin vor apărea automat aici.'}
            </p>
          </div>
        )}

        {regularPosts.length > 0 && (
          <section className="mt-10" aria-labelledby="blog-list-title">
            <h2 id="blog-list-title" className="text-2xl font-semibold tracking-tight text-blue-950">
              Toate articolele
            </h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <Link to={`/blog/${post.slug}`} className="block overflow-hidden" aria-label={post.title}>
                    <BlogCover image={imagesById[post.coverImageId]} title={post.title} />
                  </Link>
                  <div className="p-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
                      <span className="rounded-full bg-teal-50 px-2.5 py-1 text-teal-800">{post.category}</span>
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold leading-7 text-blue-950">
                      <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-blue-700">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{getExcerpt(post)}</p>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-800 transition-colors hover:text-blue-950"
                    >
                      Citește mai mult
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
