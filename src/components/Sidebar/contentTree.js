import React, { useState } from 'react';
import ContentTreeGroup from './contentTreeGroup';
import { calculateNavigation } from '../';

const ContentTree = ({ edges, location }) => {
  const [treeData] = useState(() => calculateNavigation(edges));
  const [collapsed, setCollapsed] = useState({});
  return (
    <>
      {treeData.children.map((group) => {
        const key = group.path ? group.path : Math.random().toString(36).substring(2);
        return (
          <ContentTreeGroup
            treeState={{ collapsed: collapsed, setCollapsed: setCollapsed }}
            key={key}
            location={location}
            {...group}
          />
        );
      })}
    </>
  );
};

export default ContentTree;
