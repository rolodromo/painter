import { shuffle, compact } from 'lodash'
import { Router } from 'express'

import { renderPng } from '../../render/png'
import { fetchContent } from '../../fetch'

export const storycubesRouter = new Router()

const COLORS = 'green red blue yellow orangine pink grey lime cyan'.split(' ')

const getIcons = str => {
  const colors = shuffle(COLORS)
  return str
    .match(/(?:class=)"(([^'])*?)"/gm)
    .map((x, idx) => {
      const [ icon/*, color */] = compact(x.replace(/class="(.*)"/, '$1')
        .replace(/(gi gi-| gi-.x|gi-inset gi-)/g, ' ')
        .split(' '))
      return { icon: `gi-${icon}`, color: `gi-color-${colors[idx]}` }
    })
}
storycubesRouter.get('/', async (req, res) => {
  const [ str ] = await fetchContent({
    id: 'r1yvGJa1-',
    qs: {
      strip_tags: '0',
      total: 1
    }
  })
  const icons = getIcons(str)
  console.log('icons', icons)
  res.render('storycubes', { icons }, async (_, html) => {
    res.contentType('image/png')
    res.send(await renderPng(html, {
      fullPage: false,
      omitBackground: true,
      printBackground: false,
      viewport: {
        width: 600,
        height: 600
      }
    }))
  })
})


