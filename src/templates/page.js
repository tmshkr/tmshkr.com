import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

function Page(props) {
  const page = props.data.markdownRemark

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
        className="html-content"
        css={css`
          margin: ${rhythm(0.5)} 0;
        `}
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
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
  }
`
