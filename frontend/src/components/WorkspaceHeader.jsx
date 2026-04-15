export function WorkspaceHeader({ title, subtitle, status }) {
  return (
    <header className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
          Curalink Console
        </p>
        <h2 className="mt-2 text-[1.5rem] font-semibold tracking-[-0.04em] text-zinc-50 sm:text-[1.8rem]">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-[0.98rem] leading-7 text-white/58">
          {subtitle}
        </p>
      </div>

      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/75">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.12)]" />
        {status}
      </div>
    </header>
  )
}
