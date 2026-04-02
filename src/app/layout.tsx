import type { Metadata } from 'next'
import { Instrument_Sans, Work_Sans } from 'next/font/google'
import './globals.css'
import { getSiteSettings, getMainNav, getFooter } from '@/lib/cms'

const fontSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

const fontHeading = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
})
import { mapNavItems } from '@/lib/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: {
      default: settings?.title ?? 'Lube Control',
      // Legacy site used « Section » Lube Control » (not pipe); suffix is fixed for SEO parity.
      template: '%s » Lube Control',
    },
    description: settings?.description ?? 'Industrial lubrication solutions.',
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, nav, footer] = await Promise.all([
    getSiteSettings(),
    getMainNav(),
    getFooter(),
  ])

  const navItems = mapNavItems(nav)

  return (
    <html lang="en" className={`${fontSans.variable} ${fontHeading.variable}`}>
      <body className={`${fontSans.className} min-h-screen flex flex-col bg-surface text-text antialiased`}>
        <Header settings={settings} navItems={navItems} />
        <main className="flex-1">{children}</main>
        <Footer content={footer} />
      </body>
    </html>
  )
}
