import express from 'express'
import bodyParser from 'body-parser'

import { getBrowser } from './browser'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
	const html = req.body.content
  console.log('request', req.url, html)
  next()
})

app.post('/png', async (req, res) => {
	const html = req.body.content
	const browser = await getBrowser()
	const page = await browser.newPage()

  console.log('content', html.length)
	await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle0' })
  res.header('Content-Type', 'image/png')
	res.send(await page.screenshot({
    type: 'png',
    fullPage: true,
		landscape: true,
		printBackground: true
	}))
})

app.post('/pdf', async (req, res) => {
	const html = req.body.content
	const browser = await getBrowser()
	const page = await browser.newPage()

  console.log('content', html.length)
	await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle0' })

	res.setHeader('Content-Disposition', 'inline; filename="print.pdf"')
	res.send(await page.pdf({
		//path: 'print.pdf',
		format: 'A4',
		landscape: true,
		printBackground: true
	}))
})

app.get('/', async (req, res) => {
  const browser = await getBrowser()
  const page = await browser.newPage()

  const html = '<h1>HELLO WORLD</h1>'
  await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle2' })

  const screen = await page.screenshot({
    type: 'png'
  })
  res.header('Content-Type', 'image/png')
  res.send(screen)
})

export default app

