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
    <section className="py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        {title && <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>}
        {body?.length ? (
          <PortableBody value={body} className="text-left prose prose-gray max-w-none" />
        ) : null}
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  )
}
