import React, { Fragment } from "react"
import { css } from "@emotion/core"
import Navbar from "./navbar"
import { rhythm } from "../utils/typography"

function Layout(props) {
  const { autoHideNavbar, children, id, className } = props

  return (
    <Fragment>
      <Navbar autoHideNavbar={autoHideNavbar} />
      <main
        id={id}
        className={className}
        css={css`
          margin-left: auto;
          margin-right: auto;
          max-width: ${rhythm(24)};
          margin-top: ${rhythm(1.5)};
          padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
        `}
      >
        {children}
      </main>
      <footer
        css={css`
          padding-bottom: ${rhythm(1.5)};
        `}
      ></footer>
    </Fragment>
  )
}

export default Layout
