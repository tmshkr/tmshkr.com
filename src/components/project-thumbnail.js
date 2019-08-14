import React from "react"
import { Link, graphql } from "gatsby"

function ProjectThumbnail(props) {
  //   const handleClick = () => {
  //     const { history, slug } = this.props;
  //     if (history.location.pathname === "/") {
  //       history.push("/projects/");
  //     }
  //     history.push(`/projects/${slug}/`);
  //   };

  console.log(props)
  const { title, thumb } = props.project.frontmatter
  const { slug } = props.project.fields
  return (
    <li className="project-thumbnail">
      <Link to={slug}>
        <img className="thumbnail-image" src={thumb} />
        <span className="project-title">{title}</span>
      </Link>
    </li>
  )
}
export default ProjectThumbnail
