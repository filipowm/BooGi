import React, { useState, useEffect } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import 'css';
import config from 'config';
import Logo from './logo';
import Navigation from './navigation';
import { ButtonIcon, DarkModeSwitch, SearchInput, Sidebar } from '../';
import { HelpCircle, Search } from 'react-feather';
import { useTheme } from 'emotion-theming';

const SearchIcon = styled(Search)`
  width: 1.2em;
  pointer-events: cursor;
  margin: 0 10px;
`;

const isSearchEnabled = config.features.search && config.features.search.enabled;

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

const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.header.background};
  border-radius: 0;
  margin-bottom: 0;
  border: 0;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 8px 0 ${(props) => props.theme.header.shadow};
  border-bottom: 1px solid ${(props) => props.theme.header.border};
  z-index: 100;
  padding: 13px 0;
  position: relative;
  @media (max-width: ${(props) => props.theme.breakpoints['large']}) {
    padding: 10px;
  }
  @media (max-width: ${(props) => props.theme.breakpoints['small']}) {
    display: block;
  }
  div:last-child {
    margin-right: 25px;
  }
`;

const TopNavigation = styled.div`
  -webkit-transition: top 0.5s, bottom 0.5s;
  transition: top 0.5s, bottom 0.5s;
  margin-left: 55px;
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

const SearchOpener = ({ open }) => {
  const theme = useTheme();
  const method = config.features.search.startComponent;
  let opener = <div></div>;
  switch (method.toLowerCase()) {
    case 'input':
      opener = (
        <SearchWrapper className={'hiddenMobile'}>
          <SearchInput onChange={(e) => (e.target.value = '')} onFocus={open} />
        </SearchWrapper>
      );
      break;
    case 'icon':
      opener = (
        <ButtonIcon
          background={theme.darkModeSwitch.background}
          hoverStroke={theme.darkModeSwitch.hover}
          fill={'transparent'}
          stroke={theme.darkModeSwitch.stroke}
          icon={Search}
          onClick={open}
        />
      );
      break;
    default:
      console.error(`Provided show component '${method}' is not supported. Use 'icon' or 'input'.`);
      opener = <div></div>;
  }
  return opener;
};

const HelpButton = ({ helpUrl, ...props }) => {
  const theme = useTheme();
  const open = () => {
    const help = window.open(helpUrl, '_blank');
    help.focus();
  }
  return (
    <ButtonIcon hoverStroke={theme.darkModeSwitch.hover}
                stroke={theme.darkModeSwitch.stroke}
                icon={HelpCircle} 
                onClick={open}
                {...props} />
  );
};

const Header = ({ setShowSearch, location, themeProvider }) => (
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
      const [darkMode, setDarkMode] = useState(false);
      useEffect(() => {
        setDarkMode(themeProvider.current.retrieveActiveTheme());
      });

      const open = () => {
        setShowSearch(true);
      };
      return (
        <HeaderWrapper>
          <Logo link={logoLink} img={logoImg} title={headerTitle} />

          <TopNavigation id="navbar" className={'topnav'}>
            <div className={'visibleMobile'}>
              <Sidebar location={location} />
              <hr />

              {isSearchEnabled ? <SearchOpener open={open} /> : null}
            </div>
            <Navigation links={headerLinks} />
          </TopNavigation>

          {isSearchEnabled ? <SearchOpener open={open} /> : null}
          {helpUrl && helpUrl.length > 0 ? (
            <HelpButton helpUrl={helpUrl} />
          ) : ''}
          {config.features.darkMode.enabled ? (
            <DarkModeSwitch
              css={{ flex: '0' }}
              isDarkThemeActive={darkMode}
              toggleActiveTheme={() => {
                setDarkMode(themeProvider.current.toggleActiveTheme());
              }}
            />
          ) : (
            ''
          )}
        </HeaderWrapper>
      );
    }}
  />
);

export default Header;
