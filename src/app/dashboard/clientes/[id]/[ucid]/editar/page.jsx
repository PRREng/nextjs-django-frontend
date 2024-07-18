import Form from "@/app/ui/clientes/editar-uc-form";
import Breadcrumbs from "@/app/ui/clientes/breadcrumbs";
import { fetchUC } from "@/lib/fetching";


export default async function Page({ params })  {
    const client_id = params.id;
    const uc_id = params.ucid;
    const getUC = fetchUC.bind(null, client_id, uc_id);

    const uc = await getUC();

    return (
        <main>
            <Breadcrumbs 
                breadcrumbs={[
                    { label: 'Clientes', href: '/dashboard/clientes' },
                    {
                        label: `Detalhe`,
                        href: `/dashboard/clientes/${client_id}`,
                    },
                    {
                        label: 'Editar UC',
                        href: `/dashboard/clientes/${client_id}/${uc_id}/editar`,
                        active: true,
                    },
                ]}
            />
            <Form client_id={client_id} uc={uc} />
        </main>
    )
}