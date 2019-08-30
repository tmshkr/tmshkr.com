import React from "react"
import { Helmet } from "react-helmet"
import { Global, css } from "@emotion/core"

function Chart() {
  return (
    <div id="gdp">
      <Helmet>
        <script
          async="false"
          crossorigin="anonymous"
          integrity="sha384-HL96dun1KbYEq6UT/ZlsspAODCyQ+Zp4z318ajUPBPSMzy5dvxl6ziwmnil8/Cpd"
          src="https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.min.js"
          type="text/javascript"
        />
        <script
          async="false"
          crossorigin="anonymous"
          integrity="sha384-PC96xYETvEZI5H5XZY6cxqZ9tY/UdYzLSCoE0ARjjwmt6ThyKuzJ+b9xAwpZmPJU"
          src="GDP.js"
          type="text/javascript"
        />
      </Helmet>
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
