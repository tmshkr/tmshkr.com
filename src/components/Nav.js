import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"

const navStyle = {
  marginLeft: `auto`,
  marginRight: `auto`,
  maxWidth: rhythm(24),
  padding: `0 ${rhythm(3 / 4)}`,
}

const titleStyle = {
  boxShadow: `none`,
  textDecoration: `none`,
  color: `inherit`,
}

function Nav() {
  return (
    <nav style={navStyle}>
      <Link style={titleStyle} to="/">
        tmshkr
      </Link>
    </nav>
  )
}

export default Nav
