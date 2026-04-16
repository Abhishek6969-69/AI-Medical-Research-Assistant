function buildSourcesText(top8) {
  return top8
    .map((result, index) => {
      const abstract = (result.abstract || '').slice(0, 600)
      const authors = Array.isArray(result.authors) ? result.authors.slice(0, 3).join(', ') : 'Unknown Authors'
      return `[${index + 1}] Title: ${result.title}\nAuthors: ${authors}\nYear: ${result.year}\nPlatform: ${result.source}\nURL: ${result.url || 'None'}\nAbstract snippet: ${abstract}...`
    })
    .join('\n\n---\n\n')
}

function buildHistoryText(history) {
  return history
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join('\n')
}

function buildLlmPrompt({ query, top8, history, patientContext }) {
  const sourcesText = buildSourcesText(top8)
  const historyText = buildHistoryText(history)

  const systemPrompt = [
    'You are a specialized medical research assistant answering questions using ONLY the provided sources.',
    'Do not hallucinate external medical knowledge.',
    'Always cite your sources using bracketed numbers like [1], [2].',
    `Patient context: ${JSON.stringify(patientContext)}`,
  ].join(' ')

  const userMessage = [
    'RESEARCH SOURCES:',
    sourcesText,
    '',
    'PREVIOUS CONVERSATION:',
    historyText || 'No prior conversation.',
    '',
    `CURRENT QUESTION: ${query}`,
    '',
    'CRITICAL INSTRUCTION: You MUST structure your response EXACTLY with the following 4 sections. Do not include any other sections.',
    '',
    '1. **Condition Overview**',
    'Provide a brief overview of the patient\'s condition.',
    '',
    '2. **Research Insights**',
    'Summarize findings from the provided publications. Cite heavily using [1], [2].',
    '',
    '3. **Clinical Trials**',
    'Summarize any clinical trials provided. If none are applicable, state that no clinical trials match.',
    '',
    '4. **Source Attribution**',
    'List every source you used EXACTLY in this format:',
    '- **Title**: [Title]',
    '  - Authors: [Authors]',
    '  - Year: [Year]',
    '  - Platform: [Platform]',
    '  - URL: [URL]',
    '  - Supporting snippet: [Brief quote proving the source\'s relevance]',
  ].join('\n')

  return {
    systemPrompt,
    userMessage,
  }
}

module.exports = {
  buildLlmPrompt,
}
