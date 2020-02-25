import React from "react"
import { useStaticQuery, graphql } from "gatsby"

function BuildTime() {
  const { site } = useStaticQuery(
    graphql`
      query BuildTime {
        site {
          buildTimeZone
        }
      }
    `
  )
  return <time>Updated {site.buildTimeZone}</time>
}

export default BuildTime
