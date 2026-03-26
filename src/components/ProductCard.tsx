import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity'

interface Product {
  _id: string
  title: string
  slug?: string
  description?: string
  image?: { asset?: { _ref?: string } }
}

interface Props {
  product: Product
  basePath?: string
}

export default function ProductCard({ product, basePath = '' }: Props) {
  const imgUrl = product.image?.asset
    ? urlForImage(product.image).width(300).height(200).url()
    : null

  const href = product.slug ? `${basePath}/${product.slug}` : '#'

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border">
      <div className="relative h-40 bg-surface-muted flex items-center justify-center">
        {imgUrl ? (
          <Image src={imgUrl} alt={product.title} fill className="object-contain p-2" />
        ) : (
          <div className="text-border">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-text text-sm">{product.title}</h3>
        {product.description && (
          <p className="text-xs text-text-muted mt-1 line-clamp-2">{product.description}</p>
        )}
        {product.slug && (
          <Link href={href} className="mt-3 text-xs text-brand hover:text-brand-hover font-medium inline-flex items-center gap-1">
            View details
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}
