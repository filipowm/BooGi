import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import 'css';
import config from 'config';

import Logo from './logo';
import Navigation from './navigation';
import Sidebar from '../sidebar';
import styled from '@emotion/styled';
import SearchBox from '../search/input';

const isSearchEnabled = config.features.search && config.features.search.enabled;

let searchIndices = [];
if (isSearchEnabled && config.features.search.indexName) {
  searchIndices.push({
    name: `${config.features.search.indexName}`,
    title: `Results`,
    hitComp: `PageHit`,
  });
}

const SearchWrapper = styled.div`
  padding-left: 20px;
  margin-right: 20px;
  flex: 1;
  max-width: 448px;
  min-width: 150px;
  position: relative;
  border-left: 1px solid ${(props) => props.theme.header.border};
  @media (max-width: ${(props) => props.theme.breakpoints['large']}) {
    padding-left: 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints['small']}) {
    padding: 20px 0 0;
    width: calc(100% - 30px);
  }
  a {
    font-weight: 500;
  }
`;

const Header = styled.header`
  background-color: ${(props) => props.theme.header.background};
  border-radius: 0;
  margin-bottom: 0;
  border: 0;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 8px 0 ${(props) => props.theme.header.shadow};
  border-bottom: 1px solid ${(props) => props.theme.header.border};
  z-index: 100;
  padding: 15px 0;
  position: relative;
  @media (max-width: ${(props) => props.theme.breakpoints['large']}) {
    padding: 10px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints['small']}) {
    display: block;
  }
`;

const TopNavigation = styled.div`
  -webkit-transition: top 0.5s, bottom 0.5s;
  transition: top 0.5s, bottom 0.5s;
  margin-left: 70px;
  margin-right: 30px;
  flex: 1 1 auto;
  padding: 10px 0;

  @media (max-width: ${(props) => props.theme.breakpoints['large']}) {
    margin-left: 15px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints['small']}) {
    &.responsive {
      .visibleMobile {
        display: block !important;
      }

      ul {
        display: block;
        text-align: left;
      }
    }
  }
`;

const Index = ({ setShowSearch, location }) => (
  <StaticQuery
    query={graphql`
      query headerTitleQuery {
        site {
          siteMetadata {
            headerTitle
            helpUrl
            logo {
              link
              image
            }
            headerLinks {
              link
              text
              external
            }
          }
        }
      }
    `}
    render={(data) => {
      const {
        site: {
          siteMetadata: { headerTitle, helpUrl, logo, headerLinks },
        },
      } = data;
      const logoLink = logo.link !== '' ? logo.link : '/';
      const logoImg = require('images/logo.svg');
      return (
        <Header>
          <Logo link={logoLink} img={logoImg} title={headerTitle} />

          <TopNavigation id="navbar" className={'topnav'}>
            <div className={'visibleMobile'}>
              <Sidebar location={location} />
              <hr />

              {isSearchEnabled ? (
                <SearchWrapper>
                  <SearchBox />
                </SearchWrapper>
              ) : null}
            </div>
            <Navigation links={headerLinks} helpUrl={helpUrl} />
          </TopNavigation>

          {isSearchEnabled ? (
            <SearchWrapper className={'hiddenMobile'}>
              <SearchBox
                search={() => {
                  console.log('entering search');
                  setShowSearch(true);
                }}
              />
            </SearchWrapper>
          ) : null}
        </Header>
      );
    }}
  />
);

export default Index;
