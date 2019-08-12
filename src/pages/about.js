import React from "react"
import Layout from "../components/layout.js"
import "./about.scss"

function About(props) {
  return (
    <Layout location={props.location} className="about" title={"tmshkr"}>
      <h1>About Me</h1>
      <p>Hello, my name is Tim Shaker.</p>
      <p>
        I'm a self-taught developer, focusing on JavaScript, Node, React, and
        UI/UX design, in addition to having a working knowledge of Python. I've
        completed most of the [freeCodeCamp
        curriculum](https://www.freecodecamp.org/tmshkr) and am currently
        seeking opportunities in software development.
      </p>
      <p>
        You can see some of the [projects](/projects/) I've made, check out my
        [blog](/blog/), or [contact](/contact/) me directly.
      </p>
    </Layout>
  )
}

export default About
