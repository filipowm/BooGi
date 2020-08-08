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

module.exports.algolia = (indexName, excerptSize) => {
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

module.exports.localsearch = (excerptSize) => ({
    query: query(excerptSize),
    normalizer: transformer,
    name: 'Boogi',
    ref: 'objectID',
    index: ['title', 'description', 'excerpt'],
    store: ['slug', 'title', 'excerpt']
})
