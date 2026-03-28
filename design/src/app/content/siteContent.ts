/**
 * Conținut centralizat — înlocuiți valorile placeholder cu date reale (telefon, adresă, cifre KPI).
 */
export const siteContent = {
  meta: {
    title: 'GENE SYS SECURITY SRL — Instalații electrice, fotovoltaice și securitate',
    description:
      'Soluții complete de instalații electrice și securitate pentru construcții civile și industriale. Proiectare, execuție, sisteme fotovoltaice, CCTV și mentenanță în România.',
    ogTitle: 'GENE SYS SECURITY SRL',
  },

  contact: {
    phones: [
      { display: '+40 721 234 567', tel: '+40721234567' },
      { display: '+40 734 567 890', tel: '+40734567890' },
    ],
    emails: ['contact@genesyssecurity.ro', 'office@genesyssecurity.ro'],
    addressLines: ['București, România', 'Str. Exemplu nr. 123, Sector 1 (adresă exemplu)'],
    hours: ['Luni–Vineri: 08:00–18:00', 'Urgențe: 24/7'],
    coverage:
      'Zonă de intervenție: București și Ilfov; proiecte civile și industriale la nivel regional (exemplu).',
  },

  /** KPI-uri pentru secțiunea Experiență — valorile sunt orientative până la validare internă */
  statsKpi: [
    {
      value: 15,
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
} as const;
