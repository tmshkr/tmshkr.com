import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import ArrowLeft from "@fortawesome/fontawesome-free/svgs/solid/arrow-left.svg"
import ArrowRight from "@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg"

function ProjectIndex(props) {
  const posts = props.data.allMdx.edges
  const { currentPage, numPages } = props.pageContext

  return (
    <Layout>
      <SEO title="Projects" />
      {posts.map(({ node }) => {
        const { slug } = node.fields
        const { date, excerpt, title } = node.frontmatter
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
            <Link to={`/projects/${currentPage + 1}`}>
              <ArrowLeft /> Prev
            </Link>
          )}
        </li>
        <li>
          {currentPage === 2 && (
            <Link to={`/projects/`}>
              Next <ArrowRight />
            </Link>
          )}
          {currentPage > 2 && (
            <Link to={`/projects/${currentPage - 1}`}>
              Next <ArrowRight />
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  )
}

export default ProjectIndex

export const pageQuery = graphql`
  query ProjectIndexFeed($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { fields: { slug: { glob: "/projects/*/" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
