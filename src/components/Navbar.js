import React, { useState } from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import styled from "styled-components/macro"
import "./Navbar.scss"

const Container = styled.div`
  max-width: ${rhythm(24)};
  padding: 0 ${rhythm(3 / 4)};
`

function Nav(props) {
  const [menuOpen, toggleMenu] = useState(false)
  const handleClickCapture = e => {
    if (e.target.id === "navbar-title" && !menuOpen) {
      return
    }
    //TODO: add document.onclick to click off menu
    toggleMenu(!menuOpen)
  }
  return (
    <nav
      className={menuOpen ? "menu-open" : "menu-closed"}
      onClickCapture={handleClickCapture}
    >
      <Container className="container">
        <Link id="navbar-title" to="/blog">
          {props.title}
        </Link>
        <button>
          <span></span>
        </button>
        <ul>
          <li>
            <Link to="/blog">About</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/blog">Contact</Link>
          </li>
        </ul>
      </Container>
    </nav>
  )
}

export default Nav
