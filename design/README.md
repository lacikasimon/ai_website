# Company Profile Creation

This is a code bundle for Company Profile Creation. The original project is available at https://www.figma.com/design/j6gq8Al4N41ZDaws0s8rU2/Company-Profile-Creation.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Production SEO

Set `VITE_SITE_URL=https://syshub.ro` before building so canonical URLs, `robots.txt`, and `sitemap.xml` are generated for the live domain.

For Google Search Console, copy only the token from Google's HTML tag verification method into `VITE_GOOGLE_SITE_VERIFICATION`, then run `npm run build`. The build injects the required `<meta name="google-site-verification" ...>` tag into `dist/index.html`.

For Google Analytics 4, set `VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX`. The site loads `gtag.js` only after the visitor accepts optional cookies, and it sends page views on React route changes.
