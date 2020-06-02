import React, {useState} from "react";
import config from "config";
import ContentTreeGroup from "./contentTreeGroup";


const getGroup = function(url) {
  return url ? config.sidebar.groups.find((group) => url.startsWith(group.path)) : null;
};

const calculateTreeDataForData = contentData => {
  let navigationItems = contentData
    .map((data) => data.node)
    .map((node) => {
      let parts = node.fields.slug.substr(1).split('/');
      const label = parts.join('');
      parts = parts.splice(0, parts.length - 1);
      let parents = [];
      parts.forEach((part, index) => {
        let v = "/" + part;
        if (parents[index - 1]) {
          v = parents[index - 1] + v;
        }
        parents.push(v);
      });
      return {
        parent: parents.reverse(),
        label: label,
        url: node.fields.slug,
        children: [],
        title: node.fields.title,
        order: node.frontmatter.order,
        type: ""
      }
    });

  navigationItems.sort(function (a, b) {
    let aIdx = config.sidebar.forcedNavOrder.indexOf(a.url);
    let bIdx = config.sidebar.forcedNavOrder.indexOf(b.url);
    const forcedOrder = aIdx - bIdx;
    if (forcedOrder !== 0) {
      return forcedOrder;
    }
    const frontOrder = a.order - b.order;
    return frontOrder !== 0 ? frontOrder : a.label.localeCompare(b.label);
  });
  let result = {};
  navigationItems.forEach((data) => {
    let isChild = false;
    let parent = null;
    data.parent.every((p) => {
      parent = navigationItems.find((d) => d.url === p);
      if (parent) {
        parent.children.push(data);
        isChild = true;
        data.parent = parent.url;
        return false;
      }
      return true;
    });
    if (! parent) {
      data.parent = null;
    }
    if (! isChild) {
      // assume first level of navigation entry URL may be ID (path) of a group
      let group = result[data.url.split('/')[1].toLowerCase()];
      if (group == null) {
        group = group ? group : getGroup(data.url);
        group = {
          title: group ? group.title : "",
          icon: group ? group.icon : null,
          order: group ? group.order : 0,
          // assume group have 1 level, e.g. /config
          id: group ? group.path.replace(/^\//, "").toLowerCase() : null,
          children: []
        };
        result[group.id] = group;
      }
      group.children.push(data);
    }
  });
  result = Object.values(result);
  result.sort(function (a, b) {
    const ordered = a.order - b.order;
    return ordered != 0 ? ordered : a.title.localeCompare(b.title);
  });
  return result;
};


const calculateTreeData = edges => {
  const contentData = config.sidebar.ignoreIndex ? edges.filter(({node: {fields: {slug}}}) => slug !== '/') : edges;
  const data = calculateTreeDataForData(contentData);
  return {
    children: data
  };
};

const ContentTree = ({edges, location}) => {
  const [treeData] = useState(() => {
    return calculateTreeData(edges);
  });
  const [collapsed, setCollapsed] = useState({});
  return (
    <>
      {treeData.children.map((group) => {
        const key = group.path ? group.path : Math.random().toString(36).substring(2);
        return (
          <ContentTreeGroup
            treeState={{collapsed: collapsed, setCollapsed: setCollapsed}}
            key={key}
            location={location}
            {...group}
          />
        )
      })}
    </>
  )
};

export default ContentTree;
