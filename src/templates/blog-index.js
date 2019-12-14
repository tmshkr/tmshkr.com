import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import "./blog-index.scss"

function BlogIndex(props) {
  const posts = props.data.allTextDocument.edges
  const { currentPage, numPages } = props.pageContext
  console.log(props.pageContext)

  return (
    <Layout>
      <SEO title="Blog" />
      {posts.map(({ node }) => {
        const { date, excerpt, slug, title } = node.fields
        return (
          <Fragment key={slug}>
            <Link
              className="blog-post-summary"
              style={{
                boxShadow: `none`,
                marginBottom: rhythm(1.5),
                marginTop: rhythm(1.5),
              }}
              to={slug}
            >
              <time className="date">{date}</time>
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
                  __html: excerpt || node.excerpt,
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
      <ul className="pagination">
        <li>
          {currentPage < numPages && (
            <Link to={`blog/${currentPage + 1}`}>
              <i>←</i> Prev
            </Link>
          )}
        </li>
        <li>
          {currentPage === 2 && (
            <Link to={`blog/`}>
              Next <i>→</i>
            </Link>
          )}
          {currentPage > 2 && (
            <Link to={`blog/${currentPage - 1}`}>
              Next <i>→</i>
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexFeed($skip: Int!, $limit: Int!) {
    allTextDocument(
      filter: { fields: { slug: { glob: "/blog/*/" } } }
      sort: { fields: fields___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            date(formatString: "MMMM DD, YYYY")
            excerpt
            slug
            title
          }
        }
      }
    }
  }
`
