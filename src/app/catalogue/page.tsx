import type { Metadata } from 'next'
import { getCataloguePage } from '@/lib/cms'
import PdfDownloadsGrid from '@/components/PdfDownloadsGrid'

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
  const downloads =
    items?.map((item: { title: string; description?: string; externalUrl?: string; file?: { asset?: { url?: string } } }, idx: number) => ({
      _key: `catalogue-${idx}`,
      title: item.title,
      description: item.description,
      externalUrl: item.externalUrl,
      file: item.file,
    })) ?? []

  return (
    <div>
      {/* Header */}
      <div className="bg-header text-white py-12 px-4 border-b-4 border-brand">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">{title}</h1>
          {intro && <p className="mt-3 text-surface/90 max-w-2xl">{intro}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {items.length === 0 ? (
          <p className="text-text-muted">No catalogues available yet.</p>
        ) : (
          <PdfDownloadsGrid downloads={downloads} />
        )}

        {/* Bottom CTA */}
        {(page?.bottomTitle || page?.bottomText) && (
          <div className="mt-12 bg-header text-white rounded-2xl p-8 text-center border border-border">
            {page.bottomTitle && <h2 className="text-2xl font-bold mb-2">{page.bottomTitle}</h2>}
            {page.bottomText && <p className="text-surface/90 mb-6">{page.bottomText}</p>}
            {page.bottomButtonLabel && page.bottomButtonHref && (
              <a
                href={page.bottomButtonHref}
                className="inline-block bg-brand hover:bg-brand-hover text-header font-semibold px-8 py-3 rounded-full transition-colors"
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
