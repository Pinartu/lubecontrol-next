import type {Metadata} from 'next'
import {Work_Sans, Instrument_Sans} from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {getNavigation} from '@/lib/navigation'
import {getSiteSettings, getFooterContent} from '@/lib/cms'
import {urlFor} from '@/lib/sanity'

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
})

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  return {
    title: siteSettings?.title || 'Lube Control Rebuild',
    description: siteSettings?.description || 'Global Supplier of Quality Lubrication Solutions & Products',
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [siteSettings, navigation, footer] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
    getFooterContent(),
  ])

  const logoUrl =
    siteSettings?.logo && (siteSettings.logo as {asset?: unknown}).asset
      ? urlFor(siteSettings.logo).width(400).url()
      : null

  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} ${workSans.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}
      >
        <Header
          navigation={navigation}
          siteSettings={{
            phones: siteSettings?.phones,
            emails: siteSettings?.emails,
            searchPlaceholder: siteSettings?.searchPlaceholder,
            logoUrl,
          }}
        />
        <main className="flex-grow">{children}</main>
        <Footer columns={footer?.columns} copyrightCompany={footer?.copyrightCompany} />
      </body>
    </html>
  )
}
