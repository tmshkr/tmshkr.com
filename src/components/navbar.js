import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { throttle } from "lodash"
import classNames from "classnames"
import { rhythm } from "../utils/typography"
import { css } from "@emotion/core"
import Bars from "@fortawesome/fontawesome-free/svgs/solid/bars.svg"
import Moon from "@fortawesome/fontawesome-free/svgs/solid/moon.svg"
import "./navbar.scss"

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

  function changeTheme(mode) {
    if (mode === "dark") {
      window.__setPreferredTheme("dark")
      setDarkMode(true)
    } else {
      window.__setPreferredTheme("light")
      setDarkMode(false)
    }
  }

  useEffect(() => {
    function callback(e) {
      setMobile(e.matches)
    }
    // setMobile(mobileQuery.matches)
    mobileQuery.addListener(callback)

    const navLinks = document.querySelectorAll("nav li a")
    navLinks.forEach(function(el) {
      el.ontouchstart = function() {
        this.style.backgroundColor = "rgba(64, 149, 191, 0.5)"
      }
      el.ontouchend = function() {
        this.style.backgroundColor = ""
      }
    })
    return () => {
      mobileQuery.removeListener(callback)
    }
    // eslint-disable-next-line
  }, [])

  // autohide navbar
  useEffect(() => {
    if (props.autoHideNavbar) {
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
            prevPageYOffset - window.pageYOffset > 50 ||
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
    }
    // eslint-disable-next-line
  }, [])

  function handleClickCapture(e) {
    if (e.target.id === "navbar-title") {
      return
    }
    document.onclick = e => {
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
      id="navbar"
      className={classes}
      onClickCapture={!isMenuOpen && isMobile ? handleClickCapture : null}
    >
      <div
        className="container"
        css={css`
          max-width: ${rhythm(24)};
          padding: 0 ${rhythm(3 / 4)};
        `}
      >
        <Link id="navbar-title" to="/">
          tmshkr
        </Link>

        {isMenuOpen && isMobile ? (
          toggleButton
        ) : (
          <button aria-label="Open Menu">
            <Bars id="bars" />
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
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {!isMobile && <li>{toggleButton}</li>}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
