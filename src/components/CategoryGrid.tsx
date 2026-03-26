import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity'

interface SolutionCard {
  title: string
  description?: string
  href: string
  emoji?: string
  image?: { asset?: { _ref?: string } }
}

interface Props {
  title?: string
  subtitle?: string
  cards: SolutionCard[]
}

export default function CategoryGrid({ title, subtitle, cards }: Props) {
  if (!cards.length) return null

  return (
    <section className="py-16 px-4 bg-surface-muted">
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-10">
            {title && <h2 className="text-3xl font-bold text-text mb-3">{title}</h2>}
            {subtitle && <p className="text-text-secondary max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, i) => {
            const imgUrl = card.image?.asset
              ? urlForImage(card.image).width(400).height(250).url()
              : null

            return (
              <Link
                key={`card-${i}`}
                href={card.href}
                className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border"
              >
                <div className="relative h-40 bg-surface-muted flex items-center justify-center">
                  {imgUrl ? (
                    <Image src={imgUrl} alt={card.title} fill className="object-cover" />
                  ) : card.emoji ? (
                    <span className="text-5xl">{card.emoji}</span>
                  ) : (
                    <div className="w-12 h-12 bg-brand-soft rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-header" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-text group-hover:text-brand transition-colors">{card.title}</h3>
                  {card.description && <p className="text-sm text-text-muted mt-1 line-clamp-2">{card.description}</p>}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
