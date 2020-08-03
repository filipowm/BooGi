module.exports = (indexName, excerptSize) => {
  const pageQuery = `{
    pages: allMdx {
      edges {
        node {
          objectID: id
          fields {
            slug
          }
          headings {
            value
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

  const settings = { attributesToSnippet: [`excerpt:20`] };

  return [
    {
      query: pageQuery,
      transformer: ({ data }) => flatten(data.pages.edges),
      indexName: indexName,
      settings,
    },
  ];
};
