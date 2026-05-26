CREATE TABLE IF NOT EXISTS `gs_contact_messages` (
  `id` varchar(128) NOT NULL,
  `channel` varchar(80) NOT NULL DEFAULT 'website_contact',
  `campaign` varchar(120) DEFAULT NULL,
  `name` varchar(180) DEFAULT NULL,
  `first_name` varchar(120) DEFAULT NULL,
  `last_name` varchar(120) DEFAULT NULL,
  `email` varchar(180) DEFAULT NULL,
  `phone` varchar(80) DEFAULT NULL,
  `message` text,
  `source_url` varchar(500) DEFAULT NULL,
  `status` enum('new','read') NOT NULL DEFAULT 'new',
  `crm_status` varchar(40) NOT NULL DEFAULT 'pending',
  `crm_status_code` int DEFAULT NULL,
  `crm_response` mediumtext,
  `recaptcha_ok` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_status` (`status`),
  KEY `idx_crm_status` (`crm_status`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gs_admin_users` (
  `id` varchar(64) NOT NULL,
  `username` varchar(80) NOT NULL,
  `display_name` varchar(160) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','editor') NOT NULL DEFAULT 'editor',
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `failed_count` int NOT NULL DEFAULT 0,
  `banned_until` datetime DEFAULT NULL,
  `last_failed_at` datetime DEFAULT NULL,
  `last_login_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gs_cms_pages` (
  `id` varchar(64) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `title` varchar(220) NOT NULL,
  `summary` text,
  `body` mediumtext NOT NULL,
  `status` enum('published','draft') NOT NULL DEFAULT 'draft',
  `show_in_menu` tinyint(1) NOT NULL DEFAULT 1,
  `menu_label` varchar(160) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_slug` (`slug`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gs_cms_blog_posts` (
  `id` varchar(64) NOT NULL,
  `slug` varchar(140) NOT NULL,
  `title` varchar(240) NOT NULL,
  `excerpt` text,
  `body` mediumtext NOT NULL,
  `status` enum('published','draft') NOT NULL DEFAULT 'draft',
  `category` varchar(120) NOT NULL DEFAULT 'Noutăți',
  `tags` text,
  `author` varchar(160) NOT NULL DEFAULT 'GENE SYS SECURITY SRL',
  `cover_image_id` varchar(64) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `published_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_blog_slug` (`slug`),
  KEY `idx_blog_status_date` (`status`, `published_at`),
  KEY `idx_blog_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `gs_cms_blog_posts` (`id`, `slug`, `title`, `excerpt`, `body`, `status`, `category`, `tags`, `author`, `cover_image_id`, `featured`, `published_at`, `created_at`, `updated_at`) VALUES
('blog-fotovoltaice-on-grid-off-grid', 'sisteme-fotovoltaice-on-grid-off-grid', 'Sisteme fotovoltaice on-grid și off-grid: cum alegeți soluția potrivită', 'Un ghid practic despre diferențele dintre sistemele fotovoltaice conectate la rețea și cele independente, cu criterii utile pentru dimensionare și exploatare.', 'Sistemele fotovoltaice au devenit o soluție tot mai relevantă pentru locuințe, spații comerciale și obiective industriale. Alegerea între o configurație on-grid, off-grid sau hibridă nu ține doar de buget, ci și de consumul real, disponibilitatea rețelei, spațiul de montaj și nivelul de autonomie dorit.

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

GENE SYS SECURITY SRL abordează proiectele fotovoltaice integrat: evaluare tehnică, dimensionare, execuție și recomandări pentru exploatare. Scopul este ca sistemul să fie eficient, sigur și adaptat modului real în care clădirea consumă energie.', 'published', 'Fotovoltaice', '["fotovoltaice","on-grid","off-grid","prosumator","energie regenerabilă"]', 'GENE SYS SECURITY SRL', NULL, 1, '2026-05-26 08:00:00', '2026-05-26 08:00:00', '2026-05-26 08:00:00'),
('blog-instalatii-electrice-civile-industriale', 'instalatii-electrice-constructii-civile-industriale', 'Instalații electrice pentru construcții civile și industriale: de la proiectare la execuție', 'De ce contează proiectarea corectă, alegerea materialelor și verificările de recepție în lucrările electrice pentru clădiri noi sau modernizări.', 'O instalație electrică sigură începe cu o proiectare corectă. În construcțiile civile și industriale, fiecare circuit, tablou, protecție și traseu de cablu trebuie gândit în funcție de consumatori, regim de utilizare, extinderi posibile și cerințe de exploatare pe termen lung.

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

GENE SYS SECURITY SRL oferă servicii complete de proiectare și execuție pentru instalații electrice în construcții civile și industriale. Abordarea noastră urmărește siguranța, conformitatea și o predare clară, astfel încât instalația să poată fi exploatată fără ambiguități.', 'published', 'Instalații electrice', '["instalații electrice","proiectare electrică","execuție","construcții civile","industrial"]', 'GENE SYS SECURITY SRL', NULL, 0, '2026-05-20 08:00:00', '2026-05-20 08:00:00', '2026-05-20 08:00:00'),
('blog-mentenanta-tehnica-preventiva', 'mentenanta-tehnica-preventiva-cladiri-echipamente', 'Mentenanță tehnică preventivă: siguranță, continuitate și costuri controlate', 'Mentenanța planificată ajută clădirile și echipamentele să funcționeze optim, reducând riscul de opriri neprevăzute și intervenții costisitoare.', 'Mentenanța tehnică nu înseamnă doar intervenție atunci când apare o defecțiune. Pentru clădiri, spații comerciale și obiective industriale, mentenanța preventivă este o metodă de control al riscului: verifici periodic instalațiile, identifici uzura și corectezi problemele înainte să devină blocaje.

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

GENE SYS SECURITY SRL oferă servicii de mentenanță tehnică adaptate nevoilor fiecărui client. Începem cu evaluarea instalațiilor existente, apoi propunem un plan realist de verificări, intervenții și îmbunătățiri, în funcție de nivelul de risc și de importanța obiectivului.', 'published', 'Mentenanță', '["mentenanță tehnică","mentenanță preventivă","service","clădiri","echipamente"]', 'GENE SYS SECURITY SRL', NULL, 0, '2026-05-14 08:00:00', '2026-05-14 08:00:00', '2026-05-14 08:00:00'),
('blog-detectie-efractie-sisteme-alarma', 'sisteme-detectie-efractie-alarma', 'Sisteme de detecție la efracție: protecție activă pentru perimetre și clădiri', 'Un sistem de alarmare eficient trebuie proiectat în funcție de riscuri, acces, zone protejate și modul real de utilizare a spațiului.', 'Sistemele de detecție la efracție au rolul de a identifica rapid o încercare de pătrundere într-un spațiu protejat și de a transmite informații utile pentru reacție. Eficiența lor depinde de proiectare, de alegerea senzorilor, de amplasare și de modul în care sistemul este folosit zi de zi.

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

GENE SYS SECURITY SRL proiectează, instalează și întreține sisteme de detecție la efracție pentru obiective civile și industriale. Punem accent pe soluții clare, configurate pe riscul real al locației și pe exploatare simplă pentru utilizatori.', 'published', 'Securitate', '["detecție efracție","alarmă","securitate","senzori","protecție perimetrală"]', 'GENE SYS SECURITY SRL', NULL, 0, '2026-05-08 08:00:00', '2026-05-08 08:00:00', '2026-05-08 08:00:00'),
('blog-cctv-supraveghere-video', 'sisteme-supraveghere-video-cctv', 'Sisteme de supraveghere video CCTV: monitorizare eficientă pentru proprietăți și infrastructuri', 'Supravegherea video modernă combină camere potrivite, stocare sigură, acces controlat și mentenanță pentru protecție continuă.', 'Sistemele CCTV sunt esențiale pentru monitorizarea proprietăților, spațiilor comerciale, halelor, depozitelor și obiectivelor cu cerințe ridicate de securitate. O soluție video eficientă nu se rezumă la numărul camerelor, ci la calitatea imaginii, poziționare, stocare, acces și mentenanță.

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

GENE SYS SECURITY SRL instalează sisteme CCTV adaptate fiecărui obiectiv, de la proprietăți private la spații comerciale și infrastructuri industriale. Punem accent pe acoperire eficientă, echipamente de calitate și suport tehnic după punerea în funcțiune.', 'published', 'CCTV', '["CCTV","supraveghere video","securitate video","monitorizare","NVR"]', 'GENE SYS SECURITY SRL', NULL, 0, '2026-05-02 08:00:00', '2026-05-02 08:00:00', '2026-05-02 08:00:00')
ON DUPLICATE KEY UPDATE
  `id` = `id`;

CREATE TABLE IF NOT EXISTS `gs_cms_menu_items` (
  `id` varchar(64) NOT NULL,
  `label` varchar(160) NOT NULL,
  `href` varchar(500) NOT NULL,
  `kind` enum('internal','external','page') NOT NULL DEFAULT 'internal',
  `visible` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int NOT NULL DEFAULT 100,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_visible_order` (`visible`, `sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `gs_cms_images` (
  `id` varchar(64) NOT NULL,
  `title` varchar(220) NOT NULL,
  `alt` varchar(300) DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `mime_type` varchar(120) NOT NULL,
  `size_bytes` int NOT NULL DEFAULT 0,
  `data_url` longtext NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `gs_cms_menu_items` (`id`, `label`, `href`, `kind`, `visible`, `sort_order`) VALUES
('home', 'Acasă', '/', 'internal', 1, 10),
('shop', 'Magazin', 'https://shop.syshub.ro/', 'external', 1, 20),
('projects', 'Proiecte', '/proiecte', 'internal', 1, 30),
('blog', 'Blog', '/blog', 'internal', 1, 35),
('funding', 'Finanțare UE', '/finantare-ue', 'internal', 1, 40),
('about', 'Despre Noi', '/#despre-noi', 'internal', 1, 50),
('services', 'Servicii', '/#servicii', 'internal', 1, 60),
('process', 'Proces', '/#proces', 'internal', 1, 70),
('certifications', 'Certificări', '/#certificari', 'internal', 1, 80)
ON DUPLICATE KEY UPDATE
  `label` = VALUES(`label`),
  `href` = VALUES(`href`),
  `kind` = VALUES(`kind`),
  `visible` = VALUES(`visible`),
  `sort_order` = VALUES(`sort_order`);
