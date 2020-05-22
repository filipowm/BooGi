import React from "react";
import styled from "@emotion/styled";
import {graphql, StaticQuery} from "gatsby";
import config from "../../../config";
import ContentTree from "./contentTree";
import Links from "./links"
import PoweredBy from "./poweredBy";

const Sidebar = styled.div`
margin-left: ${props => props.theme.layout.leftMargin};
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
overflow-x: hidden;
overflow-y: overlay;
-webkit-overflow-scrolling: touch;
`;

const PoweredByWrapper = styled.div`
display: block;
padding: 0;
position: relative;
box-shadow: 0 -7px 10px -5px ${props => props.theme.navigationSidebar.backgroundDark};
`;

const NavigationWrapper = styled(({className, children, ...props}) => {
  return (
    <aside className={className}>
      <Sidebar>
        {children}
      </Sidebar>
    </aside>
  )
})`
height: 100vh;
top: 0;
z-index: 15;
flex: 0 0 ${props => props.theme.layout.leftWidth};
background: ${props => props.theme.navigationSidebar.backgroundDark};
background: linear-gradient(${props => props.theme.navigationSidebar.backgroundDark}, ${props => props.theme.navigationSidebar.backgroundLight});
/* Safari 4-5, Chrome 1-9 */
background: linear-gradient(${props => props.theme.navigationSidebar.backgroundDark}, ${props => props.theme.navigationSidebar.backgroundLight});
background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(${props => props.theme.navigationSidebar.backgroundDark}), to(${props => props.theme.navigationSidebar.backgroundLight}));
/* Safari 5.1, Chrome 10+ */
background: -webkit-linear-gradient(top, ${props => props.theme.navigationSidebar.backgroundDark}, ${props => props.theme.navigationSidebar.backgroundLight});
/* Firefox 3.6+ */
background: -moz-linear-gradient(top, ${props => props.theme.navigationSidebar.backgroundDark}, ${props => props.theme.navigationSidebar.backgroundLight});
/* IE 10 */
background: -ms-linear-gradient(top, ${props => props.theme.navigationSidebar.backgroundDark}, ${props => props.theme.navigationSidebar.backgroundLight});
/* Opera 11.10+ */
background: -o-linear-gradient(top, ${props => props.theme.navigationSidebar.backgroundDark}, ${props => props.theme.navigationSidebar.backgroundLight});
border-right: 1px solid ${props => props.theme.navigationSidebar.border};
position: sticky;
@media(max-width: ${props => props.theme.breakpoints['small']}) {
  width: 100%;
  height: auto;
  background: ${props => props.theme.navigationSidebar.backgroundDark};
}
`;

const Divider = styled(props => (
  <div {...props}>
    <hr/>
  </div>
))`
padding: 0.5rem 0;
hr {
  margin: 0;
  padding: 0;
  border: 0;
  border-bottom: 1px solid #ede7f3;
}
`;
const ContentNavigation = ({className, location}) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
              }
              frontmatter {
                order
              }
            }
          }
        }
      }
    `}
    render={({allMdx}) => {

      return (
        <NavigationWrapper className={className}>
          <SidebarMain>
            <ContentTree
              edges={allMdx.edges}
              location={location}
            />
            {config.sidebar.links && config.sidebar.links.length > 0 ?
              (
                <>
                  <Divider/>
                  <Links links={config.sidebar.links}/>
                </>
              )
              : null}
          </SidebarMain>
          {config.sidebar.poweredBy && config.sidebar.poweredBy.name ?
            (
              <>
              <PoweredByWrapper>
                <PoweredBy trademark={config.sidebar.poweredBy.trademark}
                           name={config.sidebar.poweredBy.name}
                           link={config.sidebar.poweredBy.link}/>
              </PoweredByWrapper>
              </>
            )
            : null}
        </NavigationWrapper>
      );
    }}
  />
);


export default ContentNavigation;
