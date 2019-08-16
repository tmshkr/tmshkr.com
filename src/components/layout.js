import React, { Fragment } from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"

import Navbar from "./navbar"
import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { autoHideNavbar, path, title, children, id, className } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <Fragment>
        <Navbar autoHideNavbar={autoHideNavbar} />
        <div
          css={css`
            margin-left: auto;
            margin-right: auto;
            max-width: ${rhythm(24)};
          `}
        >
          <main
            id={id}
            className={className}
            css={css`
              margin-top: ${rhythm(1.5)};
              padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
            `}
          >
            {children}
          </main>
          <footer></footer>
        </div>
      </Fragment>
    )
  }
}

export default Layout
