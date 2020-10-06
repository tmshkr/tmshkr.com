import React from "react"
import { Link } from "gatsby"

import SEO from "../components/seo"
import Navbar from "../components/navbar"
import { Button } from "reactstrap"
import "./home.scss"

function Home(props) {
  return (
    <>
      <SEO />
      <Navbar />
      <main id="home">
        <div id="hello" className="content">
          <h1 className="hero">Hello World</h1>
          <p>
            My name is Tim Shaker.
            <br />
            I'm a full-stack engineer looking to build useful things.
            <br />
            Feel free to <Link to="/contact">contact</Link> me if you want to
            work together.
          </p>
          <Button color="info" onClick={() => props.navigate("/projects")}>
            View Projects
          </Button>
        </div>
      </main>
    </>
  )
}

export default Home
