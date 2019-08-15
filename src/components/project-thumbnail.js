import React from "react"
import { Link, graphql } from "gatsby"

function ProjectThumbnail(props) {
  const handleClick = () => {
    if (window.location.pathname === "/") {
      window.history.pushState({}, "", "/projects/")
    }
  }

  console.log(props)
  const { title, thumb } = props.project.frontmatter
  const { slug } = props.project.fields
  return (
    <li className="project-thumbnail" onClick={handleClick}>
      <Link to={slug}>
        <img className="thumbnail-image" src={thumb} />
        <span className="project-title">{title}</span>
      </Link>
    </li>
  )
}
export default ProjectThumbnail
