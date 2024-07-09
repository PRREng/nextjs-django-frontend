import { 
  ArrowPathIcon,
  HomeModernIcon,
  BuildingStorefrontIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { DeleteUC, UpdateUC } from '../clientes/buttons';
import Link from 'next/link';
// import { fetchLatestInvoices } from '@/app/lib/data';
export default async function LatestUCs({ client_id }) {

//   const latestInvoices = await fetchLatestInvoices();
// primeiro é a usina (fetch usina primeiro)
const latestUCs = [
    {
      id: 1,
      cod: '3/666666-8',
      endereco: 'Rua Armando Barros, 81. Luzia, Aracaju/SE',
      categoria: 'Bifásico',
      tipouc: 'usina',
      consumo: 300,
      rescom: 'residencial',
      tensao: '127/220',
      tempo: 5,
    },
    {
      id: 2,
      cod: '3/777777-8',
      endereco: 'Rua Josino Goveia, 113. Ponto Novo, Aracaju/SE',
      categoria: 'Bifásico',
      tipouc: 'compensadora',
      consumo: 200,
      rescom: 'residencial',
      tensao: '127/220',
      tempo: 8,
    },
];

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        UCs
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {latestUCs.map((uc, i) => {
            return (
              <div
                key={uc.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  {/* <Image
                    src={<HomeModernIcon />}
                    alt={`Roberto's profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  /> */}
                  <div className='w-8 h-8'>
                    { uc.rescom === 'residencial' ? (
                      <HomeModernIcon className={clsx(
                        {
                          'text-orange-400': i === 0,
                        },
                      )} />
                    ) : <BuildingStorefrontIcon />}
                  </div>
                  <div className="min-w-0">
                    <p className="px-5 truncate text-sm font-semibold md:text-base">
                      {uc.cod}
                    </p>
                    <p className="px-5 hidden text-sm text-gray-500 sm:block">
                      {uc.endereco.length > 20 ? uc.endereco.slice(0, 20) + '...'
                      : uc.endereco}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {uc.consumo} kwh
                </p>
                <div className="flex justify-end gap-2">
                  <UpdateUC id={uc.id} />
                  <DeleteUC id={uc.id} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center items-center pb-2 pt-6">
          <Link href={`/dashboard/clientes/${client_id}/criar-uc`} className='bg-orange-300 cursor-pointer hover:bg-orange-400 w-20 rounded-lg flex justify-center items-center'>
            <PlusIcon className="h-11 w-11 py-3 text-gray-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}