import Form from '@/app/ui/clientes/editar-projeto-form';
import Breadcrumbs from '@/app/ui/clientes/breadcrumbs';
import { fetchProject, getModulos } from '@/lib/fetching';

export default async function Page({ params }) {
    const id = params.id;
    const projeto = await fetchProject(id);
    const modulos = await getModulos();

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
            <Form client_id={id} projeto={projeto} modulos={modulos} />
        </main>
    )
}