import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { throttle } from "lodash"
import { rhythm } from "../utils/typography"
import styled from "styled-components/macro"
import Bars from "@fortawesome/fontawesome-free/svgs/solid/bars.svg"
import Sun from "@fortawesome/fontawesome-free/svgs/solid/sun.svg"
import Moon from "@fortawesome/fontawesome-free/svgs/solid/moon.svg"
import "./Navbar.scss"

const Container = styled.div`
  max-width: ${rhythm(24)};
  padding: 0 ${rhythm(3 / 4)};
`

let prevScrollY = 0

function Navbar(props) {
  let mobileQuery
  const initialState = {
    isMenuOpen: false,
    isMobile: false,
    isDarkMode: false,
    isNavbarVisible: true,
  }

  if (typeof window !== `undefined`) {
    mobileQuery = window.matchMedia("(max-width: 600px), (max-height: 500px)")
    initialState.isDarkMode = window.__theme === "dark"
    initialState.isMobile = mobileQuery.matches
    initialState.isNavbarVisible = window.__isNavbarVisible
  }

  const [isMenuOpen, openMenu] = useState(initialState.isMenuOpen)
  const [isMobile, setMobile] = useState(initialState.isMobile)
  const [isDarkMode, setDarkMode] = useState(initialState.isDarkMode)
  const [isNavbarVisible, setNavbarVisible] = useState(
    initialState.isNavbarVisible
  )

  const sunButton = (
    <button title="Change to Light Mode" onClick={() => changeTheme("light")}>
      <Sun id="sun" />
    </button>
  )
  const moonButton = (
    <button title="Change to Dark Mode" onClick={() => changeTheme("dark")}>
      <Moon id="moon" viewBox="-20 -20 540 540" />
    </button>
  )

  useEffect(() => {
    function callback(e) {
      setMobile(e.matches)
    }
    setMobile(mobileQuery.matches)
    mobileQuery.addListener(callback)
    return () => {
      mobileQuery.removeListener(callback)
    }
  }, [])

  useEffect(() => {
    window.onscroll = throttle(() => {
      console.log(prevScrollY)

      if (window.scrollY < prevScrollY) {
        console.log("scrolling up")
        window.__isNavbarVisible = true
        requestAnimationFrame(() => setNavbarVisible(true))
        // setNavbarVisible(true)
      } else {
        console.log("scrolling down")
        window.__isNavbarVisible = false
        requestAnimationFrame(() => setNavbarVisible(false))
        // setNavbarVisible(false)
      }

      prevScrollY = window.scrollY
      // console.log(scrollY)
      // console.log(e)
    }, 500)

    return () => {
      window.onscroll = null
      prevScrollY = 0
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
      className={isMenuOpen ? "menu-open" : "menu-closed"}
      onClickCapture={!isMenuOpen && isMobile ? handleClickCapture : null}
      style={
        isNavbarVisible
          ? { transform: "translateY(0)" }
          : { transform: "translateY(-100%)" }
      }
    >
      <Container className="container">
        <Link id="navbar-title" to="/blog">
          {props.title}
        </Link>
        {isMenuOpen && isMobile ? (
          isDarkMode ? (
            sunButton
          ) : (
            moonButton
          )
        ) : (
          <button aria-label="Open Menu">
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
