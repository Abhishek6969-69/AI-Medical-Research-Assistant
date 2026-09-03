const { Pinecone } = require('@pinecone-database/pinecone')

const apiKey = process.env.PINECONE_API_KEY
const indexName = process.env.PINECONE_INDEX_NAME || 'medical-index'
const namespace = process.env.PINECONE_NAMESPACE || 'curalink'

const pinecone = apiKey ? new Pinecone({ apiKey }) : null

function getIndex() {
  if (!pinecone) {
    throw new Error('PINECONE_API_KEY is not configured')
  }

  return pinecone.index(indexName)
}

async function upsertEmbeddings(conversationId, records) {
  if (!pinecone) {
    throw new Error('PINECONE_API_KEY is not configured')
  }

  const index = getIndex()
  const vectors = records
    .map((record, indexPosition) => ({
      id: `${conversationId}-${indexPosition}`,
      values: record.embedding,
      metadata: {
        conversationId,
        title: record.title,
        abstract: record.abstract,
        authors: Array.isArray(record.authors) ? record.authors.join(', ') : String(record.authors || 'Unknown'),
        year: record.year,
        source: record.source,
        url: record.url,
        citationCount: record.citationCount,
        status: record.status || '',
        semanticScore: record.semanticScore,
      },
    }))
    .filter((v) => Array.isArray(v.values) && v.values.length > 0)

  if (vectors.length === 0) {
    return { indexName, namespace, vectorCount: 0 }
  }

  // Pinecone SDK v7 expects { records: [...] } and enforces a max of 100 records per call.
  for (let i = 0; i < vectors.length; i += 100) {
    const chunk = vectors.slice(i, i + 100)
    await index.namespace(namespace).upsert({ records: chunk })
  }

  return {
    indexName,
    namespace,
    vectorCount: vectors.length,
  }
}

module.exports = {
  getIndex,
  upsertEmbeddings,
}
