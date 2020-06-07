import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { AlignRight } from 'react-feather';
import config from 'config';
import Scrollspy from 'react-scrollspy';
import { sleep } from '../../utils/utils';
import { scrollbar } from '../../styles'

const Sidebar = styled.aside`
  background-color: ${(props) => props.theme.tableOfContents.background};

  min-width: 260px;
  height: 100vh;
  overflow: auto;
  padding: 50px 15px 0 5px;
  position: sticky;
  top: 0;

  @media only screen and (max-width: 50rem) {
    width: 100%;
    position: relative;
  }

  li {
    list-style-type: none;
    a {
      font-size: 12px;
      font-weight: 500;
      line-height: 1.5;
      padding: 5px 24px 5px 16px;
      color: ${(props) => props.theme.tableOfContents.font.base};
      text-decoration: none;
      display: block;
      position: relative;
      border-left: 1px solid ${(props) => props.theme.tableOfContents.border};
      transition: ${(props) => props.theme.transitions.hover};
    }

    &:hover {
      a {
        border-left-color: ${(props) => props.theme.tableOfContents.font.hover};
        color: ${(props) => props.theme.tableOfContents.font.hover} !important;
      }
    }
  }
  .currentItem {
    a {
      border-left: 2px solid ${(props) => props.theme.tableOfContents.font.current} !important;
      color: ${(props) => props.theme.tableOfContents.font.current} !important;
    }
  }
`;

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({ className, active, level, children, ...props }) => {
  return (
    <li className={className}>
      <a href={props.to} {...props}>
        {children}
      </a>
    </li>
  );
})`
  a {
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding-left: ${(props) => (props.level || 0) * 0.85}rem !important;
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`;

const TocTitle = styled(({ className }) => {
  return (
    <span className={className}>
      <AlignRight size={15} />
      Contents
    </span>
  );
})`
  font-size: 10px;
  line-height: 1;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  padding: 7px 24px 7px 16px;
  border-left: 1px solid ${(props) => props.theme.tableOfContents.border};
  color: ${(props) => props.theme.tableOfContents.font.base};
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

const buildToC = (item, items, depth = 1) => {
  if (item.items) {
    item.items.forEach((innerItem) => {
      if (depth > config.features.toc.depth) {
        return;
      }
      const itemId = innerItem.title ? innerItem.title.replace(/\s+/g, '').toLowerCase() : '#';
      let listItem = (
        <ListItem key={items.length} to={`#${itemId}`} level={depth}>
          {innerItem.title}
        </ListItem>
      );
      items.push(listItem);
      buildToC(innerItem, items, depth + 1);
    });
  }
};

const generateToCItems = (allMdx, location) => {
  let finalNavItems = [];
  if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
    allMdx.edges.forEach((item) => {
      let innerItems = [];
      if (item !== undefined) {
        if (
          (item.node.fields.slug === location.pathname ||
            config.metadata.pathPrefix + item.node.fields.slug === location.pathname) &&
          !item.node.frontmatter.skipToC
        ) {
          buildToC(item.node.tableOfContents, innerItems);
        }
      }
      if (innerItems.length > 0) {
        finalNavItems = innerItems;
      }
    });
  }
  return finalNavItems;
};

const tocItemsEqual = (items, targetItems) => {
  if (items === targetItems) return true;
  if (items == null || targetItems == null) return false;
  if (items.length != targetItems.length) return false;

  for (var i = 0; i < items.length; ++i) {
    let target = targetItems[i];
    if (targetItems[i]) {
      target = target.id;
    }
    if (items[i] !== target) return false;
  }
  return true;
};

const TableOfContents = ({ className, location }) => (
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
    render={({ allMdx }) => {
      const finalNavItems = generateToCItems(allMdx, location);
      if (finalNavItems.length > 0) {
        let ids = finalNavItems.map((item) => {
          return item.props.to.substr(1);
        });
        const scrollspyRef = React.createRef();
        const refresh = () => {
          // This function is a workaround for a problem when scrollspy items get updated.
          // In such case props are updated properly, but state is kept stale causing
          // scrollspy to not follow content properly. To fix it, we need to manually
          // trigger scrollspy reinitialization when its props change.
          if (
            scrollspyRef.current &&
            !tocItemsEqual(scrollspyRef.current.props.items, scrollspyRef.current.state.targetItems)
          ) {
            sleep(200).then(() => {
              if (scrollspyRef.current) {
                scrollspyRef.current._initFromProps();
              } else {
                refresh();
              }
            });
          }
        };
        return (
          <Sidebar className={className} css={scrollbar}>
            <TocTitle>Contents</TocTitle>
            <Scrollspy
              ref={scrollspyRef}
              onUpdate={refresh}
              items={ids}
              currentClassName={'currentItem'}
            >
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
