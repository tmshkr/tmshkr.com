const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const project = path.resolve(`./src/templates/project.js`)
  const page = path.resolve(`./src/templates/page.js`)

  createPages(
    page,
    `
    query TopLevelPages {
      allMarkdown(filter: {fields: {slug: {glob: "/*/"}}}) {
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
    query BlogPosts {
      allMarkdown(
        filter: {fields: {slug: {glob: "/blog/*/"}}},
        sort: {fields: frontmatter___date, order: DESC}
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
    query Projects {
      allMarkdown(
        filter: {fields: {slug: {glob: "/projects/*/"}}},
        sort: {fields: [frontmatter___title], order: DESC}
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

    const { nodes } = result.data.allMarkdown

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

    const { edges } = result.data.allMarkdown

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

  if ([`MarkdownRemark`, `Mdx`].includes(node.internal.type)) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    interface Markdown @nodeInterface {
      id: ID!
      fields: Fields
      frontmatter: Frontmatter
      excerpt: String
    }

    type Fields {
      slug: String!
    }

    type Frontmatter {
      title: String
      date: Date @dateformat
    }

    type MarkdownRemark implements Node & Markdown {
      id: ID!
      fields: Fields
      frontmatter: Frontmatter
    }

    type Mdx implements Node & Markdown {
      id: ID!
      fields: Fields
      frontmatter: Frontmatter
    }
  `
  createTypes(typeDefs)
}
