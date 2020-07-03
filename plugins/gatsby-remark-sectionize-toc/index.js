const sectionizeToc = require('./sectionize-toc');

const transform = sectionizeToc();

module.exports = function ({ markdownAST, markdownNode }, pluginOptions) {
  const maxDepth = markdownNode.frontmatter.tocDepth
    ? markdownNode.frontmatter.tocDepth
    : pluginOptions.maxDepth;
  transform(markdownAST, maxDepth);
};
