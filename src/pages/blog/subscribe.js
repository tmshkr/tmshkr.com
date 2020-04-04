import React from "react"
import Layout from "../../components/layout"
import Subscribe from "../../components/subscribe"
import SEO from "../../components/seo"

function SubscribePage() {
  return (
    <Layout className="text-center">
      <SEO title="Subscribe" />
      <h1 className="page-title">Subscribe</h1>
      <span className="line"></span>
      <div className="content">
        <Subscribe canHide={false} />
      </div>
      <hr />
    </Layout>
  )
}

export default SubscribePage
