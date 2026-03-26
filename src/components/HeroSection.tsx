'use client'
import Image from 'next/image'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import {ChevronLeft, ChevronRight} from 'lucide-react'

export type HeroSlide = {
  heading: string
  subheading?: string | null
  cta?: string | null
  ctaHref?: string | null
  backgroundImageUrl?: string | null
}

type Props = {
  slides: HeroSlide[]
}

export default function HeroSection({slides}: Props) {
  const list = slides.length ? slides : [
    {
      heading: 'INNOVATION MEETS EFFICIENCY',
      subheading: 'Premium Lubrication Solutions for Australian Industry',
      cta: 'Explore Products',
      ctaHref: '/more-lubrication',
    },
  ]
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % list.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [list.length])

  const prev = () => setCurrent((c) => (c - 1 + list.length) % list.length)
  const next = () => setCurrent((c) => (c + 1) % list.length)
  const slide = list[current]
  const href = slide.ctaHref || '#'

  return (
    <section className="relative h-[560px] md:h-[600px] overflow-hidden bg-secondary">
      {slide.backgroundImageUrl ? (
        <Image
          src={slide.backgroundImageUrl}
          alt=""
          fill
          className="object-cover object-center opacity-60"
          priority
          sizes="100vw"
        />
      ) : (
        <Image
          src="/hero-bg.png"
          alt="Lube Control Hero"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
        <h1 className="font-heading text-4xl md:text-6xl font-black tracking-tight drop-shadow-lg mb-4 uppercase">
          {slide.heading}
        </h1>
        {slide.subheading ? (
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 font-sans">{slide.subheading}</p>
        ) : null}
        {slide.cta ? (
          <Link
            href={href}
            className="bg-primary hover:bg-primary-hover text-secondary font-bold font-heading py-3 px-8 uppercase tracking-wider transition-all duration-200 rounded-sm text-lg shadow-lg"
          >
            {slide.cta}
          </Link>
        ) : null}
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {list.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${i === current ? 'bg-primary scale-125' : 'bg-white/50'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
