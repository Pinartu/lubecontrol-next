import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity'

export interface Subcategory {
  _id: string
  title: string
  slug?: string
  description?: string
  image?: { asset?: { _ref?: string } }
  routePath?: string
}

interface Props {
  subcategory: Subcategory
  basePath?: string
}

export default function SubcategoryCard({ subcategory, basePath = '' }: Props) {
  const imgUrl = subcategory.image?.asset
    ? urlForImage(subcategory.image).width(400).height(280).url()
    : null

  const href = subcategory.routePath
    ? (subcategory.routePath.startsWith('/') ? subcategory.routePath : `/${subcategory.routePath}`)
    : (subcategory.slug ? `${basePath}/${subcategory.slug}` : '#')

  return (
    <Link
      href={href}
      className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border flex flex-col"
    >
      {/* Image area */}
      <div className="relative h-48 bg-surface-muted flex items-center justify-center overflow-hidden">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={subcategory.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-400"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-border group-hover:text-brand transition-colors">
            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="text-xs uppercase tracking-widest font-semibold opacity-60">View Category</span>
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/5 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 border-t border-border flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-text text-base leading-snug group-hover:text-brand transition-colors">
            {subcategory.title}
          </h3>
          <svg
            className="w-5 h-5 text-brand shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        {subcategory.description && (
          <p className="text-sm text-text-muted mt-2 line-clamp-3 flex-1">
            {subcategory.description}
          </p>
        )}
        <span className="mt-4 text-xs text-brand font-semibold uppercase tracking-wider group-hover:underline">
          Browse →
        </span>
      </div>
    </Link>
  )
}
