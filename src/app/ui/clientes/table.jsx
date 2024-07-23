import { DetailCliente, DeleteCliente } from '@/app/ui/clientes/buttons';
import { fetchClientes } from '@/lib/fetching';
import { formatDateToLocal, formatCurrency } from '@/lib/utils';


export default async function ClientesTable({ query, currentPage }) {


    const response = await fetchClientes();
    if (response.status !== 200) {
      console.log("You have to login");
    }
    let clientes = response.result;
    clientes = clientes?.map((cliente) => {
      // BUG TO SOLVE
      const endereco = "Armando Barros";
      const proposta = 19900
      return {...cliente, endereco, proposta};
    });


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
                      <p>{cliente.nome}</p>
                    </div>
                    <p className="text-sm text-gray-500">{cliente.endereco}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(cliente.proposta)}
                    </p>
                    <p>{cliente.criadoem}</p>
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
                    {formatDateToLocal(cliente.criadoem)}
                  </td>
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