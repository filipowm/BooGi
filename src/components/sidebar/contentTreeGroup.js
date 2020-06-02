import React from "react";
import ContentTreeNode from "./contentTreeNode";
import config from "config";
import styled from "@emotion/styled";
import emoji from "node-emoji"

const ContentTreeGroup = styled(({className, treeState, title, icon, location, children}) => {
  children.forEach(item => {
    const alreadyExpanded = treeState.collapsed[item.url] === false;
    const expanded = alreadyExpanded
      || (location.pathname === item.url || location.pathname === (item.url + '/'))
      || (item.children.some((child) => child.url === location.pathname))
      || (config.sidebar.expanded && config.sidebar.expanded.includes(item.url));

    treeState.collapsed[item.url] = !(expanded);
  });
  const toggle = (url) => {
    treeState.setCollapsed({
      ...treeState.collapsed,
      [url]: !treeState.collapsed[url],
    });
  };
  const emojified = emoji.emojify(title, (name) => name)
  return (
    <div className={className}>
      {title ?
        <>
          <span>{icon ? <img src={icon}/> : null} {emojified}</span></>
        : null}
      <ul>
        {children.map((child) => (
          <ContentTreeNode
            key={child.url}
            toggle={toggle}
            collapsed={treeState.collapsed}
            location={location}
            {...child}
          />
        ))}
      </ul>
    </div>

    // {...item}
  )
})`
display: block;
padding: 0;
position: relative;
margin-bottom: 24px;
span {
  padding: 5px 16px;
  font-size: 13px;
  font-family: Content-font, Roboto, sans-serif;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  position: relative;
  color: ${props => props.theme.navigationSidebar.font.header}
}
> span {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  img {
    width: 18px;
    margin-right: 7px;
  }
}
`;

export default ContentTreeGroup;
