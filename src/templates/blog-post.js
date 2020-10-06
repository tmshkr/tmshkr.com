import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Subscribe from "../components/subscribe"
import { rhythm, scale } from "../utils/typography"
import ArrowLeft from "@fortawesome/fontawesome-free/svgs/solid/arrow-left.svg"
import ArrowRight from "@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg"
import "./blog-post.scss"

function BlogPostTemplate(props) {
  useEffect(() => {
    document.querySelectorAll(".gatsby-highlight pre").forEach(el => {
      if (el.clientWidth < el.scrollWidth) {
        el.parentElement.classList.add("full-width")
      }
    })
    document.querySelectorAll(".mermaid > svg").forEach(el => {
      el.attributes.width.value = "100%"
      el.attributes.height.value = "100%"
    })
    document.onkeyup = handleKeyup
    return () => (document.onkeyup = null)
    // eslint-disable-next-line
  }, [])

  function handleKeyup(e) {
    const { previous, next } = props.pageContext
    switch (e.which) {
      case 37:
        previous && props.navigate(previous.fields.slug)
        break
      case 39:
        next && props.navigate(next.fields.slug)
        break
      default:
        break
    }
  }

  const post = props.data.mdx
  const { previous, next } = props.pageContext

  return (
    <Layout className="blog-post" autoHideNavbar={true}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
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
      <div className="content">
        <MDXRenderer>{post.body}</MDXRenderer>
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
              <ArrowLeft /> {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} <ArrowRight />
            </Link>
          )}
        </li>
      </ul>
      {typeof window !== "undefined" && !window.__blogSubscribeHidden && (
        <Subscribe canHide={true} />
      )}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
      fields {
        slug
      }
      excerpt
      body
    }
  }
`
