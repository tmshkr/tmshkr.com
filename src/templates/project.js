import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import { Global, css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BreadcrumbPath from "../components/breadcrumb-path"
import VideoPlayer from "../components/video-player"
import ExternalLink from "@fortawesome/fontawesome-free/svgs/solid/external-link-alt.svg"

function ProjectTemplate(props) {
  const project = props.data.markdownRemark
  const { video, url } = project.frontmatter
  const { previous, next } = props.pageContext

  return (
    <Fragment>
      <Global
        styles={css`
          body.dark {
            background: #0a1b43;
            background: -webkit-linear-gradient(to top, #bf8640, #0a1b43);
            background: linear-gradient(to top, #bf8640, #0a1b43);
          }
          body.light {
            background: #90acee;
            background: -webkit-linear-gradient(to top, #bf8640, #1b73bb);
            background: linear-gradient(to top, #bf8640, #1b73bb);
            #navbar {
              background-color: rgba(207, 216, 220, 0.25);
            }
          }
        `}
      />
      <SEO
        title={project.frontmatter.title}
        description={project.frontmatter.description || project.excerpt}
      />
      <div
        css={css`
          height: 100vh;
          width: 100vw;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
        `}
      >
        <Layout
          id="project"
          css={css`
            margin-top: 0;
            padding-top: 5.25rem;
          `}
        >
          <BreadcrumbPath path={props.path} />
          <VideoPlayer video={video} />
          <h2
            css={css`
              margin: 1em;
              text-align: center;
            `}
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              css={css`
                padding: 0.33em;
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
            className="content"
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
                <Link
                  className="project-link"
                  to={previous.fields.slug}
                  rel="prev"
                >
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link className="project-link" to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </Layout>
      </div>
    </Fragment>
  )
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
