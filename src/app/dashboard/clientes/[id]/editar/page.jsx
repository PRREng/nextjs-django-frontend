import Form from '@/app/ui/clientes/editar-form';
import Breadcrumbs from '@/app/ui/clientes/breadcrumbs';
// import { notFound } from 'next/navigation';
import { fetchCliente } from '@/lib/fetching';

export default async function Page({ params }) {
    const id = params.id;
    const cliente = await fetchCliente(id);
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