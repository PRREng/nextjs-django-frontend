import Image from 'next/image';
import { DetailCliente, UpdateCliente, DeleteCliente } from '@/app/ui/clientes/buttons';
// import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/lib/utils';
// import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function ClientesTable({ query, currentPage }) {
//   const invoices = await fetchFilteredInvoices(query, currentPage);
    const clientes = [{
      id: '1',
      nome: 'Roberto Menezes',
      endereco: 'Rua Armando Barros, 81',
      proposta: 1990000,
      data: '3 de junho, 2024',
    }];

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {clientes?.map((cliente) => (
              <div
                key={cliente.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={cliente.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${cliente.name}'s profile picture`}
                      /> */}
                      <p>{cliente.nome}</p>
                    </div>
                    <p className="text-sm text-gray-500">{cliente.endereco}</p>
                  </div>
                  {/* <ClienteStatus status={cliente.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(cliente.proposta)}
                    </p>
                    <p>{cliente.data}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <DetailCliente id={cliente.id} />
                    <DeleteCliente id={cliente.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Cliente
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Endereço
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Proposta
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Data
                </th>
                {/* <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th> */}
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {clientes?.map((cliente) => (
                <tr
                  key={cliente.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={cliente.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${cliente.name}'s profile picture`}
                      /> */}
                      <p>{cliente.nome}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {cliente.endereco}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(cliente.proposta)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {cliente.data}
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    <ClienteStatus status={cliente.status} />
                  </td> */}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <DetailCliente id={cliente.id} />
                      <DeleteCliente id={cliente.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}