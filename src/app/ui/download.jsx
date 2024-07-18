"use client"

import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export function GerarProposta({ id }) {
    // const gerarProposta = gerarPropostaSimples.bind(null, id); 
    const handleDownload = async () => {

        const DJANGO_GERAR_PROPOSTA_SIMPLES_URL = `/api/download/${id}/`;
    
        const response = await fetch(DJANGO_GERAR_PROPOSTA_SIMPLES_URL);
        if (!response.ok) {
          console.log("Error fetching proposta")
        }
        console.log("OUR RESPONSE IN CLIENT")
        console.log(response);
        console.log("OUR DATA IN CLIENT")
        const data = await response.json();
        console.log(data);


        const byteCharacters = atob(data.base64);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: 'application/pdf' }); // Adjust MIME type as needed
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'proposta.pptx'; // Set desired file name
        link.click();
        return;
        
      }
  
  
    return (
      // <form> {/* </form> */}
        <button onClick={handleDownload}
        className="rounded-md bg-gray-300 border p-2 hover:bg-gray-100">
          <span className="sr-only">Gerar</span>
          Gerar Proposta
        </button>
    );
  }