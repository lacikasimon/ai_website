import adrLogo from '../../assets/funding/adr-nord-vest.svg';
import regioLogo from '../../assets/funding/regio-nord-vest.png';
import euLogo from '../../assets/funding/uniunea-europeana-cofinantat.png';
import govLogo from '../../assets/funding/guvernul-romaniei.png';

const fundingLogos = [
  {
    src: euLogo,
    alt: 'Cofinanțat de Uniunea Europeană',
    className: 'h-14 w-auto max-w-[16rem] sm:h-16',
  },
  {
    src: govLogo,
    alt: 'Guvernul României',
    className: 'h-14 w-auto sm:h-16',
  },
  {
    src: regioLogo,
    alt: 'REGIO Nord-Vest',
    className: 'h-14 w-auto sm:h-16',
  },
  {
    src: adrLogo,
    alt: 'Agenția de Dezvoltare Regională Nord-Vest',
    className: 'h-14 w-auto sm:h-16',
  },
];

type FundingLogosProps = {
  className?: string;
};

export function FundingLogos({ className = '' }: FundingLogosProps) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-5 ${className}`}>
      {fundingLogos.map((item) => (
        <img key={item.alt} src={item.src} alt={item.alt} className={item.className} loading="lazy" />
      ))}
    </div>
  );
}
