// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI


if (process.env.NODE_ENV === 'test') {
    PORT = process.env.TEST_PORT
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
    MONGODB_URI,
    PORT
}