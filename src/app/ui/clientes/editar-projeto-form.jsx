'use client';

import Link from 'next/link';
import {
  RectangleStackIcon,
  IdentificationIcon,
  RectangleGroupIcon,
  BanknotesIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createClient } from '@/lib/actions'; // dummy for now
import { useActionState } from 'react';

export default function Form({ cliente }) {
  const initialState = { message: null, errors: {} };
  console.log(cliente);
  // const [state, formAction] = useActionState(createClient, initialState);
  const modulos = [
    {nome: "TSUN - T123"},
    {nome: "SUNOVA - SS321"},
  ];
  // console.log(state);
  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Módulo Solar */}
        <div className="mb-4">
            <label htmlFor="modulo" className="mb-2 block text-sm font-medium">
                Módulo Solar
            </label>
            <div className="relative">
                <select
                id="modulo"
                name="modulo"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                defaultValue={0}
                aria-describedby="modulo-error"
                >
                <option value="" disabled>
                    Selecione o Módulo
                </option>
                {modulos.map((modulo) => (
                    <option key={modulo.id} value={modulo.id}>
                    {modulo.nome}
                    </option>
                ))}
                </select>
                <RectangleStackIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>

        {/* Micro ou Inversor */}
        <div className="mb-4">
              <fieldset>
                <legend className="mb-2 block text-sm font-medium">
                    Micro ou Inversor
                </legend>
                <div className="rounded-md border border-gray-200 bg-white px-[14px] py-1">
                    <div className="flex gap-4">
                    <div className="flex items-center">
                        <input
                        id="micro"
                        name="status"
                        type="radio"
                        value="micro"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        aria-describedby="status-error"
                        />
                        <label
                        htmlFor="micro"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                        >
                        Micro
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                        id="inversor"
                        name="status"
                        type="radio"
                        value="inversor"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        aria-describedby="status-error"
                        />
                        <label
                        htmlFor="inversor"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-orange-400 px-3 py-1.5 text-xs font-medium text-white"
                        >
                        Inversor
                        </label>
                    </div>
                    </div>
                </div>
              </fieldset>
            </div>

        {/* Quantidade de Módulos */}
        <div className='mb-4'>
          <label htmlFor="qtdeMod" className="mb-2 block text-sm font-medium">
            Quantidade de Módulos
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="qtdeMod"
                name="qtdeMod"
                type="number"
                placeholder="XXX"
                defaultValue={10}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                aria-describedby="qtdeMod-error"
              />
              <RectangleGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Proposta */}
        <div>
          <label htmlFor="proposta" className="mb-2 block text-sm font-medium">
            Proposta
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="proposta"
                name="proposta"
                type="number"
                placeholder="XXX.XXX.XXX-00"
                defaultValue={19900}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                aria-describedby="proposta-error"
              />
              <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/clientes/${cliente.id}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar Projeto</Button>
      </div>
    </form>
  );
}