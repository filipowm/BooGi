import React, { useState } from 'react';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import {
  Header,
  MdxComponents,
  SearchSidebar,
  ScrollTop,
  Sidebar,
  TableOfContents,
  ThemeProvider,
} from '../';

import config from 'config';

const Wrapper = styled('div')`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints['small']}) {
    display: block;
  }
`;

const Content = styled('main')`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  padding: 50px 70px;
  background-color: ${(props) => props.theme.content.background};

  @media only screen and (max-width: 1023px) {
    padding-right: 0;
    padding-left: 0;
    margin: 0 10px;
  }
`;

const Layout = ({ children, location }) => {
  const [showSearch, setShowSearch] = useState(false);
  const themeProviderRef = React.createRef();
  return (
    <ThemeProvider ref={themeProviderRef} darkModeConfig={config.features.darkMode}>
      {config.header.enabled === true ? (
        <>
          <SearchSidebar show={showSearch} setShow={setShowSearch} />
          <Header
            location={location}
            setShowSearch={setShowSearch}
            themeProvider={themeProviderRef}
          />
        </>
      ) : (
        ''
      )}
      <MDXProvider components={MdxComponents}>
        {config.features.scrollTop === true ? <ScrollTop /> : ''}
        <Wrapper>
          {config.sidebar.enabled === true ? (
            <Sidebar location={location} className={'hiddenMobile'} />
          ) : (
            ''
          )}
          <Content id="main-content">{children}</Content>
          <TableOfContents location={location} className={'hiddenMobile hiddenTablet'} />
        </Wrapper>
      </MDXProvider>
    </ThemeProvider>
  );
};

export default Layout;
