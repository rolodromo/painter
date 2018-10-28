import rp from 'request-promise'
import config from '../config'

export const fetchContent = async ({ id, qs }) => {
  console.log('qs', id, qs)
  return rp.get({
    uri: `${config.apiUrl}/api/generators/table/${id}/json`,
    qs: {
      ...qs,
      format: 'json'
    },
    json: true
  })
}
