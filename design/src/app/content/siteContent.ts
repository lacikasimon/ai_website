/**
 * Date companie GENE SYS SECURITY SRL — actualizate conform registrului.
 * Texte pagină principală: ton profesional B2B, orientat pe încredere și claritate.
 */
export const siteContent = {
  meta: {
    title: 'GENE SYS SECURITY SRL — Instalații electrice, fotovoltaice și securitate',
    description:
      'GENE SYS SECURITY SRL, Satu Mare: proiectare și execuție instalații electrice, sisteme fotovoltaice, securitate CCTV și detecție efracție, mentenanță și consultanță pentru proiecte civile și industriale în România.',
    ogTitle: 'GENE SYS SECURITY SRL',
    /** SEO / AI: cuvinte-cheie pentru meta keywords și context */
    keywords:
      'instalații electrice Satu Mare, electricieni autorizați ANRE, proiectare instalații electrice, sisteme fotovoltaice România, panouri solare, securitate CCTV autorizare IGPR, detecție efracție, mentenanță tehnică, tablouri electrice, GENE SYS SECURITY, instalații industriale',
  },

  /** Date de identificare (ONRC / ANAF) */
  company: {
    name: 'GENE SYS SECURITY SRL',
    cui: 'RO 38322763',
    cuiNote: 'Plătitor de TVA (la facturare)',
    regCom: 'J2017001105304',
    euid: 'ROONRC.J2017001105304',
    founded: '2017-10-06',
    county: 'Satu Mare',
    locality: 'Satu Mare',
    street: 'Str. Gheorghe Barițiu 86',
    postalCode: '440135',
  },

  contact: {
    /** Mobil public — format tel E.164 */
    phones: [{ display: '0749 235 958', tel: '+40749235958' }],
    /** Gol = nu afișăm email pe site (completați când există adresă publică) */
    emails: [] as string[],
    addressLines: [
      'Județ Satu Mare, loc. Satu Mare',
      'Str. Gheorghe Barițiu 86, cod poștal 440135',
    ],
    hours: ['Luni–Vineri: 08:00–18:00', 'Urgențe: la cerere'],
    coverage:
      'Intervenții în Satu Mare și regiune; proiecte civile și industriale la nivel național, în funcție de cerințe.',
    /** Google Maps embed (iframe src) */
    mapEmbedUrl:
      'https://www.google.com/maps?q=Str.%20Gheorghe%20Bari%C8%9Biu%2086%2C%20440135%20Satu%20Mare%2C%20Romania&output=embed',
    /** Link „Deschide în Google Maps” — același punct ca în embed */
    mapOpenUrl:
      'https://www.google.com/maps/search/?api=1&query=Str.%20Gheorghe%20Bari%C8%9Biu%2086%2C%20440135%20Satu%20Mare%2C%20Romania',
  },

  /** KPI — experiența: ani de la înființare (2017) */
  statsKpi: [
    {
      value: 9,
      suffix: '+',
      prefix: '',
      title: 'Experiență',
      highlight: 'Ani în domeniu',
      description:
        'Echipă consolidată în proiecte civile și industriale, cu focus pe siguranță, termene și documentație conformă.',
    },
    {
      value: 120,
      suffix: '+',
      prefix: '',
      title: 'Proiecte',
      highlight: 'Proiecte livrate',
      description:
        'De la locuințe și spații comerciale la hale și obiective cu cerințe tehnice ridicate — abordare integrată.',
    },
    {
      value: 100,
      suffix: '%',
      prefix: '',
      title: 'Conformitate',
      highlight: 'Normative în vigoare',
      description:
        'Materiale și soluții alese în funcție de reglementări, avize și bune practici din domeniul energetic și al securității.',
    },
  ],

  /** Conținut pagina principală (secțiuni) */
  home: {
    hero: {
      headline: 'Instalații electrice, energie verde și securitate — de la studiu la mentenanță',
      subheadline:
        'Sprijinim investițiile în construcții civile și industriale: proiectare conform normelor, execuție pe șantier, sisteme fotovoltaice și securitate (CCTV, alarmă), plus service — cu oferte explicite și termene asumate.',
      badge: 'GENE SYS SECURITY SRL · Satu Mare',
    },
    /** Antet secțiune KPI (Experiență) */
    statsSection: {
      sectionLabel: 'Încredere',
      title: 'Experiență în teren, nu doar pe hârtie',
      subtitle:
        'Ani de proiecte reale, dosare tehnice și recepții — pentru beneficiari care cer siguranță operațională și trasabilitate.',
      ctaTitle: 'Discutăm cerințele proiectului dumneavoastră',
      ctaBody:
        'Trimiteți un scurt context (tip obiectiv, localitate, stadiu) și revenim cu pașii următori și o estimare de efort.',
      ctaButton: 'Solicită o consultație',
    },
    /** Antet listă servicii */
    servicesIntro: {
      sectionLabel: 'Servicii',
      title: 'Soluții integrate: electric, regenerabil, securitate',
      subtitle:
        'Fiecare domeniu are pagină dedicată — cu livrabile clare, etape tipice și întrebări frecvente, ca să știți din start ce include colaborarea.',
    },
    /** Carduri ANRE / IGPR + bloc calitate */
    certificationsContent: {
      sectionLabel: 'Autorizații',
      title: 'Conformitate în domeniul energiei și al securității',
      subtitle:
        'Operăm în cadrul legal aplicabil firmelor de specialitate — transparență privind tipul lucrărilor și documentația aferentă.',
      cards: [
        {
          key: 'anre' as const,
          title: 'ANRE',
          fullName: 'Autoritatea Națională de Reglementare în domeniul Energiei',
          description:
            'Lucrări și documentație pentru instalații electrice și sisteme energetice acolo unde reglementările cer racordări, avize și verificări specifice.',
          status: 'Autorizat',
        },
        {
          key: 'igpr' as const,
          title: 'IGPR',
          fullName: 'Inspectoratul General al Poliției Române',
          description:
            'Instalare și mentenanță pentru sisteme de securitate (inclusiv CCTV și detecție la efracție), în conformitate cu cerințele pentru firme autorizate.',
          status: 'Autorizat',
        },
      ],
      qualityTitle: 'Calitate și trasabilitate',
      qualityLead:
        'Selectăm echipamente și materiale potrivite scopului, păstrăm fișe de proiect și înregistrări de probe acolo unde este cazul — pentru recepții fără ambiguități.',
      qualityBullets: [
        'Propuneri tehnice explicite (nu doar „la pachet”) și variante de buget',
        'Personal cu experiență în execuție și punere în funcțiune',
        'Materiale și echipamente de la furnizori recunoscuți, cu documentație',
        'Respectarea standardelor SR EN și a reglementărilor în vigoare pentru domeniul vizat',
      ],
      closingNote:
        'Soluțiile sunt dimensionate pe obiectiv: de la locuință unifamilială la spații comerciale sau industriale cu cerințe sporite.',
    },
    about: {
      sectionBadge: 'Companie',
      sectionTitle: 'Cine suntem și cum lucrăm',
      sectionSubtitle:
        'Echipă orientată spre execuție sigură, termene realiste și relație transparentă cu beneficiarul și cu șantierul',
      paragraphs: [
        '**GENE SYS SECURITY SRL** este o societate din Satu Mare, activă din 2017, orientată spre soluții tehnice durabile: instalații electrice, energie regenerabilă (fotovoltaic), sisteme de securitate și mentenanță.',
        'Ne adresăm investitorilor, constructorilor, administratorilor de clădiri și beneficiarilor privați care au nevoie de claritate în ofertă, documentație corectă și execuție sigură pe șantier.',
        'Colaborăm transparent: stabilim împreună cerințele, propunem variante tehnice și economice, respectăm avizele și termenele agreate — fără surprize la recepție.',
      ],
      commitmentTitle: 'Angajament',
      commitmentBody:
        'Respectăm normele ANRE și cerințele pentru sisteme de securitate, comunicăm proactiv pe durata proiectului și oferim suport după punerea în funcțiune.',
      missionTitle: 'Misiunea noastră',
      missionBody:
        'Să livrăm instalații și sisteme sigure, verificabile și adaptate contextului fiecărui client — cu materiale potrivite, execuție disciplinată pe șantier și trasabilitate în documentație.',
      visionTitle: 'Viziunea noastră',
      visionBody:
        'Să fim partenerul tehnic de încredere în regiune pentru proiecte care îmbină eficiență energetică, securitate și operare simplă pe termen lung.',
    },
    whyUs: {
      sectionLabel: 'Diferențiatori',
      title: 'Mai mult decât montaj: claritate și suport după livrare',
      subtitle:
        'În proiectele electrice și de securitate, riscul apare când lipsesc detaliile din ofertă sau documentația la recepție. Ne concentrăm pe ambele.',
      pillars: [
        {
          title: 'Expertiză și documentație',
          body: 'Propuneri tehnice explicate, liste de materiale clare și dosare de proiect / recepție pregătite pentru verificări și audit.',
        },
        {
          title: 'Siguranță și conformitate',
          body: 'Lucrări executate cu respectarea SR EN și a reglementărilor aplicabile instalațiilor electrice și sistemelor de securitate.',
        },
        {
          title: 'Termene și comunicare',
          body: 'Planificare realistă pe șantier, puncte de contact definite și actualizări pe etape — știți unde sunteți în proiect.',
        },
        {
          title: 'După livrare',
          body: 'Instruire la punerea în funcțiune, recomandări de mentenanță și posibilitate de contracte de service pentru obiective critice.',
        },
      ],
    },
    process: {
      sectionLabel: 'Colaborare',
      title: 'Cum decurge un proiect cu noi',
      subtitle:
        'Același flux pentru modernizări și pentru investiții noi — adaptat însă la avize, racordări și probele specifice fiecărui domeniu.',
      steps: [
        {
          title: 'Consultanță și evaluare',
          body: 'Analizăm cerințele, condițiile de amplasament, consumurile și riscurile — inclusiv pentru fotovoltaic și securitate.',
        },
        {
          title: 'Ofertă și planificare',
          body: 'Primeți o ofertă detaliată (capitole, opțiuni), termene estimate și pașii pentru avize / racordări unde e cazul.',
        },
        {
          title: 'Proiectare și aprobări',
          body: 'Întocmim documentația necesară și coordonăm demersurile pentru conformitate (inclusiv cerințe ANRE / IGPR după tipul lucrării).',
        },
        {
          title: 'Execuție pe șantier',
          body: 'Montaj, cablare, probe și integrare echipamente — cu respectarea planului de siguranță și a instrucțiunilor producătorilor.',
        },
        {
          title: 'Recepție și predare',
          body: 'Teste, instruire utilizatori, predare documentație „as built” și recomandări pentru mentenanță.',
        },
      ],
    },
    sectors: {
      sectionLabel: 'Domenii',
      title: 'Tipuri de obiective și proiecte',
      subtitle:
        'Ne adaptăm constrângerilor de șantier, bugetului și duratei de exploatare — de la locuințe la hale și obiective cu securitate sporită.',
      items: [
        {
          title: 'Rezidențial & multifamily',
          body: 'Apartamente, case, ansambluri rezidențiale: instalații electrice, iluminat, pregătire smart home, soluții PV unde e fezabil.',
        },
        {
          title: 'Comercial & retail',
          body: 'Magazine, birouri, spații de servicii: distribuție electrică, iluminat, CCTV și alarmă adaptate fluxului clienților.',
        },
        {
          title: 'Industrial & producție',
          body: 'Hale, linii tehnologice, tablouri de distribuție, refacere / extindere rețele și mentenanță planificată.',
        },
        {
          title: 'Energie regenerabilă',
          body: 'Sisteme fotovoltaice on-grid / off-grid / hibride, dimensionare și integrare în consumul existent.',
        },
        {
          title: 'Securitate perimetrală',
          body: 'CCTV, detecție efracție, control acces — proiectate în acord cu cerințele legale și cu obiectivele dumneavoastră de protecție.',
        },
        {
          title: 'Infrastructură electrică',
          body: 'Consultanță pentru branșamente, extinderi de rețea și optimizare consum — în sprijinul proiectelor noi sau al relocărilor.',
        },
      ],
    },
    faq: {
      sectionLabel: 'Întrebări frecvente',
      title: 'Răspunsuri pe scurt',
      subtitle:
        'Informații utile înainte de a solicita o ofertă. Pentru cazuri specifice, vă răspundem direct la telefon sau după vizionarea locației.',
      items: [
        {
          q: 'Cum solicitați o ofertă și ce informații sunt necesare?',
          a: 'Ne scrieți sau ne sunați cu tipul clădirii, suprafața aproximativă, faze de execuție dorite și, dacă există, planuri / schițe. Pentru fotovoltaic sau securitate, ne ajută și fotografii sau descrierea obiectivului.',
        },
        {
          q: 'Lucrați doar în Satu Mare sau și în alte județe?',
          a: 'Intervenții locale și regionale sunt frecvente; pentru proiecte naționale, stabilim împreună deplasările și logistica în funcție de amploare și termen.',
        },
        {
          q: 'Cine întocmește documentația pentru ANRE sau pentru sisteme de securitate?',
          a: 'Pregătim sau coordonăm documentația tehnică necesară conform tipului lucrării și reglementărilor în vigoare. Vă explicăm pașii și termenele estimate încă din faza de ofertă.',
        },
        {
          q: 'Oferiți garanție pentru lucrări și echipamente?',
          a: 'Da — garanțiile pentru manoperă și pentru echipamente sunt trecute în contract și în documentele de predare, conform politicii producătorilor și condițiilor agreate.',
        },
        {
          q: 'Puteți prelua mentenanța după ce a lucrat altă firmă?',
          a: 'În multe cazuri da, după o evaluare tehnică a instalației existente și eventuală remediere a neconformităților critice. Vă propunem un plan de mentenanță adaptat.',
        },
        {
          q: 'Cât durează, în medie, o instalare fotovoltaică de uz casnic?',
          a: 'Durata depinde de putere, tipul acoperișului, racordarea la rețea și avize. După vizită tehnică vă comunicăm un calendar realist, inclusiv pașii administrativi.',
        },
        {
          q: 'Facturați cu TVA și ce modalități de plată acceptați?',
          a: 'Suntem plătitori de TVA la facturare (conform datelor din antet). Modalitățile de plată (ordin de plată, etapizare după contract etc.) se stabilesc în funcție de proiect și se trec clar în ofertă și în contract.',
        },
        {
          q: 'Oferiți intervenții de urgență pentru defecțiuni electrice?',
          a: 'Da, în limita disponibilității echipelor — în special pentru beneficiari cu contract de mentenanță sau pentru situații critice agreate telefonic. Vă recomandăm să ne contactați direct la numărul afișat.',
        },
      ],
    },
    closingCta: {
      title: 'Haideți să stabilim pașii concreti',
      body: 'Un telefon sau un mesaj cu obiectivul și localitatea — vă răspundem cu întrebări tehnice utile și, unde e cazul, cu o vizită pe teren.',
      primary: 'Solicită ofertă',
      secondary: 'Vezi proiecte',
    },
  },

  /**
   * Catalog servicii (pagina principală + rute /servicii/:slug).
   * Păstrați slug-urile sincronizate cu ServiceDetailPage și routes.
   */
  servicesCatalog: [
    {
      slug: 'instalatii-electrice',
      title: 'Instalații electrice & proiectare',
      description:
        'Distribuție, tablouri, iluminat, prize și circuite dedicate — de la apartament la hale: proiectare, execuție, verificări și documentație pentru recepție.',
      features: [
        'Proiectare și dimensionare conform încărcărilor',
        'Execuție și trasare circuite',
        'Tablouri și subtablouri',
        'Pregătire racorduri și puneri în funcțiune',
      ],
    },
    {
      slug: 'fotovoltaice',
      title: 'Sisteme fotovoltaice (on-grid / off-grid)',
      description:
        'Analiză de consum, alegere invertor și structură, integrare în clădire și pași pentru racord — cu scenarii de rentabilitate pe termen mediu.',
      features: [
        'Dimensionare putere și stocare (unde e cazul)',
        'On-grid, off-grid sau hibrid',
        'Monitorizare producție',
        'Mentenanță și verificări periodice',
      ],
    },
    {
      slug: 'securitate-cctv',
      title: 'Supraveghere video (CCTV)',
      description:
        'Design perimetral, camere potrivite luminii și rezoluției necesare, înregistrare și acces remote — în limitele autorizărilor pentru firme de specialitate.',
      features: [
        'Plan de camere și cablare',
        'NVR / stocare și rețea',
        'Vizualizare de pe telefon sau PC',
        'Mentenanță și upgrade-uri',
      ],
    },
    {
      slug: 'detectie-efractie',
      title: 'Detecție la efracție & alarmare',
      description:
        'Zone, senzori, centrală și scenarii de notificare — adaptate riscului și tipului de clădire (locuință, birou, depozit).',
      features: [
        'Perimetru și interior',
        'Integrare sirene și notificări',
        'Întreținere și extinderi',
        'Documentație pentru obiective supuse reglementării',
      ],
    },
    {
      slug: 'mentenanta',
      title: 'Mentenanță tehnică',
      description:
        'Contracte preventive sau intervenții la cerere: instalații electrice, echipamente de securitate și verificări pentru continuitate operațională.',
      features: [
        'Plan de vizite și checklist',
        'Intervenții programate sau urgență (conform disponibilității)',
        'Raportare după vizită',
        'Recomandări de înlocuiri',
      ],
    },
    {
      slug: 'consultanta',
      title: 'Consultanță & infrastructură electrică',
      description:
        'Studii de fezabilitate, branșamente, extinderi de rețea și optimizare consum — util înainte de investiție sau relocare.',
      features: [
        'Audit și recomandări tehnice',
        'Suport dosare și avize (în limita competențelor)',
        'Coordonare cu alte discipline de șantier',
        'Estimări de cost și durată',
      ],
    },
  ],

  /** Politică cookie — informare conform practicilor GDPR / ePrivacy (RO) */
  cookiePolicy: {
    title: 'Politică privind fișierele cookie',
    lastUpdated: '28 martie 2026',
    intro:
      'Această politică descrie modul în care GENE SYS SECURITY SRL („noi”) utilizează fișierele cookie și tehnologii similare pe site-ul nostru. O putem actualiza periodic; versiunea în vigoare este cea publicată pe această pagină.',
    sections: [
      {
        heading: 'Ce sunt cookie-urile?',
        paragraphs: [
          'Cookie-urile sunt fișiere text de mici dimensiuni stocate pe dispozitivul dumneavoastră (computer, telefon, tabletă) când vizitați un site web. Permit recunoașterea browserului, memorarea unor preferințe și îmbunătățirea funcționării site-ului.',
        ],
      },
      {
        heading: 'Ce tipuri de cookie-uri folosim?',
        paragraphs: [
          'Cookie-uri strict necesare: asigură funcții de bază (navigare, securitate, încărcarea paginilor). Fără ele, site-ul nu poate funcționa corect.',
          'Cookie-uri de preferințe: memorează alegeri (ex. limbă sau regiune), dacă le activați.',
          'Cookie-uri de analiză / statistici (dacă sunt implementate): ne ajută să înțelegem cum este folosit site-ul, în formă agregată. Acestea se plasează doar cu acordul dumneavoastră, acolo unde legea o cere.',
          'Cookie-uri de marketing (dacă sunt implementate): pot fi folosite pentru conținut personalizat sau măsurători publicitare, doar cu consimțământ.',
        ],
      },
      {
        heading: 'Baza legală și durata',
        paragraphs: [
          'Pentru cookie-uri strict necesare, prelucrarea se bazează pe interesul legitim de a furniza serviciul online solicitat. Pentru cookie-uri opționale, ne bazăm pe consimțământul dumneavoastră, pe care îl puteți retrage oricând, fără a afecta legalitatea prelucrării anterioare.',
          'Durata de viață variază: sesiune (șterse la închiderea browserului) sau persistente, conform scopului fiecărui cookie.',
        ],
      },
      {
        heading: 'Gestionarea preferințelor',
        paragraphs: [
          'La prima vizită puteți accepta sau refuza cookie-urile neesențiale prin bannerul afișat. Puteți modifica setările browserului pentru a bloca sau șterge cookie-uri; rețineți că blocarea cookie-urilor necesare poate limita funcționalitatea site-ului.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [
          'Pentru întrebări privind această politică sau prelucrarea datelor cu caracter personal, ne puteți contacta la datele publicate în secțiunea Contact de pe site.',
        ],
      },
    ],
  },

  /** GDPR — informare privind prelucrarea datelor personale */
  gdprPolicy: {
    title: 'Protecția datelor personale (GDPR)',
    lastUpdated: '7 mai 2026',
    intro:
      'Această informare explică modul în care GENE SYS SECURITY SRL prelucrează datele cu caracter personal primite prin site, prin solicitări de ofertă, prin comunicări comerciale și în relația contractuală cu clienții sau partenerii. Informațiile sunt redactate pentru transparență și pot fi actualizate atunci când se modifică serviciile, fluxurile tehnice sau cerințele legale.',
    quickFacts: [
      {
        label: 'Operator de date',
        value: 'GENE SYS SECURITY SRL',
      },
      {
        label: 'Identificare',
        value: 'CUI RO 38322763 · Reg. Com. J2017001105304',
      },
      {
        label: 'Sediu',
        value: 'Str. Gheorghe Barițiu 86, Satu Mare, cod poștal 440135',
      },
      {
        label: 'Contact',
        value: 'Prin pagina Contact, telefonic sau la sediul social',
      },
    ],
    sections: [
      {
        heading: 'Cine este operatorul datelor?',
        paragraphs: [
          'GENE SYS SECURITY SRL stabilește scopurile și mijloacele prelucrării datelor personale colectate în legătură cu site-ul și cu serviciile sale. În acest context, compania acționează ca operator de date, în sensul Regulamentului (UE) 2016/679.',
          'Pentru solicitări privind protecția datelor, ne puteți contacta prin datele afișate pe pagina Contact sau prin corespondență la sediul social.',
        ],
      },
      {
        heading: 'Ce date putem prelucra?',
        paragraphs: [
          'Prelucrăm doar datele necesare pentru scopurile descrise mai jos. Categoriile concrete depind de modul în care interacționați cu noi: vizitarea site-ului, trimiterea unei solicitări, negocierea unei oferte sau derularea unui contract.',
        ],
        bullets: [
          'date de identificare și contact: nume, prenume, telefon, companie, funcție, adresă de lucru sau adresă de livrare / intervenție;',
          'date transmise voluntar în formularul de contact sau în comunicări: descrierea proiectului, localitate, fotografii sau documente tehnice, dacă ni le trimiteți;',
          'date contractuale și de facturare: informații necesare pentru ofertare, contractare, facturare, garanții și evidențe contabile;',
          'date tehnice de utilizare a site-ului: adresa IP, identificatori cookie, preferințe cookie, jurnal tehnic de securitate și informații despre browser, în limitele politicii cookie.',
        ],
      },
      {
        heading: 'Scopurile și temeiurile prelucrării',
        paragraphs: [
          'Folosim datele personale pentru a răspunde solicitărilor, pentru a pregăti oferte, pentru a executa contracte, pentru a respecta obligații legale și pentru a menține securitatea site-ului. Atunci când legea cere consimțământ, de exemplu pentru anumite cookie-uri opționale, prelucrarea se face numai după exprimarea acordului.',
        ],
        bullets: [
          'măsuri precontractuale și executarea contractului: analizarea cererilor, ofertare, programarea vizitelor, livrarea serviciilor și suportul post-execuție;',
          'obligații legale: facturare, contabilitate, arhivare, răspuns la cereri ale autorităților competente și îndeplinirea obligațiilor fiscale;',
          'interes legitim: securitatea site-ului, prevenirea abuzului, gestionarea relației cu clienții, apărarea drepturilor și îmbunătățirea proceselor interne;',
          'consimțământ: cookie-uri neesențiale, comunicări sau prelucrări opționale, acolo unde sunt activate și solicitate.',
        ],
      },
      {
        heading: 'Cui putem transmite datele?',
        paragraphs: [
          'Datele pot fi accesate de persoane autorizate din cadrul companiei și, atunci când este necesar, de furnizori sau parteneri care ne ajută să furnizăm serviciile. Solicităm acestor destinatari să păstreze confidențialitatea și să prelucreze datele doar în scopurile permise.',
        ],
        bullets: [
          'furnizori IT, găzduire, mentenanță website, securitate, backup și servicii tehnice;',
          'contabili, consultanți, avocați, auditori sau alți profesioniști implicați în obligații legale ori contractuale;',
          'furnizori de echipamente, subcontractori sau colaboratori tehnici, strict când informațiile sunt necesare pentru proiect;',
          'autorități publice sau instanțe, atunci când transmiterea este cerută de lege.',
        ],
      },
      {
        heading: 'Transferuri în afara Spațiului Economic European',
        paragraphs: [
          'Nu urmărim transferul datelor personale în afara Spațiului Economic European ca scop distinct. Dacă un furnizor tehnic folosit pentru site sau comunicare implică un astfel de transfer, acesta se realizează numai cu garanțiile prevăzute de legislația aplicabilă, cum ar fi clauze contractuale standard sau alte mecanisme recunoscute.',
        ],
      },
      {
        heading: 'Cât timp păstrăm datele?',
        paragraphs: [
          'Păstrăm datele atât timp cât este necesar pentru scopul pentru care au fost colectate și pentru perioadele cerute de lege. Datele din solicitări necontractate pot fi păstrate pentru o perioadă rezonabilă necesară urmăririi cererii, iar documentele fiscale și contractuale se păstrează conform termenelor legale aplicabile.',
          'La expirarea perioadelor relevante, datele sunt șterse, anonimizate sau arhivate în condiții de securitate, în funcție de obligațiile legale și de interesele legitime rămase.',
        ],
      },
      {
        heading: 'Drepturile dumneavoastră',
        paragraphs: [
          'În condițiile GDPR, puteți solicita informații despre prelucrare, acces la date, rectificarea datelor inexacte, ștergerea datelor, restricționarea prelucrării, portabilitatea datelor, opoziția față de anumite prelucrări și retragerea consimțământului, atunci când prelucrarea se bazează pe consimțământ.',
          'Site-ul nu folosește procese decizionale automate care să producă efecte juridice asupra dumneavoastră sau să vă afecteze în mod similar semnificativ.',
        ],
      },
      {
        heading: 'Cum exercitați drepturile',
        paragraphs: [
          'Puteți trimite o cerere prin pagina Contact sau la sediul social, indicând dreptul exercitat și informațiile necesare pentru identificarea solicitării. Este posibil să vă cerem detalii suplimentare pentru a confirma identitatea solicitantului și pentru a proteja datele împotriva accesului neautorizat.',
          'Vom răspunde în termenele prevăzute de GDPR. Dacă cererea este complexă sau implică un volum mare de informații, termenul poate fi prelungit conform legii, cu informarea dumneavoastră.',
        ],
      },
      {
        heading: 'Securitatea datelor',
        paragraphs: [
          'Aplicăm măsuri tehnice și organizatorice rezonabile pentru protejarea datelor împotriva accesului neautorizat, pierderii, modificării sau divulgării nepermise. Măsurile sunt adaptate naturii datelor, riscurilor și sistemelor utilizate.',
        ],
      },
      {
        heading: 'Cookie-uri și tehnologii similare',
        paragraphs: [
          'Informațiile despre cookie-urile utilizate pe site, preferințe și opțiuni de gestionare sunt disponibile în Politica privind fișierele cookie. Cookie-urile neesențiale se folosesc numai în condițiile descrise acolo.',
        ],
      },
      {
        heading: 'Plângeri către autoritatea de supraveghere',
        paragraphs: [
          'Dacă apreciați că prelucrarea datelor personale încalcă legislația aplicabilă, aveți dreptul să depuneți o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP). Datele publice de contact ale autorității sunt disponibile pe www.dataprotection.ro.',
        ],
      },
    ],
  },
};
