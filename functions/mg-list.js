require("dotenv").config()

const { MG_API_KEY, MG_DOMAIN, MG_LIST_ADDRESS } = process.env
const mg = require("mailgun-js")({ apiKey: MG_API_KEY, domain: MG_DOMAIN })

const list = mg.lists(MG_LIST_ADDRESS)

const bob = {
  subscribed: true,
  address: `bob${Math.floor(Math.random() * 100000)}@example.com`,
  name: "Bob Bar",
  vars: { created: Date.now() },
}

exports.handler = (event, context, callback) => {
  console.log("EVENT:")
  console.log(event)
  const { body, httpMethod } = event
  let contact

  if (httpMethod === "OPTIONS") {
    return callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Methods": "POST, PUT, OPTIONS",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "Here are the options",
    })
  }

  try {
    contact = JSON.parse(body)
  } catch {
    return callback(null, {
      statusCode: 400,
      body: "400 Bad Request",
    })
  }

  switch (httpMethod) {
    case "POST":
      return list.members().create(contact, function(err, data) {
        if (err) {
          console.error(err)
          return callback(null, {
            statusCode: 500,
            body: "500 Internal Server Error",
          })
        }
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(data),
        })
      })

    case "PUT":
      return list.members(contact.address).update(contact, function(err, data) {
        if (err) {
          console.error(err)
          return callback(null, {
            statusCode: 500,
            body: "500 Internal Server Error",
          })
        }
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(data),
        })
      })

    default:
      callback(null, {
        statusCode: 405,
        body: "405 Method Not Allowed",
      })
  }
}
