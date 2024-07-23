import { NextResponse } from "next/server";
import { getToken } from "./auth";
import { revalidatePath } from "next/cache";
import { DJANGO_API_ENDPOINT } from "@/config/defaults";


const API_CLIENTES_URL = "/api/clientes/";
const API_UCS_URL = `$/api/ucs/`;
const API_PROJETOS_URL = `/api/projetos/`;
const DJANGO_API_MODULOS_URL = `${DJANGO_API_ENDPOINT}/modulos/`;


export async function fetchClientes() {

    const options = { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }
    const response = await fetch(API_CLIENTES_URL, options);
    const result = await response.json();
    const status = response.status;

    return {result, status: status};
}

export async function fetchCliente(id) {
  const CLIENTE_DETAIL_URL = `${API_CLIENTES_URL}${id}/`
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
  const response = await fetch(CLIENTE_DETAIL_URL, options);
  if (response.ok) {
    return await response.json()
  }
  return NextResponse.json({}, {status: 400});
}

export async function deleteCliente(id) {
  "use server"
  const DELETE_CLIENTE_API_URL = `${API_CLIENTES_URL}${id}/`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const response = await fetch(DELETE_CLIENTE_API_URL, options);
    revalidatePath("/dashboard/clientes");
    return NextResponse.json({
      message: 'Deleted Cliente Successfully.',
    }, { status: response.status })
  } catch (error) {
    return NextResponse.json({
      message: 'Database Error: Failed to Delete Cliente.'
    }, { status: 400 })
  }
}

export async function deleteUC(client_id, uc_id) {
  "use server"
  const DELETE_UC_API_URL = `${API_UCS_URL}${client_id}/${uc_id}/`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const response = await fetch(DELETE_UC_API_URL, options);
    revalidatePath(`/dashboard/clientes/${client_id}/`);
    return NextResponse.json({
      message: 'Deleted UC Successfully.',
    }, { status: response.status })
  } catch (error) {
    return NextResponse.json({
      message: 'Database Error: Failed to Delete UC.'
    }, { status: 400 })
  }
}

export async function fetchUCs(client_id) {
  const UCS_LIST_URL = `${API_UCS_URL}${client_id}/`

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }

  const response = await fetch(UCS_LIST_URL, options);

  if (response.ok) {
    return await response.json();
  }

  return NextResponse.json({}, {status: 400});


}

export async function fetchUC(client_id, uc_id) {
  "use server"
  const UC_RETRIEVE_URL = `${API_UCS_URL}${client_id}/${uc_id}/`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }

  const response = await fetch(UC_RETRIEVE_URL, options);

  if (response.ok) {
    return await response.json();
  }

  return NextResponse.json({}, {status: 400});
}

export async function fetchProject(client_id) {
  const API_PROJECT_URL = `${API_PROJETOS_URL}${client_id}/`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }

  const response = await fetch(API_PROJECT_URL, options);

  if (response.ok) {
    return await response.json();
  }

  return NextResponse.json({}, {status: 400});
}

export async function getModulos() {
  const authToken = getToken();

  if (!authToken) {
    return NextResponse.json({}, { status: 401 });
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${authToken}`,
    },
  }

  const response = await fetch(DJANGO_API_MODULOS_URL, options);

  if (response.ok) {
    return await response.json();
  }

  return NextResponse.json({}, {status: 400});


}