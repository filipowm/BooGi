import React, {useState, useEffect, createRef} from "react";
import {
  InstantSearch,
  Index,
  Hits,
  Configure,
  Pagination,
  connectStateResults,
} from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";
import config from "config";

import styled from "@emotion/styled";
import Input from "./input"
import * as hitComps from "./hitComps"
import 'css';
import {Slide} from "react-reveal";

const Blur = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(24, 48, 85, 0.3);
  transition: ${props => props.theme.transitions.hover};
`;

const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  height: 100%;
  overflow: scroll;
  z-index: 5;
  -webkit-overflow-scrolling: touch;
  position: fixed;
  right: 0;
  left: auto;
  top: 0;
  width: 400px;
  box-shadow: 0 0 5px 0 rgba(0,0,0,.3);
  background: white;
  @media only screen and (max-width: 991px) {
    width: 400px;
    max-width: 400px;
  }
  @media only screen and (max-width: 767px) {
    width: 100%;
    max-width: 500px;
  }
  border-radius: ${props => props.theme.smallBorderRadius};
  > * + * {
    padding-top: 1em !important;
    border-top: 2px solid ${props => props.theme.darkGray};
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid ${props => props.theme.lightGray};
  }
  ul {
    list-style: none;
  }
  mark {
    color: ${props => props.theme.lightBlue};
    background: ${props => props.theme.darkBlue};
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3em;
    h3 {
      color: black;
      background: ${props => props.theme.gray};
      padding: 0.1em 0.4em;
      border-radius: ${props => props.theme.smallBorderRadius};
    }
  }
  h3 {
    color: black;
    margin: 0 0 0.5em;
  }
  h4 {
    color: black;
    margin-bottom: 0.3em;
  }
`
const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`

const Results = connectStateResults(
  ({searching, searchState: state, searchResults: res}) =>
    (searching && `Searching...`) ||
    (res && res.nbHits === 0 && `No results for '${state.query}'`)
)

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = event =>
    ref && ref.current && !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events)
      document.addEventListener(event, detectClickOutside)
    return () => {
      for (const event of events)
        document.removeEventListener(event, detectClickOutside)
    }
  })
};

const Hitss = styled.div`
margin-top: 69px;
padding: 20px;
border-top: 1px solid ${props => props.theme.colors.border};
`;

export default function SearchComponent({indices, collapse, hitsAsGrid}) {
  const ref = createRef();
  const [query, setQuery] = useState(``);
  const [focus, setFocus] = useState(false);
  const searchClient = algoliasearch(
    config.search.algoliaAppId,
    config.search.algoliaSearchKey
  )
  useClickOutside(ref, () => setFocus(false));
  const displayResult = (query.length > 0 && focus) ? 'showResults' : 'hideResults';
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({query}) => setQuery(query)}
      root={{Root, props: {ref}}}
    >
      <Input
        onClick={() => { console.log("clicked"); setFocus(true) } }
        {...{collapse, focus}} />

      <Blur show={focus}
            onClick={() => { console.log("blur here"); setFocus(false)}}>
      </Blur>
        <Slide right delay={0} duration={500}>
          <HitsWrapper className={'hitWrapper ' + displayResult}
                       show={focus}
                       asGrid={hitsAsGrid}>
            <Hitss>
              {indices.map(({name, title, hitComp, type}) => {
                return (
                  <Index key={name} indexName={name}>
                    <Results/>
                    <Hits hitComponent={hitComps[hitComp](() => setFocus(false))}/>
                  </Index>
                )
              })}
            </Hitss>
          </HitsWrapper>
        </Slide>
      <Configure hitsPerPage={5}/>
    </InstantSearch>
  )
}
