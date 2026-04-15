const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function createAuthors(source, index) {
  return [`${source} Author ${index + 1}`, `Researcher ${index + 2}`]
}

function createPublication({ source, query, index, yearBase, citationBase }) {
  const year = yearBase - (index % 5)
  const title = `${source} result ${index + 1} for ${query}`
  return {
    title,
    abstract: `This ${source.toLowerCase()} record summarizes evidence related to ${query}.`,
    authors: createAuthors(source, index),
    year,
    source,
    url: `https://${source.toLowerCase()}.example.com/${encodeURIComponent(
      query.toLowerCase(),
    )}/${index + 1}`,
    citationCount: citationBase + ((index * 7) % 40),
  }
}

function createTrial({ disease, location, index }) {
  const trialStatuses = ['RECRUITING', 'ACTIVE', 'NOT_YET_RECRUITING', 'COMPLETED']
  return {
    title: `Clinical trial ${index + 1} for ${disease}`,
    abstract: `Trial overview for ${disease}${location ? ` in ${location}` : ''}.`,
    authors: [`Trial Investigator ${index + 1}`],
    year: 2024 - (index % 3),
    source: 'ClinicalTrials',
    url: `https://clinicaltrials.example.com/${encodeURIComponent(
      disease.toLowerCase(),
    )}/${index + 1}`,
    citationCount: 0,
    status: trialStatuses[index % trialStatuses.length],
  }
}

async function fetchPubMed(expandedQuery) {
  await delay(25)

  return Array.from({ length: 100 }, (_, index) =>
    createPublication({
      source: 'PubMed',
      query: expandedQuery,
      index,
      yearBase: 2024,
      citationBase: 18,
    }),
  )
}

async function fetchOpenAlex(expandedQuery) {
  await delay(35)

  return Array.from({ length: 100 }, (_, index) =>
    createPublication({
      source: 'OpenAlex',
      query: expandedQuery,
      index,
      yearBase: 2024,
      citationBase: 42,
    }),
  )
}

async function fetchTrials(disease, location) {
  await delay(45)

  return Array.from({ length: 50 }, (_, index) =>
    createTrial({
      disease,
      location,
      index,
    }),
  )
}

module.exports = {
  fetchPubMed,
  fetchOpenAlex,
  fetchTrials,
}
