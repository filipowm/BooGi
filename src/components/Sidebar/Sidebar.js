import React from 'react';
import styled from '@emotion/styled';
import config from 'config';
import ContentTree from './contentTree';
import Links from './links';
import PoweredBy from './poweredBy';
import { getNavigationData } from '../Navigation';
import { scrollbar } from '../../styles';

const Sidebar = styled.div`
  margin-left: ${(props) => props.theme.layout.leftMargin};
  height: 100%;
  display: flex;
  overflow-y: hidden;
  align-items: stretch;
  flex-direction: column;
`;

const SidebarMain = styled.div`
  overflow-y: auto;
  width: 100%;
  margin: 0;
  display: block;
  padding: 0;
  padding-top: 32px;
  overflow: hidden;
  -webkit-overflow-scrolling: hidden;
  &:hover,
  &:focus {
    overflow-y: overlay;
    -webkit-overflow-scrolling: touch;
  }
`;

const PoweredByWrapper = styled.div`
  display: block;
  padding: 0;
  position: relative;
  box-shadow: 0 -7px 10px -5px ${(props) => props.theme.navigationSidebar.backgroundPrimary};
`;

const NavigationWrapper = styled(({ className, children, ...props }) => {
  return (
    <aside className={className} {...props}>
      <Sidebar>{children}</Sidebar>
    </aside>
  );
})`
  height: 100vh;
  top: 0;
  flex: 0 0 ${(props) => props.theme.layout.leftWidth};
  background: ${(props) => props.theme.navigationSidebar.backgroundPrimary};
  background: linear-gradient(
    ${(props) => props.theme.navigationSidebar.backgroundPrimary},
    ${(props) => props.theme.navigationSidebar.backgroundSecondary}
  );
  /* Safari 4-5, Chrome 1-9 */
  background: linear-gradient(
    ${(props) => props.theme.navigationSidebar.backgroundPrimary},
    ${(props) => props.theme.navigationSidebar.backgroundSecondary}
  );
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(${(props) => props.theme.navigationSidebar.backgroundPrimary}),
    to(${(props) => props.theme.navigationSidebar.backgroundSecondary})
  );
  /* Safari 5.1, Chrome 10+ */
  background: -webkit-linear-gradient(
    top,
    ${(props) => props.theme.navigationSidebar.backgroundPrimary},
    ${(props) => props.theme.navigationSidebar.backgroundSecondary}
  );
  /* Firefox 3.6+ */
  background: -moz-linear-gradient(
    top,
    ${(props) => props.theme.navigationSidebar.backgroundPrimary},
    ${(props) => props.theme.navigationSidebar.backgroundSecondary}
  );
  /* IE 10 */
  background: -ms-linear-gradient(
    top,
    ${(props) => props.theme.navigationSidebar.backgroundPrimary},
    ${(props) => props.theme.navigationSidebar.backgroundSecondary}
  );
  /* Opera 11.10+ */
  background: -o-linear-gradient(
    top,
    ${(props) => props.theme.navigationSidebar.backgroundPrimary},
    ${(props) => props.theme.navigationSidebar.backgroundSecondary}
  );
  border-right: 1px solid ${(props) => props.theme.navigationSidebar.border};
  position: sticky;
  @media (max-width: ${(props) => props.theme.breakpoints['small']}) {
    width: 100%;
    height: auto;
    background: ${(props) => props.theme.navigationSidebar.backgroundPrimary};
  }
`;

const Divider = styled((props) => (
  <div {...props}>
    <hr />
  </div>
))`
  padding: 0.5rem 0;
  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid ${(props) => props.theme.navigationSidebar.border};
  }
`;
const ContentNavigation = ({ className, location }) => {
  const edges = getNavigationData();
  return (
    <NavigationWrapper className={className}>
      <SidebarMain css={scrollbar}>
        <ContentTree edges={edges} location={location} />
        {config.sidebar.links && config.sidebar.links.length > 0 ? (
          <>
            <Divider />
            <Links links={config.sidebar.links} />
          </>
        ) : null}
      </SidebarMain>
      {config.sidebar.poweredBy && config.sidebar.poweredBy.name ? (
        <>
          <PoweredByWrapper>
            <PoweredBy
              trademark={config.sidebar.poweredBy.trademark}
              name={config.sidebar.poweredBy.name}
              link={config.sidebar.poweredBy.link}
            />
          </PoweredByWrapper>
        </>
      ) : null}
    </NavigationWrapper>
  );
};

export default ContentNavigation;
