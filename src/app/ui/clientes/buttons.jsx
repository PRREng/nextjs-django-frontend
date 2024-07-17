import { deleteCliente, deleteUC, gerarPropostaSimples } from '@/lib/fetching';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { NextResponse } from 'next/server';
// import { deleteInvoice } from '@/app/lib/actions';

export function CreateCliente() {
  return (
    <Link
      href="/dashboard/clientes/criar"
      className="flex h-10 items-center rounded-lg bg-orange-400 px-4 text-sm font-medium text-white transition-colors hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
    >
      <span className="hidden md:block">Criar Cliente</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DetailCliente({ id }) {
  return (
    <Link
      href={`/dashboard/clientes/${id}/`}
      className="rounded-md border py-2 px-3 hover:bg-gray-100"
    >
      ...
    </Link>
  );
}

export function UpdateCliente({ id }) {
  return (
    <Link
      href={`/dashboard/clientes/${id}/editar`}
      className="rounded-md w-50 border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCliente({ id }) {
  const deleteClienteWithId = deleteCliente.bind(null, id);

  return (
    <form action={deleteClienteWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function UpdateUC({ client_id, uc_id }) {
  return (
    <Link
      href={`/dashboard/clientes/${client_id}/${uc_id}/editar`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteUC({ client_id, uc_id }) {
  const deleteUCWithId = deleteUC.bind(null, client_id, uc_id);

  return (
    <form action={deleteUCWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function UpdateProjeto({ id }) {
  return (
    <Link
      href={`/dashboard/clientes/${id}/editar-projeto`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function GerarProposta({ id }) {
  "use client"
  const gerarProposta = gerarPropostaSimples.bind(null, id); 

  const handleDownload = async () => {

    const DJANGO_GERAR_PROPOSTA_SIMPLES_URL = `http://127.0.0.1:8001/api/clientes/${id}/gerar_simples/`;
    const authToken = getToken();
    if (!authToken) {
      return NextResponse.json({}, {status: 401});
    }

    const options = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken}`,
      },
    }
    const response = await fetch(DJANGO_GERAR_PROPOSTA_SIMPLES_URL, options);
    if (!response.ok) {
      console.log("Error fetching proposta")
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "proposta.pptx";
    a.click();
    
  }


  return (
    <form onSubmit={handleDownload}>
      <button type='submit'
      className="rounded-md bg-gray-300 border p-2 hover:bg-gray-100">
        <span className="sr-only">Gerar</span>
        Gerar Proposta
      </button>
    </form>
  );
}

export function GerarDocumento({ id }) {
  return (
    <Link
      href={`/dashboard/clientes/${id}`}
      className="rounded-md bg-gray-200 border p-2 hover:bg-gray-400 text-sm"
    >
      Gerar Contrato
    </Link>
  );
}