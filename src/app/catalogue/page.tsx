import Breadcrumb from '@/components/Breadcrumb'
import {FileText, ExternalLink} from 'lucide-react'
import {getCataloguePage} from '@/lib/cms'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getCataloguePage()
  return {
    title: p?.title ? `${p.title} | Lube Control` : 'Catalogue Library | Lube Control',
    description: p?.intro || 'Download or view our full product catalogues for lubrication equipment and solutions.',
  }
}

export default async function CataloguePage() {
  const p = await getCataloguePage()
  const title = p?.title || 'CATALOGUE LIBRARY'
  const intro =
    p?.intro ||
    'Download or view our full product catalogues. All catalogues are available in PDF format.'
  type CatItem = {
    title?: string | null
    description?: string | null
    externalUrl?: string | null
    fileUrl?: string | null
  }
  const items: CatItem[] = p?.items?.length
    ? p.items
    : [
        {
          title: 'Remote Grease Lines & Automatic Lubrication Fittings',
          description: 'Complete guide to remote grease line systems and automatic lubrication fittings.',
          externalUrl: 'https://drive.google.com/file/d/18xRnobRF9GMzWbo4Kqi8_C5gPAx7M3Xl/view',
          fileUrl: null,
        },
      ]

  return (
    <>
      <Breadcrumb crumbs={[{label: 'Home', href: '/'}, {label: 'Catalogue Library', href: '/catalogue'}]} />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 border-b-4 border-primary pb-4">
          <h1 className="font-heading text-4xl font-black text-secondary mb-3">{title}</h1>
          <p className="text-muted max-w-2xl">{intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((cat, idx) => {
            const url = cat.externalUrl || cat.fileUrl || '#'
            return (
              <a
                key={`catalogue-${idx}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-gray-200 rounded-sm p-6 hover:border-primary hover:shadow-md transition-all duration-200 bg-white flex flex-col"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-primary/10 rounded p-2 shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-heading font-bold text-sm text-secondary group-hover:text-primary transition-colors uppercase leading-tight">
                    {cat.title}
                  </h2>
                </div>
                {cat.description ? (
                  <p className="text-sm text-muted flex-grow leading-relaxed">{cat.description}</p>
                ) : null}
                <span className="mt-4 flex items-center gap-1 text-primary font-semibold text-xs uppercase tracking-wider group-hover:gap-2 transition-all">
                  View / Download <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            )
          })}
        </div>

        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-sm p-8 text-center">
          <h3 className="font-heading font-bold text-xl text-secondary uppercase mb-2">
            {p?.bottomTitle || 'Need a Specific Catalogue?'}
          </h3>
          <p className="text-muted mb-4">
            {p?.bottomText || 'Contact us and we will send you the relevant product information.'}
          </p>
          <a
            href={p?.bottomButtonHref || 'mailto:sales@lubecontrol.com.au'}
            className="inline-block bg-primary hover:bg-primary-hover text-secondary font-heading font-bold py-3 px-8 uppercase tracking-wider transition-colors"
          >
            {p?.bottomButtonLabel || 'Email Us'}
          </a>
        </div>
      </div>
    </>
  )
}
