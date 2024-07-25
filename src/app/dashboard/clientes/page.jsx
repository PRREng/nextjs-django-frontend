import Pagination from '@/app/ui/clientes/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/clientes/table';
import { CreateCliente } from '@/app/ui/clientes/buttons';
import { lusitana } from '@/app/ui/fonts';
import { ClientesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';




 
export default async function Page({ searchParams }) {


  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
   
  const totalPages = 3;


  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Clientes</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Procurar clientes..." />
        <CreateCliente />
      </div>
      <Suspense key={query + currentPage} fallback={<ClientesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}