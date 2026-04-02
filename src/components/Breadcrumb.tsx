import Link from 'next/link'
import type { BreadcrumbItem } from '@/lib/navigation'

interface Props {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: Props) {
  if (items.length <= 1) return null

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-surface-muted border-b border-border">
      <div className="max-w-7xl mx-auto">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-text-muted">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={`bc-${i}`} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden="true" className="text-border">/</span>}
                {isLast ? (
                  <span aria-current="page" className="text-text-secondary font-medium">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-brand transition-colors">{item.label}</Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
