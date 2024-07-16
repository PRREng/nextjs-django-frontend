import Form from "@/app/ui/clientes/editar-uc-form";
import Breadcrumbs from "@/app/ui/clientes/breadcrumbs";
import { getToken } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { fetchUC } from "@/lib/fetching";
// import { fetchCustomers } from "@/app/lib/data";


export default async function Page({ params })  {
    const client_id = params.id;
    const uc_id = params.ucid;
    const getUC = fetchUC.bind(null, client_id, uc_id);

    const uc = await getUC();
    console.log("JUST LOADED EDIT UC PAGE")
    // console.log("UC in edit page ----------------");
    // console.log(uc);
    // const uc = await fetchUC(client_id, uc_id);
    // console.log(uc);
    // const customers = await fetchCustomers();
    // console.log(`Client ID: ${client_id}`);
    // console.log(`UC ID: ${uc_id}`);
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