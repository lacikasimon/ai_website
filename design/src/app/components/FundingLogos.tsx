import adrLogo from '../../assets/funding/adr-nord-vest.svg';
import regioLogo from '../../assets/funding/regio-nord-vest.png';
import euLogo from '../../assets/funding/uniunea-europeana-cofinantat.png';
import govLogo from '../../assets/funding/guvernul-romaniei.png';

const fundingLogos = [
  {
    src: euLogo,
    alt: 'Cofinanțat de Uniunea Europeană',
    className: 'max-h-8 w-auto max-w-[7rem] object-contain sm:max-h-10 sm:max-w-[10rem] md:max-h-12 md:max-w-[13rem]',
  },
  {
    src: govLogo,
    alt: 'Guvernul României',
    className: 'h-8 w-8 object-contain sm:h-10 sm:w-10 md:h-12 md:w-12',
  },
  {
    src: regioLogo,
    alt: 'REGIO Nord-Vest',
    className: 'h-8 w-8 object-contain sm:h-10 sm:w-10 md:h-12 md:w-12',
  },
  {
    src: adrLogo,
    alt: 'Agenția de Dezvoltare Regională Nord-Vest',
    className: 'max-h-8 w-auto max-w-[6rem] object-contain sm:max-h-10 sm:max-w-[9rem] md:max-h-12 md:max-w-[12rem]',
  },
];

type FundingLogosProps = {
  className?: string;
};

export function FundingLogos({ className = '' }: FundingLogosProps) {
  return (
    <div
      className={`mx-auto flex w-full max-w-4xl flex-nowrap items-center justify-center gap-x-3 sm:gap-x-8 md:gap-x-12 ${className}`}
      aria-label="Sigle obligatorii Programul Regional Nord-Vest"
    >
      {fundingLogos.map((item) => (
        <img key={item.alt} src={item.src} alt={item.alt} className={item.className} />
      ))}
    </div>
  );
}
