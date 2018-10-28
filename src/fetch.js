import rp from 'request-promise'

export const fetchContent = async ({ id, qs }) => {
  console.log('qs', id, qs)
  return rp.get({
    uri: `http://localhost:3001/api/generators/table/${id}/json`,
    qs: {
      ...qs,
      format: 'json'
    },
    json: true
  })
}
