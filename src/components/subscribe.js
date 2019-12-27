import { React, useState } from "react"
import axios from "axios"

function Subscribe(props) {
  const [email, setEmail] = useState("")
  // const contact = {
  //   address: "",
  //   name: "test user",
  //   vars: {},
  //   subscribed: "yes",
  //   upsert: "yes",
  // }

  function handleSubmit(e) {
    e.preventDefault()

    const date = new Date()

    axios
      .post("/.netlify/functions/mg-list", {
        address: email,
        name: "test user",
        vars: { created: date.toUTCString() },
        subscribed: true,
        upsert: "yes",
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  return (
    <form className="subscribe" onSubmit={handleSubmit}>
      <h2>Get my blog posts delivered to your inbox</h2>
      <input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit">Subscribe</button>
    </form>
  )
}

export default Subscribe
