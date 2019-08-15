import React, { Fragment } from "react"
import { css } from "@emotion/core"
import { Link } from "gatsby"

import Navbar from "./navbar"
import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { path, title, children, id, className } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <Fragment>
        <Navbar title={title} path={path} />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
          }}
        >
          <main
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
