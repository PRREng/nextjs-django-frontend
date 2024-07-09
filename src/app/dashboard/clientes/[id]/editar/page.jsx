import Form from '@/app/ui/clientes/editar-form';
import Breadcrumbs from '@/app/ui/clientes/breadcrumbs';
// import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
    const id = params.id;
    const cliente = 'Roberto';
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
                    {
                        label: 'Editar Cliente',
                        href: `/dashboard/clientes/${id}/editar`,
                        active: true,
                    },
                ]}
            />
            <Form cliente={cliente} />
        </main>
    )
}