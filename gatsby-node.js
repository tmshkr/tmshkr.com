const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const blogIndex = path.resolve(`./src/templates/blog-index.js`)
  const project = path.resolve(`./src/templates/project.js`)
  const projectIndex = path.resolve(`./src/templates/project-index.js`)
  const page = path.resolve(`./src/templates/page.js`)

  const blogPostsQuery = `
  query BlogPosts {
    allMdx(filter: {fields: {slug: {glob: "/blog/*/"}}},
    sort: {fields: [frontmatter___date], order: DESC},
    limit: 1000) {
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
  }`

  const projectQuery = `
  query Projects {
    allMdx(filter: {fields: {slug: {glob: "/projects/*/"}}},
    sort: {fields: [frontmatter___date],
      order: DESC}) {
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
  }`

  const topLevelQuery = `
  query TopLevelPages {
    allMdx(filter: {fields: {slug: {glob: "/*/"}}}) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }
  }`

  await createCollection(blogPost, blogPostsQuery)
  await createPaginatedIndex(blogIndex, blogPostsQuery, "blog")
  await createCollection(project, projectQuery)
  await createPaginatedIndex(projectIndex, projectQuery, "projects")
  await createPages(page, topLevelQuery)

  async function createCollection(component, query) {
    const result = await graphql(query)

    if (result.errors) {
      throw result.errors
    }

    const { edges } = result.data.allMdx

    edges.forEach((edge, index) => {
      const previous = index === edges.length - 1 ? null : edges[index + 1].node
      const next = index === 0 ? null : edges[index - 1].node

      createPage({
        path: edge.node.fields.slug,
        component,
        context: {
          slug: edge.node.fields.slug,
          title: edge.node.frontmatter.title,
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

    const { nodes } = result.data.allMdx

    nodes.forEach(node => {
      createPage({
        path: node.fields.slug,
        component,
        context: {
          slug: node.fields.slug,
          title: node.frontmatter.title,
        },
      })
    })
  }

  async function createPaginatedIndex(component, query, slug) {
    const result = await graphql(query)

    if (result.errors) {
      throw result.errors
    }

    const posts = result.data.allMdx.edges

    const postsPerPage = 5
    const numPages = Math.ceil(posts.length / postsPerPage)

    for (let i = 0; i < numPages; i++) {
      createPage({
        path: i === 0 ? `/${slug}` : `/${slug}/${i + 1}`,
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

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
