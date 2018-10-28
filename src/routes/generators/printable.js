import { chunk } from 'lodash'
import { Router } from 'express'

import { renderPng } from '../../render/png'
import { renderPdf } from '../../render/pdf'
import { fetchContent } from '../../fetch'
import { cleanQueryParams } from '../../clean_query_params'

export const printRouter = new Router()

printRouter.get('/:id/html', async (req, res) => {
  const { perPage } = cleanQueryParams(req.query)
  const data = await fetchContent({
    id: req.params.id,
    qs: req.query
  })
  const pages = chunk(data, perPage)

  res.render('printable', { pages })
})

printRouter.get('/:id/png', async (req, res) => {
  const { perPage } = cleanQueryParams(req.query)

  const data = await fetchContent({
    id: req.params.id,
    qs: req.query
  })
  const pages = chunk(data, perPage)

  res.render('printable', { pages }, async (_, html) => {
    res.contentType('image/png')
    res.send(await renderPng(html))
  })
})

printRouter.get('/:id/pdf', async (req, res) => {
  const { perPage } = cleanQueryParams(req.query)
  const data = await fetchContent({
    id: req.params.id,
    qs: req.query
  })

  const pages = chunk(data, perPage)

  res.render('printable', { pages }, async (_, html) => {
    const disposition = req.query.format === 'inline' ? 'inline' : 'attachment'
    res.contentType('application/pdf')
    res.setHeader('Content-Disposition', `${disposition}; filename="print.pdf"`)
    res.send(await renderPdf(html))
  })
})

export default printRouter
