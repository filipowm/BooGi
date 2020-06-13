import React from 'react';
import { connectStats } from 'react-instantsearch-dom';
import { SearchStats } from '../';
export default connectStats(({ nbHits, ...rest }) => <SearchStats hits={nbHits} {...rest} />);
