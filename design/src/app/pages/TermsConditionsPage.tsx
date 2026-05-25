import { Link } from 'react-router';
import { siteContent } from '../content/siteContent';
import { useSeo } from '../seo/useSeo';

const lastUpdated = '25 mai 2026';

const termsSections = [
  {
    heading: '1. Identitatea comerciantului',
    paragraphs: [
      'Magazinul online și site-ul sunt operate de GENE SYS SECURITY SRL, societate înregistrată în România, cu datele de identificare afișate mai jos. Prin utilizarea site-ului sau plasarea unei comenzi, confirmați că ați citit și acceptați acești termeni, în forma publicată la data comenzii.',
    ],
    bullets: [
      `${siteContent.company.name}, CUI ${siteContent.company.cui}, Reg. Com. ${siteContent.company.regCom}`,
      `${siteContent.company.street}, ${siteContent.company.locality}, județ ${siteContent.company.county}, cod poștal ${siteContent.company.postalCode}`,
      `Telefon: ${siteContent.contact.phones[0].display}`,
    ],
  },
  {
    heading: '2. Produse, servicii și disponibilitate',
    paragraphs: [
      'Produsele, echipamentele și serviciile prezentate pe site sunt descrise pe baza informațiilor disponibile de la producători, furnizori și din documentațiile tehnice. Imaginile au caracter orientativ, iar specificațiile relevante pentru proiect se confirmă înainte de livrare sau execuție.',
      'Disponibilitatea produselor poate depinde de stocul furnizorilor, termene de aprovizionare, condiții logistice și confirmări comerciale. Dacă un produs nu poate fi livrat în condițiile afișate, vă vom informa și vom propune o alternativă, un nou termen sau anularea comenzii.',
    ],
  },
  {
    heading: '3. Comenzi și confirmarea contractului',
    paragraphs: [
      'Transmiterea unei comenzi prin magazinul online reprezintă o cerere de achiziție. Contractul se consideră încheiat după confirmarea comenzii de către GENE SYS SECURITY SRL, inclusiv prin e-mail, telefon sau mesaj transmis prin contul de client, după caz.',
      'Pentru produse tehnice, proiecte, instalări sau comenzi B2B, putem solicita informații suplimentare pentru verificarea compatibilității, a cantităților, a condițiilor de livrare și a eventualelor servicii conexe.',
    ],
  },
  {
    heading: '4. Prețuri, facturare și plată',
    paragraphs: [
      'Prețurile sunt afișate în lei, cu TVA sau fără TVA conform mențiunilor din magazin și documentelor comerciale. Pentru oferte personalizate, prețul, termenul de valabilitate și condițiile de plată sunt cele indicate în ofertă sau contract.',
      'Factura se emite pe baza datelor transmise de client. Clientul are obligația de a furniza informații corecte pentru facturare, livrare și contact. Plata se efectuează prin metodele disponibile în magazin sau agreate în ofertă.',
    ],
  },
  {
    heading: '5. Livrare',
    paragraphs: [
      'Termenul de livrare estimat este comunicat în funcție de disponibilitatea produselor, adresa de livrare, greutatea sau volumul coletului și opțiunile logistice disponibile. Pentru produse grele, voluminoase sau livrări pe șantier, pot fi necesare confirmări suplimentare.',
      'Riscul asupra produselor se transferă conform legislației aplicabile și condițiilor de livrare agreate. La recepție, clientul trebuie să verifice integritatea ambalajului și să semnaleze imediat eventualele deteriorări vizibile.',
    ],
  },
  {
    heading: '6. Dreptul de retragere și retur',
    paragraphs: [
      'Consumatorii beneficiază, în condițiile OUG nr. 34/2014, de o perioadă de 14 zile pentru retragerea dintr-un contract la distanță, fără a fi obligați să justifice decizia, cu excepțiile prevăzute de lege.',
      'Pentru exercitarea dreptului de retragere, transmiteți o declarație neechivocă prin datele de contact afișate pe site, înainte de expirarea termenului legal. Produsele trebuie returnate fără întârziere nejustificată, în starea în care au fost primite, cu accesoriile, documentele și ambalajele relevante, în măsura posibilului.',
      'Costul direct al returnării produselor revine clientului, cu excepția cazului în care se comunică altfel sau legea prevede alt regim. Sumele eligibile se rambursează conform legislației aplicabile, după verificarea produselor returnate.',
    ],
    bullets: [
      'Dreptul de retragere poate fi limitat pentru produse personalizate, produse aduse special la comandă, produse sigilate desigilate în cazurile prevăzute de lege sau servicii executate integral cu acordul clientului.',
      'Pentru clienții persoane juridice, retururile se tratează conform contractului, ofertei sau acordului comercial aplicabil.',
    ],
  },
  {
    heading: '7. Garanții și reclamații',
    paragraphs: [
      'Produsele beneficiază de garanțiile legale și comerciale aplicabile, conform documentelor producătorului, facturii și legislației în vigoare. Garanția nu acoperă utilizarea necorespunzătoare, instalarea incorectă de către persoane neautorizate, intervenții neautorizate sau defecte cauzate de factori externi.',
      'Reclamațiile privind produse, livrare, facturare sau servicii se transmit prin pagina Contact sau la datele afișate pe site. Vom analiza solicitarea și vom reveni cu pașii necesari pentru verificare, remediere, înlocuire sau altă soluție aplicabilă.',
    ],
  },
  {
    heading: '8. Servicii tehnice, proiectare și instalare',
    paragraphs: [
      'Pentru lucrări de proiectare, execuție, instalare, mentenanță sau consultanță, condițiile concrete se stabilesc prin ofertă, deviz, contract sau comandă acceptată. Aceste documente pot include termene, livrabile, responsabilități, condiții de acces în șantier și obligații privind autorizațiile sau avizele.',
      'Clientul trebuie să pună la dispoziție informații corecte despre amplasament, consumuri, planuri, restricții tehnice și orice alte detalii relevante pentru dimensionarea soluției.',
    ],
  },
  {
    heading: '9. Limitarea răspunderii',
    paragraphs: [
      'GENE SYS SECURITY SRL depune eforturi rezonabile pentru a menține informațiile actualizate și serviciile disponibile, însă pot exista erori de introducere, diferențe de stoc, modificări de preț sau întreruperi tehnice. În asemenea situații, vom corecta informațiile și vom comunica opțiunile disponibile clientului.',
      'Nu răspundem pentru pierderi cauzate de folosirea necorespunzătoare a produselor, de montaj incorect, de nerespectarea instrucțiunilor tehnice sau de intervenții realizate de persoane neautorizate.',
    ],
  },
  {
    heading: '10. Date personale, cookie-uri și platforme ANPC',
    paragraphs: [
      'Prelucrarea datelor personale se realizează conform informării GDPR, iar utilizarea cookie-urilor este descrisă în politica dedicată. Linkurile către aceste pagini sunt disponibile în subsolul site-ului.',
      'Pentru soluționarea reclamațiilor, consumatorii pot folosi și platformele puse la dispoziție de ANPC sau de autoritățile europene competente, în condițiile legii.',
    ],
  },
  {
    heading: '11. Modificarea termenilor',
    paragraphs: [
      'Putem actualiza acești termeni atunci când se modifică serviciile, fluxurile comerciale sau cerințele legale. Versiunea aplicabilă unei comenzi este cea publicată la data plasării comenzii, cu excepția cazului în care părțile convin altfel în scris.',
    ],
  },
];

