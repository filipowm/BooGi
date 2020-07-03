const { readFileSync, close, open, utimes } = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const touch = (path) => {
  return new Promise((resolve, reject) => {
    const time = new Date();
    utimes(path, time, time, (err) => {
      if (err) {
        return open(path, 'w', (err, fd) => {
          if (err) return reject(err);
          close(fd, (err) => (err ? reject(err) : resolve(fd)));
        });
      }
      resolve();
    });
  });
};

const readYamlOrJson = (path) => {
  try {
    if (path.endsWith('.yml') || path.endsWith('.yaml')) {
      const fileContents = readFileSync(path, 'utf8');
      return yaml.safeLoad(fileContents);
    } else if (path.endsWith('.json')) {
      return require(path);
    }
    throw 'Config file must be either YAML or JSON';
  } catch (err) {
    console.error(err);
    return {};
  }
};

const rootDir = () => path.dirname(require.main.filename);

module.exports = { touch, readYamlOrJson, rootDir };
