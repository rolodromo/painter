import path from 'path'
import errors from 'restify-errors'
import express from 'express'
import bodyParser from 'body-parser'

import registerRouters from './routes'
import { cleanQueryParams } from './clean_query_params'

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(`> ${req.method} ${req.url}`)
  console.log(cleanQueryParams(req.query))
  next()
})

registerRouters(app)

app.use((err, req, res, next) => {
  console.error(err.message, err.stack)
  res.status(500).send(new errors.InternalServerError(err.message))
})

export default app

