
export const formatCurrency = (amount) => {
  return (amount).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const formatDateToLocal = ( dateStr, locale = 'pt-BR') => {
  const date = new Date(dateStr);
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage, totalPages) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};


export function formatEndereco(endereco) {
  return `${endereco.prefixo_local} ${endereco.rua}, ${endereco.num_logradouro} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}`
}