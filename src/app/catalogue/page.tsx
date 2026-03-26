import type { Metadata } from 'next'
import { getCataloguePage } from '@/lib/cms'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCataloguePage()
  return {
    title: page?.title ?? 'Catalogue Library',
    description: page?.intro ?? 'Browse our product catalogues.',
  }
}

export default async function CataloguePage() {
  const page = await getCataloguePage()

  const title = page?.title ?? 'Catalogue Library'
  const intro = page?.intro
  const items  = page?.items ?? []

  return (
    <div>
      {/* Header */}
      <div className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">{title}</h1>
          {intro && <p className="mt-3 text-gray-300 max-w-2xl">{intro}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {items.length === 0 ? (
          <p className="text-gray-500">No catalogues available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item: { title: string; description?: string; externalUrl?: string; file?: { asset?: { url?: string } } }, idx: number) => {
              const href = item.externalUrl ?? item.file?.asset?.url ?? '#'
              return (
                <a
                  key={`cat-${idx}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{item.title}</h3>
                      {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm text-red-600 font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </div>
                </a>
              )
            })}
          </div>
        )}

        {/* Bottom CTA */}
        {(page?.bottomTitle || page?.bottomText) && (
          <div className="mt-12 bg-gray-900 text-white rounded-2xl p-8 text-center">
            {page.bottomTitle && <h2 className="text-2xl font-bold mb-2">{page.bottomTitle}</h2>}
            {page.bottomText && <p className="text-gray-300 mb-6">{page.bottomText}</p>}
            {page.bottomButtonLabel && page.bottomButtonHref && (
              <a
                href={page.bottomButtonHref}
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors"
              >
                {page.bottomButtonLabel}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
