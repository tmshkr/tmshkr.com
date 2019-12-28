require("dotenv").config()

const { MG_API_KEY, MG_DOMAIN, MG_LIST_ADDRESS } = process.env
const mg = require("mailgun-js")({ apiKey: MG_API_KEY, domain: MG_DOMAIN })
const validator = require("email-validator")

const list = mg.lists(MG_LIST_ADDRESS)

exports.handler = (event, context, callback) => {
  console.log("EVENT:")
  console.log(event)
  const { body, httpMethod } = event
  let contact

  try {
    contact = JSON.parse(body)
  } catch {
    return callback(null, {
      statusCode: 400,
      body: "400 Bad Request",
    })
  }

  if (!validator.validate(contact.address)) {
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
        return callback(null, {
          statusCode: 200,
          body: "200 OK",
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
        return callback(null, {
          statusCode: 200,
          body: "200 OK",
        })
      })

    default:
      return callback(null, {
        statusCode: 405,
        body: "405 Method Not Allowed",
      })
  }
}