export function TermsConditionsPage() {
  const { meta } = siteContent;

  useSeo({
    title: `Termeni și condiții | ${meta.ogTitle}`,
    description:
      'Termeni și condiții pentru utilizarea site-ului și magazinului online GENE SYS SECURITY SRL: comenzi, livrare, retur, garanții, plată și reclamații.',
    path: '/termeni-si-conditii',
    keywords: `${meta.keywords}, termeni și condiții, livrare, retur, garanție, comandă online`,
  });

  return (
    <div className="pt-44 md:pt-40">
      <section className="border-b border-blue-100 bg-white py-10">
        <div className="container mx-auto max-w-4xl px-4">
          <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="text-blue-700 transition-colors hover:text-blue-900">
              Acasă
            </Link>
            <span className="mx-2" aria-hidden>/</span>
            <span className="text-slate-700" aria-current="page">Termeni și condiții</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-800">Legal</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">Termeni și condiții</h1>
          <p className="mt-2 text-sm text-slate-500">Ultima actualizare: {lastUpdated}</p>
        </div>
      </section>

      <article className="bg-white py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="max-w-3xl text-lg leading-relaxed text-slate-700">
            Această pagină stabilește regulile generale pentru utilizarea site-ului, plasarea comenzilor,
            livrarea produselor, politica de retur, garanții și relația comercială cu GENE SYS SECURITY SRL.
          </p>

          <div className="mt-12 space-y-10">
            {termsSections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-slate-900">{section.heading}</h2>
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
                {'bullets' in section && section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-5 list-disc space-y-2 pl-6 text-slate-700">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-slate-200 bg-slate-50 px-5 py-5 text-sm leading-relaxed text-slate-700">
            Pentru date personale consultați{' '}
            <Link to="/gdpr" className="font-medium text-blue-800 underline underline-offset-2 hover:text-blue-950">
              informarea GDPR
            </Link>
            , iar pentru cookie-uri consultați{' '}
            <Link to="/politica-cookie-uri" className="font-medium text-blue-800 underline underline-offset-2 hover:text-blue-950">
              politica privind fișierele cookie
            </Link>
            . Pentru întrebări despre o comandă sau retur, folosiți{' '}
            <Link to="/contact#contact" className="font-medium text-blue-800 underline underline-offset-2 hover:text-blue-950">
              pagina Contact
            </Link>
            .
          </div>
        </div>
      </article>
    </div>
  );
}
