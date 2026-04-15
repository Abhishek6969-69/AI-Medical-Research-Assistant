import { Sidebar } from '../components/Sidebar'
import { ResearchWorkspace } from '../components/ResearchWorkspace'
import { appCopy } from '../data/curalinkMock'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useState } from 'react'
import { sendChatPayload } from '../api/chat'

function createConversationId() {
  return crypto.randomUUID()
}

export function DashboardPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [conversationId, setConversationId] = useState(() => createConversationId())
  const [form, setForm] = useState({
    name: user?.name || '',
    disease: '',
    location: '',
    focus: 'Treatments & therapies',
    query: '',
  })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('Ready for stage 2 and 3.')
  const [response, setResponse] = useState('')

  function handleLogout() {
    signOut()
    navigate('/signin', { replace: true })
  }

  function handleFieldChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleStartSession() {
    setConversationId(createConversationId())
    setStatus('New conversation id created.')
    setResponse('')
  }

  async function handleSend() {
    if (!form.name || !form.disease || !form.focus || !form.query) {
      setStatus('Please fill name, disease, focus, and query.')
      return
    }

    setSending(true)
    setStatus('Sending payload to /api/chat...')

    try {
      const payload = {
        conversationId,
        name: form.name,
        disease: form.disease,
        location: form.location,
        focus: form.focus,
        query: form.query,
      }

      const result = await sendChatPayload(payload)
      setConversationId(result.conversationId)
      setResponse(
        `Expanded query: "${result.expandedQuery}" | Raw pool: ${result.rawPoolCount} results (${result.sourceCounts.PubMed} PubMed, ${result.sourceCounts.OpenAlex} OpenAlex, ${result.sourceCounts.ClinicalTrials} ClinicalTrials)`,
      )
      setStatus(result.message)
    } catch (error) {
      setStatus(error.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="min-h-dvh bg-[#121212] p-3 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_32%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.04),transparent_35%)]" />
      <div className="relative mx-auto grid min-h-[calc(100dvh-1.5rem)] max-w-[1480px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(38,38,38,0.98),rgba(26,26,26,0.98))] shadow-[0_24px_80px_rgba(0,0,0,0.42)] lg:grid-cols-[minmax(320px,37%)_minmax(0,1fr)]">
        <Sidebar
          copy={appCopy.sidebar}
          values={form}
          onFieldChange={handleFieldChange}
          onStartSession={handleStartSession}
          conversationId={conversationId}
        />
        <ResearchWorkspace
          copy={appCopy.workspace}
          user={user}
          onLogout={handleLogout}
          query={form.query}
          onQueryChange={(value) => handleFieldChange('query', value)}
          onSend={handleSend}
          sending={sending}
          status={status}
          response={response}
        />
      </div>
    </main>
  )
}
