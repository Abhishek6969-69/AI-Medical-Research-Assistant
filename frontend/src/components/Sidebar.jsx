import { SidebarField } from './SidebarField'

export function Sidebar({ copy, values, onFieldChange, onStartSession, conversationId }) {
  return (
    <aside className="flex flex-col gap-6 border-b border-white/10 bg-[#191919] px-5 py-6 lg:border-b-0 lg:border-r lg:px-6 lg:py-7">
      <header className="border-b border-white/10 pb-6">
        <h1 className="text-[2rem] font-semibold tracking-[-0.04em] text-zinc-50">
          <span>{copy.brand.slice(0, 4)}</span>
          <span className="text-emerald-400">{copy.brand.slice(4)}</span>
        </h1>
        <p className="mt-2 text-[1rem] font-medium text-white/60">{copy.tagline}</p>
      </header>

      <section className="flex flex-col gap-4">
        <p className="text-[0.92rem] font-semibold uppercase tracking-[0.14em] text-white/45">
          {copy.sectionLabel}
        </p>

        <div className="flex flex-col gap-4">
          {copy.fields.map((field) => (
            <SidebarField
              key={field.key}
              label={field.label}
              placeholder={field.placeholder}
              value={values[field.key]}
              onChange={(event) => onFieldChange(field.key, event.target.value)}
            />
          ))}
        </div>

        <div>
          <label className="mb-2 block text-[0.95rem] font-semibold text-white/68">
            {copy.focusLabel}
          </label>
          <div className="relative">
            <select
              value={values.focus}
              onChange={(event) => onFieldChange('focus', event.target.value)}
              className="min-h-[64px] w-full appearance-none rounded-[18px] border border-white/10 bg-[#222222] px-5 pr-12 text-[1.02rem] font-semibold text-zinc-50 outline-none transition hover:border-white/15 focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/18"
            >
              <option value="" disabled>
                {copy.focusPlaceholder}
              </option>
              {copy.focusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/52"
            >
              ▾
            </span>
          </div>
        </div>

        <button
          type="button"
          className="mt-1 min-h-[64px] rounded-[18px] border border-white/12 bg-white/4 text-[1.08rem] font-semibold text-zinc-50 transition hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
          onClick={onStartSession}
        >
          {copy.actionLabel}
        </button>
      </section>

      <section className="border-t border-white/10 pt-5">
        <p className="text-[0.92rem] font-semibold uppercase tracking-[0.14em] text-white/45">
          {copy.recentLabel}
        </p>

        <div className="mt-4 rounded-[18px] border border-dashed border-white/10 bg-white/[0.02] px-4 py-5 text-sm text-white/42">
          {conversationId ? `Conversation ID: ${conversationId}` : copy.emptyRecentLabel}
        </div>
      </section>
    </aside>
  )
}
