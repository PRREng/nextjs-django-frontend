import { UserIcon, PhoneIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { UpdateCliente } from '../clientes/buttons';
import { fetchCliente } from '@/lib/fetching';
import { GerarContrato, GerarProcuracao, GerarTermoDePosse } from '../download';


export default async function ClienteDetail({ id }) {

  const cliente = await fetchCliente(id);

  return (
    <div className="w-full md:col-span-4">
      <div className="mb-4 flex flex-row items-center">
        <h2 className={`${lusitana.className} text-xl md:text-2xl`}>
          Detalhe
        </h2>
        <div className="flex-1"></div>
        <GerarProcuracao id={id} />
        <GerarTermoDePosse id={id} />
        <GerarContrato id={id} />
      </div>

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