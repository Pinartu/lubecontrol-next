import Link from 'next/link'
import PortableBody from './PortableBody'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = any

interface Props {
  title?: string
  body?: Block[]
  ctaLabel?: string
  ctaHref?: string
}

export default function WelcomeSection({ title, body, ctaLabel, ctaHref }: Props) {
  if (!title && !body?.length) return null

  return (
    <section className="py-16 px-4 bg-surface">
      <div className="max-w-3xl mx-auto text-center">
        {title && <h2 className="text-3xl font-bold text-text mb-6">{title}</h2>}
        {body?.length ? (
          <PortableBody value={body} className="text-left max-w-none" />
        ) : null}
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="mt-6 inline-block bg-brand hover:bg-brand-hover text-header font-semibold px-8 py-3 rounded-full transition-colors"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  )
}
