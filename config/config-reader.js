const fs = require('fs');
const _ = require('lodash');
const yaml = require('js-yaml');
const defaults = require('./default');

const readEnvOrDefault = (name, def) => {
  let value = process.env[name];
  return value ? value : def ? def : null;
};

class ConfigReader {
  read() {
    return null;
  }
}

class FileReader extends ConfigReader {
  getPath() {
    return readEnvOrDefault('CONFIG_PATH', __dirname + '/config.yml');
  }

  readPath(path) {
    try {
      if (path.endsWith('.yml') || path.endsWith('.yaml')) {
        const fileContents = fs.readFileSync(path, 'utf8');
        return yaml.safeLoad(fileContents);
      } else if (path.endsWith('.json')) {
        return require(path);
      }
      throw 'Config file must be either YAML or JSON';
    } catch (err) {
      console.error(err);
      return {};
    }
  }

  read() {
    const path = this.getPath();
    return this.readPath(path);
  }
}

class EnvReader extends ConfigReader {
  readArray(key) {
    const value = this.readValue(key);
    if (value) {
      return value.split(',').map(String.trim);
    }
    return value;
  }

  readValue(key) {
    if (key in process.env) {
      const value = process.env[key];
      try {
        return value === 'true' ? true : value === 'false' ? false : parseFloat(value);
      } catch (err) {
        return value;
      }
    }
    return undefined;
  }

  generatePrefix(prefix, key) {
    const suffix = key
      .split(/(?=[A-Z])/)
      .map((str) => str.toUpperCase())
      .join('_');
    return prefix !== '' ? `${prefix}_${suffix}` : suffix;
  }

  readObject(obj, config, prefix) {
    for (let [key, value] of Object.entries(obj)) {
      const newPrefix = this.generatePrefix(prefix, key);
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null
      ) {
        const value = this.readValue(newPrefix);
        if (value !== undefined) {
          config[key] = value;
        }
      } else if (typeof value === 'object') {
        if (Array.isArray(value)) {
          const value = this.readArray(newPrefix);
          if (value !== undefined) {
            config[key] = value;
          }
        } else {
          const child = {};
          config[key] = child;
          this.readObject(value, child, newPrefix);
        }
      }
    }
  }

  read() {
    const config = {};
    this.readObject(defaults, config, '');
    return config;
  }
}

class NetlifyEnvReader extends ConfigReader {
  constructor(allowNetlifyEnvPropagation) {
    super();
    this.allowNetlifyEnvPropagation = allowNetlifyEnvPropagation;
  }

  read() {
    if (this.allowNetlifyEnvPropagation && readEnvOrDefault('NETLIFY', false)) {
      const context = readEnvOrDefault('CONTEXT');
      const repositoryUrl = readEnvOrDefault('REPOSITORY_URL');
      const url = readEnvOrDefault('URL');
      const deployUrl = context === 'production' ? url : readEnvOrDefault('DEPLOY_PRIME_URL', url);
      console.log(
        'Setting up Netlify variables.',
        'URL:',
        deployUrl,
        'Docs Location:',
        repositoryUrl
      );
      return {
        metadata: {
          url: deployUrl,
          docsLocation: repositoryUrl,
        },
      };
    }
    return {};
  }
}

const read = () => {
  const fileConfig = new FileReader().read();
  const envConfig = new EnvReader().read();
  const def = _.cloneDeep(defaults);

  let config = _.merge(def, fileConfig);
  config = _.merge(config, envConfig);
  const netlifyConfig = new NetlifyEnvReader(config.features.propagateNetlifyEnv).read();
  config = _.merge(config, netlifyConfig);
  postProcessConfig(config);
  return config;
};

const postProcessConfig = (config) => {
  config['pwa']['manifest']['name'] = config.metadata.name;
  config['pwa']['manifest']['short_name'] = config.metadata.short_name
    ? config.metadata.short_name
    : config.metadata.name.replace(/\w+/, '');
  config['pwa']['manifest']['start_url'] = config.metadata.pathPrefix;
  config['pwa']['manifest']['background_color'] = config.metadata.themeColor;
  config['pwa']['manifest']['theme_color'] = config.metadata.themeColor;

  config.sidebar.groups.sort(function (a, b) {
    // ASC  -> a.length - b.length
    // DESC -> b.length - a.length
    let byOrder = a.order > b.order ? 1 : a.order > b.order ? -1 : 0;
    return byOrder === 0 ? b.path.length - a.path.length : byOrder;
  });
};

module.exports = read;
