function normalizeText(value) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
}

function unique(values) {
  return [...new Set(values.filter(Boolean))]
}

function buildPhraseVariants(text) {
  const normalized = normalizeText(text)
  if (!normalized) return []

  const variants = [normalized]
  const lowerText = normalized.toLowerCase()

  const synonymMap = {
    'deep brain stimulation': ['DBS'],
    dbs: ['deep brain stimulation'],
    "parkinson's disease": ['Parkinson disease', 'PD'],
    'parkinson disease': ["Parkinson's disease", 'PD'],
    pd: ["Parkinson's disease", 'Parkinson disease'],
  }

  for (const [key, extraVariants] of Object.entries(synonymMap)) {
    if (lowerText.includes(key)) {
      variants.push(...extraVariants)
    }
  }

  return unique(variants)
}

function quoteIfNeeded(value) {
  const normalized = normalizeText(value)
  if (!normalized) return ''

  if (/\s/.test(normalized) || /[()]/.test(normalized)) {
    return `"${normalized}"`
  }

  return normalized
}

function buildBooleanOrClause(terms) {
  const cleanTerms = unique(terms.map(quoteIfNeeded))
  if (!cleanTerms.length) return ''
  if (cleanTerms.length === 1) return cleanTerms[0]
  return `(${cleanTerms.join(' OR ')})`
}

function buildHumanSearchText(...parts) {
  return unique(parts.map(normalizeText)).join(' ')
}

function expandSearchPayload({ query, disease, location, focus }) {
  const cleanedQuery = normalizeText(query)
  const cleanedDisease = normalizeText(disease)
  const cleanedLocation = normalizeText(location)
  const cleanedFocus = normalizeText(focus)

  const queryVariants = buildPhraseVariants(cleanedQuery)
  const diseaseVariants = buildPhraseVariants(cleanedDisease)
  const focusVariants = buildPhraseVariants(cleanedFocus)

  const publicationQueryParts = []
  if (queryVariants.length) {
    publicationQueryParts.push(buildBooleanOrClause(queryVariants))
  }
  if (diseaseVariants.length) {
    publicationQueryParts.push(buildBooleanOrClause(diseaseVariants))
  }
  if (focusVariants.length) {
    publicationQueryParts.push(buildBooleanOrClause(focusVariants))
  }

  const publicationQuery = publicationQueryParts.filter(Boolean).join(' AND ')
  const openAlexQuery = buildHumanSearchText(
    cleanedQuery,
    cleanedDisease,
    cleanedFocus,
    cleanedLocation,
    ...queryVariants.slice(1, 3),
    ...diseaseVariants.slice(1, 3),
  )
  const trialQuery = buildHumanSearchText(cleanedQuery, cleanedDisease, cleanedLocation, cleanedFocus)
  const expandedQuery = buildHumanSearchText(cleanedQuery, cleanedDisease)

  return {
    expandedQuery,
    publicationQuery: publicationQuery || openAlexQuery || cleanedQuery,
    openAlexQuery: openAlexQuery || publicationQuery || cleanedQuery,
    trialQuery: trialQuery || publicationQuery || cleanedQuery,
    queryVariants,
    diseaseVariants,
    focusVariants,
  }
}

module.exports = {
  expandSearchPayload,
  normalizeText,
}
