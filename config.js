const _ = require("lodash");
const jsonConfig = require("./config.json");

function getEnvOrDefault(name, def) {
  let value = process.env[name];
  return value ? value : def ? def : null;
}

const defaults = {
  "metadata": {
    "name": "Gitbook Starter",
    "short_name": "",
    "description": "",
    "url": getEnvOrDefault("URL", "http://localhost"),
    "pathPrefix": "/",
    "gaTrackingId": getEnvOrDefault('GATSBY_GA_ID'),
    "ogImage": null,
    "docsLocation": "https://github.com/filipowm/gatsby-gitbook-starter",
    "docsLocationType": "github",
    "favicon": "/assets/favicon.png",
    "themeColor": "#"
  },
  "header": {
    "logo": "",
    "logoLink": "/",
    "helpUrl": "asdg",
    "links": [],
  },
  "search": {
    "enabled": true,
    "indexName": getEnvOrDefault('GATSBY_INDEX', 'docs'),
    "algoliaAppId": getEnvOrDefault('GATSBY_ALGOLIA_APP_ID', null),
    "algoliaSearchKey": getEnvOrDefault('GATSBY_ALGOLIA_SEARCH_KEY', null),
    "algoliaAdminKey": getEnvOrDefault('ALGOLIA_ADMIN_KEY', null)
  },
  "sidebar": {
    "forcedNavOrder": [],
    "expanded": [],
    "groups": [],
    "links": [],
    "ignoreIndex": true,
    "poweredBy": {}
  },

  "pwa": {
    "enabled": true, // disabling this will also remove the existing service worker.
    "manifest": {
      "name": "Gitbook",
      "short_name": "GitbookStarter",
      "start_url": "/",
      "background_color": "#6b37bf",
      "theme_color": "#6b37bf",
      "display": "standalone",
      "crossOrigin": "use-credentials",
      "icons": [
        {
          "src": "src/pwa-512.png",
          "sizes": `512x512`,
          "type": `image/png`,
        },
      ],
    },
  },
  "toc": {
    "depth": 3
  }
};
const config = _.merge(defaults, jsonConfig);

config["pwa"]["manifest"]["name"] = config.metadata.name;
config["pwa"]["manifest"]["short_name"] = config.metadata.short_name ? config.metadata.short_name : config.metadata.name.replace(/\w+/, "");
config["pwa"]["manifest"]["start_url"] = config.metadata.pathPrefix;
config["pwa"]["manifest"]["background_color"] = config.metadata.themeColor;
config["pwa"]["manifest"]["theme_color"] = config.metadata.themeColor;

config.sidebar.groups.sort(function(a, b){
  // ASC  -> a.length - b.length
  // DESC -> b.length - a.length
  let byOrder = a.order > b.order ? 1 : a.order > b.order ? -1 : 0;
  return byOrder === 0 ? b.path.length - a.path.length : byOrder;
});
module.exports = config;
