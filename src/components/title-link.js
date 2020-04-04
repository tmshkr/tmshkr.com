import React from "react"
import ExternalLink from "@fortawesome/fontawesome-free/svgs/solid/external-link-alt.svg"
import "./title-link.scss"

function TitleLink(props) {
  let title, url, github_repo
  props.fields
    ? ({ title, url, github_repo } = props.fields)
    : ({ title, url, github_repo } = props)

  return (
    <h2 className="title-link">
      <a
        className="title-link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {title} <ExternalLink />
      </a>
    </h2>
  )
}
export default TitleLink
