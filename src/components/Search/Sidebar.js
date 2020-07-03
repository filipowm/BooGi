/* eslint-disable react/display-name */
import styled from '@emotion/styled';
import React, { useRef } from 'react';
import config from 'config';
import VisibilitySensor from 'react-visibility-sensor';

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
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
`;

import Algolia from './algolia/index';

const Search = React.forwardRef(({ onVisibleChange, ...props }, ref) => {
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const onVisibilityChange = (isVisible) => {
    searchRef.current.setState({ ready: isVisible });
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
        <VisibilitySensor onChange={onVisibilityChange}>
          <Algolia ref={searchRef} inputRef={inputRef} index={config.features.search.indexName} />
        </VisibilitySensor>
      </SearchWrapper>
    </SearchSidebar>
  );
});

export default Search;
