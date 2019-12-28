import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import axios from "axios"
import Layout from "../../components/layout"

function Unsubscribe(props) {
  const email = props.location.search.slice(1)
  const [message, setMessage] = useState("Loading...")

  useEffect(() => {
    let date = new Date()
    axios
      .put("/.netlify/functions/mg-list", {
        address: email,
        vars: { unsubscribed: date.toUTCString() },
        subscribed: false,
        upsert: "yes",
      })
      .then(function(response) {
        console.log(response)
        setMessage(`${email} has been unsubscribed.`)
      })
      .catch(function(error) {
        console.log(error)
        setMessage("There was a problem.")
      })
  }, [])

  console.log(email)
  return (
    <Layout className="text-center">
      <h1 className="page-title">Unsubscribe</h1>
      <span className="line"></span>
      <div className="content">
        <p>{message}</p>
        <p>
          You can always <Link to="/blog/subscribe">subscribe</Link> again.
        </p>
      </div>
      <hr />
    </Layout>
  )
}

export default Unsubscribe
