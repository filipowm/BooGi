const emoji = require('node-emoji');

const emojify = (text) => {
  return emoji.emojify(text, (name) => name);
};

const clean = (text) => {
  const emojified = emojify(text);
  return emoji.strip(emojified);
};

module.exports = {
  emojify,
  clean,
};
