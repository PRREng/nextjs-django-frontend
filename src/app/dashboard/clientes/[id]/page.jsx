import CardWrapper from '@/app/ui/dashboard/cards';
import ClienteDetail from '@/app/ui/dashboard/cliente-detail';
import LatestUCs from '@/app/ui/dashboard/latest-ucs';
import { lusitana } from '@/app/ui/fonts';
import { UpdateProjeto } from '@/app/ui/clientes/buttons';
import { GerarProposta, GerarPropostaGrande } from '@/app/ui/download';
import { fetchCliente, fetchProject, fetchUCs } from '@/lib/fetching';



export default async function Page({ params }) {
    const { id } = params;
    const cliente = await fetchCliente(id);
    const ucs = await fetchUCs(id);
    const {
      consumoTotal,
      producaoMedia,
      qtdeModulos,
      qtdeInv,
      valorProposta
    } = await fetchProject(id);

  return (
    <main>
      <div className="mb-4 flex flex-row items-center gap-4">
        <h1 className={`${lusitana.className} text-xl md:text-2xl`}>
          Projeto
        </h1>
        <div className="flex-1"></div>
        <UpdateProjeto id={cliente?.id} />
        <GerarProposta id={cliente?.id} />
        <GerarPropostaGrande id={cliente?.id} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper consumoTotal={consumoTotal} producaoMedia={producaoMedia} qtdeModulos={qtdeModulos}
        qtdeInv={qtdeInv} valorProposta={valorProposta} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <ClienteDetail cliente={cliente} />
        <LatestUCs latestUCs={ucs} client_id={id} />
      </div>
    </main>
  );
}