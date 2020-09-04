import React from "react"
import ExternalLink from "@fortawesome/fontawesome-free/svgs/solid/external-link-alt.svg"
import GitHub from "@fortawesome/fontawesome-free/svgs/brands/github.svg"
import "./title-link.scss"

function TitleLink(props) {
  const { title, url, github_repo } = props
  return (
    <div id="title-link">
      <h2>
        <a
          className="title-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {title} <ExternalLink />
        </a>
      </h2>

      {github_repo && (
        <a
          className="github"
          href={github_repo}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Source
          <GitHub />
        </a>
      )}
    </div>
  )
}
export default TitleLink
