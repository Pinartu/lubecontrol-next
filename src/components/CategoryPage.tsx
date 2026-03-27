import PortableBody from './PortableBody'
import ProductCard from './ProductCard'
import Link from 'next/link'
import PdfDownloadsGrid from './PdfDownloadsGrid'
import SubcategoryCard, { Subcategory } from './SubcategoryCard'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = any

export interface Product {
  _id: string
  title: string
  slug?: string
  description?: string
  image?: { asset?: { _ref?: string } }
}

export interface PdfDownload {
  _key?: string
  title: string
  description?: string
  externalUrl?: string
  file?: { asset?: { url?: string } }
  thumbnail?: { asset?: { url?: string } }
}

export interface CategoryPageData {
  title?: string
  seoTitle?: string
  intro?: Block[]
  pdfDownloads?: PdfDownload[]
  ctaTitle?: string
  ctaSubtitle?: string
  ctaPrimaryLabel?: string
  ctaPrimaryHref?: string
  ctaSecondaryLabel?: string
  ctaSecondaryHref?: string
}

export interface SiteSettings {
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
  subcategories?: Subcategory[]
  settings?: SiteSettings | null
  pageTitle: string
}

export default function CategoryPage({ page, products = [], subcategories = [], settings, pageTitle }: Props) {
  const ctaTitle     = page?.ctaTitle     ?? settings?.categoryCtaTitle     ?? 'Need Help Choosing?'
  const ctaSubtitle  = page?.ctaSubtitle  ?? settings?.categoryCtaSubtitle  ?? 'Our team of experts is ready to help you find the right lubrication solution.'
  const primaryLabel = page?.ctaPrimaryLabel ?? settings?.categoryCtaPrimaryLabel ?? 'Contact Us'
  const primaryHref  = page?.ctaPrimaryHref  ?? settings?.categoryCtaPrimaryHref  ?? '/contact'
  const secLabel     = page?.ctaSecondaryLabel ?? settings?.categoryCtaSecondaryLabel ?? '1300 917 946'
  const secHref      = page?.ctaSecondaryHref  ?? settings?.categoryCtaSecondaryHref  ?? 'tel:1300917946'

  const hasSubcategories = subcategories.length > 0
  const hasProducts = products.length > 0
  const hasPdfs = (page?.pdfDownloads?.length ?? 0) > 0

  return (
    <div className="min-h-screen">
      {/* ── Page hero ── */}
      <div className="bg-header text-white py-14 px-4 border-b-4 border-brand">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
            {page?.title || pageTitle}
          </h1>
          {/* Show description from intro as plain text below the title */}
          {!page?.intro?.length && (
            <p className="mt-3 text-gray-300 text-base md:text-lg max-w-2xl">
              Quality lubrication solutions for Australian industry.
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">

        {/* ── Intro body from CMS ── */}
        {page?.intro?.length ? (
          <div className="prose prose-lg max-w-3xl text-text">
            <PortableBody value={page.intro} />
          </div>
        ) : null}

        {/* ── Subcategories grid ── */}
        {hasSubcategories && (
          <section>
            <h2 className="text-2xl font-bold text-text mb-6 uppercase tracking-wide border-b-2 border-brand pb-2">
              Browse Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategories.map((sub) => (
                <SubcategoryCard key={sub._id} subcategory={sub} />
              ))}
            </div>
          </section>
        )}

        {/* ── Products grid ── */}
        {hasProducts && (
          <section>
            <h2 className="text-2xl font-bold text-text mb-6 uppercase tracking-wide border-b-2 border-brand pb-2">
              Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* ── PDF Downloads ── */}
        {hasPdfs && (
          <section>
            <h2 className="text-2xl font-bold text-text mb-6 uppercase tracking-wide border-b-2 border-brand pb-2">
              Downloads &amp; Catalogues
            </h2>
            <PdfDownloadsGrid downloads={page!.pdfDownloads!} />
          </section>
        )}

        {/* ── Empty state ── */}
        {!hasSubcategories && !hasProducts && !hasPdfs && !page?.intro?.length && (
          <div className="text-center py-16 text-text-muted">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-lg">Content coming soon. Add products or subcategories via the CMS.</p>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        <div className="bg-brand rounded-2xl p-8 md:p-12 text-center">
          {ctaTitle && <h2 className="text-2xl md:text-3xl font-bold text-header mb-3">{ctaTitle}</h2>}
          {ctaSubtitle && <p className="text-header/80 mb-8 max-w-xl mx-auto">{ctaSubtitle}</p>}
          <div className="flex flex-wrap gap-3 justify-center">
            {primaryLabel && primaryHref && (
              <Link
                href={primaryHref}
                className="bg-header text-white hover:bg-nav font-bold px-8 py-3 rounded-full transition-colors text-sm uppercase tracking-wider"
              >
                {primaryLabel}
              </Link>
            )}
            {secLabel && secHref && (
              <Link
                href={secHref}
                className="border-2 border-header text-header hover:bg-header hover:text-white font-bold px-8 py-3 rounded-full transition-colors text-sm uppercase tracking-wider"
              >
                {secLabel}
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
