import React, { Fragment, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BreadcrumbPath from "../components/breadcrumb-path"
import VideoPlayer from "../components/video-player"
import TitleLink from "../components/title-link"
import ArrowLeft from "@fortawesome/fontawesome-free/svgs/solid/arrow-left.svg"
import ArrowRight from "@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg"

function ProjectTemplate(props) {
  const project = props.data.textDocument
  const { video, url, title } = project.fields
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
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <SEO
        title={project.fields.title}
        description={project.fields.description || project.excerpt}
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
          {project.html && <TitleLink title={title} url={url} />}
          <div
            className="content"
            css={css`
              margin: 1rem 0;
            `}
            dangerouslySetInnerHTML={project.html && { __html: project.html }}
          >
            {project.body && (
              <MDXRenderer fields={project.fields}>{project.body}</MDXRenderer>
            )}
          </div>
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
    textDocument(fields: { slug: { eq: $slug } }) {
      fields {
        title
        slug
        date(formatString: "MMMM DD, YYYY")
        excerpt
        url
        video
        github_repo
      }
      excerpt
      ... on Mdx {
        body
      }
      ... on MarkdownRemark {
        html
      }
    }
  }
`
