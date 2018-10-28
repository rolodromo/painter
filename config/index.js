require('dotenv').config()

const {
  API_URL,
  PORT,
  ENV
} = process.env // eslint-disable-line no-process-env

module.exports = {
  ENV,
  port: PORT || 3005,
  apiUrl: API_URL
}
