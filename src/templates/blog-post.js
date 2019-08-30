import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import "./blog-post.scss"

class BlogPostTemplate extends React.Component {
  componentDidMount() {
    function isOverflowingX(el) {
      return el.clientWidth < el.scrollWidth
    }
    const codeViews = document.querySelectorAll(".gatsby-highlight pre")
    codeViews.forEach(function(el) {
      if (isOverflowingX(el)) {
        el.parentElement.classList.add("full-width")
      }
    })
  }

  render() {
    const post = this.props.data.markdown
    const { previous, next } = this.props.pageContext

    return (
      <Layout className="blog-post" autoHideNavbar={true}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <h1
          style={{
            marginTop: rhythm(1),
            marginBottom: 0,
          }}
        >
          {post.frontmatter.title}
        </h1>
        <time
          className="date"
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            paddingLeft: rhythm(0.1),
          }}
        >
          {post.frontmatter.date}
        </time>
        <div
          className="content"
          dangerouslySetInnerHTML={post.html && { __html: post.html }}
        >
          {post.body && <MDXRenderer>{post.body}</MDXRenderer>}
        </div>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <ul className="pagination">
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdown(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      excerpt
      ... on Mdx {
        body
      }
      ... on MarkdownRemark {
        html
      }
    }
  }
`
