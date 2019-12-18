import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import ArrowLeft from "@fortawesome/fontawesome-free/svgs/solid/arrow-left.svg"
import ArrowRight from "@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg"
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

    const mermaidSVG = document.querySelector(".mermaid > svg")
    mermaidSVG.attributes.width.value = "100%"
    mermaidSVG.attributes.height.value = "100%"
  }

  render() {
    const post = this.props.data.textDocument
    const { previous, next } = this.props.pageContext

    return (
      <Layout className="blog-post" autoHideNavbar={true}>
        <SEO
          title={post.fields.title}
          description={post.fields.description || post.excerpt}
        />
        <h1
          style={{
            marginTop: rhythm(1),
            marginBottom: 0,
          }}
        >
          {post.fields.title}
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
          {post.fields.date}
        </time>
        <div
          className="content"
          dangerouslySetInnerHTML={
            (post.html || post.content) && { __html: post.html || post.content }
          }
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
                <ArrowLeft /> {previous.fields.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.fields.title} <ArrowRight />
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
    textDocument(fields: { slug: { eq: $slug } }) {
      fields {
        title
        date(formatString: "MMMM DD, YYYY")
        excerpt
        slug
      }
      excerpt
      ... on Mdx {
        body
      }
      ... on MarkdownRemark {
        html
      }
      ... on wordpress__POST {
        content
      }
    }
  }
`
