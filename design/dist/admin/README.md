# PHP admin/API Apache/cPanel

Fișierele sursă din `public/api` sunt mutate automat în `dist/admin` la `npm run build`.
În producție endpointurile sunt:

- `/admin/contact-lead.php`
- `/admin/cms.php`
- `/admin/admin.php`

## Configurare recomandată

Pe cPanel, creați baza de date și utilizatorul MySQL, apoi importați `admin/schema.sql` din phpMyAdmin.

Puneți secretele ca variabile de mediu server-side sau într-un fișier `.env.server`. Pentru securitate, `.env.server` trebuie pus ideal deasupra `public_html`; dacă nu se poate, PHP caută și în rădăcina site-ului.

Exemplu `.env.server`:

```env
CRM_LEAD_WEBHOOK_URL=https://app.m-sys.ro/crm/webhook/3/leads
CRM_AUTH_MODE=authorization
CRM_WEBHOOK_KEY=cheia_webhook_crm
RECAPTCHA_SECRET_KEY=secretul_recaptcha

DB_HOST=localhost
DB_NAME=nume_baza_date
DB_USER=nume_utilizator
DB_PASS=parola_mysql
DB_CHARSET=utf8mb4
DB_TABLE_PREFIX=gs_

ADMIN_SEED_USERNAME=admin
ADMIN_SEED_DISPLAY_NAME=Administrator
ADMIN_SEED_PASSWORD=alege_o_parola_puternica
ADMIN_MAX_FAILED_ATTEMPTS=5
ADMIN_BAN_MINUTES=15
```

Nu puneți chei secrete în variabile `VITE_`, deoarece acelea ajung în JavaScript-ul public.
La `CRM_WEBHOOK_KEY` se trece doar cheia, fără prefixul `Bearer` și fără `Authorization:`.
`CRM_AUTH_MODE` poate fi `authorization`, `x-key` sau `both`; implicit trimite headerul `Authorization: Bearer`.

## CMS/admin

După importul `schema.sql`, primul utilizator admin este creat automat la prima accesare a API-ului dacă `ADMIN_SEED_PASSWORD` este completat și tabela `gs_admin_users` este goală.

Interfața React `/admin` folosește MySQL prin fișierele PHP din folderul fizic `/admin` pentru:

- pagini CMS și meniu;
- biblioteca de imagini;
- utilizatori admin;
- mesaje din formularul de contact.

Local, în Vite, API-ul PHP nu rulează și interfața revine automat la stocare în browser pentru testare.
