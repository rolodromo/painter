import { Router } from 'express'

import { fetchContent } from '../../fetch'

export const textRouter = new Router()

textRouter.get('/:id', async (req, res) => {
  const data = await fetchContent({
    id: req.params.id,
    qs: req.query
  })
  res.contentType('text/plain')
  res.send(data.join('\n\n'))
})

textRouter.get('/:id/json', async (req, res) => {
  res.send(await fetchContent({
    id: req.params.id,
    qs: req.query
  }))
})

export default textRouter
