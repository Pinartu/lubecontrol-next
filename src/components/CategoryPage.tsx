import Link from 'next/link'
import type {NavItem, NavLink, NavGroup} from '@/lib/navigation.types'
import PortableBody from '@/components/PortableBody'
import ProductCard, {type ProductListItem} from '@/components/ProductCard'

export type CategoryPageContent = {
  title?: string | null
  intro?: unknown[] | null
  ctaTitle?: string | null
  ctaSubtitle?: string | null
  ctaPrimaryLabel?: string | null
  ctaPrimaryHref?: string | null
  ctaSecondaryLabel?: string | null
  ctaSecondaryHref?: string | null
} | null

export type SiteCategoryCta = {
  categoryCtaTitle?: string | null
  categoryCtaSubtitle?: string | null
  categoryCtaPrimaryLabel?: string | null
  categoryCtaPrimaryHref?: string | null
  categoryCtaSecondaryLabel?: string | null
  categoryCtaSecondaryHref?: string | null
} | null

type Props = {
  item: NavItem | NavLink
  categoryContent?: CategoryPageContent
  products?: ProductListItem[]
  siteCta?: SiteCategoryCta
  studioUrl?: string
}

export default function CategoryPage({
  item,
  categoryContent,
  products,
  siteCta,
  studioUrl,
}: Props) {
  const hasChildren = 'children' in item && item.children && item.children.length > 0
  const children = hasChildren ? ((item as NavItem).children as NavGroup[]) : []
  const isLeaf = !hasChildren

  const h1 = categoryContent?.title || item.label
  const ctaTitle = categoryContent?.ctaTitle || siteCta?.categoryCtaTitle || 'Need Help Choosing?'
  const ctaSubtitle =
    categoryContent?.ctaSubtitle ||
    siteCta?.categoryCtaSubtitle ||
    'Our team of experts is ready to help you find the right solution.'
  const ctaPrimaryLabel = categoryContent?.ctaPrimaryLabel || siteCta?.categoryCtaPrimaryLabel || 'Contact Us'
  const ctaPrimaryHref = categoryContent?.ctaPrimaryHref || siteCta?.categoryCtaPrimaryHref || '/contact'
  const ctaSecondaryLabel =
    categoryContent?.ctaSecondaryLabel || siteCta?.categoryCtaSecondaryLabel || '1300 917 946'
  const ctaSecondaryHref =
    categoryContent?.ctaSecondaryHref || siteCta?.categoryCtaSecondaryHref || 'tel:1300917946'

  const studio = studioUrl || process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333'

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 border-b-4 border-primary pb-4">
        <h1 className="font-heading text-4xl font-black text-secondary mb-3">{h1}</h1>
        {categoryContent?.intro?.length ? (
          <PortableBody value={categoryContent.intro as unknown[]} className="text-muted max-w-2xl" />
        ) : (
          <p className="text-muted max-w-2xl">
            Browse our complete range of {item.label.toLowerCase()} products and solutions, trusted by Australian
            industry professionals.
          </p>
        )}
      </div>

      {hasChildren && children.length > 0 ? (
        children.map((group) => (
          <div key={group.heading} className="mb-12">
            <h2 className="font-heading font-bold text-xl text-secondary mb-6 uppercase border-b border-gray-200 pb-2">
              {group.heading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group border border-gray-200 rounded-sm p-5 hover:border-primary hover:shadow-md transition-all duration-200 bg-white"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-bold text-sm text-secondary group-hover:text-primary transition-colors uppercase leading-tight">
                      {link.label}
                    </h3>
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity text-lg">→</span>
                  </div>
                  {'children' in link && link.children && (
                    <p className="text-xs text-muted mt-1">
                      {link.children.reduce((acc, sg) => acc + sg.links.length, 0)} sub-categories
                    </p>
                  )}
                  <span className="mt-3 inline-block text-primary font-semibold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    View Range →
                  </span>
                </Link>
              ))}
            </div>

            {group.links
              .filter((l) => l.children && l.children.length > 0)
              .map((link) => (
                <div key={`sub-${link.href}`} className="mt-8 pl-4 border-l-4 border-primary">
                  <h3 className="font-heading font-bold text-base text-secondary uppercase mb-3">
                    <Link href={link.href} className="hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {link.children!.flatMap((sg) =>
                      sg.links.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="group border border-gray-100 rounded-sm p-4 hover:border-primary hover:shadow transition-all bg-gray-50"
                        >
                          <p className="font-heading font-bold text-sm text-secondary group-hover:text-primary transition-colors uppercase">
                            {sub.label}
                          </p>
                          <span className="mt-2 inline-block text-primary text-xs font-semibold group-hover:translate-x-1 transition-transform">
                            View →
                          </span>
                        </Link>
                      )),
                    )}
                  </div>
                </div>
              ))}
          </div>
        ))
      ) : null}

      {isLeaf ? (
        products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-sm p-16 text-center">
            <p className="text-muted font-semibold mb-2">Products managed via Sanity CMS</p>
            <p className="text-sm text-gray-400">
              Link a product category to this route in Studio (Category page → Products category), then add products
              under that category.
            </p>
            <a
              href={studio}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-primary hover:bg-primary-hover text-secondary font-bold font-heading py-2 px-6 uppercase tracking-wider text-sm transition-colors"
            >
              Open Sanity Studio
            </a>
          </div>
        )
      ) : null}

      <div className="mt-16 bg-[#1a2d4f] text-white rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-bold text-xl uppercase mb-1">{ctaTitle}</h3>
          <p className="text-gray-300 text-sm">{ctaSubtitle}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={ctaPrimaryHref}
            className="bg-primary hover:bg-primary-hover text-secondary font-bold font-heading py-3 px-6 uppercase text-sm tracking-wider transition-colors whitespace-nowrap"
          >
            {ctaPrimaryLabel}
          </Link>
          <a
            href={ctaSecondaryHref}
            className="border border-white text-white hover:bg-white hover:text-secondary font-bold font-heading py-3 px-6 uppercase text-sm tracking-wider transition-colors whitespace-nowrap"
          >
            {ctaSecondaryLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
