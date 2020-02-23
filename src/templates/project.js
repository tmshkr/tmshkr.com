import React, { Fragment, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BreadcrumbPath from "../components/breadcrumb-path"
import VideoPlayer from "../components/video-player"
import ExternalLink from "@fortawesome/fontawesome-free/svgs/solid/external-link-alt.svg"
import ArrowLeft from "@fortawesome/fontawesome-free/svgs/solid/arrow-left.svg"
import ArrowRight from "@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg"

function ProjectTemplate(props) {
  const project = props.data.markdownRemark
  const { video, url } = project.frontmatter
  const { previous, next } = props.pageContext

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

  useEffect(() => {
    document.onkeyup = handleKeyup
    return () => (document.onkeyup = null)
  }, [])

  return (
    <Fragment>
      <SEO
        title={project.frontmatter.title}
        description={project.frontmatter.description || project.excerpt}
      />
      <div>
        <Layout
          id="project"
          css={css`
            margin-top: 0;
            padding-top: 5.25rem;
          `}
        >
          <BreadcrumbPath path={props.path} />
          {video && <VideoPlayer video={video} />}
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
                  <ArrowLeft /> {previous.fields.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link className="project-link" to={next.fields.slug} rel="next">
                  {next.fields.title} <ArrowRight />
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
