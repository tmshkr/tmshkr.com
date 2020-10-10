import React, { useState } from "react"
import { css } from "@emotion/core"

function RandomColor() {
  const { floor, random } = Math
  const [hue, setHue] = useState(floor(random() * 360))
  /* eslint-disable */
  return (
    <div
      className="mobile-full-width"
      css={css`
        padding: 2rem;
        color: hsl(${hue}, 100%, 50%);
        background: hsla(${hue}, 100%, 25%, 0.75);
        user-select: none;
        cursor: pointer;
        h3 {
          filter: invert(1);
          margin: 0;
        }
      `}
      onClick={() => setHue(floor(random() * 360))}
    >
      <h3>Click to change color</h3>
    </div>
  )
}

export default RandomColor
