import React from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import "./Nav.scss"

const navStyle = {
  maxWidth: rhythm(24),
  padding: `0 ${rhythm(3 / 4)}`,
}

function Nav(props) {
  console.log(props)
  return (
    <nav style={navStyle}>
      <Link to="/">{props.title}</Link>
      <div>
        <Link to="/">About</Link>
        <Link to="/">Blog</Link>
        <Link to="/">Contact</Link>
      </div>
    </nav>
  )
}

export default Nav
