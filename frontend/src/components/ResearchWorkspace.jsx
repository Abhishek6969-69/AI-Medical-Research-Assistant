import { SourcePills } from './SourcePills'
import { Composer } from './Composer'
import { WorkspaceHeader } from './WorkspaceHeader'
import { WorkflowStages } from './WorkflowStages'

function getInitials(name) {
  if (!name) return 'JS'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

export function ResearchWorkspace({ copy, user, onLogout }) {
  const initials = getInitials(user?.name)

  return (
    <section className="flex min-h-0 flex-col gap-5 bg-[linear-gradient(180deg,rgba(46,46,46,0.96),rgba(35,35,35,0.98))] px-4 py-5 sm:px-5 lg:px-7 lg:py-6">
      <div className="flex items-center justify-end gap-3">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-[0.95rem] font-semibold text-[#514bb8] shadow-sm">
            {initials}
          </div>
          <div className="hidden pr-1 text-left sm:block">
            <p className="text-[0.92rem] font-semibold text-zinc-50">
              {user?.name || 'Guest workspace'}
            </p>
            <p className="text-[0.8rem] text-white/45">Research session ready</p>
          </div>
        </div>
        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/[0.05]"
          onClick={onLogout}
        >
          Sign out
        </button>
      </div>

      <WorkspaceHeader title={copy.title} subtitle={copy.subtitle} status={copy.status} />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
        <div className="flex flex-col gap-5">
          <div className="rounded-[26px] border border-emerald-300/18 bg-[#1faa83] px-6 py-5 shadow-[0_14px_40px_rgba(17,164,120,0.22)] sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-white/80">
                Query draft
              </p>
              <span className="rounded-full bg-white/14 px-3 py-1 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-white/88">
                Empty state
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-[1.2rem] font-semibold leading-relaxed text-white sm:text-[1.5rem]">
              {copy.questionPlaceholder}
            </p>
          </div>

          <article className="rounded-[26px] border border-white/10 bg-[#252525] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-[1rem] font-semibold uppercase tracking-[0.18em] text-white/42">
                  {copy.summaryTitle}
                </h2>
                <p className="mt-2 max-w-[65ch] text-[1rem] leading-7 text-white/68">
                  {copy.summaryPlaceholder}
                </p>
              </div>
              <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45 sm:block">
                Awaiting input
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {copy.sourceItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-4"
                >
                  <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/42">
                    Source
                  </p>
                  <p className="mt-2 text-[0.98rem] font-semibold text-zinc-50">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <SourcePills items={copy.sourceItems} />
            </div>
          </article>
        </div>

        <div className="flex flex-col gap-5">
          <WorkflowStages stages={copy.stages} />

          <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-white/42">
                Session status
              </p>
              <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-[18px] border border-dashed border-white/10 bg-[#222222] px-4 py-4 text-sm text-white/48">
                No saved research state yet.
              </div>
              <div className="rounded-[18px] border border-dashed border-white/10 bg-[#222222] px-4 py-4 text-sm text-white/48">
                Enter a patient context to generate a session timeline.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Composer placeholder={copy.followUpPlaceholder} />
    </section>
  )
}
