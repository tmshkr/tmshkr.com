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
      css={css`
        margin-bottom: 1rem;
        body.dark & a {
          color: #40b2bf;
        }
        body.light & a {
          color: #003269;
      `}
    >
      {path.map((p, i) => {
        if (i === path.length - 1) {
          return p.slice(1)
        }
        to += p
        return (
          <Fragment key={to}>
            <Link to={to}>
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
