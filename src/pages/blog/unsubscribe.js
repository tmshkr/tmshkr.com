import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

function Unsubscribe(props) {
  // tmshkr.com/blog/unsubscribe?foo@bar.com
  const email = props.location.search.slice(1)
  console.log(email)
  return (
    <Layout className="unsubscribe">
      <SEO title="Unsubscribe" />
      <h1 className="page-title">Unsubscribe</h1>
      <span className="line"></span>
      <div className="content">Sorry to see you go.</div>
      <hr />
    </Layout>
  )
}

export default Unsubscribe
