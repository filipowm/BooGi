import React from 'react';
import { connectPagination } from 'react-instantsearch-dom';
import { Pagination } from '../';
export default connectPagination(({ currentRefinement, ...rest }) => (
  <Pagination
    currentPage={currentRefinement}
    {...rest}
  />
));
