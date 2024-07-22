import {
    BanknotesIcon,
    ArrowPathRoundedSquareIcon,
    RectangleStackIcon,
    BoltIcon,
  } from '@heroicons/react/24/outline';
  import { lusitana } from '@/app/ui/fonts';
import { fetchProject } from '@/lib/fetching';
  
//   import { fetchCardData } from '@/app/lib/data';
  
  const iconMap = {
    proposta: BanknotesIcon,
    inversores: ArrowPathRoundedSquareIcon,
    consumo: BoltIcon,
    modulos: RectangleStackIcon,
  };
  
  export default async function CardWrapper({ client_id }) {

    const {
      consumoTotal,
      producaoMedia,
      qtdeModulos,
      qtdeInv,
      valorProposta
    } = await fetchProject(client_id);
    const consumo = [consumoTotal, producaoMedia];
    
    return (
      <>
        {/* NOTE: comment in this code when you get to this point in the course */}
  
        <Card title="Proposta" value={valorProposta} type="proposta" />
        <Card title="Consumo / Produção" value={consumo} type="consumo" />
        <Card title="Quantidade de Módulos" value={qtdeModulos} type="modulos" />
        <Card
          title="Quantidade de Inversores"
          value={qtdeInv}
          type="inversores"
        />
      </>
    );
  }
  
  export function Card({ title, value, type }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        >
          {type === "consumo" ? 
          (<>
          <span className='text-red-600'>{`${value[0]}`}</span> / 
          <span className='text-green-600'>{` ${value[1]}`}</span>
          </>)
          : value}
        </p>
      </div>
    );
  }