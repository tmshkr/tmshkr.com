import React, { Fragment } from "react"
import { css } from "@emotion/core"
import Folder from "@fortawesome/fontawesome-free/svgs/regular/Folder.svg"
import { Link } from "gatsby"

function BreadcrumbPath(props) {
  const path = props.path.match(/\/[^/]+/g)
  let to = ""

  return (
    <div
      css={css`
        font-family: sans-serif;
      `}
    >
      {path.map((p, i) => {
        if (i === path.length - 1) {
          return p.slice(1)
        }
        to += p
        return (
          <Fragment key={to}>
            <Link
              to={to}
              css={css`
                box-shadow: none;
              `}
            >
              {i === 0 && (
                <Folder
                  css={css`
                    fill: #fff;
                    width: 1em;
                    margin: 0.25em;
                    margin-bottom: -3px;
                  `}
                />
              )}
              {p.slice(1)}
            </Link>
            {i < path.length - 1 && " / "}
          </Fragment>
        )
      })}
    </div>
  )
}

export default BreadcrumbPath
