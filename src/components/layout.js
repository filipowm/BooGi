import React, { useState } from 'react';
import styled from '@emotion/styled';
import { MDXProvider } from '@mdx-js/react';
import ThemeProvider from './themeProvider';
import mdxComponents from './mdxComponents';
import ContentNavigation from './sidebar';
import ToC from './tableOfContents';
import ScrollTop from './scrollTop';
import Header from './header';
import SearchSidebar from './search/sidebar';

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

  @media only screen and (max-width: 1023px) {
    padding-right: 0;
    padding-left: 0;
    margin: 0 10px;
  }
`;

const Layout = ({ children, location }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <ThemeProvider>
      <SearchSidebar show={showSearch} setShow={setShowSearch} />
      <Header location={location} setShowSearch={setShowSearch} />
      <MDXProvider components={mdxComponents}>
        <ScrollTop />
        <Wrapper>
          <ContentNavigation location={location} className={'hiddenMobile'} />
          <Content id="main-content">{children}</Content>
          <ToC location={location} className={'hiddenMobile hiddenTablet'} />
        </Wrapper>
      </MDXProvider>
    </ThemeProvider>
  );
};

export default Layout;
