const fs = require('fs');

const generate = (path, config) => {
  const generated = `module.exports = ${JSON.stringify(config, undefined, 4)};`;
  fs.writeFile(path, generated, function (err) {
    if (err) return console.log(err);
  });
};

module.exports = generate;
