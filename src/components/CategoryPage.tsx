import PortableBody from './PortableBody'
import ProductCard from './ProductCard'
import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = any

interface Product {
  _id: string
  title: string
  slug?: string
  description?: string
  image?: { asset?: { _ref?: string } }
}

interface CategoryPageData {
  title?: string
  seoTitle?: string
  intro?: Block[]
  ctaTitle?: string
  ctaSubtitle?: string
  ctaPrimaryLabel?: string
  ctaPrimaryHref?: string
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
}

interface SiteSettings {
  categoryCtaTitle?: string
  categoryCtaSubtitle?: string
  categoryCtaPrimaryLabel?: string
  categoryCtaPrimaryHref?: string
  categoryCtaSecondaryLabel?: string
  categoryCtaSecondaryHref?: string
}

interface Props {
  page: CategoryPageData | null
  products?: Product[]
  settings?: SiteSettings | null
  pageTitle: string
}

export default function CategoryPage({ page, products = [], settings, pageTitle }: Props) {
  const ctaTitle     = page?.ctaTitle     ?? settings?.categoryCtaTitle     ?? 'Need help choosing?'
  const ctaSubtitle  = page?.ctaSubtitle  ?? settings?.categoryCtaSubtitle  ?? 'Our experts are ready to assist you.'
  const primaryLabel = page?.ctaPrimaryLabel ?? settings?.categoryCtaPrimaryLabel ?? 'Contact us'
  const primaryHref  = page?.ctaPrimaryHref  ?? settings?.categoryCtaPrimaryHref  ?? '/contact'
  const secLabel     = page?.ctaSecondaryLabel ?? settings?.categoryCtaSecondaryLabel
  const secHref      = page?.ctaSecondaryHref  ?? settings?.categoryCtaSecondaryHref

  return (
    <div>
      {/* Page header */}
      <div className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">{page?.title || pageTitle}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Intro body */}
        {page?.intro?.length ? (
          <div className="mb-10 max-w-3xl">
            <PortableBody value={page.intro} />
          </div>
        ) : null}

        {/* Products grid */}
        {products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bg-red-600 text-white rounded-2xl p-8 text-center">
          {ctaTitle && <h2 className="text-2xl font-bold mb-2">{ctaTitle}</h2>}
          {ctaSubtitle && <p className="text-red-100 mb-6">{ctaSubtitle}</p>}
          <div className="flex flex-wrap gap-3 justify-center">
            {primaryLabel && primaryHref && (
              <Link href={primaryHref} className="bg-white text-red-600 hover:bg-red-50 font-semibold px-6 py-2.5 rounded-full transition-colors">
                {primaryLabel}
              </Link>
            )}
            {secLabel && secHref && (
              <Link href={secHref} className="border border-white text-white hover:bg-white/10 font-semibold px-6 py-2.5 rounded-full transition-colors">
                {secLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
