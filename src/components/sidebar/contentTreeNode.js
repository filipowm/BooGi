import React from 'react';
import OpenedSvg from '../../images/opened';
import ClosedSvg from '../../images/closed';
import config from 'config';
import Link from '../link';
import { css } from '@emotion/core';

import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import emoji from 'node-emoji';

// If you want to have a css call based on props, create a function that returns a css call like this
// let dynamicStyle = (props) => css`color: ${props.color}`
// It can be called directly with props or interpolated in a styled call like this
// let SomeComponent = styled('div')`${dynamicStyle}`

const activeNode = (theme) => css`
  border: 1px solid ${theme.navigationSidebar.row.activeBorder};
  border-right: none;
  > a,
  button {
    padding: 7px 23px 7px 17px;
    background-color: ${theme.navigationSidebar.row.active};
    color: ${theme.navigationSidebar.font.active} !important;
  }
`;

const ContentLink = styled(({ className, link, children }) => (
  <Link to={link} className={className}>
    {children}
  </Link>
))`
  color: ${(props) => props.theme.navigationSidebar.font.base};
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  padding: 8px 24px 8px 18px;
  border-radius: 1px;
`;

const NodeContent = styled(({ className, text, link, children }) => (
  <li className={className}>
    {text && <ContentLink link={link}>{text}</ContentLink>}
    {children}
  </li>
))`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  align-content: stretch;
  justify-content: space-between;
  > a,
  > button {
    transition: ${(props) => props.theme.transitions.hover};
  }
  &:hover {
    > a,
    > button {
      background-color: ${(props) => props.theme.navigationSidebar.row.hover};
    }
  }
`;

const NestedContentTreeNode = styled(
  ({ className, location, children, setCollapsed, collapsed }) => (
    //<Slide top>
    <ul className={className}>
      {children.map((item) => (
        <ContentTreeNode
          key={item.url}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
          location={location}
          {...item}
        />
      ))}
    </ul>
  )
  //</Slide>
)`
  flex: 100%;
  li {
    margin-left: 16px;
    border-left: 1px solid ${(props) => props.theme.navigationSidebar.font.nested};
    a {
      color: ${(props) => props.theme.navigationSidebar.font.nested};
    }
  }
`;

const NodeCollapseButton = styled(({ className, isCollapsed, collapse }) => {
  return (
    <button onClick={collapse} aria-label="collapse" className={className}>
      {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
    </button>
  );
})`
  background: transparent;
  border: none;
  outline: none;
  z-index: 10;
  cursor: pointer;
  padding: 0 25px 0 10px;
  svg path {
    fill: ${(props) => props.theme.navigationSidebar.font.base};
  }
  &:hover {
    svg path {
      fill: ${(props) => props.theme.navigationSidebar.row.collapseHover};
    }
  }
`;
// key pass:XNLxUeb7Z6XjzfP7

const ContentTreeNode = ({ className, toggle, collapsed, url, title, location, children }) => {
  const hasChildren = children.length !== 0;
  const active =
    location &&
    (location.pathname === url ||
      location.pathname === url + '/' ||
      location.pathname === config.metadata.pathPrefix + url);
  const collapse = () => {
    toggle(url);
  };
  const theme = useTheme();
  let isCollapsed = collapsed[url];
  const text = emoji.emojify(title, (name) => name);
  return (
    <>
      <NodeContent
        text={text}
        link={url}
        className={className}
        css={active ? activeNode(theme) : ''}
      >
        {title && hasChildren ? (
          <>
            <NodeCollapseButton isCollapsed={isCollapsed} collapse={collapse} />
          </>
        ) : null}
      </NodeContent>

      {!isCollapsed ? (
        <NestedContentTreeNode collapsed={collapsed} location={location} setCollapsed={toggle}>
          {children}
        </NestedContentTreeNode>
      ) : null}
    </>
  );
};
export default ContentTreeNode;
