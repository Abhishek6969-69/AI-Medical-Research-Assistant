export const appCopy = {
  sidebar: {
    brand: 'Curalink',
    tagline: 'AI Medical Research Assistant',
    sectionLabel: 'Patient context',
    fields: [
      { key: 'name', label: 'Patient name', placeholder: 'Enter patient name' },
      {
        key: 'disease',
        label: 'Disease / condition',
        placeholder: 'Enter disease or condition',
      },
      { key: 'location', label: 'Location (optional)', placeholder: 'Optional location' },
    ],
    focusLabel: 'Research focus',
    focusPlaceholder: 'Choose a research focus',
    focusOptions: ['Treatments & therapies', 'Diagnostics & monitoring', 'Clinical trials'],
    actionLabel: 'Start research session',
    recentLabel: 'Recent sessions',
    emptyRecentLabel: 'No saved sessions yet',
  },
  workspace: {
    stageTitle: 'Stage 4',
    stageSubtitle: 'Express expands the query and fetches all sources in parallel.',
    pipelineSteps: [
      {
        title: 'Frontend',
        detail: 'React gathers the patient context and query into one payload.',
      },
      {
        title: 'POST /api/chat',
        detail: 'The browser sends the request to the Express route.',
      },
      {
        title: 'Query expansion',
        detail: 'The backend combines intent with the disease term.',
      },
      {
        title: 'Parallel fetch',
        detail: 'PubMed, OpenAlex, and ClinicalTrials run together.',
      },
    ],
    queryLabel: 'Ask a follow-up question',
    queryPlaceholder: 'What are the latest deep brain stimulation treatments?',
    responseTitle: 'Merged pool preview',
    responsePlaceholder: 'The combined result count will appear here after you click send.',
    sendLabel: 'Send',
  },
}
