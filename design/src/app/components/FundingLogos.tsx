import adrLogo from '../../assets/funding/adr-nord-vest.svg';
import regioLogo from '../../assets/funding/regio-nord-vest.png';
import euLogo from '../../assets/funding/uniunea-europeana-cofinantat.png';
import govLogo from '../../assets/funding/guvernul-romaniei.png';

const fundingLogos = [
  {
    src: euLogo,
    alt: 'Cofinanțat de Uniunea Europeană',
    className: 'h-8 w-auto max-w-[11rem] object-contain sm:h-10 md:h-12',
  },
  {
    src: govLogo,
    alt: 'Guvernul României',
    className: 'h-8 w-auto object-contain sm:h-10 md:h-12',
  },
  {
    src: regioLogo,
    alt: 'REGIO Nord-Vest',
    className: 'h-8 w-auto object-contain sm:h-10 md:h-12',
  },
  {
    src: adrLogo,
    alt: 'Agenția de Dezvoltare Regională Nord-Vest',
    className: 'h-8 w-auto max-w-[11rem] object-contain sm:h-10 md:h-12',
  },
];

type FundingLogosProps = {
  className?: string;
};

export function FundingLogos({ className = '' }: FundingLogosProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 ${className}`}
      aria-label="Sigle obligatorii Programul Regional Nord-Vest"
    >
      {fundingLogos.map((item) => (
        <img key={item.alt} src={item.src} alt={item.alt} className={item.className} />
      ))}
    </div>
  );
}
