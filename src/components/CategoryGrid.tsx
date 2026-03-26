import Link from 'next/link'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity'

export type SolutionCard = {
  title?: string | null
  description?: string | null
  href?: string | null
  emoji?: string | null
  image?: {asset?: {_ref?: string}} | null
}

type Props = {
  title?: string | null
  subtitle?: string | null
  cards: SolutionCard[]
}

const defaultCards: SolutionCard[] = [
  {
    title: 'Remote Grease Lines',
    description: 'Safe greasing without removing machine guards.',
    href: '/auto-lube-systems/remote-grease-lines',
    emoji: '🔧',
  },
  {
    title: 'Auto Lube Systems',
    description: 'Automated lubrication for heavy machinery.',
    href: '/auto-lube-systems/ilc-autolubrication-systems',
    emoji: '⚙️',
  },
  {
    title: 'Lubricants',
    description: 'Quality lubrication products from leading brands.',
    href: '/lubricants',
    emoji: '🛢️',
  },
  {
    title: 'Oil Sampling',
    description: 'Monitor your lubricant health with oil sampling.',
    href: '/more-lubrication/oil-sampling',
    emoji: '🧪',
  },
  {
    title: 'Fluid Handling',
    description: 'Oil, grease, and fuel handling equipment.',
    href: '/fluid-handling',
    emoji: '🚿',
  },
  {
    title: 'Breathers & Air Vents',
    description: 'Protect your equipment from contamination.',
    href: '/more-lubrication/breathers',
    emoji: '💨',
  },
]

export default function CategoryGrid({title, subtitle, cards}: Props) {
  const list = cards.length ? cards : defaultCards
  const h = title || 'OUR SOLUTIONS'
  const sub =
    subtitle ||
    'Explore our comprehensive range of lubrication products and systems designed for Australian industry.'
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="font-heading text-3xl md:text-4xl text-center text-secondary mb-2">{h}</h2>
      <p className="text-center text-muted mb-12 max-w-xl mx-auto">{sub}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((cat) => {
          if (!cat.href || !cat.title) return null
          const imgUrl = cat.image?.asset ? urlFor(cat.image).width(400).height(240).url() : null
          return (
            <Link
              key={cat.href}
              href={cat.href}
              className="group border border-gray-200 rounded-sm p-8 hover:border-primary hover:shadow-md transition-all duration-200 flex flex-col"
            >
              {imgUrl ? (
                <div className="relative w-full h-36 mb-4 rounded-sm overflow-hidden">
                  <Image src={imgUrl} alt={cat.title || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              ) : cat.emoji ? (
                <span className="text-5xl mb-4">{cat.emoji}</span>
              ) : null}
              <h3 className="font-heading font-bold text-xl text-secondary mb-2 group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
              {cat.description ? <p className="text-sm text-muted flex-grow">{cat.description}</p> : null}
              <span className="mt-4 text-primary font-semibold text-sm uppercase tracking-wider group-hover:translate-x-1 inline-block transition-transform">
                View Products →
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
