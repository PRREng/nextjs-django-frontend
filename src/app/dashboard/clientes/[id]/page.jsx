import CardWrapper from '@/app/ui/dashboard/cards';
import ClienteDetail from '@/app/ui/dashboard/cliente-detail';
import LatestUCs from '@/app/ui/dashboard/latest-ucs';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton, ClienteDetailSkeleton, LatestUCsSkeleton } from '@/app/ui/skeletons';
 
export default async function Page({ params }) {
    const { id } = params;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Projeto
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<ClienteDetailSkeleton />}>
          <ClienteDetail />
        </Suspense>
        <Suspense fallback={<LatestUCsSkeleton />}>
          <LatestUCs />
        </Suspense>
      </div>
    </main>
  );
}