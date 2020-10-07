import React, { useEffect, useRef } from "react"

function Comments(props) {
  const commentsRef = useRef(null)
  const { term } = props

  useEffect(() => {
    const script = document.createElement("script")
    script.async = true
    script.src = "https://utteranc.es/client.js"
    script.setAttribute("repo", "tmshkr/tmshkr.com-comments")
    script.setAttribute("issue-term", term)
    script.setAttribute("id", "utterances")
    script.setAttribute("theme", `github-${window.__theme}`)
    script.setAttribute("crossorigin", "anonymous")
    commentsRef.current.appendChild(script)

    const handleThemeChange = e => {
      document
        .querySelector("iframe.utterances-frame")
        .contentWindow.postMessage(
          { type: "set-theme", theme: `github-${window.__theme}` },
          "https://utteranc.es/"
        )
    }

    window.addEventListener("themechange", handleThemeChange)

    return () => window.removeEventListener("themechange", handleThemeChange)
    // eslint-disable-next-line
  }, [])

  return <div ref={commentsRef} className="Comments"></div>
}

export default Comments
