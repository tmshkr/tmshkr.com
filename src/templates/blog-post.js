import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import "./blog-post.scss"

class BlogPostTemplate extends React.Component {
  componentDidMount() {
    const { scripts } = this.props.data.markdownRemark.frontmatter
    if (scripts) {
      const allowed = {
        "https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.min.js":
          "sha384-HL96dun1KbYEq6UT/ZlsspAODCyQ+Zp4z318ajUPBPSMzy5dvxl6ziwmnil8/Cpd",
        "gdp.js":
          "sha384-PC96xYETvEZI5H5XZY6cxqZ9tY/UdYzLSCoE0ARjjwmt6ThyKuzJ+b9xAwpZmPJU",
      }

      scripts.forEach(s => {
        if (allowed.hasOwnProperty(s[0]) && allowed[s[0]] === s[1]) {
          const script = document.createElement("script")
          script.async = false
          script.crossOrigin = "anonymous"
          script.integrity = s[1]
          script.src = s[0]
          script.type = "text/javascript"
          document.getElementsByTagName("main")[0].appendChild(script)
        }
      })
    }

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
    const post = this.props.data.markdownRemark
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
          className="html-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
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
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        scripts
      }
    }
  }
`
