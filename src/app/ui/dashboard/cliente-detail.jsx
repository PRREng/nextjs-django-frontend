import { UserIcon, PhoneIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { GerarDocumento, UpdateCliente } from '../clientes/buttons';
import { fetchCliente } from '@/lib/fetching';
// import { fetchRevenue } from '@/app/lib/data';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function ClienteDetail({ id }) {

  // fetchClientDetail
  const cliente = await fetchCliente(id);
  console.log(`Fetched Client: ${cliente.nome}`)
  console.log(`Type of Fetched Client: ${typeof cliente.nome}`)
  return (
    <div className="w-full md:col-span-4">
      <div className="mb-4 flex flex-row items-center">
        <h2 className={`${lusitana.className} text-xl md:text-2xl`}>
          Detalhe
        </h2>
        <div className="flex-1"></div>
        <GerarDocumento />
      </div>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="flex flex-col">
            <div className='flex flex-col bg-white px-5 py-5 gap-3'>
                <div className='flex items-center'>
                    <UserIcon className='w-8 h-8 px-1' />
                    <p className='px-1'>{cliente.nome}</p>
                    <div className="flex-1"></div>
                    <UpdateCliente id={id}/>
                </div>
                <div className='flex items-center'>
                    <PhoneIcon className='w-8 h-8 px-1' />
                    <p className='px-1'>{cliente.ddd + cliente.telefone}</p>
                </div>
                <div className='flex items-center'>
                    <IdentificationIcon className='w-8 h-8 px-1' />
                    <p className='px-1'>{cliente.cpf}</p>
                </div>
            </div>
            <div className='text-gray-400 text-sm px-5 pt-5'>Criado em: {cliente.criadoem}</div>
        </div>
      </div>
    </div>
  );
}