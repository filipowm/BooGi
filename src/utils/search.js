const query = (excerptSize) => `{
    pages: allMdx(filter: {fields: {draft: {ne: true}}}) {
      edges {
        node {
          objectID: id
          fields {
            slug
          }
          frontmatter {
            title
            description
          }
          excerpt(pruneLength: ${excerptSize})
        }
      }
    }
  }`;

const flatten = (arr) =>
  arr.map(({ node: { frontmatter, fields, ...rest } }) => ({
    ...frontmatter,
    ...fields,
    ...rest,
  }));

const transformer = ({ data }) => flatten(data.pages.edges);

const algolia = (indexName, excerptSize) => {
  const settings = { attributesToSnippet: [`excerpt:20`] };
  return [
    {
      query: query(excerptSize),
      transformer: transformer,
      indexName: indexName,
      settings,
    },
  ];
};

const localsearch = (excerptSize) => ({
  query: query(excerptSize),
  normalizer: transformer,
  name: 'Boogi',
  ref: 'objectID',
  index: ['title', 'description', 'excerpt'],
  store: ['slug', 'title', 'excerpt'],
});

const disableLocalSearchPlugin = {
  resolve: require.resolve(`../../plugins/gatsby-plugin-disable-localsearch`),
  options: {
    name: 'Boogi',
  },
};

const buildAlgoliaPluginConfig = (searchConfig) => {
  if (searchConfig.algoliaAppId && searchConfig.algoliaAdminKey) {
    return [
      {
        resolve: `gatsby-plugin-algolia`,
        options: {
          appId: searchConfig.algoliaAppId, // algolia application id
          apiKey: searchConfig.algoliaAdminKey, // algolia admin key to index
          queries: algolia(searchConfig.indexName, searchConfig.excerptSize),
          chunkSize: 10000, // default: 1000
        },
      },
      disableLocalSearchPlugin,
    ];
  }
  console.warn('Algolia App ID or Admin Key are not set!');
  return [disableLocalSearchPlugin];
};

const buildLocalsearchPluginConfig = (searchConfig) => {
  const conf = localsearch(searchConfig.excerptSize);
  return [
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        engine: 'flexsearch',
        engineOptions: searchConfig.localSearchEngine,
        ...conf,
      },
    },
  ];
};

module.exports.getSearchPlugins = (searchConfig) => {
  if (!searchConfig || searchConfig.enabled !== true) {
    return [disableLocalSearchPlugin];
  }
  switch (searchConfig.engine.toLowerCase()) {
    case 'localsearch':
      return buildLocalsearchPluginConfig(searchConfig);
    case 'algolia':
      return buildAlgoliaPluginConfig(searchConfig);
    default:
      console.warn(`Unsupported search engine: ${searchConfig.engine}`);
  }
  return [disableLocalSearchPlugin];
};
