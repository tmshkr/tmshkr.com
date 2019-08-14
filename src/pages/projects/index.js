import React, { Fragment } from "react"
import Navbar from "../../components/Navbar"
// import Layout from "../../components/layout"

function Projects(props) {
  console.log(props)
  return (
    <Fragment>
      {/^\/projects/.test(props.location.pathname) && <Navbar title="tmshkr" />}
      <div id="projects" className="full-page">
        <p>Here are some things I've made:</p>
        <ul>foo</ul>
        <p>
          Check out my <a href="/blog">blog</a> to see more projects.
        </p>
      </div>
    </Fragment>
  )
}

export default Projects
