'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity'

interface Slide {
  heading: string
  subheading?: string
  cta?: string
  ctaHref?: string
  backgroundImage?: { asset?: { _ref?: string; url?: string } }
}

interface Props {
  slides: Slide[]
}

export default function HeroSection({ slides }: Props) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  if (!slides.length) {
    return (
      <section className="bg-gradient-to-br from-header via-nav to-nav-surface text-white py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand/25 to-transparent pointer-events-none" aria-hidden />
        <h1 className="relative text-4xl md:text-5xl font-black mb-4 border-b-4 border-brand inline-block pb-2">
          Industrial Lubrication Solutions
        </h1>
        <p className="relative text-lg text-surface/90 max-w-2xl mx-auto">Quality products for every application.</p>
        <Link
          href="/products"
          className="relative mt-6 inline-block bg-brand hover:bg-brand-hover text-header font-semibold px-8 py-3 rounded-full transition-colors"
        >
          Shop Products
        </Link>
      </section>
    )
  }

  const slide = slides[current]
  const bgUrl = slide.backgroundImage?.asset
    ? urlForImage(slide.backgroundImage).width(1600).height(600).url()
    : null

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 480 }}>
      {/* Background */}
      <div className="absolute inset-0 bg-header">
        {bgUrl && (
          <Image src={bgUrl} alt={slide.heading} fill className="object-cover opacity-60" priority />
        )}
      </div>

      {/* Overlay + hero yellow tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-24 text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 max-w-2xl leading-tight border-l-4 border-brand pl-5">
          {slide.heading}
        </h1>
        {slide.subheading && (
          <p className="text-lg md:text-xl text-surface/90 mb-8 max-w-xl">{slide.subheading}</p>
        )}
        {slide.cta && slide.ctaHref && (
          <Link
            href={slide.ctaHref}
            className="inline-block bg-brand hover:bg-brand-hover text-header font-semibold px-8 py-3 rounded-full transition-colors text-lg"
          >
            {slide.cta}
          </Link>
        )}
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={`dot-${i}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-brand scale-125' : 'bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
