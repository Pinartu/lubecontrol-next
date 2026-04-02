import { urlForImage } from '@/lib/sanity'
import CategoryPreviewCard from '@/components/CategoryPreviewCard'

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
              ? urlForImage(card.image).width(800).height(480).url()
              : null

            return (
              <CategoryPreviewCard
                key={`card-${i}`}
                href={card.href}
                title={card.title}
                description={card.description}
                imageUrl={imgUrl}
                imageAlt={card.title}
                showBrowseHint={false}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
