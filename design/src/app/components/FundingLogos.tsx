import adrLogo from '../../assets/funding/adr-nord-vest.svg';
import regioLogo from '../../assets/funding/regio-nord-vest.png';
import euLogo from '../../assets/funding/uniunea-europeana-cofinantat.png';
import govLogo from '../../assets/funding/guvernul-romaniei.png';

const fundingLogos = [
  {
    src: euLogo,
    alt: 'Cofinanțat de Uniunea Europeană',
    href: 'https://european-union.europa.eu/index_ro',
    className: 'h-8 w-[5.25rem] object-contain sm:h-10 sm:w-[10rem] md:h-12 md:w-[13rem]',
  },
  {
    src: govLogo,
    alt: 'Guvernul României',
    href: 'https://www.gov.ro/',
    className: 'h-8 w-8 object-contain sm:h-10 sm:w-10 md:h-12 md:w-12',
  },
  {
    src: regioLogo,
    alt: 'REGIO Nord-Vest',
    href: 'https://regionordvest.ro/',
    className: 'h-8 w-8 object-contain sm:h-10 sm:w-10 md:h-12 md:w-12',
  },
  {
    src: adrLogo,
    alt: 'Agenția de Dezvoltare Regională Nord-Vest',
    href: 'https://www.nord-vest.ro/',
    className: 'h-8 w-16 object-contain sm:h-10 sm:w-20 md:h-12 md:w-24',
  },
];

type FundingLogosProps = {
  className?: string;
};

export function FundingLogos({ className = '' }: FundingLogosProps) {
  return (
    <div
      className={`mx-auto flex w-full max-w-4xl flex-nowrap items-center justify-center gap-x-5 sm:gap-x-5 md:gap-x-6 ${className}`}
      aria-label="Sigle obligatorii Programul Regional Nord-Vest"
    >
      {fundingLogos.map((item) => (
        <a
          key={item.alt}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.alt}
          className="inline-flex shrink-0 items-center justify-center rounded-sm transition-opacity hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          <img src={item.src} alt={item.alt} className={item.className} />
        </a>
      ))}
    </div>
  );
}
