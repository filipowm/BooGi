import React from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { SidebarSearchInput } from '../';
export default connectSearchBox(({ refine, ...rest }) => (
  <SidebarSearchInput search={(value) => refine(value)} {...rest} showClean={true} />
));
