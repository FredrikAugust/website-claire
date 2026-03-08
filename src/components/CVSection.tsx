interface CVEntry {
  year: number
  title: string
  venue?: string | null
  location?: string | null
  details?: string | null
  id?: string | null
}

interface CVSectionProps {
  title: string
  entries: CVEntry[]
  compact?: boolean
}

export function CVSection({ title, entries, compact = false }: CVSectionProps) {
  return (
    <div className="mb-12">
      <h2 className="font-heading text-2xl tracking-tight mb-6 pb-3 border-b border-border">
        {title}
      </h2>
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="grid grid-cols-[60px_1fr] gap-4">
            <span className="text-sm text-muted-foreground tabular-nums">{entry.year}</span>
            <div>
              <span className="text-sm">{entry.title}</span>
              {!compact && entry.venue && (
                <span className="text-sm text-muted-foreground">, {entry.venue}</span>
              )}
              {!compact && entry.location && (
                <span className="text-sm text-muted-foreground">, {entry.location}</span>
              )}
              {compact && entry.details && (
                <span className="text-sm text-muted-foreground">, {entry.details}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
