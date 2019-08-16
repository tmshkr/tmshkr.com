import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: "/about/" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

function About(props) {
  const data = useStaticQuery(query)
  console.log(data)
  const about = props.data.markdownRemark

  return (
    <Layout className="about">
      <SEO
        title="About"
        description={about.frontmatter.description || about.excerpt}
      />
      <h1
        css={css`
          text-align: center;
        `}
      >
        {about.frontmatter.title}
      </h1>
      <div
        className="html-content"
        css={css`
          margin: ${rhythm(0.5)} 0;
        `}
        dangerouslySetInnerHTML={{ __html: about.html }}
      />
      <hr />
    </Layout>
  )
}

export default About
