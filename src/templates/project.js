import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BreadcrumbPath from "../components/breadcrumb-path"
import VideoPlayer from "../components/video-player"
import ExternalLink from "@fortawesome/fontawesome-free/svgs/solid/external-link-alt.svg"
// import { rhythm, scale } from "../utils/typography"
import "./project.scss"

class ProjectTemplate extends React.Component {
  render() {
    const project = this.props.data.markdownRemark
    const { video, url } = project.frontmatter
    const { previous, next } = this.props.pageContext

    return (
      <Layout className="project">
        <SEO
          title={project.frontmatter.title}
          description={project.frontmatter.description || project.excerpt}
        />
        <BreadcrumbPath path={this.props.path} />
        <VideoPlayer video={video} />
        <h2
          css={css`
            margin: 1em;
          `}
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            css={css`
              padding: 0.11em 0.22em 0.22em;
              border-radius: 0.11em;
              body.dark & {
                color: #fff;
                fill: #fff;
                &:hover {
                  background: rgba(187, 222, 251, 0.33);
                }
              }
              body.light & {
                color: #000;
                fill: #000;
                &:hover {
                  background: rgba(96, 125, 139, 0.33);
                }
              }

              svg {
                width: 1rem;
                height: auto;
              }
            `}
          >
            {project.frontmatter.title} <ExternalLink />
          </a>
        </h2>

        <div
          className="html-content"
          css={css`
            margin: 1rem 0;
          `}
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
        <hr
          css={css`
            margin-bottom: 2rem;
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
