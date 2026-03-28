/**
 * Date companie GENE SYS SECURITY SRL — actualizate conform registrului.
 */
export const siteContent = {
  meta: {
    title: 'GENE SYS SECURITY SRL — Instalații electrice, fotovoltaice și securitate',
    description:
      'GENE SYS SECURITY SRL, Satu Mare: soluții de instalații electrice, fotovoltaice, securitate și mentenanță pentru construcții civile și industriale.',
    ogTitle: 'GENE SYS SECURITY SRL',
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
    street: 'Str. Gheorghe Barițiu 88',
    postalCode: '440135',
  },

  contact: {
    /** Mobil public — format tel E.164 */
    phones: [{ display: '0749 235 958', tel: '+40749235958' }],
    /** Gol = nu afișăm email pe site (completați când există adresă publică) */
    emails: [] as string[],
    addressLines: [
      'Județ Satu Mare, loc. Satu Mare',
      'Str. Gheorghe Barițiu 88, cod poștal 440135',
    ],
    hours: ['Luni–Vineri: 08:00–18:00', 'Urgențe: la cerere'],
    coverage:
      'Intervenții în Satu Mare și regiune; proiecte civile și industriale la nivel național, în funcție de cerințe.',
    /** Google Maps embed (iframe src) */
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5270.816188113543!2d22.88286301525722!3d47.81164737082118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473805adaffc7c4d%3A0xd8bf86b0439bf0d!2sM%20Sys!5e1!3m2!1shu!2sro!4v1774727218057!5m2!1shu!2sro',
    /** Link „Deschide în Google Maps” — același punct ca în embed */
    mapOpenUrl:
      'https://www.google.com/maps/search/?api=1&query=47.81164737082118,22.88286301525722',
  },

  /** KPI — experiența: ani de la înființare (2017) */
  statsKpi: [
    {
      value: 9,
      suffix: '+',
      prefix: '',
      title: 'Experiență',
      highlight: 'Ani în domeniu',
      description: 'Solidă acumulată de-a lungul anilor în domeniu',
    },
    {
      value: 120,
      suffix: '+',
      prefix: '',
      title: 'Proiecte',
      highlight: 'Proiecte livrate',
      description: 'O gamă largă de proiecte realizate în sectoarele civil și industrial',
    },
    {
      value: 100,
      suffix: '%',
      prefix: '',
      title: 'Tehnologie',
      highlight: 'Standarde actuale',
      description: 'Utilizarea permanentă a tehnologiilor de vârf și a normativelor în vigoare',
    },
  ],
};
