import React, { Fragment, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BreadcrumbPath from "../components/breadcrumb-path"
import ArrowLeft from "@fortawesome/fontawesome-free/svgs/solid/arrow-left.svg"
import ArrowRight from "@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg"
import "./project.scss"

function ProjectTemplate(props) {
  const project = props.data.mdx
  const { attachments, url, title, github_repo } = project.frontmatter
  const { previous, next } = props.pageContext

  function handleKeyup(e) {
    const { previous, next } = props.pageContext
    switch (e.code) {
      case "ArrowLeft":
        previous && props.navigate(previous.fields.slug)
        break
      case "ArrowRight":
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
      <SEO title={project.frontmatter.title} description={project.excerpt} />
      <Layout
        css={css`
          margin-top: 0;
          padding-top: 5.25rem;
        `}
        className={"project"}
      >
        <BreadcrumbPath path={props.path} />
        <div
          className="content"
          css={css`
            margin: 1rem 0;
          `}
        >
          <MDXRenderer
            attachments={attachments}
            github_repo={github_repo}
            url={url}
            title={title}
          >
            {project.body}
          </MDXRenderer>
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
                <ArrowLeft /> {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link className="project-link" to={next.fields.slug} rel="next">
                {next.frontmatter.title} <ArrowRight />
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    </Fragment>
  )
}

export default ProjectTemplate

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        url
        github_repo
        attachments {
          publicURL
        }
      }
      fields {
        slug
      }
      excerpt
      body
    }
  }
`
