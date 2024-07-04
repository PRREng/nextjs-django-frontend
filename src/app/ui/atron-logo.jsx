// import { GlobeAltIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

export default function AtronLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image 
        src="/atron_logotipo.png"
        width={394}
        height={137}
        alt="Logo da Atron"
      />
    </div>
  );
}