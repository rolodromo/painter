import bytes from 'bytes'
import express from 'express'
import bodyParser from 'body-parser'

import { getBrowser } from './browser'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  const html = req.body.content
  console.log(`> ${req.method} ${req.url}. length: ${bytes(html.length)}`)
  next()
})

app.post('/png', async (req, res) => {
  const html = req.body.content
  const browser = await getBrowser()
  const page = await browser.newPage()

  await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle0' })
  res.header('Content-Type', 'image/png')
  res.send(await page.screenshot({
    type: 'png',
    fullPage: true,
    printBackground: true
  }))
})

app.post('/pdf', async (req, res) => {
  const html = req.body.content
  const browser = await getBrowser()
  const page = await browser.newPage()

  await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle0' })

  res.setHeader('Content-Disposition', 'inline; filename="print.pdf"')
  res.send(await page.pdf({
    format: 'A4',
    landscape: true,
    printBackground: true
  }))
})

export default app

