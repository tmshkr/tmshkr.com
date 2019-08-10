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
          "sha384-t0+qGnjixk2g7n49JRle9Ebcoir6hFIL7n5DVhLS41KcSsu/Y1wdILbHSGuOU4fD",
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
  }

  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout
        className="blog-post"
        location={this.props.location}
        title={siteTitle}
      >
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
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        {/* <Bio /> */}

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
        description
        scripts
      }
    }
  }
`
