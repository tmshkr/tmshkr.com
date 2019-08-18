import React, { Fragment, useEffect } from "react"
import Navbar from "../components/navbar"
import SEO from "../components/seo"
import ProjectThumbnail from "../components/project-thumbnail"
import { useStaticQuery, graphql } from "gatsby"
import "./projects.scss"

function Projects(props) {
  const data = useStaticQuery(query)
  const { nodes } = data.allMarkdownRemark

  useEffect(() => {
    console.log("effect")
    // const navbar = document.getElementById("navbar")
    // navbar.style.background = "rgba(151, 170, 180, 0.5)"

    // let options = {
    //   root: null,
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // }
    // let observer = new IntersectionObserver(callback, options)

    // let target = document.getElementById("projects")
    // observer.observe(target)

    // function callback(entries, observer) {
    //   console.log(entries, observer)
    //   if (entries[0].isIntersecting) {
    //     document.getElementById("navbar").classList.add("light-text")
    //   } else {
    //     document.getElementById("navbar").classList.remove("light-text")
    //   }
    // }

    // console.log(observer)

    return () => {
      console.log("return effect")
      // observer.disconnect()
    }
  })

  return (
    <Fragment>
      {props.path === "/projects/" && (
        <Fragment>
          <SEO title="Projects" />
          <Navbar />
        </Fragment>
      )}
      <div id="projects" className="full-page">
        <p>Here are some things I've made:</p>
        <ul>
          {nodes.map(node => (
            <ProjectThumbnail key={node.fields.slug} project={node} />
          ))}
        </ul>
        <p>
          Check out my <a href="/blog">blog</a> to see more projects.
        </p>
        <footer>
          <time>© {new Date().getFullYear()}</time>
        </footer>
      </div>
    </Fragment>
  )
}

export default Projects

const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/^/projects//" } } }
      sort: { fields: [frontmatter___title], order: ASC }
      limit: 10
    ) {
      nodes {
        frontmatter {
          title
          url
          thumb
          video
        }
        fields {
          slug
        }
      }
    }
  }
`
