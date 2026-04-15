import { Composer } from './Composer'

function getInitials(name) {
  if (!name) return 'JS'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

export function ResearchWorkspace({
  copy,
  user,
  onLogout,
  query,
  onQueryChange,
  onSend,
  sending,
  status,
  response,
}) {
  const initials = getInitials(user?.name)

  return (
    <section className="flex min-h-0 flex-col gap-5 bg-[linear-gradient(180deg,rgba(46,46,46,0.96),rgba(35,35,35,0.98))] px-4 py-5 sm:px-5 lg:px-7 lg:py-6">
      <div className="flex items-center justify-end gap-3">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-lg font-semibold text-[#514bb8] shadow-sm">
          {initials}
        </div>
        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/[0.05]"
          onClick={onLogout}
        >
          Sign out
        </button>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-5">
        <p className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
          {copy.stageTitle}
        </p>
        <p className="mt-3 max-w-2xl text-[1rem] leading-7 text-white/60">
          {copy.stageSubtitle}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {copy.pipelineSteps.map((step, index) => (
          <article
            key={step.title}
            className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white/38">
              0{index + 1}
            </p>
            <h2 className="mt-3 text-[1rem] font-semibold text-zinc-50">{step.title}</h2>
            <p className="mt-2 text-[0.92rem] leading-6 text-white/54">{step.detail}</p>
          </article>
        ))}
      </div>

      <Composer
        label={copy.queryLabel}
        placeholder={copy.queryPlaceholder}
        value={query}
        onChange={onQueryChange}
        onSend={onSend}
        loading={sending}
        status={status}
      />

      <div className="rounded-[22px] border border-white/10 bg-[#252525] p-5">
        <h3 className="text-[1rem] font-semibold uppercase tracking-[0.18em] text-white/42">
          {copy.responseTitle}
        </h3>
        <p className="mt-3 text-[0.96rem] leading-7 text-white/64">
          {response || copy.responsePlaceholder}
        </p>
      </div>
    </section>
  )
}
