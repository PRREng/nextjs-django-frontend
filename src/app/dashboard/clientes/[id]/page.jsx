import CardWrapper from '@/app/ui/dashboard/cards';
import ClienteDetail from '@/app/ui/dashboard/cliente-detail';
import LatestUCs from '@/app/ui/dashboard/latest-ucs';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton, ClienteDetailSkeleton, LatestUCsSkeleton } from '@/app/ui/skeletons';
import { GerarProposta, UpdateProjeto } from '@/app/ui/clientes/buttons';
 
export default async function Page({ params }) {
    const { id } = params;

  return (
    <main>
      <div className="mb-4 flex flex-row items-center gap-4">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>
          Projeto
        </h1>
        <div className="flex-1"></div>
        <UpdateProjeto id={id} />
        <GerarProposta id={id} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper client_id={id} />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<ClienteDetailSkeleton />}>
          <ClienteDetail id={id} />
        </Suspense>
        <Suspense fallback={<LatestUCsSkeleton />}>
          <LatestUCs client_id={id} />
        </Suspense>
      </div>
    </main>
  );
}