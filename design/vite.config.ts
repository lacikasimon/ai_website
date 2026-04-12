import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Statikus Apache/cPanel: alapértelmezés a domain gyökere (public_html).
// Alkönyvtárhoz: BASE_PATH=/mappa/ npm run build — és a public/.htaccess RewriteBase is legyen /mappa/
const base = process.env.BASE_PATH ?? '/'

const SERVICE_SLUGS_FOR_SITEMAP = [
  'instalatii-electrice',
  'fotovoltaice',
  'securitate-cctv',
  'detectie-efractie',
  'mentenanta',
  'consultanta',
] as const

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'seo-sitemap-robots',
        apply: 'build',
        closeBundle() {
          const siteUrl = env.VITE_SITE_URL?.replace(/\/$/, '')
          if (!siteUrl) return

          const baseNorm = base === '/' ? '' : base.replace(/\/$/, '')
          const prefix = baseNorm
          const loc = (p: string) =>
            `${siteUrl}${prefix}${p === '/' ? '/' : `${p.startsWith('/') ? '' : '/'}${p}`}`.replace(
              /([^:])\/{2,}/g,
              '$1/',
            )

          const paths = [
            '/',
            '/contact',
            '/proiecte',
            ...SERVICE_SLUGS_FOR_SITEMAP.map((s) => `/servicii/${s}`),
          ]

          const urlset = paths
            .map(
              (p) => `  <url>
    <loc>${loc(p)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
            )
            .join('\n')

          const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`
          const distDir = path.join(process.cwd(), 'dist')
          writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8')

          const sitemapUrl = loc('/sitemap.xml').replace(/\/$/, '')
          writeFileSync(
            path.join(distDir, 'robots.txt'),
            `User-agent: *
Allow: /

# Crawlere AI (antrenare / rezumate — modificați dacă nu doriți indexare)
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${sitemapUrl}
`,
            'utf8',
          )
        },
      },
    ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
