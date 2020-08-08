/* eslint-disable react/display-name */
import styled from '@emotion/styled';
import React, { useRef } from 'react';
import config from 'config';
import VisibilitySensor from 'react-visibility-sensor';
import { X } from 'react-feather';
import loadable from '@loadable/component';

import { onMobile } from '../../styles/responsive';
import { visibleMobile, shadowAround } from '../../styles';

const Algolia = loadable(() => import('./algolia/'))
const LocalSearch = loadable(() => import('./localsearch/'))

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

const SearchSidebar = styled.div`
  display: block; //${(props) => (props.show ? 'block' : 'none')};
  z-index: 20;
  height: 100vh;
  position: fixed;
  right: 0;
  left: auto;
  top: 0;
  width: 480px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3);
  background: ${(props) => props.theme.colors.background};
  ${onMobile} {
    width: 100%;
  }
`;
const CloseSearch = styled.div`
padding: 14px;
margin-bottom: 14px;
width: 100%;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
box-shadow: 0 3px 8px 0 ${(props) => props.theme.colors.shadow};
border-bottom: 1px solid ${(props) => props.theme.colors.border};
svg {
  width: 1.2em;
}
&:hover {
  color: ${(props) => props.theme.colors.hover};
  svg {
    stroke: ${(props) => props.theme.colors.hover};
  }
}
`;

const SearchEngine = React.forwardRef((props, ref) => {
  const engine = config.features.search.engine.toLowerCase();
  switch(engine) {
    case 'algolia':
      return <Algolia inputRef={ref} index={config.features.search.indexName} />
    case 'localsearch':
      return <LocalSearch inputRef={ref} />
  }
  console.warn(`Unsupported search engine: ${engine}`);
  return null;
});

const Search = React.forwardRef(({ onVisibleChange, closeSelf, ...props }, ref) => {
  const inputRef = useRef(null);
  const onVisibilityChange = (isVisible) => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
    if (onVisibleChange) {
      onVisibleChange(isVisible);
    }
  };
  return (
    <SearchSidebar {...props} ref={ref}>
      <SearchWrapper {...props}>
        <CloseSearch css={visibleMobile} onClick={closeSelf}>
          <X />
          <span css={{marginLeft: '5px'}}>Close</span>
        </CloseSearch>
        <VisibilitySensor onChange={onVisibilityChange}>
          <SearchEngine ref={inputRef} />
        </VisibilitySensor>
      </SearchWrapper>
    </SearchSidebar>
  );
});

export default Search;
