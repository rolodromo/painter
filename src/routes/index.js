import { printRouter } from './generators/printable'
import { textRouter } from './generators/text'
import { storycubesRouter } from './storycubes/storycubes'

export default (app) => {
  app.use('/generators', printRouter)
  app.use('/generators', textRouter)
  app.use('/storycubes', storycubesRouter)
}
