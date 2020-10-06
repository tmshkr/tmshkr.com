import React, { useEffect, useRef } from "react"

function Comments(props) {
  const commentsRef = useRef(null)
  const { term } = props

  useEffect(() => {
    const injectUtterances = () => {
      const scriptEl = document.createElement("script")
      scriptEl.async = true
      scriptEl.src = "https://utteranc.es/client.js"
      scriptEl.setAttribute("repo", "tmshkr/tmshkr.com-comments")
      scriptEl.setAttribute("issue-term", term)
      scriptEl.setAttribute("id", "utterances")
      scriptEl.setAttribute("theme", `github-${window.__theme}`)
      scriptEl.setAttribute("crossorigin", "anonymous")
      commentsRef.current.appendChild(scriptEl)
    }
    const handleThemeChange = e => {
      const c = commentsRef.current
      if (c.firstChild) c.removeChild(c.firstChild)
      injectUtterances()
    }
    if (commentsRef.current) {
      injectUtterances()
      window.addEventListener("themechange", handleThemeChange)
    }

    return () => window.removeEventListener("themechange", handleThemeChange)
    // eslint-disable-next-line
  }, [])

  return <div ref={commentsRef} className="Comments"></div>
}

export default Comments
