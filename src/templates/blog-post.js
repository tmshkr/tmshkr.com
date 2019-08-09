import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import "./blog-post.scss"

class BlogPostTemplate extends React.Component {
  componentDidMount() {
    console.log("BlogPostTemplate mounted")

    const { scripts } = this.props.data.markdownRemark.frontmatter
    if (scripts) {
      scripts.forEach((src, i) => {
        ;(function(d, script) {
          script = d.createElement("script")
          script.type = "text/javascript"
          script.async = false
          // script.defer = true
          script.onload = function() {
            console.log("script loaded")
            if (scripts[i + 1]) {
              console.log("there's another script")
            }
          }
          script.src = src
          d.getElementsByTagName("main")[0].appendChild(script)
        })(document)
      })
    }
  }

  componentDidUpdate() {
    console.log("BlogPostTemplate updated")
    // let src
    // src = "/gdp.js"
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
