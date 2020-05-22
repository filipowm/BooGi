import React from "react";
import {StaticQuery, graphql} from "gatsby";
import styled from "@emotion/styled";
import {AlignRight} from "react-feather";
import config from 'config';
import Scrollspy from 'react-scrollspy'

const Sidebar = styled.aside`
margin-top: 10px;

min-width: 260px;
height: 100vh;
overflow: auto;
padding: 40px 15px 0 5px;
position: sticky;
top: 0;

@media only screen and (max-width: 50rem) {
  width: 100%;
  position: relative;
}

> ul {
  padding-top: 5px;
}

li {
  list-style-type: none;
  a {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    padding: 5px 24px 5px 16px;
    color: ${props => props.theme.tableOfContents.font.base};
    text-decoration: none;
    display: block;
    position: relative;
    border-left: 1px solid rgb(230, 236, 241);
    transition: ${props => props.theme.transitions.hover};
  }

  &:hover {
    a {
      border-left-color: ${props => props.theme.tableOfContents.font.hover};
      color: ${props => props.theme.tableOfContents.font.hover} !important;
    }
  }
}
.currentItem {
  border-left: 2px solid ${props => props.theme.tableOfContents.font.current} !important;
  a{
    color: ${props => props.theme.tableOfContents.font.current} !important;
  }
}
`;

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({className, active, level, ...props}) => {

  return (
    <li className={className}>
      <a href={props.to} {...props} />
    </li>
  );
})`
  a {
    font-weight: ${({level}) => (level === 0 ? 700 : 400)};
    padding-left: ${props => (props.level || 0) * 0.85}rem !important;
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`;

function buildToC(item, items, depth = 1) {
  if (item.items) {
    item.items.forEach((innerItem) => {
      if (depth > config.toc.depth) {
        return;
      }
      const itemId = innerItem.title ? innerItem.title.replace(/\s+/g, '').toLowerCase() : '#';
      let listItem = (
        <ListItem
          key={items.length}
          to={`#${itemId}`}
          level={depth}
        >
          {innerItem.title}
        </ListItem>
      );
      items.push(listItem);
      buildToC(innerItem, items, depth + 1);
    });
  }
}

const TocTitle = styled(({className}) => {
  return (
    <span className={className}><AlignRight size={15}/>Contents</span>
  )
})`
  font-size: 10px;
  line-height: 1;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  padding: 7px 24px 7px 16px;
  border-left: 1px solid ${props => props.theme.tableOfContents.border};
  border-left-color: rgb(230, 236, 241);
  color: ${props => props.theme.tableOfContents.font.base};
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

const TableOfContents = ({className, location, id}) => (
 <StaticQuery
   query={graphql`
     query {
       allMdx {
         edges {
           node {
             fields {
               slug
             }
             tableOfContents
             
            frontmatter {
                skipToC
            }
           }
         }
       }
     }
   `}
    render={({allMdx}) => {
      let finalNavItems;
      if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
        allMdx.edges.forEach((item) => {
          let innerItems = [];
          if (item !== undefined) {
            if (((item.node.fields.slug === location.pathname) || (config.metadata.pathPrefix + item.node.fields.slug) === location.pathname)
            && ! item.node.frontmatter.skipToC) {

              buildToC(item.node.tableOfContents, innerItems);
            }
          }
          if (innerItems.length > 0) {
            finalNavItems = innerItems;
          }
        });
      }
      if (finalNavItems && finalNavItems.length > 0) {
        let ids = finalNavItems.map((item) => {
          return item.props.to.substr(1)
        });

        return (
          <Sidebar className={className}>
            <TocTitle>Contents</TocTitle>
            <Scrollspy items={ids} currentClassName={'currentItem'}>
              {finalNavItems}
            </Scrollspy>
          </Sidebar>
        );
      } else {
        return null;
      }
    }}
  />
);

export default TableOfContents;
