const { Pinecone } = require('@pinecone-database/pinecone');

async function test() {
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const response = await pinecone.inference.embed({
    model: process.env.PINECONE_EMBEDDING_MODEL || 'multilingual-e5-large',
    inputs: ['test'],
    parameters: { inputType: 'passage', truncate: 'END' }
  });
  console.log(JSON.stringify(response, null, 2));
}
test().catch(console.error);
