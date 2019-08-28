import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"

function Page(props) {
  const page = props.data.markdownRemark || props.data.mdx

  return (
    <Layout className="page">
      <SEO
        title={page.frontmatter.title}
        description={page.frontmatter.description || page.excerpt}
      />
      <h1
        css={css`
          text-align: center;
        `}
      >
        {page.frontmatter.title}
      </h1>
      <span className="line"></span>
      <div
        className="content"
        dangerouslySetInnerHTML={page.html && { __html: page.html }}
      >
        {page.body && <MDXRenderer>{page.body}</MDXRenderer>}
      </div>
      <hr />
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
      body
    }
  }
`
