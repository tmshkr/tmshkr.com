import React from "react"
// import Layout from "../components/layout.js"
import Navbar from "../components/navbar"
import Projects from "./projects"
import ArrowDown from "@fortawesome/fontawesome-free/svgs/solid/arrow-down.svg"
import "./home.scss"

function Home(props) {
  const scrollTo = id => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    })
  }
  return (
    <div id="home">
      <Navbar />
      <div id="hello" className="full-page" onClick={() => scrollTo("bio")}>
        <h1 className="hero">Hello, I'm Tim</h1>
        <p>I design and develop web applications for humans.</p>
        <ArrowDown className="arrow bounce" />
      </div>
      <div id="bio" className="full-page" onClick={() => scrollTo("projects")}>
        <p>
          I grew up with computers and have been familiar with web technologies
          for most of my life. I'm at home with developer tools and am no
          stranger to the command line.
        </p>
        <p>
          I've studied art, design, science, and most recently earned a degree
          in philosophy. After graduating, I rekindled my interest in
          technology, particularly in using React to make web applications.
        </p>
      </div>
      <Projects location={props.location} />
    </div>
  )
}

export default Home
