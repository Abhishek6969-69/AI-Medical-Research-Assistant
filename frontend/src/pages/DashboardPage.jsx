import { Sidebar } from '../components/Sidebar'
import { ResearchWorkspace } from '../components/ResearchWorkspace'
import { appCopy } from '../data/curalinkMock'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export function DashboardPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    signOut()
    navigate('/signin', { replace: true })
  }

  return (
    <main className="min-h-dvh bg-[#121212] p-3 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_32%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.04),transparent_35%)]" />
      <div className="relative mx-auto grid min-h-[calc(100dvh-1.5rem)] max-w-[1480px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(38,38,38,0.98),rgba(26,26,26,0.98))] shadow-[0_24px_80px_rgba(0,0,0,0.42)] lg:grid-cols-[minmax(320px,37%)_minmax(0,1fr)]">
        <Sidebar copy={appCopy.sidebar} />
        <ResearchWorkspace copy={appCopy.workspace} user={user} onLogout={handleLogout} />
      </div>
    </main>
  )
}
