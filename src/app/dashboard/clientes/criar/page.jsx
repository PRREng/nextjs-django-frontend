import Form from "@/app/ui/clientes/criar-form";
import Breadcrumbs from "@/app/ui/clientes/breadcrumbs";


export default async function Page() {

    return (
        <main>
            <Breadcrumbs 
                breadcrumbs={[
                    { label: 'Clientes', href: '/dashboard/clientes' },
                    {
                        label: 'Criar Cliente',
                        href: '/dashboard/clientes/criar',
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    )
}