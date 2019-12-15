const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const parseWPExcerpt = require("./src/utils/parse-wp-excerpt")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const blogIndex = path.resolve(`./src/templates/blog-index.js`)
  const project = path.resolve(`./src/templates/project.js`)
  const page = path.resolve(`./src/templates/page.js`)

  const blogPostsQuery = `
  query BlogPosts {
    allTextDocument(filter: {fields: {slug: {glob: "/blog/*/"}}},
    sort: {fields: fields___date, order: DESC}
    limit: 1000
    ) {

      edges {
        node {
          fields {
            slug
            title
          }
        }
      }
    }
  }
  `

  createCollection(blogPost, blogPostsQuery)
  createPaginatedIndex(blogIndex, blogPostsQuery)

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
    project,
    `query Projects {
      allTextDocument(filter: {fields: {slug: {glob: "/projects/*/"}}},
      sort: {fields: fields___title, order: DESC}) {
        edges {
          node {
            fields {
              slug
              title
            }
          }
        }
      }
    }
    `
  )

  async function createCollection(component, query) {
    const result = await graphql(query)

    if (result.errors) {
      throw result.errors
    }

    const { edges } = result.data.allTextDocument

    edges.forEach((edge, index) => {
      const previous = index === edges.length - 1 ? null : edges[index + 1].node
      const next = index === 0 ? null : edges[index - 1].node

      createPage({
        path: edge.node.fields.slug,
        component,
        context: {
          slug: edge.node.fields.slug,
          title: edge.node.fields.title,
          previous,
          next,
        },
      })
    })
  }

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
          title: node.fields.title,
        },
      })
    })
  }

  async function createPaginatedIndex(component, query) {
    const result = await graphql(query)

    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allTextDocument.edges

    const postsPerPage = 5
    const numPages = Math.ceil(posts.length / postsPerPage)

    for (let i = 0; i < numPages; i++) {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    }
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  switch (node.internal.type) {
    case `MarkdownRemark`:
    case `Mdx`:
      const filePath = createFilePath({ node, getNode })
      createNodeField({
        name: `date`,
        node,
        value: node.frontmatter.date,
      })
      createNodeField({
        name: `slug`,
        node,
        value: filePath,
      })
      createNodeField({
        name: `title`,
        node,
        value: node.frontmatter.title,
      })
      break

    case `wordpress__POST`:
      createNodeField({
        name: `date`,
        node,
        value: node.date,
      })
      createNodeField({
        name: `excerpt`,
        node,
        value: parseWPExcerpt(node.excerpt),
      })
      createNodeField({
        name: `slug`,
        node,
        value: `/blog/${node.slug}/`,
      })
      createNodeField({
        name: `title`,
        node,
        value: node.title,
      })
      break
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

    interface TextDocument @nodeInterface {
      id: ID!
      fields: Fields
      excerpt: String
    }

    type Fields {
      date: Date @dateformat
      excerpt: String
      slug: String!
      title: String
    }

    type Frontmatter {
      title: String
      date: Date @dateformat
    }

    type MarkdownRemark implements Node & Markdown & TextDocument {
      id: ID!
      fields: Fields
      frontmatter: Frontmatter
    }

    type Mdx implements Node & Markdown & TextDocument {
      id: ID!
      fields: Fields
      frontmatter: Frontmatter
    }

    type wordpress__POST implements Node & TextDocument {
      id: ID!
      fields: Fields
    }
  `
  createTypes(typeDefs)
}
