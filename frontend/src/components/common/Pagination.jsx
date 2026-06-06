import React from 'react';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);

  if (pagesCount <= 1)
    return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <nav aria-label="Nawigacja stronami">
      <ul className="pagination pagination-sm mb-0">
        {pages.map(page => (
          <li 
            key={page} 
            className={'page-item ' + (page === currentPage ? 'active' : '')}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;