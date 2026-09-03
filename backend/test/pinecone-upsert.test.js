const test = require('node:test')
const assert = require('node:assert/strict')

process.env.PINECONE_API_KEY = 'test-api-key'
process.env.PINECONE_INDEX_NAME = 'medical-index'
process.env.PINECONE_NAMESPACE = 'curalink'

let upsertPayload
const mockIndex = {
  namespace: () => ({
    upsert: async (payload) => {
      upsertPayload = payload
      return { upserted: true }
    },
  }),
}

test('upsertEmbeddings sends records under the Pinecone v7 payload shape', async () => {
  const pineconePkg = require('@pinecone-database/pinecone')
  const originalIndex = pineconePkg.Pinecone.prototype.index
  pineconePkg.Pinecone.prototype.index = function stubIndex() {
    return mockIndex
  }

  delete require.cache[require.resolve('../src/services/pinecone')]
  const { upsertEmbeddings } = require('../src/services/pinecone')

  try {
    await upsertEmbeddings('conversation-123', [
      {
        embedding: [0.1, 0.2, 0.3],
        title: 'Sample article',
        abstract: 'Abstract text',
        authors: ['A', 'B'],
        year: 2024,
        source: 'PubMed',
        url: 'https://example.com',
        citationCount: 7,
        status: 'published',
        semanticScore: 0.9,
      },
    ])

    assert.ok(upsertPayload, 'expected Pinecone upsert payload to be generated')
    assert.ok(Array.isArray(upsertPayload.records), 'expected records array wrapper')
    assert.equal(upsertPayload.records.length, 1)
    assert.equal(upsertPayload.records[0].id, 'conversation-123-0')
  } finally {
    pineconePkg.Pinecone.prototype.index = originalIndex
    delete require.cache[require.resolve('../src/services/pinecone')]
  }
})
