import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import "./blog.scss"

function BlogIndex(props) {
  const { data } = props
  const posts = data.allMarkdown.edges

  return (
    <Layout>
      <SEO title="Blog" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Fragment key={node.fields.slug}>
            <Link
              className="blog-post-summary"
              style={{
                boxShadow: `none`,
                marginBottom: rhythm(1.5),
                marginTop: rhythm(1.5),
              }}
              to={node.fields.slug}
            >
              <time className="date">{node.frontmatter.date}</time>
              <h1
                style={{
                  marginBottom: rhythm(1 / 4),
                  marginTop: rhythm(1 / 4),
                }}
              >
                {title}
              </h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </Link>
            <hr
              style={{
                marginBottom: rhythm(1),
              }}
            />
          </Fragment>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexFeed {
    allMarkdown(
      filter: { fields: { slug: { glob: "/blog/*/" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
