module.exports = {
  metadata: {
    name: 'Gitbook Starter',
    short_name: '',
    description: '',
    language: 'en',
    url: 'http://localhost',
    pathPrefix: '/',
    gaTrackingId: null,
    ogImage: null,
    docsLocation: 'https://github.com/filipowm/gatsby-gitbook-starter',
    docsLocationType: 'github',
    favicon: '/assets/favicon.png',
    themeColor: '#',
  },
  header: {
    logo: '',
    logoLink: '/',
    helpUrl: '',
    links: [],
  },
  search: {
    enabled: false,
    indexName: 'docs',
    algoliaAppId: null,
    algoliaSearchKey: null,
    algoliaAdminKey: null,
  },
  sidebar: {
    enabled: true,
    ignoreIndex: true,
    forcedNavOrder: [],
    expanded: [],
    groups: [],
    links: [],
    poweredBy: {},
  },

  pwa: {
    enabled: true, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Gitbook',
      short_name: 'GitbookStarter',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
  features: {
    search: {
      enabled: true,
      indexName: 'docs',
      algoliaAppId: null,
      algoliaSearchKey: null,
      algoliaAdminKey: null,
    },
    toc: {
      depth: 3,
    },
    previousNext: {
      enabled: true,
      arrowKeyNavigation: true,
    },
    scrollTop: true,
    showMetadata: true,
    propagateNetlifyEnv: true,
    pageProgress: {
      enabled: false,
      // includePaths: [],
      excludePaths: ['/'],
      height: 3,
      prependToBody: false,
      color: '#A05EB5',
    },
    mermaid: {
      language: 'mermaid',
      theme: 'dark', // default, dark, forest, neutral
      options: {}, // https://mermaidjs.github.io/#/mermaidAPI
      width: 300,
      height: 300,
    },
    rss: {
      enabled: true,
      copyright: '2020, Mateusz Filipowicz',
      webMaster: 'Mateusz Filipowicz (matfilipowicz@gmail.com)',
      managingEditor: 'Mateusz Filipowicz (matfilipowicz@gmail.com)',
      categories: ['GatsbyJS', 'Docs'],
      ttl: '60',
      matchRegex: '^/',
      outputPath: '/rss.xml',
      generator: 'gidocs',
    },
  },
};
