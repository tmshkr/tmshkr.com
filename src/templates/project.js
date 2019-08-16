import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import BreadcrumbPath from "../components/breadcrumb-path"
import VideoPlayer from "../components/video-player"
import { rhythm, scale } from "../utils/typography"
import "./project.scss"

class ProjectTemplate extends React.Component {
  render() {
    const project = this.props.data.markdownRemark
    const { video, url } = project.frontmatter
    // const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout className="project" path={this.props.path}>
        <SEO
          title={project.frontmatter.title}
          description={project.frontmatter.description || project.excerpt}
        />
        <h2
          css={css`
            margin: ${rhythm(0.5)};
            text-align: center;
          `}
        >
          {project.frontmatter.title}
        </h2>
        <VideoPlayer video={video} />
        <div
          className="html-content"
          css={css`
            margin: ${rhythm(1)} 0;
          `}
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
        <hr
          css={css`
            margin-bottom: ${rhythm(1)};
          `}
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

export default ProjectTemplate

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        url
        video
      }
    }
  }
`
