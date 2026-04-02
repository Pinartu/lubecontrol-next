import type { Metadata } from 'next'
import { getResourcesPage } from '@/lib/cms'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getResourcesPage()
  return {
    title: page?.title ?? 'Resources & Downloads',
    description: page?.intro ?? 'Download product data sheets, manuals and more.',
  }
}

type Download = {
  _key: string
  title: string
  description?: string
  externalUrl?: string
  file?: { asset?: { url?: string } }
}

type Section = {
  _key: string
  sectionTitle: string
  sectionDescription?: string
  downloads?: Download[]
}

export default async function ResourcesPage() {
  const page = await getResourcesPage()

  const title    = page?.title ?? 'Resources & Downloads'
  const intro    = page?.intro
  const sections: Section[] = page?.sections ?? []

  return (
    <div>
      {/* Header */}
      <div className="bg-header text-white py-12 px-4 border-b-4 border-brand">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">{title}</h1>
          {intro && <p className="mt-3 text-surface/90 max-w-2xl">{intro}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {sections.length === 0 ? (
          <p className="text-text-muted">No resources available yet.</p>
        ) : (
          sections.map((section) => (
            <div key={section._key}>
              <h2 className="text-2xl font-bold mb-2 text-text">{section.sectionTitle}</h2>
              {section.sectionDescription && (
                <p className="text-text-muted mb-6">{section.sectionDescription}</p>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(section.downloads ?? []).map((dl) => {
                  const href = dl.file?.asset?.url ?? dl.externalUrl
                  const cardClass =
                    'flex items-start gap-3 p-4 rounded-xl border border-border bg-surface hover:border-brand hover:bg-header/50 transition-colors group'
                  const body = (
                    <>
                      <span className="shrink-0 mt-0.5 text-brand text-xl">📄</span>
                      <div>
                        <p className="font-semibold text-text group-hover:text-brand transition-colors">{dl.title}</p>
                        {dl.description && <p className="text-sm text-text-muted mt-1">{dl.description}</p>}
                        <p className="text-xs text-brand font-medium mt-2">Open PDF →</p>
                      </div>
                    </>
                  )
                  if (!href) {
                    return (
                      <div
                        key={dl._key}
                        className="p-4 rounded-xl border border-border bg-surface opacity-60"
                      >
                        <p className="font-semibold text-text">{dl.title}</p>
                        {dl.description && <p className="text-sm text-text-muted mt-1">{dl.description}</p>}
                        <p className="text-xs text-text-muted mt-2">No file attached in CMS</p>
                      </div>
                    )
                  }
                  return (
                    <a
                      key={dl._key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClass}
                    >
                      {body}
                    </a>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
