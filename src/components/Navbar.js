import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { throttle } from "lodash"
import classNames from "classnames"
import { rhythm } from "../utils/typography"
// import BreadcrumbPath from "./breadcrumb-path"
import styled from "@emotion/styled"
import Bars from "@fortawesome/fontawesome-free/svgs/solid/bars.svg"
// import Sun from "@fortawesome/fontawesome-free/svgs/solid/sun.svg"
import Moon from "@fortawesome/fontawesome-free/svgs/solid/moon.svg"
import "./navbar.scss"

const Container = styled.div`
  max-width: ${rhythm(24)};
  padding: 0 ${rhythm(3 / 4)};
`

let prevPageYOffset = 0

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
  }

  const [isMenuOpen, openMenu] = useState(initialState.isMenuOpen)
  const [isMobile, setMobile] = useState(initialState.isMobile)
  const [isDarkMode, setDarkMode] = useState(initialState.isDarkMode)
  const [isNavbarVisible, setNavbarVisible] = useState(
    initialState.isNavbarVisible
  )

  const toggleButton = (
    <button
      className="toggle-button"
      onClick={
        isDarkMode ? () => changeTheme("light") : () => changeTheme("dark")
      }
    >
      <Moon id="moon" viewBox="-64 -64 640 640" />
    </button>
  )

  useEffect(() => {
    function callback(e) {
      setMobile(e.matches)
    }
    // setMobile(mobileQuery.matches)
    mobileQuery.addListener(callback)
    return () => {
      mobileQuery.removeListener(callback)
    }
  }, [])

  // autohide navbar
  if (props.autoHideNavbar) {
    useEffect(() => {
      window.onscroll = throttle(() => {
        if (window.__isNavbarVisible) {
          if (
            // scrolling down
            window.pageYOffset - prevPageYOffset > 50 &&
            window.pageYOffset > 100
          ) {
            window.__isNavbarVisible = false
            if (window.requestAnimationFrame) {
              requestAnimationFrame(() => setNavbarVisible(false))
            } else {
              setNavbarVisible(false)
            }
          }
        } else {
          if (
            // scrolling up
            prevPageYOffset - window.pageYOffset > 100 ||
            window.pageYOffset <= 100
          ) {
            window.__isNavbarVisible = true
            if (window.requestAnimationFrame) {
              requestAnimationFrame(() => setNavbarVisible(true))
            } else {
              setNavbarVisible(true)
            }
          }
        }
        prevPageYOffset = window.pageYOffset
      }, 500)

      return () => {
        window.onscroll = null
        prevPageYOffset = 0
      }
    }, [])
  }

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

  const classes = classNames(
    { "menu-open": isMenuOpen },
    { "is-hidden": !isNavbarVisible }
  )

  return (
    <nav
      className={classes}
      onClickCapture={!isMenuOpen && isMobile ? handleClickCapture : null}
    >
      <Container className="container">
        <Link id="navbar-title" to="/">
          tmshkr
        </Link>

        {isMenuOpen && isMobile ? (
          toggleButton
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
          {!isMobile && <li>{toggleButton}</li>}
        </ul>
      </Container>
    </nav>
  )
}

export default Navbar
