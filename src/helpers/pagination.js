// helpers/pagination.js
export const getPagination = (page, size) => {
    const limit = size;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit - 1;
    return { limit, startIndex, endIndex };
  };
  
  export const getPagingData = (totalItems, page, limit) => {
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = page;
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevPage = hasPrevPage ? page - 1 : null;
    const nextPage = hasNextPage ? page + 1 : null;
    return { totalPages, currentPage, hasPrevPage, hasNextPage, prevPage, nextPage };
  };
  