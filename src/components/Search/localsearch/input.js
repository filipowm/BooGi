import React from 'react';
import { SidebarSearchInput } from '../';
export default (({ refine, ...rest }) => (
  <SidebarSearchInput search={(value) => refine(value)} {...rest} showClean={true} />
));
