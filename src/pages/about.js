import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const query = graphql`
  {
    markdownRemark(fields: { slug: { regex: "/^/[^/]+/$/" } }) {
      html
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`

function Page(props) {
  const data = useStaticQuery(query)
  console.log(data)
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
