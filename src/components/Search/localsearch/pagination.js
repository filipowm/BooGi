import React from 'react';
import { Pagination } from '../';
export default ({ currentPage, ...rest }) => (
  <Pagination currentPage={currentPage} {...rest} />
);
