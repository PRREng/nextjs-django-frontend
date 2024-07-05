'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  IdentificationIcon,
  PhoneIcon,
  UserCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createClient } from '@/app/lib/actions'; // dummy for now
import { useActionState } from 'react';

export default function Form() {
  const initialState = { message: null, errors: {} };
  // const [state, formAction] = useActionState(createClient, initialState);

  // console.log(state);
  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="nome" className="mb-2 block text-sm font-medium">
            Nome
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Nome"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                aria-describedby="nome-error"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* <div id="nome-error" aria-live="polite" aria-atomic="true">
            {state.errors?.nome && 
              state.errors.nome.map((error) => (
                <p className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))
            }
          </div> */}
          {/* <div className="relative">
            <select
              id="nome"
              name="nome"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="nome-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div> */}
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Telefone
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="number"
                placeholder="(XX) 00000-XXXX"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                aria-describedby="phone-error"
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* <div id="phone-error" aria-live="polite" aria-atomic="true">
            {state.errors?.phone && 
              state.errors.phone.map((error) => (
                <p className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))
            }
          </div> */}
        </div>

        {/* Invoice Status */}
        <fieldset>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            CPF / CNPJ
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cpf"
                name="cpf"
                type="number"
                placeholder="XXX.XXX.XXX-00"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                aria-describedby="cpf-error"
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* <div id="cpf-error" aria-live="polite" aria-atomic="true">
            {state.errors?.cpf && 
              state.errors.cpf.map((error) => (
                <p className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))
            }
          </div> */}
          {/* <legend className="mb-2 block text-sm font-medium">
            CPF
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
              {state.errors?.status && 
                state.errors.status.map((error) => (
                  <p className="mt-2 text-sm text-red-500">
                    {error}
                  </p>
                ))
              }
          </div> */}
          {/* <div id="status-error" aria-live="polite" aria-atomic="true">
              {state.message && 
                (
                  <p className="mt-2 text-sm text-red-500">
                    {state.message}
                  </p>
                )
              }
          </div> */}
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/clientes"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Criar Cliente</Button>
      </div>
    </form>
  );
}