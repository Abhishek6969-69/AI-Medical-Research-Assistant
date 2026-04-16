export function AnswerBubble({ answer }) {
  if (!answer) return null

  const renderTextWithCitations = (text) => {
    const parts = text.split(/(\[\d+\])/g)
    return parts.map((part, i) => {
      if (/^\[\d+\]$/.test(part)) {
        return (
          <span
            key={i}
            className="inline-flex items-center justify-center bg-[#4D8EFF18] text-[#4D8EFF] border border-[#4D8EFF40] rounded-[4px] px-[5px] py-[1px] text-[11px] font-semibold cursor-pointer hover:bg-[#4D8EFF30] mx-1 transition-colors"
          >
            {part}
          </span>
        )
      }
      return <span key={i}>{part.replace(/\*\*(.*?)\*\*/g, '$1')}</span>
    })
  }

  const lines = answer.split('\n').map((l) => l.trim()).filter(Boolean)

  let currentSection = ''

  return (
    <div className="flex flex-col gap-3">
      {lines.map((line, idx) => {
        // Section Header (e.g. 1. **Title**)
        if (/^\d+\.\s+\*\*(.*?)\*\*$/.test(line)) {
          const title = line.replace(/^\d+\.\s+\*\*(.*?)\*\*$/, '$1')
          currentSection = title.toLowerCase()
          return (
            <div key={idx} className="mt-4 mb-1">
              <h4 className="text-[10px] font-bold tracking-[0.1em] text-[var(--text-muted)] uppercase mb-3">
                {title}
              </h4>
              <h3 className="text-[15px] font-semibold text-[var(--text-primary)]">
                {line.replace(/\*\*/g, '')}
              </h3>
            </div>
          )
        }

        // Bullet points / Cards (e.g. - **Title**: body)
        if (line.startsWith('- **')) {
          const match = line.match(/-\s+\*\*(.*?)\*\*:\s*(.*)?/)
          if (match) {
            const [_, cardTitle, maybeCardBody] = match
            const cardBody = maybeCardBody || ''
            const isClinicalTrial = currentSection.includes('trial') || cardTitle.toLowerCase().includes('trial')

            return (
              <div
                key={idx}
                className={`bg-[var(--bg-elevated)] border border-[var(--border)] rounded-[10px] p-[16px] mb-1 ${
                  isClinicalTrial ? 'border-l-[3px] border-l-[#4D8EFF]' : 'border-l-[3px] border-l-[#00C896]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-[13px] font-semibold text-[var(--text-primary)]">{cardTitle}</h5>
                  {isClinicalTrial && cardBody.toLowerCase().includes('recruiting') && (
                    <span className="px-2 py-0.5 rounded-full bg-[#00C89618] text-[#00C896] border border-[#00C89640] text-[11px] font-semibold">
                      RECRUITING
                    </span>
                  )}
                  {isClinicalTrial && !cardBody.toLowerCase().includes('recruiting') && (
                    <span className="px-2 py-0.5 rounded-full bg-[#8B8BA018] text-[#8B8BA0] border border-[#8B8BA040] text-[11px] font-semibold uppercase">
                      TRIAL
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-[var(--text-secondary)] leading-[1.7]">
                  {renderTextWithCitations(cardBody)}
                </p>
              </div>
            )
          }
        }

        // Standard bullet without bold header
        if (line.startsWith('- ')) {
           return (
            <div key={idx} className="flex gap-3 text-[14px] leading-[1.8] text-[var(--text-secondary)] pl-2">
               <span className="text-[var(--text-muted)]">•</span>
               <span>{renderTextWithCitations(line.substring(2))}</span>
            </div>
           )
        }

        // Regular paragraphs
        return (
          <p key={idx} className="text-[14px] leading-[1.8] text-[var(--text-secondary)]">
            {renderTextWithCitations(line)}
          </p>
        )
      })}
    </div>
  )
}
