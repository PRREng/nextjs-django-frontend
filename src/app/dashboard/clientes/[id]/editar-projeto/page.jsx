import Form from '@/app/ui/clientes/editar-projeto-form';
import Breadcrumbs from '@/app/ui/clientes/breadcrumbs';
// import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
    const id = params.id;
    const cliente = {id: 1, nome: 'Roberto'};
    // const [invoice, customers] = await Promise.all([
    //     fetchInvoiceById(id),
    //     fetchCustomers(),
    // ]);

    // if (!invoice) {
    //     notFound();
    // }

    return (
        <main>
            <Breadcrumbs 
                breadcrumbs={[
                    {label: 'Clientes', href: '/dashboard/clientes'},
                    { label: 'Detalhe', href: `/dashboard/clientes/${id}`, },
                    {
                        label: 'Editar Projeto',
                        href: `/dashboard/clientes/${id}/editar-projeto`,
                        active: true,
                    },
                ]}
            />
            <Form cliente={cliente} />
        </main>
    )
}