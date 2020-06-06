const sectionizeToc = require('./sectionize-toc');

const transform = sectionizeToc();

module.exports = function ({ markdownAST }, pluginOptions ) {
    transform(markdownAST, pluginOptions.maxDepth);
};
 