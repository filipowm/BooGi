// const config = require("../../.generated.config.js");

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
          metaDescription
        }
        excerpt(pruneLength: 50000)
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

const indexName = 'docs'; //config.features.search ? config.features.search.indexName : '';
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => flatten(data.pages.edges),
    indexName: indexName,
    settings,
  },
];

module.exports = queries;
