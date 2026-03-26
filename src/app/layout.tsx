import type { Metadata } from 'next'
import './globals.css'
import { getSiteSettings, getMainNav, getFooter } from '@/lib/cms'
import { mapNavItems } from '@/lib/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: {
      default: settings?.title ?? 'Lube Control',
      template: `%s | ${settings?.title ?? 'Lube Control'}`,
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
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Header settings={settings} navItems={navItems} />
        <main className="flex-1">{children}</main>
        <Footer content={footer} />
      </body>
    </html>
  )
}
