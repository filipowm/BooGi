import React, { useState, useEffect } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import config from 'config';
import Logo from './logo';
import Navigation from './navigation';
import { ButtonIcon, DarkModeSwitch, SearchInput, Sidebar } from '../';
import { HelpCircle, Menu, Search } from 'react-feather';
import { useTheme } from 'emotion-theming';
import SocialButtons from './social';
import { Rss } from '../Buttons';
import { globalHistory } from '@reach/router';
import { hiddenMobile, visibleMobile, visibleTablet, hiddenTablet } from '../../styles';
import { onMobile, onTablet, isMobile } from '../../styles/responsive';
import { FullScreenClose, FullScreenEnter, FullScreenHeader } from './fullscreen';

const isSearchEnabled = config.features.search && config.features.search.enabled;

const SearchWrapper = styled.div`
  padding-left: 20px;
  flex: 1 1 auto;
  position: relative;
  min-width: 290px;
  border-left: 1px solid ${(props) => props.theme.header.border};
  ${onTablet} {
    padding-left: 0;
  }
  ${onMobile} {
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
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: center;
  box-shadow: 0 3px 8px 0 ${(props) => props.theme.header.shadow};
  border-bottom: 1px solid ${(props) => props.theme.header.border};
  padding: 13px 0;
  position: relative;
  overflow: hidden;
  z-index: 1;
  ${onTablet} {
    padding: 10px;
  }
  ${onMobile} {
    flex-wrap: wrap;
  }
`;

const TopNavigation = styled.div`
  -webkit-transition: top 0.5s, bottom 0.5s;
  transition: top 0.5s, bottom 0.5s;
  margin-left: 55px;
  margin-right: 30px;
  flex: 1 1 auto;
  padding: 10px 0;
  ${onTablet} {
    margin-left: 15px;
  }
  ${onMobile} {
    &.responsive {
      .visibleMobile {
        display: block;
      }

      ul {
        display: block;
        text-align: left;
      }
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex: auto;
  justify-content: flex-end;
  align-items: center;
  min-width: 458px;
  margin-right: 25px;
  ${onTablet} {
    margin-right: 10px !important;
    min-width: auto;
  }
  a,
  > div {
    margin: 0 6px;
  }
`;

const SearchOpener = ({ open, forcedComponent, ...props }) => {
  const theme = useTheme();
  const method = forcedComponent || config.features.search.startComponent;
  let opener = <div></div>;
  switch (method.toLowerCase()) {
    case 'input':
      opener = (
        <SearchWrapper css={hiddenMobile} style={{ marginRight: '20px' }} {...props}>
          <SearchInput onChange={(e) => (e.target.value = '')} onFocus={open} />
        </SearchWrapper>
      );
      break;
    case 'icon':
      opener = (
        <ButtonIcon
          background={theme.header.icons.background}
          hoverStroke={theme.header.icons.hover}
          fill={'transparent'}
          stroke={theme.header.icons.stroke}
          icon={Search}
          onClick={open}
          {...props}
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
  };
  return (
    <ButtonIcon
      hoverStroke={theme.header.icons.hover}
      stroke={theme.header.icons.stroke}
      icon={HelpCircle}
      onClick={open}
      {...props}
    />
  );
};

const RssIcon = (iconBaseProps) => {
  if (config.features.rss && config.features.rss.enabled && config.features.rss.showIcon) {
    return (
      <Rss
        className={hiddenMobile}
        {...iconBaseProps}
        link={config.features.rss.outputPath}
        title={'RSS feed'}
      />
    );
  }
  return null;
};

const MobileNavigation = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')} !important;
  flex-basis: 100%;
  flex-direction: column;
`;

const MobileMenuToggle = styled(({ open, toggle, className, ...props }) => {
  const theme = useTheme();
  return (
    <div className={className} {...props}>
      <ButtonIcon
        title={'Open menu'}
        background={theme.header.icons.background}
        hoverStroke={theme.header.icons.hover}
        fill={'transparent'}
        stroke={open === true ? theme.header.icons.hover : theme.header.icons.stroke}
        icon={Menu}
        onClick={toggle}
        {...props}
      />
    </div>
  );
})`
  display: none;
  ${onMobile} {
    display: flex;
  }
`;

const SocialButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  margin: 0 6px;
  ${onTablet} {
    justify-content: space-evenly;
    margin-top: 10px;
  }
`;

const Header = ({ setShowSearch, location, themeProvider, show, toggleFullscreenMode }) => (
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
      const [menuOpen, setMenuOpen] = useState(false);

      const theme = useTheme();
      const iconBaseProps = {
        background: theme.header.icons.background,
        hoverStroke: theme.header.icons.hover,
        stroke: theme.header.icons.stroke,
      };
      const DarkModeButton = config.features.darkMode.enabled ? (
        <DarkModeSwitch
          {...iconBaseProps}
          hoverFill={theme.header.icons.hover}
          fill={theme.header.icons.fill}
          isDarkThemeActive={darkMode}
          toggleActiveTheme={() => {
            setDarkMode(themeProvider.current.toggleActiveTheme());
          }}
        />
      ) : (
        ''
      );
      const toggleMenuOpen = () => setMenuOpen(!menuOpen);
      globalHistory.listen((location) => {
        setMenuOpen(false);
        setShowSearch(false);
      });
      return (
        <>
          {config.features.fullScreenMode.enabled &&
          config.features.fullScreenMode.enabled === true ? (
            <FullScreenHeader show={!show} css={hiddenMobile}>
              <FullScreenClose toggle={toggleFullscreenMode} />
              {DarkModeButton}
            </FullScreenHeader>
          ) : (
            ''
          )}
          <HeaderWrapper show={show}>
            <Logo link={logoLink} img={logoImg} title={headerTitle} />
            <TopNavigation css={hiddenMobile}>
              <Navigation links={headerLinks} />
            </TopNavigation>
            <ButtonsWrapper>
              {isSearchEnabled ? (
                <>
                  <SearchOpener open={open} forcedComponent={'icon'} css={visibleTablet} />
                  <SearchOpener open={open} css={hiddenTablet} />
                </>
              ) : null}
              {helpUrl && helpUrl.length > 0 ? (
                <HelpButton css={hiddenMobile} helpUrl={helpUrl} />
              ) : (
                ''
              )}
              <SocialButtonsWrapper css={hiddenMobile}>
                {SocialButtons(iconBaseProps, config.social)}
              </SocialButtonsWrapper>
              <RssIcon {...iconBaseProps} />
              {config.features.fullScreenMode.enabled &&
              config.features.fullScreenMode.enabled === true ? (
                <FullScreenEnter toggle={toggleFullscreenMode} css={hiddenMobile} />
              ) : (
                ''
              )}
              {DarkModeButton}
              <MobileMenuToggle toggle={toggleMenuOpen} open={menuOpen} />
            </ButtonsWrapper>

            {isMobile() ? (
              <MobileNavigation css={visibleMobile} show={menuOpen}>
                <Sidebar location={location} show={true} />

                <Navigation links={headerLinks} />

                <SocialButtonsWrapper css={visibleMobile}>
                  {SocialButtons(iconBaseProps, config.social)}
                </SocialButtonsWrapper>
              </MobileNavigation>
            ) : (
              ''
            )}
          </HeaderWrapper>
        </>
      );
    }}
  />
);

export default Header;
