export function Composer({ label, placeholder, value, onChange, onSend, loading, status }) {
  return (
    <footer className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-white/42">
            {label}
          </p>
          <p className="mt-2 text-[0.96rem] text-white/52">
            {status || 'Add context to refine the clinical search.'}
          </p>
        </div>
      </div>

      <div className="grid min-h-[164px] grid-cols-[minmax(0,1fr)_auto] gap-4">
        <textarea
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="resize-none rounded-[18px] border border-white/10 bg-[#222222] px-5 py-4 text-[1.04rem] font-semibold leading-7 text-zinc-50 outline-none placeholder:text-white/38 transition focus:border-emerald-400/40 focus:ring-2 focus:ring-emerald-400/18"
        />

        <button
          type="button"
          onClick={onSend}
          disabled={loading}
          className="mt-auto grid h-16 w-16 place-items-center rounded-[18px] border border-emerald-300/18 bg-emerald-400/12 text-[1.35rem] text-emerald-50 transition hover:bg-emerald-400/18 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          aria-label="Send question"
        >
          {loading ? '...' : '→'}
        </button>
      </div>
    </footer>
  )
}
