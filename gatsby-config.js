// 08:46
require('dotenv').config();
const queries = require('./src/utils/algolia');
const configManager = require('./src/utils/config');
const path = require('path');
const globImporter = require('node-sass-glob-importer');
const emoji = require('./src/utils/emoji');
const _ = require('lodash');

const config = configManager.read();
configManager.generate(__dirname + '/.generated.config.js', config);

const plugins = [
  'gatsby-plugin-sitemap',
  'gatsby-plugin-instagram-embed',
  'gatsby-plugin-pinterest',
  'gatsby-plugin-twitter',
  'gatsby-plugin-sharp',
  {
    resolve: 'gatsby-plugin-sass',
    options: {
      importer: globImporter(),
    },
  },
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/templates/docs.js`),
    },
  },
  'gatsby-plugin-emotion',
  'gatsby-plugin-remove-trailing-slashes',
  'gatsby-transformer-sharp',
  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /\.inline\.svg$/,
      },
    },
  },
  'gatsby-plugin-react-helmet',
  'gatsby-source-local-git',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'docs',
      path: `${__dirname}/content/`,
    },
  },
  {
    resolve: `gatsby-transformer-gitinfo`,
    options: {
      include: /\.mdx?$/i, // Only .md files
    },
  },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      remarkPlugins: [require('remark-emoji'), require('remark-abbr')],
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-mermaid',
          options: {
            language: config.features.mermaid.language,
            theme: config.features.mermaid.theme,
            viewport: {
              width: config.features.mermaid.width,
              height: config.features.mermaid.height,
            },
            mermaidOptions: config.features.mermaid.options,
          },
        },
        'gatsby-remark-graphviz',
        {
          resolve: require.resolve(`./plugins/gatsby-remark-sectionize-toc`),
          options: {
            maxDepth: config.features.toc.depth,
          },
        },
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1050,
            quality: 75,
            showCaptions: true,
            disableBgImageOnAlpha: true,
            withWebp: true,
          },
        },
        'gatsby-remark-copy-linked-files',
        {
          resolve: 'gatsby-remark-jargon',
          options: { jargon: require('./src/utils/jargon-config.js') },
        },
        {
          resolve: `gatsby-remark-embed-snippet`,
          options: {
            directory: `${__dirname}/snippets/`,
          },
        },
        {
          resolve: `gatsby-remark-embedder`,
          options: {
            customTransformers: [
              // Your custom transformers
            ],
            services: {
              // The service-specific options by the name of the service
            },
          },
        },
      ],
      extensions: ['.mdx', '.md'],
    },
  },
  {
    resolve: `gatsby-plugin-gtag`,
    options: {
      // your google analytics tracking id
      trackingId: config.metadata.gaTrackingId,
      // Puts tracking script in the head instead of the body
      head: true,
      // enable ip anonymization
      anonymize: false,
    },
  },
  {
    resolve: 'gatsby-plugin-root-import',
    options: {
      '~': path.join(__dirname, 'src'),
      config: path.join(__dirname, '.generated.config.js'),
      images: path.join(__dirname, 'src/images'),
      styles: path.join(__dirname, 'src/styles'),
      css: path.join(__dirname, 'src/styles/main.scss'),
    },
  },
  {
    resolve: `gatsby-plugin-canonical-urls`,
    options: {
      siteUrl: config.metadata.url,
      stripQueryString: true,
    },
  },
];

if (config.features.pageProgress && config.features.pageProgress.enabled) {
  plugins.push({
    resolve: 'gatsby-plugin-page-progress',
    options: {
      includePaths: config.features.pageProgress.includePaths,
      excludePaths: config.features.pageProgress.excludePaths,
      height: config.features.pageProgress.height,
      prependToBody: config.features.pageProgress.prependToBody,
      color: config.features.pageProgress.color,
    },
  });
}

if (config.features.rss && config.features.rss.enabled) {
  plugins.push({
    resolve: `gatsby-plugin-feed`,
    options: {
      ...config.features.rss,
      language: config.metadata.language,
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({ query: { site, allMdx } }) => {
            const items = allMdx.edges.map((edge) => {
              const frontmatter = edge.node.frontmatter;
              const fields = edge.node.parent.fields;
              const rawTitle = frontmatter.metaTitle && frontmatter.metaTitle.length > 0 ? frontmatter.metaTitle : frontmatter.title;
              const title = emoji.clean(rawTitle);
              const date = fields && fields.gitLogLatestDate ? fields.gitLogLatestDate : new Date();
              const author =
                fields && fields.gitLogLatestAuthorName ? fields.gitLogLatestAuthorName : 'unknown';
              return {
                title: title,
                description: frontmatter.description ? frontmatter.description : edge.node.excerpt,
                date: date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                author: author,
              };
            });
            return _.orderBy(items, ['date', 'title'], ['desc', 'asc']);
          },
          query: `
          {
            allMdx {
              edges {
                node {
                  excerpt
                  fields {
                    slug
                  }
                  parent {
                    ... on File {
                      fields {
                        gitLogLatestDate
                        gitLogLatestAuthorName
                      }
                    }
                  }
                  frontmatter {
                    title
                    metaTitle
                    description
                  }
                }
              }
            }
          }
          `,
          output: config.features.rss.outputPath,
          match: config.features.rss.matchRegex,
          title: config.features.rss.title ? config.features.rss.title : config.metadata.title
        },
      ],
    },
  });
}

// check and add algolia
if (
  config.features.search &&
  config.features.search.enabled &&
  config.features.search.algoliaAppId &&
  config.features.search.algoliaAdminKey
) {
  plugins.push({
    resolve: `gatsby-plugin-algolia`,
    options: {
      appId: config.features.search.algoliaAppId, // algolia application id
      apiKey: config.features.search.algoliaAdminKey, // algolia admin key to index
      queries: queries(config.features.search.indexName),
      chunkSize: 10000, // default: 1000
    },
  });
}
// check and add pwa functionality
if (config.pwa && config.pwa.enabled && config.pwa.manifest) {
  plugins.push({
    resolve: `gatsby-plugin-manifest`,
    options: { ...config.pwa.manifest },
  });
  plugins.push({
    resolve: 'gatsby-plugin-offline',
    options: {
      appendScript: require.resolve(`./src/custom-sw-code.js`),
    },
  });
  // plugins.push('gatsby-plugin-offline');
} else {
  plugins.push('gatsby-plugin-remove-serviceworker');
}

module.exports = {
  pathPrefix: config.metadata.pathPrefix,
  siteMetadata: {
    title: config.metadata.name,
    description: config.metadata.description,
    docsLocation: config.features.editOnRepo.location,
    docsLocationType: config.features.editOnRepo.type,
    editable: config.features.editOnRepo.editable,
    siteImage: config.metadata.siteImage,
    favicon: config.metadata.favicon,
    logo: {
      link: config.header.logoLink ? config.header.logoLink : '/',
      image: config.header.logo,
    }, // backwards compatible
    headerTitle: config.metadata.name,
    helpUrl: config.header.helpUrl,
    headerLinks: config.header.links,
    siteUrl: config.metadata.url,
  },
  plugins: plugins,
};
