'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useState } from 'react';

const UCS_API_URL = "/api/ucs/";

export default function Form({ client_id, uc }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  

  const prefixos = [
    { id: 0, nome: 'Rua', },
    { id: 1, nome: 'Av.', },
    { id: 2, nome: 'Est.', },
    { id: 3, nome: 'Pov.', },
    { id: 4, nome: 'Rod.', },
    { id: 5, nome: 'Tv.', },
  ];

  const preToID = {
    'Rua': 0,
    'Av.': 1,
    'Est.': 2,
    'Pov.': 3,
    'Rod.': 4,
    'Tv.': 5,
  }

  const categorias = [
    { id: 0, nome: 'Monofásico', },
    { id: 1, nome: 'Bifásico', },
    { id: 2, nome: 'Trifásico', },
  ];



  const tipoucs = [{id: 0, nome: "Usina"}, {id: 1, nome: "Compensadora"}];

  const funcoes = [{id: 0, nome: "Residencial"}, {id: 1, nome: "Comercial"}];

  const funtoID = {
    "Residencial": 0,
    "Comercial": 1,
  }

  const tensoes = [{id: 0, nome: "127/220"}, {id: 1, nome: "220/380"}];

  const tentoID = {
    "127/220": 0,
    "220/380": 1,
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    let objectFromForm = Object.fromEntries(formData);
    // console.log(objectFromForm);

    // process the object so it is serializable in django ninja
    objectFromForm.seforrural = objectFromForm.seforrural === "rural";
    objectFromForm.nomeCategoria = categorias[parseInt(objectFromForm.nomeCategoria)].nome;
    objectFromForm.nomeTipo = tipoucs[parseInt(objectFromForm.nomeTipo)].nome;
    objectFromForm.prefixo_local = prefixos[parseInt(objectFromForm.prefixo_local)].nome;
    objectFromForm.resideoucomercial = funcoes[parseInt(objectFromForm.resideoucomercial)].nome;
    objectFromForm.tensaoNominal = tensoes[parseInt(objectFromForm.tensaoNominal)].nome;
    if (!objectFromForm.tempoPosse) {objectFromForm.tempoPosse = 0;}
    objectFromForm['cliente_id'] = client_id;

    // Log the object to see the fields
    console.log("Object from edit form");
    console.log(objectFromForm);

    // preparing the request
    const jsonData = JSON.stringify(objectFromForm);
    const requestOptions = {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: jsonData,
    }

    const UC_UPDATE_API_URL = `${UCS_API_URL}${client_id}/${uc.id}/`
    const response = await fetch(UC_UPDATE_API_URL, requestOptions);
    if (response.ok) {
        setMessage("Thank you for updating UC")
    } else {
        setError("There was an error with your request. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>{message && message}</div>
      <div>{error && error}</div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Código da UC */}
        <div className="mb-4">
          <label htmlFor="num_UC" className="mb-2 block text-sm font-medium">
            Código da UC
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="num_UC"
                name="num_UC"
                type="text"
                placeholder="Código"
                defaultValue={uc.num_UC}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                aria-describedby="num_UC-error"
              />
            </div>
          </div>
        </div>

        {/* Prefixo, Nome da Rua, Número */}
        <div className='flex flex-row gap-5'>

            {/* Prefixo */}
            <div className="mb-4 flex-1">
                <label htmlFor="prefixo_local" className="mb-2 block text-sm font-medium">
                    Prefixo
                </label>
                <div className="relative">
                    <select
                    id="prefixo_local"
                    name="prefixo_local"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                    defaultValue={preToID[uc.endereco.prefixo_local]}
                    aria-describedby="prefixo_local-error"
                    >
                    <option value="" disabled>
                        Selecione Prefixo
                    </option>
                    {prefixos.map((prefixo) => (
                        <option key={prefixo.id} value={prefixo.id}>
                        {prefixo.nome}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
                

            {/* nome da rua */}
            <div className="mb-4 flex-1">
                <label htmlFor="rua" className="mb-2 block text-sm font-medium">
                    Nome da Rua
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                    <input
                        id="rua"
                        name="rua"
                        type="text"
                        placeholder="Tancredo Neves"
                        defaultValue={uc.endereco.rua}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                        aria-describedby="rua-error"
                    />
                    </div>
                </div>
            </div>
            {/* numero do logradouro */}
            <div className="mb-4 flex-1">
                <label htmlFor="num_logradouro" className="mb-2 block text-sm font-medium">
                    Número
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                    <input
                        id="num_logradouro"
                        name="num_logradouro"
                        type="text"
                        placeholder="XXX"
                        defaultValue={uc.endereco.num_logradouro}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                        aria-describedby="num_logradouro-error"
                    />
                    </div>
                </div>
            </div>
        </div>


        {/* Rural ou urbano, bairro, cidade, estado */}
        <div className="flex flex-row gap-5">
            {/* Rural ou urbano */}
            <div className="mb-4 flex-2">
              <fieldset>
                <legend className="mb-2 block text-sm font-medium">
                    Rural ou Urbano
                </legend>
                <div className="rounded-md border border-gray-200 bg-white px-[14px] py-1">
                    <div className="flex gap-4">
                    <div className="flex items-center">
                        <input
                        id="rural"
                        name="seforrural"
                        type="radio"
                        value="rural"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        aria-describedby="seforrural-error"
                        defaultChecked={uc.endereco.seforrural}
                        />
                        <label
                        htmlFor="rural"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                        >
                        Rural
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                        id="urbano"
                        name="seforrural"
                        type="radio"
                        value="urbano"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        aria-describedby="seforrural-error"
                        defaultChecked={!uc.endereco.seforrural}
                        />
                        <label
                        htmlFor="urbano"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-orange-400 px-3 py-1.5 text-xs font-medium text-white"
                        >
                        Urbano
                        </label>
                    </div>
                    </div>
                </div>
              </fieldset>
            </div>

            {/* Bairro */}
            <div className="mb-4 flex-2">
                <legend htmlFor="bairro" className='mb-2 block text-sm font-medium'>
                    Bairro
                </legend>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                        id='bairro'
                        name='bairro' 
                        type="text"
                        placeholder='Ap...'
                        defaultValue={uc.endereco.bairro}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                        aria-describedby='bairro-error'
                        />
                    </div>
                </div>
            </div>

            {/* Cidade */}
            <div className="mb-4 flex-2">
                <legend htmlFor="cidade" className='mb-2 block text-sm font-medium'>
                    Cidade
                </legend>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                        id='cidade'
                        name='cidade' 
                        type="text"
                        placeholder='Cidade'
                        defaultValue={uc.endereco.cidade}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                        aria-describedby='cidade-error'
                        />
                    </div>
                </div>
            </div>

            {/* Estado */}
            <div className="mb-4 flex-1">
                <legend htmlFor="estado" className='mb-2 block text-sm font-medium'>
                    Estado
                </legend>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                        id='estado'
                        name='estado'
                        type="text"
                        placeholder='SE..'
                        defaultValue={uc.endereco.estado}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                        aria-describedby='estado-error'
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* CEP */}
        <div className="mb-4">
          <label htmlFor="cep" className="mb-2 block text-sm font-medium">
            CEP
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cep"
                name="CEP"
                type="text"
                placeholder="49XXX-XXX"
                defaultValue={uc.endereco.CEP}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                aria-describedby="cep-error"
              />
            </div>
          </div>
        </div>

        {/* Categoria, tipo UC, consumo */}
        <div className='flex flex-row gap-5'>

            {/* Categoria */}
            <div className="mb-4 flex-1">
                <label htmlFor="categoria" className="mb-2 block text-sm font-medium">
                    Categoria
                </label>
                <div className="relative">
                    <select
                    id="categoria"
                    name="nomeCategoria"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                    defaultValue={uc.categoria.id - 1}
                    aria-describedby="nomeCategoria-error"
                    >
                    <option value="" disabled>
                        Selecione Categoria
                    </option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                        </option>
                    ))}
                    </select>
                </div>
            </div>


            {/* Tipo UC */}
            <div className="mb-4 flex-1">
                <label htmlFor="tipouc" className="mb-2 block text-sm font-medium">
                    Tipo UC
                </label>
                <div className="relative">
                    <select
                    id="tipouc"
                    name="nomeTipo"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                    defaultValue={uc.tipoUC.id - 1}
                    aria-describedby="nomeTipo-error"
                    >
                    <option value="" disabled>
                        Tipo de UC
                    </option>
                    {tipoucs.map((tipouc) => (
                        <option key={tipouc.id} value={tipouc.id}>
                        {tipouc.nome}
                        </option>
                    ))}
                    </select>
                </div>
            </div>
            

            {/* Consumo */}
            <div className="mb-4 flex-1">
                <label htmlFor="consumo" className="mb-2 block text-sm font-medium">
                    Consumo
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                      <input
                        id='consumo'
                        name='consumo' 
                        type="text"
                        placeholder='XXX'
                        defaultValue={uc.consumo}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                        aria-describedby="consumo-error"
                      />
                    </div>
                </div>
            </div>

        </div>

        {/* Funcao, tensao nominal, tempo de posse */}
        <div className="flex flex-row gap-5">

            {/* Funcao */}
            <div className="mb-4 flex-1">
                <label htmlFor="funcao" className="mb-2 block text-sm font-medium">
                    Função
                </label>
                <div className="relative">
                    <select
                    id="funcao"
                    name="resideoucomercial"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                    defaultValue={funtoID[uc.resideoucomercial]}
                    aria-describedby="resideoucomercial-error"
                    >
                    <option value="" disabled>
                        Selecione Funcao
                    </option>
                    {funcoes.map((funcao) => (
                        <option key={funcao.id} value={funcao.id}>
                        {funcao.nome}
                        </option>
                    ))}
                    </select>
                </div>
            </div>

            {/* Tensão Nominal */}
            <div className="mb-4 flex-1">
                <label htmlFor="tensao" className="mb-2 block text-sm font-medium">
                    Tensão Nominal
                </label>
                <div className="relative">
                    <select
                    id="tensao"
                    name="tensaoNominal"
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                    defaultValue={tentoID[uc.tensaoNominal]}
                    aria-describedby="tensaoNominal-error"
                    >
                    <option value="" disabled>
                        Selecione a Tensão
                    </option>
                    {tensoes.map((tensao) => (
                        <option key={tensao.id} value={tensao.id}>
                        {tensao.nome}
                        </option>
                    ))}
                    </select>
                </div>
            </div>


            {/* Tempo de Posse */}
            <div className="mb-4 flex-1">
                <legend htmlFor="tempo-posse" className='mb-2 block text-sm font-medium'>
                    Tempo de Posse
                </legend>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                        id='tempo-posse'
                        name='tempoPosse' 
                        type="number"
                        placeholder='NN'
                        defaultValue={uc.tempoPosse}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 focus:outline-orange-300"
                        aria-describedby='tempoPosse-error'
                        />
                    </div>
                </div>
            </div>
        </div>

      </div>
      {/* Out of the form inputs */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/dashboard/clientes/${client_id}`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar UC</Button>
      </div>
    </form>
  );
}