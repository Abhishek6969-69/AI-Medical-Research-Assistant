export const appCopy = {
  sidebar: {
    brand: 'Curalink',
    tagline: 'AI Medical Research Assistant',
    status: 'Workspace ready',
    sectionLabel: 'Patient context',
    fields: [
      { label: 'Patient name', placeholder: 'Enter patient name' },
      { label: 'Disease / condition', placeholder: 'Enter disease or condition' },
      { label: 'Location (optional)', placeholder: 'Optional location' },
    ],
    focusLabel: 'Research focus',
    focusPlaceholder: 'Choose a research focus',
    actionLabel: 'Start research session',
    recentLabel: 'Recent sessions',
    emptyRecentLabel: 'No saved sessions yet',
  },
  workspace: {
    title: 'Research workspace',
    subtitle: 'Build a clinical query, review evidence, and iterate with follow-ups.',
    status: 'No session running',
    questionPlaceholder: 'Ask a medical research question...',
    summaryTitle: 'Evidence canvas',
    summaryPlaceholder:
      'Your retrieved studies, clinical signals, and synthesis will appear here once a session starts.',
    sourceTitle: 'Connected sources',
    sourceItems: ['PubMed', 'OpenAlex', 'ClinicalTrials'],
    followUpPlaceholder: 'Ask a follow-up question...',
    stages: [
      { title: 'Context', detail: 'Define the patient profile and clinical focus.' },
      { title: 'Search', detail: 'Pull evidence from medical and trial sources.' },
      { title: 'Synthesize', detail: 'Summarize findings into a usable answer.' },
    ],
  },
}
