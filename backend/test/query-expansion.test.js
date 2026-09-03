const test = require('node:test')
const assert = require('node:assert/strict')

const { expandSearchPayload } = require('../src/services/queryExpansion')

test('expandSearchPayload strips trailing question marks from user queries', () => {
  const result = expandSearchPayload({
    query: 'is there an emergency clinic open late around my location if I get an attack at night?',
    disease: 'hypertension',
    location: 'Boston',
    focus: 'Emergency care',
  })

  assert.equal(result.expandedQuery.includes('?'), false)
  assert.equal(result.publicationQuery.includes('?'), false)
  assert.equal(result.openAlexQuery.includes('?'), false)
  assert.equal(result.trialQuery.includes('?'), false)
})
