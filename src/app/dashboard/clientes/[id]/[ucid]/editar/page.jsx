import Form from "@/app/ui/clientes/editar-uc-form";
import Breadcrumbs from "@/app/ui/clientes/breadcrumbs";
// import { fetchCustomers } from "@/app/lib/data";


export default async function Page({ params })  {
    const client_id = params.id;
    const uc_id = params.ucid;

    const uc = {
        id: 1,
        cod: '3/666666-8',
        endereco: 'Rua Armando Barros, 81. Luzia, Aracaju/SE',
        categoria: 'Bifásico',
        tipouc: 'usina',
        consumo: 300,
        rescom: 'residencial',
        tensao: '127/220',
        tempo: 5,
    };
    // const customers = await fetchCustomers();
    console.log(`Client ID: ${client_id}`);
    console.log(`UC ID: ${uc_id}`);
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