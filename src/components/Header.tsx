'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { SanityNavTopItem } from '@/lib/navigation'

interface SiteSettings {
  title?: string
  phones?: Array<{ label?: string; number: string }>
  emails?: string[]
  searchPlaceholder?: string
  logo?: { asset?: { url?: string } }
}

interface Props {
  settings: SiteSettings | null
  navItems: SanityNavTopItem[]
}

export default function Header({ settings, navItems }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openTop, setOpenTop] = useState<string | null>(null)

  const phones  = settings?.phones  ?? []
  const emails  = settings?.emails  ?? []
  const placeholder = settings?.searchPlaceholder ?? 'Search products…'

  return (
    <header className="w-full shadow-md bg-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-sm py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-4">
            {phones.map((p, i) => (
              <a key={`ph-${i}`} href={`tel:${p.number.replace(/\s/g, '')}`} className="hover:text-red-400 transition-colors">
                {p.label ? `${p.label}: ` : ''}{p.number}
              </a>
            ))}
            {emails.map((e, i) => (
              <a key={`em-${i}`} href={`mailto:${e}`} className="hover:text-red-400 transition-colors">{e}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          {settings?.logo?.asset?.url ? (
            <Image src={settings.logo.asset.url} alt={settings.title ?? 'Logo'} width={180} height={50} className="h-12 w-auto object-contain" />
          ) : (
            <span className="text-2xl font-black text-red-600 tracking-tight">LubeControl</span>
          )}
        </Link>

        {/* Search */}
        <div role="search" className="hidden md:flex flex-1 max-w-md relative">
          <label htmlFor="site-search" className="sr-only">Search products</label>
          <input
            id="site-search"
            type="search"
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button type="submit" aria-label="Submit search" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-gray-700 hover:text-red-600"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Desktop nav */}
      <nav aria-label="Main navigation" className="hidden md:block border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex">
            {navItems.map((item) => (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenTop(item.href)}
                onMouseLeave={() => setOpenTop(null)}
              >
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-sm font-semibold text-gray-800 hover:text-red-600 transition-colors whitespace-nowrap"
                >
                  {item.label}
                  {item.columns?.length ? (
                    <span className="ml-1 text-xs">▾</span>
                  ) : null}
                </Link>

                {/* Mega menu */}
                {item.columns?.length && openTop === item.href && (
                  <div className="absolute left-0 top-full bg-white border border-gray-200 shadow-xl rounded-b-lg p-6 z-50 grid gap-6 min-w-max"
                       style={{ gridTemplateColumns: `repeat(${item.columns.length}, minmax(180px, 1fr))` }}>
                    {item.columns.map((col, ci) => (
                      <div key={`col-${ci}`}>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{col.heading}</p>
                        {col.links.map((link, li) => (
                          <div key={`link-${li}`} className="mb-3">
                            <Link href={link.href} className="block text-sm font-semibold text-gray-800 hover:text-red-600 mb-1">
                              {link.label}
                            </Link>
                            {link.subGroups?.map((sg, si) => (
                              <div key={`sg-${si}`} className="pl-3 mb-2">
                                <p className="text-xs text-gray-500 font-medium mb-1">{sg.heading}</p>
                                {sg.links.map((sl, sli) => (
                                  <Link key={`sl-${sli}`} href={sl.href} className="block text-xs text-gray-600 hover:text-red-600 py-0.5">
                                    {sl.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav id="mobile-menu" aria-label="Mobile navigation" className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-2">
            <div role="search" className="mb-3">
              <label htmlFor="mobile-search" className="sr-only">Search products</label>
              <input
                id="mobile-search"
                type="search"
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            {navItems.map((item) => (
              <div key={item.href} className="border-b border-gray-100 last:border-0">
                <Link
                  href={item.href}
                  className="block py-2 text-sm font-semibold text-gray-800 hover:text-red-600"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.columns?.map((col, ci) => (
                  <div key={`mcol-${ci}`} className="pl-4 pb-2">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">{col.heading}</p>
                    {col.links.map((link, li) => (
                      <Link key={`mlink-${li}`} href={link.href} className="block text-sm text-gray-700 hover:text-red-600 py-0.5" onClick={() => setMobileOpen(false)}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
