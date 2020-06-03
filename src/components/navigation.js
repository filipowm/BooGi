import { useStaticQuery, graphql } from 'gatsby';
import config from 'config';

const getNavigationData = () => {
  const { allMdx } = useStaticQuery(graphql`
    query NavigationQuery {
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
  `);
  return allMdx.edges;
};

const getGroup = function (url) {
  return url ? config.sidebar.groups.find((group) => url.startsWith(group.path)) : null;
};

const createUnassignedGroup = () => {
  return {
    title: '',
    icon: null,
    order: 0,
    id: '__root',
    children: [],
  };
};

const calculateTreeDataForData = (contentData) => {
  let navigationItems = contentData
    .map((data) => data.node)
    .map((node) => {
      let parts = node.fields.slug.substr(1).split('/');
      const label = parts.join('');
      parts = parts.splice(0, parts.length - 1);
      let parents = [];
      parts.forEach((part, index) => {
        let v = '/' + part;
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
        type: '',
      };
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

  let result = {
    __root: createUnassignedGroup(),
  };
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
    if (!parent) {
      data.parent = null;
    }
    if (!isChild) {
      // assume first level of navigation entry URL may be ID (path) of a group
      let group = result[data.url.split('/')[1].toLowerCase()];
      if (group == null) {
        group = group ? group : getGroup(data.url);
        if (!group) {
          group = result['__root'];
        } else {
          group = {
            title: group ? group.title : '',
            icon: group ? group.icon : null,
            order: group ? group.order : 0,
            // assume group have 1 level, e.g. /config
            id: group ? group.path.replace(/^\//, '').toLowerCase() : null,
            children: [],
          };
          result[group.id] = group;
        }
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

const calculateNavigation = (edges) => {
  const contentData = config.sidebar.ignoreIndex
    ? edges.filter(
        ({
          node: {
            fields: { slug },
          },
        }) => slug !== '/'
      )
    : edges;
  const data = calculateTreeDataForData(contentData);
  return {
    children: data,
  };
};

function flat(acc, val) {
  const parent = acc.concat(val.children);
  const child = val.children.reduce(flat, [])
  return parent.concat(child);
}

const calculateFlatNavigation = (edges) => {
  const navigation = calculateNavigation(edges);
  return navigation.children.reduce(flat, []);
}

export { getNavigationData, calculateNavigation, calculateFlatNavigation };