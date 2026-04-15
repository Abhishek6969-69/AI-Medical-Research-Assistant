import { SidebarField } from './SidebarField'

export function Sidebar({ copy }) {
  return (
    <aside className="flex flex-col gap-6 border-b border-white/10 bg-[#191919] px-5 py-6 lg:border-b-0 lg:border-r lg:px-6 lg:py-7">
      <header className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[2rem] font-semibold tracking-[-0.04em] text-zinc-50">
              <span>{copy.brand.slice(0, 4)}</span>
              <span className="text-emerald-400">{copy.brand.slice(4)}</span>
            </h1>
            <p className="mt-2 text-[1rem] font-medium text-white/60">{copy.tagline}</p>
          </div>

          <div className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-emerald-300">
            {copy.status}
          </div>
        </div>
      </header>

      <section className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-white/[0.02] p-5">
        <p className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-white/45">
          {copy.sectionLabel}
        </p>

        <div className="flex flex-col gap-4">
          {copy.fields.map((field) => (
            <SidebarField key={field.label} label={field.label} placeholder={field.placeholder} />
          ))}
        </div>

        <div>
          <label className="mb-2 block text-[0.95rem] font-semibold text-white/68">
            {copy.focusLabel}
          </label>
          <button
            type="button"
            className="flex min-h-[64px] w-full items-center justify-between rounded-[18px] border border-white/10 bg-[#222222] px-5 text-left text-[1.02rem] font-semibold text-zinc-50 transition hover:border-white/15 hover:bg-[#242424] focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          >
            <span className="text-white/42">{copy.focusPlaceholder}</span>
            <span aria-hidden="true" className="text-white/52">
              ▾
            </span>
          </button>
        </div>

        <button
          type="button"
          className="mt-1 min-h-[64px] rounded-[18px] border border-emerald-300/20 bg-emerald-400/12 text-[1.04rem] font-semibold text-emerald-100 transition hover:bg-emerald-400/16 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
        >
          {copy.actionLabel}
        </button>
      </section>

      <section className="rounded-[24px] border border-white/10 bg-white/[0.02] p-5">
        <p className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-white/45">
          {copy.recentLabel}
        </p>

        <div className="mt-4 rounded-[18px] border border-dashed border-white/10 bg-[#222222] px-4 py-5 text-sm text-white/42">
          {copy.emptyRecentLabel}
        </div>
      </section>
    </aside>
  )
}
