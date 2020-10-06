import React, { useEffect, useRef } from "react"

function Comments(props) {
  const comments = useRef(null)

  useEffect(() => {
    const injectUtterances = () => {
      const scriptEl = document.createElement("script")
      scriptEl.async = true
      scriptEl.src = "https://utteranc.es/client.js"
      scriptEl.setAttribute("repo", "tmshkr/tmshkr.com-comments")
      scriptEl.setAttribute("issue-term", "og:title")
      scriptEl.setAttribute("id", "utterances")
      scriptEl.setAttribute("theme", `github-${window.__theme}`)
      scriptEl.setAttribute("crossorigin", "anonymous")
      comments.current.appendChild(scriptEl)
    }
    const handleThemeChange = e => {
      const c = comments.current
      if (c.firstChild) c.removeChild(c.firstChild)
      injectUtterances()
    }
    if (comments.current) {
      injectUtterances()
      window.addEventListener("themechange", handleThemeChange)
    }

    return () => window.removeEventListener("themechange", handleThemeChange)
  }, [])

  return <div ref={comments} className="Comments"></div>
}

export default Comments
