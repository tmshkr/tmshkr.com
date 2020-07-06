import React, { Fragment } from "react"
import SEO from "../components/seo"
import Navbar from "../components/navbar"
import BuildTime from "../components/build-time"
import "./home.scss"

function Home(props) {
  return (
    <Fragment>
      <SEO />
      <Navbar />
      <main id="home">
        <div id="hello">
          <h1 className="hero">Hello, I'm Tim</h1>
          <p>
            I'm currently studying Full Stack Web Development at Lambda School.
            Check out what I've been working on lately:
          </p>
          <div>
            <a href="/projects/" className="button">
              View Projects
            </a>
          </div>
          <BuildTime />
        </div>
      </main>
    </Fragment>
  )
}

export default Home
