const { has, clamp, get } = require('lodash')

const MAX_GENERATIONS = 300

export const cleanQueryParams = (query) => {
  return {
    total: clamp(get(query, 'total', 1), 1, MAX_GENERATIONS),
    stripHeader: !(get(query, 'header', false)),
    stripTags: has(query, 'strip_tags') ? get(query, 'strip_tags') === '1' : false,
    perPage: clamp(get(query, 'per_page', 12), 16)
  }
}
