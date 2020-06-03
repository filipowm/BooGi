import React from 'react';
import PropTypes from 'prop-types';
import { InstantSearch, SearchBox, Hits, Stats, Pagination } from 'react-instantsearch-dom';

import Hit from './hit';
import algoliasearch from 'algoliasearch';

const Search = (props) => {
  const { classes, algolia } = props;
  const searchClient = algoliasearch(algolia.appId, algolia.apiKey);
  return (
    <div className={classes.search}>
      {algolia && algolia.appId && (
        <InstantSearch searchClient={searchClient} indexName={algolia.indexName}>
          <SearchBox translations={{ placeholder: 'Search' }} />
          <Stats />
          <Hits hitComponent={Hit} />
          <Pagination />
        </InstantSearch>
      )}
    </div>
  );
};

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  algolia: PropTypes.object.isRequired,
};

export default Search;
