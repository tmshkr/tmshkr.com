const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const project = path.resolve(`./src/templates/project.js`)
  const page = path.resolve(`./src/templates/page.js`)

  createPages(
    page,
    `{
    allMarkdownRemark(filter: {fields: {slug: {glob: "/*/"}}}) {
      nodes {
        fields {
          slug
        }
      }
    }
  }
  `
  )

  createCollection(
    blogPost,
    `
  {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/^/blog//" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
  )
  createCollection(
    project,
    `
  {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/^/projects//" } } }
      sort: { fields: [frontmatter___title], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
  )
  async function createPages(component, query) {
    const result = await graphql(query)

    if (result.errors) {
      throw result.errors
    }

    const { nodes } = result.data.allMarkdownRemark

    nodes.forEach(node => {
      createPage({
        path: node.fields.slug,
        component,
        context: {
          slug: node.fields.slug,
        },
      })
    })
  }

  async function createCollection(component, query) {
    const result = await graphql(query)

    if (result.errors) {
      throw result.errors
    }

    const { edges } = result.data.allMarkdownRemark

    edges.forEach((edge, index) => {
      const previous = index === edges.length - 1 ? null : edges[index + 1].node
      const next = index === 0 ? null : edges[index - 1].node

      createPage({
        path: edge.node.fields.slug,
        component,
        context: {
          slug: edge.node.fields.slug,
          previous,
          next,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
