import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Crumb = { label: string; href: string }

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-2.5 flex flex-wrap items-center gap-1 text-sm text-muted">
        {crumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1">
            {i < crumbs.length - 1 ? (
              <>
                <Link href={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.label}
                </Link>
                <ChevronRight className="w-3 h-3 text-gray-400" />
              </>
            ) : (
              <span className="text-secondary font-semibold">{crumb.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  )
}
