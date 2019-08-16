import React, { Fragment } from "react"
import { css } from "@emotion/core"
import Folder from "@fortawesome/fontawesome-free/svgs/regular/Folder.svg"
import { Link } from "gatsby"

function BreadcrumbPath(props) {
  const path = props.path.match(/\/[^/]+/g)
  let to = ""

  return (
    <div
      className="breadcrumb-path"
      data-disable-menu-open={true}
      css={css`
        font-family: sans-serif;
        a {
          box-shadow: none;
        }
        body.dark & {
          color: #fff;
        }
        body.light & {
          color: #000;
      `}
    >
      {path.map((p, i) => {
        if (i === path.length - 1) {
          return p.slice(1)
        }
        to += p
        return (
          <Fragment key={to}>
            <Link to={to} data-disable-menu-open={true}>
              {i === 0 && (
                <Folder
                  css={css`
                    width: 1em;
                    margin: 0.25em;
                    margin-bottom: -3px;
                    body.dark & {
                      fill: #fff;
                    }
                    body.light & {
                      fill: #000;
                    }
                  `}
                />
              )}
              {p.slice(1)}
            </Link>
            {" / "}
          </Fragment>
        )
      })}
    </div>
  )
}

export default BreadcrumbPath
