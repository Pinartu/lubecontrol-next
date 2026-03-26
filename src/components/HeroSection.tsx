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
      <section className="bg-gradient-to-br from-gray-900 to-red-900 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4">Industrial Lubrication Solutions</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">Quality products for every application.</p>
        <Link href="/products" className="mt-6 inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors">
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
      <div className="absolute inset-0 bg-gray-900">
        {bgUrl && (
          <Image src={bgUrl} alt={slide.heading} fill className="object-cover opacity-60" priority />
        )}
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-24 text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 max-w-2xl leading-tight">
          {slide.heading}
        </h1>
        {slide.subheading && (
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">{slide.subheading}</p>
        )}
        {slide.cta && slide.ctaHref && (
          <Link
            href={slide.ctaHref}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors text-lg"
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
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
