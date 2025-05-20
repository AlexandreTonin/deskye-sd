function validatePagination(page, limit) {
  const pageValue = Number(page) || 1;
  const limitValue = Number(limit) || 15;

  if (limitValue < 1 || limitValue > 100) {
    limit = 15;
  }

  const offset = (pageValue - 1) * limitValue;

  return { page: pageValue, limit: limitValue, offset };
}

function getPaginationMeta(totalItems, currentPage, perPage) {
  const totalItemsValue = Number(totalItems);
  const perPageValue = Number(perPage);
  const currentPageValue = Math.max(1, Number(currentPage) || 1);

  const totalPages = Math.ceil(totalItemsValue / perPageValue);

  const meta = {
    totalItems: totalItemsValue,
    perPage: perPageValue,
    currentPage: currentPageValue,
    totalPages,
  };

  if (totalPages > 1) {
    meta.firstPage = 1;
    meta.lastPage = totalPages;
    meta.nextPage = currentPageValue < totalPages ? currentPageValue + 1 : null;
    meta.previousPage = currentPageValue > 1 ? currentPageValue - 1 : null;
  }

  return meta;
}

export { getPaginationMeta, validatePagination };
