import React from "react"
import Layout from "../components/layout"
import LinkedIn from "@fortawesome/fontawesome-free/svgs/brands/linkedin.svg"
import Instagram from "@fortawesome/fontawesome-free/svgs/brands/instagram.svg"
import Twitter from "@fortawesome/fontawesome-free/svgs/brands/twitter-square.svg"
import GitHub from "@fortawesome/fontawesome-free/svgs/brands/github.svg"
import Codepen from "@fortawesome/fontawesome-free/svgs/brands/codepen.svg"
import "./contact.scss"

function Contact(props) {
  return (
    <Layout location={props.location} className="contact" title={"tmshkr"}>
      <h1>Contact</h1>
      <div className="social">
        <p>Feel free to connect on social media:</p>
        <a
          href="https://www.linkedin.com/in/tmshkr/"
          alt="LinkedIn"
          title="LinkedIn"
        >
          <LinkedIn />
        </a>
        <a
          href="https://www.instagram.com/tmshkr/"
          alt="Instagram"
          title="Instagram"
        >
          <Instagram />
        </a>
        <a href="https://twitter.com/tmshkr/" alt="Twitter" title="Twitter">
          <Twitter />
        </a>
        <a href="https://github.com/tmshkr/" alt="GitHub" title="GitHub">
          <GitHub />
        </a>
        <a href="https://codepen.io/tmshkr/" alt="Codepen" title="Codepen">
          <Codepen />
        </a>
      </div>
      You can also{" "}
      <a href="&#109;&#97;i&#108;&#116;&#111;&#58;&#37;74im&#64;t&#109;sh&#107;r&#37;2E%63om">
        &#101;m&#97;i&#108;
      </a>{" "}
      me and subscribe to my{" "}
      <a rel="noopener noreferrer" target="_blank" href="/feed.xml">
        RSS feed
      </a>
      .
    </Layout>
  )
}

export default Contact
