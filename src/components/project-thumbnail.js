import React from "react"
import { Link } from "gatsby"

function ProjectThumbnail(props) {
  const handleClick = () => {
    if (window.location.pathname === "/") {
      window.history.pushState({}, "Projects | tmshkr", "/projects/")
    }
  }

  const { title, thumb } = props.project.frontmatter
  const { slug } = props.project.fields
  return (
    <li className="project-thumbnail" onClick={handleClick}>
      <Link to={slug}>
        <img className="thumbnail-image" alt={title} src={thumb} />
        <span className="project-title">{title}</span>
      </Link>
    </li>
  )
}
export default ProjectThumbnail
