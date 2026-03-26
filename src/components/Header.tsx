'use client'
import Link from 'next/link'
import Image from 'next/image'
import {Search, ChevronDown, Phone, Mail, Menu, X} from 'lucide-react'
import {useState} from 'react'
import type {NavItem} from '@/lib/navigation.types'

export type SiteSettingsHeader = {
  phones?: {number?: string; label?: string | null}[] | null
  emails?: string[] | null
  searchPlaceholder?: string | null
  logoUrl?: string | null
}

type Props = {
  navigation: NavItem[]
  siteSettings?: SiteSettingsHeader | null
}

const defaultPhones = [
  {number: '1300917946', label: null},
  {number: '+61829855630', label: null},
]
const defaultEmails = ['sales@lubecontrol.com.au']

export default function Header({navigation, siteSettings}: Props) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const phones =
    siteSettings?.phones?.filter((p) => p?.number)?.length ? siteSettings.phones : defaultPhones
  const emails = siteSettings?.emails?.length ? siteSettings.emails : defaultEmails
  const searchPh = siteSettings?.searchPlaceholder || 'Search products...'
  const logoUrl = siteSettings?.logoUrl

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-md">
      <div className="bg-gray-100 border-b border-gray-200 py-1.5 text-xs hidden md:block">
        <div className="container mx-auto px-4 flex items-center space-x-6 text-muted flex-wrap gap-y-1">
          {phones.map((p, i) => (
            <a
              key={`${p.number}-${i}`}
              href={`tel:${String(p.number).replace(/\s/g, '')}`}
              className="flex items-center hover:text-primary transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 mr-1" /> {p.label ? `${p.label} ` : ''}
              {p.number}
            </a>
          ))}
          {emails.map((e) => (
            <a
              key={e}
              href={`mailto:${e}`}
              className="flex items-center hover:text-primary transition-colors font-semibold"
            >
              <Mail className="w-3.5 h-3.5 mr-1" /> {e}
            </a>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 flex items-center justify-between gap-4">
        <Link href="/" className="shrink-0 flex items-center gap-2">
          {logoUrl ? (
            <Image src={logoUrl} alt="Lube Control Logo" width={200} height={80} className="h-20 w-auto object-contain" />
          ) : (
            <Image src="/logo.png" alt="Lube Control Logo" width={200} height={80} className="h-20 w-auto object-contain" />
          )}
        </Link>

        <div className="flex-1 max-w-2xl relative hidden lg:block" role="search">
          <label htmlFor="desktop-search" className="sr-only">Search products</label>
          <input
            id="desktop-search"
            type="text"
            placeholder={searchPh}
            className="w-full border border-gray-300 py-2.5 pl-4 pr-14 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary rounded-sm bg-gray-50"
          />
          <button
            type="button"
            aria-label="Search"
            className="absolute right-0 top-0 bottom-0 bg-primary hover:bg-primary-hover text-secondary px-4 rounded-r-sm transition-colors flex items-center"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <nav aria-label="Main navigation" className="bg-[#1a2d4f] hidden lg:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center text-xs font-bold tracking-wider">
            {navigation.map((item: NavItem) => (
              <li
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-4 text-white hover:bg-[#253d69] hover:text-primary transition-colors uppercase whitespace-nowrap"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform" />
                  )}
                </Link>

                {item.children && openMenu === item.label && (
                  <div className="absolute top-full left-0 bg-white shadow-2xl border-t-4 border-primary z-50">
                    <div className="flex gap-0 p-6 min-w-max">
                      {item.children.map((col) => (
                        <div
                          key={col.heading}
                          className="min-w-[220px] pr-8 mr-8 border-r border-gray-100 last:border-0 last:pr-0 last:mr-0"
                        >
                          <Link
                            href={item.href}
                            className="block font-heading font-bold text-secondary text-xs uppercase mb-3 pb-2 border-b-2 border-primary tracking-widest hover:text-primary transition-colors"
                          >
                            {col.heading}
                          </Link>
                          <ul className="space-y-1.5">
                            {col.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="text-muted hover:text-primary text-sm transition-colors block py-0.5 hover:pl-1 transition-all"
                                >
                                  {link.children ? '▸ ' : ''}
                                  {link.label}
                                </Link>
                                {link.children && (
                                  <ul className="ml-3 mt-1 space-y-1 border-l-2 border-primary/30 pl-2">
                                    {link.children.flatMap((subGroup) =>
                                      subGroup.links.map((sub) => (
                                        <li key={sub.href}>
                                          <Link
                                            href={sub.href}
                                            className="text-gray-500 hover:text-primary text-xs block py-0.5 hover:pl-1 transition-all"
                                          >
                                            {sub.label}
                                          </Link>
                                        </li>
                                      )),
                                    )}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-nav" className="lg:hidden bg-[#1a2d4f] text-white border-t border-[#253d69] overflow-y-auto max-h-[80vh]">
          <div className="px-4 py-2">
            <div className="relative mb-4" role="search">
              <label htmlFor="mobile-search" className="sr-only">Search products</label>
              <input
                id="mobile-search"
                type="text"
                placeholder="Search..."
                className="w-full bg-white/10 text-white placeholder-white/50 border border-white/20 py-2 pl-4 pr-10 text-sm rounded-sm focus:outline-none focus:border-primary"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" aria-hidden="true" />
            </div>
            {navigation.map((item: NavItem) => (
              <div key={item.label} className="border-b border-[#253d69]">
                <Link
                  href={item.href}
                  className="block py-3 font-bold text-sm uppercase tracking-wider hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-4 pb-2">
                    {item.children.map((group) => (
                      <div key={group.heading} className="mb-3">
                        <p className="text-primary text-xs font-bold uppercase mb-1">{group.heading}</p>
                        {group.links.map((link) => (
                          <div key={link.href}>
                            <Link
                              href={link.href}
                              className="block text-gray-300 hover:text-primary text-sm py-1 transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              {link.label}
                            </Link>
                            {link.children &&
                              link.children.flatMap((sg) =>
                                sg.links.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    className="block text-gray-400 hover:text-primary text-xs py-0.5 pl-3 border-l border-primary/30 ml-2 transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {sub.label}
                                  </Link>
                                )),
                              )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
