import Form from "@/app/ui/clientes/criar-uc-form";
import Breadcrumbs from "@/app/ui/clientes/breadcrumbs";
// import { fetchCustomers } from "@/app/lib/data";


export default async function Page({ params })  {
    const client_id = params.id;
    // const customers = await fetchCustomers();
    console.log(`Client ID: ${client_id}`);
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
                        label: 'Criar UC',
                        href: `/dashboard/clientes/${client_id}/criar-uc`,
                        active: true,
                    },
                ]}
            />
            <Form client_id={client_id} />
        </main>
    )
}