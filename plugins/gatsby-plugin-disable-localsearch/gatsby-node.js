exports.createPages = async (gatsbyContext, pluginOptions) => {
  const {
    actions,
    createNodeId,
    createContentDigest,
  } = gatsbyContext
  const { createNode } = actions
  const {
    name
  } = pluginOptions

  const nodeType = `localSearch${name}`;
  const nodeId = createNodeId(name);
  const node = {
    id: nodeId,
    name: name,
    index: '',
    store: {},
    internal: {
      type: nodeType,
      contentDigest: createContentDigest({ index: [], store: [] }),
    },
  }

  createNode(node)
}

exports.createSchemaCustomization = async (
  gatsbyContext,
  pluginOptions,
) => {
  const { actions, schema } = gatsbyContext
  const { createTypes } = actions
  const { name } = pluginOptions

  const nodeType = `localSearch${name}`;

  createTypes([
    schema.buildObjectType({
      name: nodeType,
      fields: {
        name: {
          type: 'String!',
          description: 'The name of the index.',
        },
        index: {
          type: 'String!',
          description: 'The search index created using the selected engine.',
        },
        store: {
          type: 'JSON!',
          description:
            'A JSON object used to map search results to their data.',
        },
      },
      interfaces: ['Node'],
    }),
  ])
}