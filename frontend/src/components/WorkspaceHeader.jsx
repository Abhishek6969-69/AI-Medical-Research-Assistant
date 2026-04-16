export function WorkspaceHeader({ user, onLogout }) {
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'AY'

  return (
    <header className="h-[56px] bg-[var(--bg-surface)] border-b border-[var(--border)] flex items-center justify-between px-6 shrink-0 z-10 w-full relative">
      <div className="md:hidden">
        {/* Mobile menu space buffer for hamburger */}
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-4">
        <button 
          onClick={onLogout}
          className="text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          Sign out
        </button>
        <div className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] text-[12px] font-semibold text-[var(--text-secondary)]">
          {initials}
        </div>
      </div>
    </header>
  )
}
