import React, { Fragment } from "react"
import { Link } from "gatsby"

function BreadcrumbPath(props) {
  //   console.log(props)
  const path = props.path.match(/\/[^/]+/g)
  let pathTo = ""
  //   return <h1>BreadcrumbPath</h1>
  return (
    <div className="breadcrumb-path">
      {path.map((p, i) => {
        pathTo += p
        return (
          <Fragment key={pathTo}>
            <Link to={pathTo}>{p.slice(1)}</Link>
            {i < path.length - 1 && " / "}
          </Fragment>
        )
      })}
    </div>
  )
}

export default BreadcrumbPath
