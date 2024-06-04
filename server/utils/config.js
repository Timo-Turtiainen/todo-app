require('dotenv').config()

let PORT = process.env.PORT
let GMAIL = process.env.GMAIL
let GMAIL_PASSWORD = process.env.GMAIL_PASSWORD

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  GMAIL,
  GMAIL_PASSWORD,
}
