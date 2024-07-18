import { 
  HomeModernIcon,
  BuildingStorefrontIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { DeleteUC, UpdateUC } from '../clientes/buttons';
import Link from 'next/link';
import { fetchUCs } from '@/lib/fetching';
import { formatEndereco } from '@/lib/utils';


export default async function LatestUCs({ client_id }) {


  let latestUCs = await fetchUCs(client_id);
  if (!latestUCs) {latestUCs = []};

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        UCs
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

        <div className="bg-white px-6">
          {latestUCs && latestUCs?.map((uc, i) => {
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
                  <div className='w-8 h-8'>
                    { uc.resideoucomercial === 'Residencial' ? (
                      <HomeModernIcon className={clsx(
                        {
                          'text-orange-400': i === 0,
                        },
                      )} />
                    ) : <BuildingStorefrontIcon />}
                  </div>
                  <div className="min-w-0">
                    <p className="px-5 truncate text-sm font-semibold md:text-base">
                      {uc.num_UC}
                    </p>
                    <p className="px-5 hidden text-sm text-gray-500 sm:block">
                      {formatEndereco(uc.endereco).length > 20 ? formatEndereco(uc.endereco).slice(0, 20) + '...'
                      : formatEndereco(uc.endereco)}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {uc.consumo} kwh
                </p>
                <div className="flex justify-end gap-2">
                  <UpdateUC client_id={client_id} uc_id={uc.id} />
                  <DeleteUC client_id={client_id} uc_id={uc.id} />
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