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
      <Link to="/blog">{props.title}</Link>
      <div>
        <Link to="/blog">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/blog">Contact</Link>
      </div>
    </nav>
  )
}

export default Nav
