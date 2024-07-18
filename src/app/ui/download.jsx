"use client"

export function GerarProposta({ id }) {
    const handleDownload = async () => {

        const ROUTE_GERAR_PROPOSTA_SIMPLES_URL = `/api/download/${id}/`;
    
        const response = await fetch(ROUTE_GERAR_PROPOSTA_SIMPLES_URL);
        if (!response.ok) {
          console.log("Error fetching proposta")
        }
        const data = await response.json();


        const byteCharacters = atob(data.base64);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'proposta.pptx';
        link.click();
        return;
        
      }
  
  
    return (
        <button onClick={handleDownload}
        className="rounded-md bg-gray-300 border p-2 hover:bg-gray-100">
          <span className="sr-only">Gerar</span>
          Gerar Proposta
        </button>
    );
}

export function GerarPropostaGrande({ id }) {

  const handleDownload = async () => {

      const ROUTE_GERAR_PROPOSTA_GRANDE_URL = `/api/download/${id}/grande/`;
  
      const response = await fetch(ROUTE_GERAR_PROPOSTA_GRANDE_URL);
      if (!response.ok) {
        console.log("Error fetching proposta")
      }
      const data = await response.json();


      const byteCharacters = atob(data.base64);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteNumbers], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'proposta.pptx';
      link.click();
      return;
      
    }


  return (
      <button onClick={handleDownload}
      className="rounded-md bg-gray-300 border p-2 hover:bg-gray-100">
        <span className="sr-only">Gerar</span>
        Proposta Grande
      </button>
  );
}

export function GerarProcuracao({ id }) {

  const handleDownload = async () => {

      const ROUTE_GERAR_PROCURACAO_URL = `/api/download/${id}/procuracao/`;
  
      const response = await fetch(ROUTE_GERAR_PROCURACAO_URL);
      if (!response.ok) {
        console.log("Error fetching procuracao")
      }
      const data = await response.json();


      const byteCharacters = atob(data.base64);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteNumbers], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Procuração.docx';
      link.click();
      return;
      
    }


  return (
      <button onClick={handleDownload}
      className="rounded-md bg-gray-300 border p-2 hover:bg-gray-100">
        <span className="sr-only">Gerar</span>
        Procuração
      </button>
  );
}

export function GerarTermoDePosse({ id }) {

  const handleDownload = async () => {

      const ROUTE_GERAR_TERMO_URL = `/api/download/${id}/termo-de-posse/`;
  
      const response = await fetch(ROUTE_GERAR_TERMO_URL);
      if (!response.ok) {
        console.log("Error fetching procuracao")
      }
      const data = await response.json();


      const byteCharacters = atob(data.base64);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteNumbers], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'TermoDePosse.docx';
      link.click();
      return;
      
    }


  return (
      <button onClick={handleDownload}
      className="rounded-md bg-gray-300 border p-2 hover:bg-gray-100">
        <span className="sr-only">Gerar</span>
        Termo de Posse
      </button>
  );
}

export function GerarContrato({ id }) {

  const handleDownload = async () => {

      const ROUTE_GERAR_CONTRATO_URL = `/api/download/${id}/contrato/`;
  
      const response = await fetch(ROUTE_GERAR_CONTRATO_URL);
      if (!response.ok) {
        console.log("Error fetching contrato")
      }
      const data = await response.json();


      const byteCharacters = atob(data.base64);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteNumbers], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Contrato.docx';
      link.click();
      return;
      
    }


  return (
      <button onClick={handleDownload}
      className="rounded-md bg-gray-300 border p-2 hover:bg-gray-100">
        <span className="sr-only">Gerar</span>
        Contrato
      </button>
  );
}