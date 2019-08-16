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
    <Layout className="about" location={props.location} path={props.path}>
      <SEO
        title={about.frontmatter.title}
        description={about.frontmatter.description || about.excerpt}
      />
      <h2
        css={css`
          margin: ${rhythm(0.5)};
          text-align: center;
        `}
      >
        {about.frontmatter.title}
      </h2>
      <div
        className="html-content"
        css={css`
          margin: ${rhythm(0.5)};
        `}
        dangerouslySetInnerHTML={{ __html: about.html }}
      />
      <hr
        css={css`
          margin-bottom: ${rhythm(1)};
        `}
      />
    </Layout>
  )
}

export default About
