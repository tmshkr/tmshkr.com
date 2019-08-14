import React, { Fragment } from "react"
import Navbar from "../components/navbar"
import ProjectThumbnail from "../components/project-thumbnail"
import { useStaticQuery, graphql } from "gatsby"
// import Layout from "../../components/layout"

const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/^/projects//" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      nodes {
        frontmatter {
          title
          url
          thumb
          video
        }
        fields {
          slug
        }
      }
    }
  }
`

function Projects(props) {
  const data = useStaticQuery(query)
  const { title } = data.site.siteMetadata
  const { nodes } = data.allMarkdownRemark
  console.log(nodes)
  return (
    <Fragment>
      {/^\/projects/.test(props.location.pathname) && <Navbar title={title} />}
      <div id="projects" className="full-page">
        <p>Here are some things I've made:</p>
        <ul>
          {nodes.map(node => (
            <ProjectThumbnail key={node.fields.slug} project={node} />
          ))}
        </ul>
        <p>
          Check out my <a href="/blog">blog</a> to see more projects.
        </p>
      </div>
    </Fragment>
  )
}

export default Projects
