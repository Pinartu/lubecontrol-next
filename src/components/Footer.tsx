import Link from 'next/link'

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  body?: string
  links?: FooterLink[]
}

interface FooterContent {
  columns?: FooterColumn[]
  copyrightCompany?: string
}

interface Props {
  content: FooterContent | null
}

export default function Footer({ content }: Props) {
  const columns = content?.columns ?? []
  const company = content?.copyrightCompany ?? 'Lube Control'
  const year = new Date().getFullYear()

  return (
    <footer className="bg-header text-text-muted mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {columns.length > 0 && (
          <div className="grid gap-8 mb-10"
               style={{ gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))` }}>
            {columns.map((col, ci) => (
              <div key={`fcol-${ci}`}>
                <h3 className="text-surface font-semibold mb-3">{col.title}</h3>
                {col.body && <p className="text-sm leading-relaxed mb-3 text-text-muted">{col.body}</p>}
                {col.links?.map((link, li) => (
                  <Link key={`fl-${ci}-${li}`} href={link.href} className="block text-sm text-text-muted hover:text-brand transition-colors mb-1">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-border pt-6 text-center text-sm text-text-muted">
          &copy; {year} {company}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
