import adrLogo from '../../assets/funding/adr-nord-vest.svg';
import regioLogo from '../../assets/funding/regio-nord-vest.png';
import euLogo from '../../assets/funding/uniunea-europeana-cofinantat.png';
import govLogo from '../../assets/funding/guvernul-romaniei.png';

const fundingLogos = [
  {
    src: euLogo,
    alt: 'Cofinanțat de Uniunea Europeană',
    href: 'https://european-union.europa.eu/index_ro',
    label: 'europa.eu',
    className: 'max-h-8 w-auto max-w-[5.5rem] object-contain sm:max-h-10 sm:max-w-[10rem] md:max-h-12 md:max-w-[13rem]',
  },
  {
    src: govLogo,
    alt: 'Guvernul României',
    href: 'https://www.gov.ro/',
    label: 'gov.ro',
    className: 'h-8 w-8 object-contain sm:h-10 sm:w-10 md:h-12 md:w-12',
  },
  {
    src: regioLogo,
    alt: 'REGIO Nord-Vest',
    href: 'https://regionordvest.ro/',
    label: 'regionordvest.ro',
    className: 'h-8 w-8 object-contain sm:h-10 sm:w-10 md:h-12 md:w-12',
  },
  {
    src: adrLogo,
    alt: 'Agenția de Dezvoltare Regională Nord-Vest',
    href: 'https://www.nord-vest.ro/',
    label: 'nord-vest.ro',
    className: 'max-h-8 w-auto max-w-[4.25rem] object-contain sm:max-h-10 sm:max-w-[9rem] md:max-h-12 md:max-w-[12rem]',
  },
];

type FundingLogosProps = {
  className?: string;
};

export function FundingLogos({ className = '' }: FundingLogosProps) {
  return (
    <div
      className={`mx-auto grid w-full max-w-[20rem] grid-cols-[5.5rem_3rem_5.25rem_4.25rem] items-end justify-center gap-x-1.5 sm:max-w-4xl sm:grid-cols-4 sm:gap-x-8 md:gap-x-12 ${className}`}
      aria-label="Sigle obligatorii Programul Regional Nord-Vest"
    >
      {fundingLogos.map((item) => (
        <a
          key={item.alt}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 flex-col items-center gap-1 text-center text-[0.52rem] font-semibold leading-tight text-blue-950 underline-offset-2 hover:text-blue-700 sm:text-xs"
        >
          <img src={item.src} alt={item.alt} className={item.className} />
          <span className="max-w-full whitespace-nowrap underline">{item.label}</span>
        </a>
      ))}
    </div>
  );
}
