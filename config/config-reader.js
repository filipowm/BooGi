const fs = require("fs")
const _ = require("lodash");
const yaml = require('js-yaml')

const defaults = {
    "metadata": {
      "name": "Gitbook Starter",
      "short_name": "",
      "description": "",
      "url": "http://localhost",
      "pathPrefix": "/",
      "gaTrackingId": null,
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
      "indexName": "docs",
      "algoliaAppId": null,
      "algoliaSearchKey": null,
      "algoliaAdminKey": null
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

const readEnvOrDefault = (name, def) => {
    let value = process.env[name];
    return value ? value : def ? def : null;
}

class ConfigReader {
    read() {
        return null;
    }
}

class FileReader extends ConfigReader {

    getPath() {
        return readEnvOrDefault("CONFIG_PATH", __dirname + '/config.yml')
    }

    readPath(path) {
        try {
            if (path.endsWith(".yml") || path.endsWith(".yaml")) {
                const fileContents = fs.readFileSync(path, 'utf8');
                return yaml.safeLoad(fileContents);
            } else if (path.endsWith(".json")) {
                return require(path);
            }
            throw "Config file must be either YAML or JSON"
          } catch(err) {
            console.error(err)
            return {};
          }
    }
    
    read() {
        const path = this.getPath();
        return this.readPath(path);
    }
    
}

class EnvReader extends ConfigReader {

    read() {
        return {};
    }
}

const read = () => {
    const fileConfig = new FileReader().read()
    const envConfig = new EnvReader().read()
    let config = _.merge(defaults, fileConfig);
    config = _.merge(config, envConfig);
    postProcessConfig(config);
    return config;
}

const postProcessConfig = (config) => {
    config["pwa"]["manifest"]["name"] = config.metadata.name;
    config["pwa"]["manifest"]["short_name"] = config.metadata.short_name ? config.metadata.short_name : config.metadata.name.replace(/\w+/, "");
    config["pwa"]["manifest"]["start_url"] = config.metadata.pathPrefix;
    config["pwa"]["manifest"]["background_color"] = config.metadata.themeColor;
    config["pwa"]["manifest"]["theme_color"] = config.metadata.themeColor;

    config.sidebar.groups.sort(function(a, b) {
        // ASC  -> a.length - b.length
        // DESC -> b.length - a.length
        let byOrder = a.order > b.order ? 1 : a.order > b.order ? -1 : 0;
        return byOrder === 0 ? b.path.length - a.path.length : byOrder;
    }); 
}

module.exports = read;