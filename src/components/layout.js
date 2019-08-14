import React from "react"
import { Link } from "gatsby"

import Navbar from "./Navbar"
import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children, id, className } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <React.Fragment>
        <Navbar title={title} />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <main className={className} style={{ marginTop: rhythm(1.5) }}>
            {children}
          </main>
          <footer></footer>
        </div>
      </React.Fragment>
    )
  }
}

export default Layout
