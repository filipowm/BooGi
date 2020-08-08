import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { shadowAround } from '../../styles';
import { useTheme } from 'emotion-theming';
import { Search, Trash } from 'react-feather';
import useDebounce from '../../utils/useDebounce';
import config from 'config';
import { marginLeftRight } from './styles';
import { onMobile } from '../../styles/responsive';

const SearchIcon = styled(Search)`
  width: 1.2em;
  pointer-events: none;
  margin: 0 10px;
`;

const CleanSearch = styled(({ ...props }) => (
  <div {...props} role={'button'} aria-label="clean search">
    <Trash />
  </div>
))`
  cursor: pointer;
  margin: 0 10px;
  svg{
    width: 1.2em;
  }
  &:hover {
    svg {
      stroke: ${(props) => props.theme.colors.primary};
    }
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  transition: ${(props) => props.theme.transitions.hover};
  border-radius: 1px;
  padding-left: 10px;
  background-color: transparent;
  width: calc(100% - 26px);
  border-width: 0 !important;
  &,
  ::placeholder {
    color: ${(props) => props.theme.colors.gray};
  }
`;

const Form = styled.form`
  display: flex;
  margin-top: 12px;
  margin-bottom: 12px;
  flex-direction: row;
  align-items: center;
  ${onMobile} {
    width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  padding: 12px 4px;
  border-radius: 4px;
  background-color: rgba(223,225,235, .4);
  border: 1px solid rgba(223,225,235, 1)
  &, *, input::placeholder, svg {
    transition: ${(props) => props.theme.transitions.hover};
  }
  &:focus, &:visited, &:hover, &:focus-within  {
    outline: none;
    background-color: transparent;
    input, input::placeholder{
      color: ${(props) => props.theme.colors.grayDark};
    }
    svg {
      stroke: ${(props) => props.theme.colors.grayDark};
    }
  }
  
  svg {
    stroke: ${(props) => props.theme.colors.grayLight};
  }
`;

const SidebarSearchInputWrapper = styled.div`
position: sticky;
top: 0;
background: ${(props) => props.theme.colors.background};
width: 100%;
padding: 0 24px;
`;

const SidebarSearchInput = ({ search, inputRef, showClean, ...props }) => (
  <SidebarSearchInputWrapper>
    <SearchInput search={search} inputRef={inputRef} showClean={showClean} {...props} />
  </SidebarSearchInputWrapper>
);

const SearchInput = ({ search, inputRef, showClean, ...props }) => {
  const theme = useTheme();
  const preventSubmit = (e) => {
    e.preventDefault();
  };
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, config.features.search.debounceTime);

  useEffect(() => {
    if (search && debouncedSearchTerm !== null) {
      search(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const clean = (e) => {
    e.preventDefault();
    setSearchTerm('');
    inputRef.current.value = '';
  };

  return (
    <Form css={shadowAround(theme)} onSubmit={preventSubmit}>
      <SearchIcon />
      <Input
        ref={inputRef}
        className={'searchInput '}
        type="text"
        placeholder={config.features.search.placeholder}
        aria-label="Search"
        onChange={(e) => {
          const value = e.target.value;
          if (value && value.length > 0) {
            setSearchTerm(value);
          }
        }}
        {...props}
      />
      {showClean ? <CleanSearch onClick={clean} /> : ''}
    </Form>
  );
};

export { SearchInput, SidebarSearchInput };
