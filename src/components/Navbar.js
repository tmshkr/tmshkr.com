import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"
import styled from "styled-components/macro"
import Bars from "@fortawesome/fontawesome-free/svgs/solid/bars.svg"
import Sun from "@fortawesome/fontawesome-free/svgs/solid/sun.svg"
import Moon from "@fortawesome/fontawesome-free/svgs/solid/moon.svg"
import "./Navbar.scss"

const mobileQuery = window.matchMedia("(max-width: 600px), (max-height: 500px)")
const Container = styled.div`
  max-width: ${rhythm(24)};
  padding: 0 ${rhythm(3 / 4)};
`

function Navbar(props) {
  const [menuOpen, openMenu] = useState(false)
  const [isMobile, setMobile] = useState(mobileQuery.matches)
  const [isDarkMode, setDarkMode] = useState(window.__theme === "dark")

  const sunButton = (
    <button onClick={() => changeTheme("light")}>
      <Sun id="sun" />
    </button>
  )
  const moonButton = (
    <button onClick={() => changeTheme("dark")}>
      <Moon id="moon" />
    </button>
  )

  useEffect(() => {
    function callback(e) {
      setMobile(e.matches)
    }
    mobileQuery.addListener(callback)
    return () => {
      mobileQuery.removeListener(callback)
    }
  }, [])

  function changeTheme(mode) {
    if (mode === "dark") {
      window.__setPreferredTheme("dark")
      setDarkMode(true)
    } else {
      window.__setPreferredTheme("light")
      setDarkMode(false)
    }
  }

  function handleClickCapture(e) {
    if (e.target.id === "navbar-title") {
      return
    }
    document.onclick = () => {
      document.onclick = null
      document.body.style.cursor = null
      openMenu(false)
    }
    document.body.style.cursor = "pointer"
    openMenu(true)
  }
  return (
    <nav
      className={menuOpen ? "menu-open" : "menu-closed"}
      onClickCapture={!menuOpen && isMobile ? handleClickCapture : null}
    >
      <Container className="container">
        <Link id="navbar-title" to="/blog">
          {props.title}
        </Link>
        {menuOpen && isMobile ? (
          isDarkMode ? (
            sunButton
          ) : (
            moonButton
          )
        ) : (
          <button>
            <Bars />
          </button>
        )}
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {!isMobile && <li>{isDarkMode ? sunButton : moonButton}</li>}
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar
