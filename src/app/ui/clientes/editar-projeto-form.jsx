'use client';

import Link from 'next/link';
import {
  RectangleStackIcon,
  RectangleGroupIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useState } from 'react';

const PROJETOS_API_URL = "/api/projetos/";

export default function Form({ client_id, projeto, modulos }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // console.log(modulos);
  // console.log(projeto);

  async function handleSubmit(e) {
    e.preventDefault();
    const UPDATE_PROJETO_URL = `${PROJETOS_API_URL}${client_id}/`;
    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData);

    object.modulo_id = parseInt(object.modulo_id);
    object.qtdeModulos = parseInt(object.qtdeModulos);
    object.valorProposta = parseInt(object.valorProposta);

    const jsonData = JSON.stringify(object);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    }
    const response = await fetch(UPDATE_PROJETO_URL, options);
    if (response.ok) {
      setMessage("Thank you for updating Projeto");
    } else {
      setError("There was an error with your request. Please try again.");
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>{message && message}</div>
      <div>{error && error}</div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Módulo Solar */}
        <div className="mb-4">
            <label htmlFor="modulo" className="mb-2 block text-sm font-medium">
                Módulo Solar
            </label>
            <div className="relative">
                <select
                id="modulo"
                name="modulo_id"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                defaultValue={projeto.modulo.id - 1}
                aria-describedby="modulo_id-error"
                >
                <option value="" disabled>
                    Selecione o Módulo
                </option>
                {modulos.map((modulo) => (
                    <option key={modulo.id} value={modulo.id}>
                    {modulo.modelo}
                    </option>
                ))}
                </select>
                <RectangleStackIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
        </div>

        {/* Micro ou Inversor */}
        {/* <div className="mb-4">
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
        </div> */}

        {/* Quantidade de Módulos */}
        <div className='mb-4'>
          <label htmlFor="qtdeMod" className="mb-2 block text-sm font-medium">
            Quantidade de Módulos
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="qtdeMod"
                name="qtdeModulos"
                type="number"
                placeholder="XXX"
                defaultValue={projeto.qtdeModulos}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                aria-describedby="qtdeModulos-error"
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
                name="valorProposta"
                type="number"
                placeholder="XXX.XXX.XXX-00"
                defaultValue={projeto.valorProposta}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                aria-describedby="valorProposta-error"
              />
              <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/clientes/${client_id}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar Projeto</Button>
      </div>
    </form>
  );
}