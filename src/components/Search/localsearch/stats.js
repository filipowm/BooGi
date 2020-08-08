import React from 'react';
import { SearchStats } from '../';
export default ({ nbHits, ...rest }) => <SearchStats hits={nbHits} {...rest} />;
