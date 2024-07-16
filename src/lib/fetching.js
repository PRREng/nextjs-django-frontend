// import { sql } from '@vercel/postgres';
// import {
//   CustomerField,
//   CustomersTableType,
//   InvoiceForm,
//   InvoicesTable,
//   LatestInvoiceRaw,
//   Revenue,
// } from './definitions';
// import { formatCurrency } from './utils';

import { NextResponse } from "next/server";
import { getToken } from "./auth";
import { revalidatePath } from "next/cache";

const ITEMS_PER_PAGE = 6;
export async function fetchClientesFiltrados(
  query,
  currentPage,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}



const DJANGO_API_CLIENTES_URL = "http://127.0.0.1:8001/api/clientes/";
const DJANGO_API_UCS_URL = "http://127.0.0.1:8001/api/ucs/";
const DJANGO_API_PROJETOS_URL = "http://127.0.0.1:8001/api/projetos/";
export async function fetchClientes() {
    const authToken = getToken();
    if (!authToken) {
        return NextResponse.json({}, {status: 401});
    }

    const options = { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`
        }
    }
    const response = await fetch(DJANGO_API_CLIENTES_URL, options);
    console.log(response);
    const result = await response.json();
    const status = response.status;

    return {result, status: status};
}

export async function fetchCliente(id) {
  const CLIENTE_DETAIL_URL = `${DJANGO_API_CLIENTES_URL}${id}/`
  const authToken = getToken();
  if (!authToken) {
    return NextResponse.json({}, {status: 401});
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${authToken}`,
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
  const DELETE_CLIENTE_API_URL = `${DJANGO_API_CLIENTES_URL}${id}/`;
  const authToken = getToken();
  if (!authToken) {
    return NextResponse.json({}, { status: 401 });
  }

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${authToken}`,
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

export async function deleteUC(id) {
  "use server"
  const DELETE_CLIENTE_API_URL = `${DJANGO_API_CLIENTES_URL}${id}/`;
  const authToken = getToken();
  if (!authToken) {
    return NextResponse.json({}, { status: 401 });
  }

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${authToken}`,
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

export async function fetchCategoria(categoria) {
  const CATEGORIA_DETAIL_URL = `${DJANGO_API_UCS_URL}categoria/${categoria}/`
  const authToken = getToken();
  if (!authToken) {
    return NextResponse.json({}, {status: 401});
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${authToken}`,
    },
  }
  const response = await fetch(CATEGORIA_DETAIL_URL, options);
  if (response.ok) {
    return await response.json();
  }
  return NextResponse.json({}, {status: 400});
}

export async function fetchUCs(client_id) {
  const UCS_LIST_URL = `http://127.0.0.1:8001/api/ucs/${client_id}/`
  const authToken = getToken();
  if (!authToken) {
    return NextResponse.json({}, {status: 401});
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${authToken}`,
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
  const UC_RETRIEVE_URL = `http://127.0.0.1:8001/api/ucs/${client_id}/${uc_id}/`;
  const authToken = getToken();
  if (!authToken) {
    return NextResponse.json({}, {status: 401});
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${authToken}`,
    },
  }

  const response = await fetch(UC_RETRIEVE_URL, options);

  if (response.ok) {
    return await response.json();
  }

  return NextResponse.json({}, {status: 400});
}

export async function fetchProject(client_id) {
  const DJANGO_API_PROJECT_URL = `${DJANGO_API_PROJETOS_URL}${client_id}/`;
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

  const response = await fetch(DJANGO_API_PROJECT_URL, options);

  if (response.ok) {
    return await response.json();
  }

  return NextResponse.json({}, {status: 400});


}