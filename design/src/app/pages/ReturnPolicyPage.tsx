import { Link } from 'react-router';
import { siteContent } from '../content/siteContent';
import { useSeo } from '../seo/useSeo';

const lastUpdated = '25 mai 2026';

const returnSections = [
  {
    heading: '1. Domeniul de aplicare',
    paragraphs: [
      'Această politică explică modul în care se pot returna produsele cumpărate prin magazinul online sau prin comenzi la distanță confirmate de GENE SYS SECURITY SRL. Se aplică în principal consumatorilor, în sensul legislației privind contractele la distanță.',
      'Pentru clienții persoane juridice, retururile se tratează conform ofertei, contractului, comenzii acceptate sau acordului comercial agreat cu GENE SYS SECURITY SRL.',
    ],
  },
  {
    heading: '2. Termenul de retragere',
    paragraphs: [
      'Consumatorul are dreptul să se retragă din contract în termen de 14 zile, fără a fi obligat să justifice decizia, cu excepțiile prevăzute de OUG nr. 34/2014 și de legislația aplicabilă.',
      'Pentru produse, termenul curge, de regulă, din ziua în care consumatorul sau o persoană indicată de acesta, alta decât transportatorul, intră în posesia fizică a produsului. Pentru comenzi cu produse livrate separat, termenul se calculează de la primirea ultimului produs, lot sau piesă, după caz.',
    ],
  },
  {
    heading: '3. Cum solicitați returul',
    paragraphs: [
      'Pentru exercitarea dreptului de retragere, transmiteți o declarație neechivocă înainte de expirarea termenului legal. Cererea se poate trimite prin pagina Contact, telefonic pentru îndrumare sau prin orice canal de comunicare agreat în legătură cu comanda.',
      'În cerere, includeți datele necesare identificării comenzii: nume, număr comandă sau factură, produsul returnat, data primirii și datele de contact. După primirea solicitării, vă comunicăm pașii practici pentru returnare.',
    ],
    bullets: [
      `Telefon: ${siteContent.contact.phones[0].display}`,
      `${siteContent.company.name}, ${siteContent.company.street}, ${siteContent.company.locality}, județ ${siteContent.company.county}, cod poștal ${siteContent.company.postalCode}`,
    ],
  },
  {
    heading: '4. Condiția produselor returnate',
    paragraphs: [
      'Produsele trebuie returnate fără întârziere nejustificată, în starea în care au fost primite, împreună cu accesoriile, documentele, certificatele de garanție și ambalajele relevante, în măsura posibilului.',
      'Consumatorul este responsabil pentru diminuarea valorii produselor rezultată din manipulări altele decât cele necesare pentru determinarea naturii, caracteristicilor și funcționării produselor.',
    ],
  },
  {
    heading: '5. Costul transportului de retur',
    paragraphs: [
      'Costul direct al returnării produselor este suportat de client, cu excepția cazului în care GENE SYS SECURITY SRL a comunicat altfel sau situația intră într-un regim legal diferit, de exemplu produse livrate greșit ori produse cu neconformități confirmate.',
      'Pentru produse grele, fragile, voluminoase sau produse care necesită manipulare specială, returul trebuie organizat astfel încât produsul să ajungă în siguranță la adresa indicată.',
    ],
  },
  {
    heading: '6. Rambursarea sumelor',
    paragraphs: [
      'Sumele eligibile se rambursează conform legislației aplicabile, folosind, de regulă, aceeași metodă de plată folosită la tranzacția inițială, cu excepția cazului în care se agreează expres o altă modalitate.',
      'Rambursarea poate fi amânată până la primirea produselor returnate sau până la prezentarea unei dovezi că produsele au fost expediate, în funcție de situația concretă și de cerințele legale aplicabile.',
    ],
  },
  {
    heading: '7. Produse și situații exceptate',
    paragraphs: [
      'Dreptul de retragere poate fi limitat sau exclus în situațiile prevăzute de lege. Exemplele de mai jos sunt orientative și se analizează în funcție de produs, comandă și documentele comerciale aplicabile.',
    ],
    bullets: [
      'produse executate după specificațiile clientului sau personalizate în mod clar;',
      'produse aduse special la comandă, configurate sau adaptate pentru un anumit proiect, atunci când legea și acordul comercial permit limitarea returului;',
      'produse sigilate care nu pot fi returnate din motive de protecție a sănătății sau igienă și care au fost desigilate, dacă este cazul;',
      'servicii executate integral, dacă prestarea a început cu acordul expres al consumatorului și cu confirmarea pierderii dreptului de retragere după executarea completă;',
      'produse deteriorate prin utilizare, montaj necorespunzător, intervenții neautorizate sau manipulare care depășește verificarea normală.',
    ],
  },
  {
    heading: '8. Produse neconforme sau deteriorate la livrare',
    paragraphs: [
      'Dacă produsul primit este deteriorat, incomplet sau nu corespunde comenzii confirmate, anunțați-ne cât mai rapid și transmiteți fotografii, documente de transport și orice detalii utile pentru verificare.',
      'Aceste situații se tratează separat de returul prin retragere și pot duce, după caz, la remediere, înlocuire, rambursare sau altă soluție legală și comercială aplicabilă.',
    ],
  },
  {
    heading: '9. Servicii tehnice și lucrări',
    paragraphs: [
      'Pentru proiectare, instalare, mentenanță, consultanță sau alte servicii tehnice, condițiile de anulare, retragere sau reprogramare se stabilesc prin ofertă, contract sau comandă acceptată.',
      'Dacă prestarea serviciului a început la cererea clientului, pot exista costuri proporționale cu serviciile deja furnizate, în limitele legislației aplicabile și ale documentelor comerciale agreate.',
    ],
  },
  {
    heading: '10. Contact',
    paragraphs: [
      'Pentru retururi, reclamații sau întrebări privind o comandă, folosiți pagina Contact și includeți cât mai multe detalii despre situație. Vă răspundem cu pașii necesari pentru verificarea și soluționarea solicitării.',
    ],
  },
];

export function ReturnPolicyPage() {
  const { meta } = siteContent;

  useSeo({
    title: `Politica de retur | ${meta.ogTitle}`,
    description:
      'Politica de retur GENE SYS SECURITY SRL: termen de retragere, pași pentru retur, condiția produselor, costuri de transport, rambursare și excepții.',
    path: '/politica-de-retur',
    keywords: `${meta.keywords}, politica de retur, retur produse, drept de retragere, rambursare, OUG 34/2014`,
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
            <span className="text-slate-700" aria-current="page">Politica de retur</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-800">Retur</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">Politica de retur</h1>
          <p className="mt-2 text-sm text-slate-500">Ultima actualizare: {lastUpdated}</p>
        </div>
      </section>

      <article className="bg-white py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="max-w-3xl text-lg leading-relaxed text-slate-700">
            Retururile sunt gestionate transparent, cu respectarea dreptului de retragere pentru consumatori
            și cu atenție la natura produselor tehnice, a comenzilor speciale și a serviciilor executate.
          </p>

          <div className="mt-12 space-y-10">
            {returnSections.map((section) => (
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
            Pentru regulile generale ale magazinului consultați{' '}
            <Link to="/termeni-si-conditii" className="font-medium text-blue-800 underline underline-offset-2 hover:text-blue-950">
              Termeni și condiții
            </Link>
            . Pentru protecția datelor personale consultați{' '}
            <Link to="/gdpr" className="font-medium text-blue-800 underline underline-offset-2 hover:text-blue-950">
              informarea GDPR
            </Link>
            . Pentru o solicitare concretă, folosiți{' '}
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
