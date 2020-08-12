import React, { useState } from 'react';
import { HitsWrapper } from '../Hits';
import config from 'config';
import Input from './input';
import { PageHit } from './hitComps';
import SearchStatus from '../Status';
import Pagination from './pagination';
import Stats from './stats';
import { useFlexSearch } from 'react-use-flexsearch';
import { StaticQuery, graphql } from 'gatsby';

const Results = ({ q }) => <SearchStatus noHits={true} searching={false} query={q} />;

const getPerformance = () => {
  if (typeof window !== `undefined` && window.performance) {
    return window.performance;
  }
  return {
    now: () => new Date().getMilliseconds()
  }
}

const calculatePage = (results, page) => {
  const hitsPerPage = config.features.search.hitsPerPage;
  const startIdx = hitsPerPage * page - hitsPerPage;
  const endIdx = startIdx + hitsPerPage;
  return results.slice(startIdx, endIdx);
};

const search = (query, index, store, page) => {
  const performance = getPerformance();
  const t1 = performance.now();
  let results = [];
  if (index && store) {
    const parsedStore = typeof store === `string` ? JSON.parse(store) : store;
    results = useFlexSearch(query, index, parsedStore);
  }
  const maxResults =
    config.features.search.pagination.totalPages * config.features.search.hitsPerPage;
  const nbHits = results.length > maxResults ? maxResults : results.length;

  const pages = Math.ceil(results.length / config.features.search.hitsPerPage);
  const pageHits = calculatePage(results, page);
  const t2 = performance.now();
  const processingTimeMS = (t2 - t1).toFixed(2);
  return {
    hits: pageHits,
    nbHits: nbHits,
    pages: pages,
    processingTimeMS: processingTimeMS,
  };
};

const LocalSearch = ({ inputRef }) => (
  <StaticQuery
    query={graphql`
      query {
        localSearchBoogi {
          index
          store
        }
      }
    `}
    render={({ localSearchBoogi: { index, store } }) => {
      const [query, setQuery] = useState(null);
      const [focus, setFocus] = useState(false);
      const [page, setPage] = useState(1);
      const switchPage = (page) => {
        setPage(page);
      };

      const searchResult = search(query, index, store, page);
      const showResults = query && query.length > 1 && focus;
      return (
        <>
          <Input
            refine={(value) => setQuery(value)}
            inputRef={inputRef}
            onFocus={() => setFocus(true)}
            {...{ focus }}
          />
          <div style={{ flex: '1' }}>
            {showResults && config.features.search.showStats ? (
              <Stats
                nbHits={searchResult.nbHits}
                processingTimeMS={searchResult.processingTimeMS}
              />
            ) : null}
            {showResults && searchResult && searchResult.hits.length === 0 ? (
              <Results q={query} />
            ) : null}
            <HitsWrapper>
              <ul>
                {searchResult.hits.map((hit) => (
                  <PageHit
                    key={hit.slug}
                    hit={hit}
                    q={query}
                    maxWords={config.features.search.snippetLength}
                  />
                ))}
              </ul>
            </HitsWrapper>
          </div>
          {showResults &&
          searchResult.hits.length > 0 &&
          config.features.search.pagination.enabled ? (
            <Pagination
              totalPages={config.features.search.pagination.totalPages}
              showPrevious={config.features.search.pagination.showPrevious}
              showNext={config.features.search.pagination.showNext}
              refine={switchPage}
              nbPages={searchResult.pages}
              currentPage={page}
            />
          ) : null}
        </>
      );
    }}
  />
);

export default LocalSearch;
