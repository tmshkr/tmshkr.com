import { React, useState } from "react"
import axios from "axios"
import validator from "email-validator"

function Subscribe(props) {
  let { canHide } = props
  let blogSubscribeHidden = false
  try {
    const t = localStorage.getItem("blogSubscribeHidden")
    const d = Date.now() - t
    const millisecondsInDay = 86400000
    if (d < millisecondsInDay * 14) {
      if (!(canHide === false)) {
        canHide = true
      }
      blogSubscribeHidden = true
      window.__blogSubscribeHidden = true
    }
  } catch (err) {}

  const [email, setEmail] = useState("")
  const [isHidden, setHidden] = useState(canHide && blogSubscribeHidden)
  const [message, setMessage] = useState("")

  function handleHide(e) {
    setHidden(true)
    try {
      localStorage.setItem("blogSubscribeHidden", Date.now())
    } catch (err) {}
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validator.validate(email)) {
      return setMessage("Please enter a valid email address")
    }

    const date = new Date()

    axios
      .post("/.netlify/functions/mg-list", {
        address: email,
        vars: { modified: date.toUTCString() },
        subscribed: true,
        upsert: "yes",
      })
      .then(function(response) {
        setMessage(`${email} subscribed! Stay tuned for future updates.`)
      })
      .catch(function(error) {
        setMessage("There was a problem.")
      })
  }

  return (
    <div className="text-center" style={isHidden ? { display: "none" } : null}>
      <h2>Get my blog posts delivered to your inbox</h2>
      <form className="subscribe" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Subscribe</button>
      </form>
      <p>
        {message
          ? message
          : canHide && (
              <button id="hide-subscribe" onClick={handleHide}>
                hide
              </button>
            )}
      </p>
    </div>
  )
}

export default Subscribe
