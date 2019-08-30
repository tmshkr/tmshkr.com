import React, { useEffect } from "react"
import { Global, css } from "@emotion/core"

function Chart() {
  useEffect(() => {
    const scripts = [
      [
        "https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.min.js",
        "sha384-HL96dun1KbYEq6UT/ZlsspAODCyQ+Zp4z318ajUPBPSMzy5dvxl6ziwmnil8/Cpd",
      ],
      [
        "GDP.js",
        "sha384-PC96xYETvEZI5H5XZY6cxqZ9tY/UdYzLSCoE0ARjjwmt6ThyKuzJ+b9xAwpZmPJU",
      ],
    ]

    scripts.forEach(s => {
      const script = document.createElement("script")
      script.async = false
      script.crossOrigin = "anonymous"
      script.integrity = s[1]
      script.src = s[0]
      script.type = "text/javascript"
      document.getElementsByTagName("main")[0].appendChild(script)
    })
  }, [])

  return (
    <div id="gdp">
      <Global
        styles={css`
          #gdp {
            text-align: center;
            font-family: sans-serif;
          }

          body.dark rect.bar {
            fill: #007f80;
          }

          body.light rect.bar {
            fill: #70afb2;
          }

          #tooltip {
            position: absolute;
            font-family: sans-serif;
            text-align: center;
            padding: 0.5em;
            white-space: nowrap;
            color: #fff;
            background-color: #00f;
            visibility: hidden;
            opacity: 0;
          }

          #tooltip text {
            display: block;
          }
        `}
      />
      <h1 id="title">United States GDP</h1>
    </div>
  )
}

export default Chart
