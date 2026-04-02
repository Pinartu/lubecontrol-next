'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { withTrailingSlash } from '@/lib/internalUrl'

export interface CategoryPreviewCardProps {
  href: string
  title: string
  description?: string
  /** Resolved image URL (Sanity CDN or external). Omit when no image. */
  imageUrl?: string | null
  imageAlt?: string
  /** Set true for arbitrary https URLs so we use a plain img (no next/image remotePatterns). */
  useNativeImg?: boolean
  /** Default: show gold “Browse →” under the description */
  showBrowseHint?: boolean
}

export default function CategoryPreviewCard({
  href,
  title,
  description,
  imageUrl,
  imageAlt,
  useNativeImg = false,
  showBrowseHint = true,
}: CategoryPreviewCardProps) {
  const hasSrc = Boolean(imageUrl)
  const [imageReady, setImageReady] = useState(false)

  useEffect(() => {
    setImageReady(false)
  }, [imageUrl])

  const showPlaceholder = !hasSrc || !imageReady

  return (
    <Link
      href={withTrailingSlash(href)}
      className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-border bg-surface hover:border-brand"
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-surface-muted">
        {hasSrc && imageUrl ? (
          useNativeImg ? (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary CMS URLs (any host)
            <img
              src={imageUrl}
              alt={imageAlt ?? title}
              className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-500 ${
                imageReady ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageReady(true)}
              onError={() => setImageReady(false)}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          ) : (
            <Image
              src={imageUrl}
              alt={imageAlt ?? title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`absolute inset-0 z-0 object-cover transition-opacity duration-500 ${
                imageReady ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadingComplete={() => setImageReady(true)}
              onError={() => setImageReady(false)}
            />
          )
        ) : null}

        <div
          className={`absolute inset-0 z-[1] transition-opacity duration-500 ${
            showPlaceholder ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={!showPlaceholder}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface to-surface-muted group-hover:from-surface group-hover:via-[#fffef5] group-hover:to-brand-soft/50 transition-colors duration-500" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand/20 rounded-bl-[100px] group-hover:scale-110 group-hover:bg-brand/30 transition-all duration-500" />
        </div>

        <div
          className={`absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-surface from-35% via-surface/85 to-transparent transition-opacity duration-500 ${
            hasSrc && imageReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col bg-surface px-5 py-5 border-t border-border">
        <h3 className="text-lg font-bold text-text tracking-wide group-hover:text-text transition-colors duration-300">
          {title}
        </h3>
        <div className="h-1 w-8 bg-brand mt-3 rounded-full group-hover:w-16 transition-all duration-300" />
        {description ? (
          <p className="text-sm text-text-muted mt-3 line-clamp-3 flex-1 leading-relaxed">{description}</p>
        ) : null}
        {showBrowseHint ? (
          <span className="mt-4 text-xs text-brand font-semibold uppercase tracking-wider group-hover:underline">
            Browse →
          </span>
        ) : null}
      </div>
    </Link>
  )
}
