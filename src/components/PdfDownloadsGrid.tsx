/* eslint-disable @next/next/no-img-element */
'use client'

import { useMemo, useState } from 'react'

export interface PdfDownload {
  _key?: string
  title: string
  description?: string
  externalUrl?: string
  file?: { asset?: { url?: string } }
  thumbnail?: { asset?: { url?: string } }
}

function getPdfUrl(d: PdfDownload): string | null {
  return d.externalUrl || d.file?.asset?.url || null
}

export default function PdfDownloadsGrid({ downloads }: { downloads: PdfDownload[] }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const cards = useMemo(() => downloads ?? [], [downloads])

  const close = () => setPreviewUrl(null)

  if (!cards.length) return null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((d, idx) => {
          const url = getPdfUrl(d)
          const key = d._key ?? `${idx}-${d.title}`

          return (
            <div
              key={key}
              className="group bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-soft rounded-lg flex items-center justify-center text-header">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-semibold text-text group-hover:text-brand transition-colors">{d.title}</h3>
                  {d.description && <p className="text-sm text-text-muted mt-1">{d.description}</p>}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand-hover font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download PDF
                  </a>
                ) : (
                  <p className="text-sm text-text-muted">No PDF source</p>
                )}

                {url && (
                  <button
                    type="button"
                    onClick={() => setPreviewUrl(url)}
                    className="ml-auto inline-flex items-center justify-center px-4 py-2 rounded-full bg-brand text-header hover:bg-brand-hover transition-colors text-sm font-semibold"
                  >
                    Preview
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {previewUrl && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-5xl overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <h3 className="text-base font-semibold text-text">PDF Preview</h3>
              <button
                type="button"
                onClick={close}
                aria-label="Close PDF preview"
                className="p-2 rounded-lg hover:bg-surface-muted transition-colors text-text-secondary"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="h-[70vh] bg-surface">
              <iframe src={previewUrl} className="w-full h-full" title="PDF preview" />
            </div>

            <div className="px-4 py-3 border-t border-border flex items-center justify-between gap-3">
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand hover:text-brand-hover font-medium"
              >
                Open in new tab
              </a>
              <button
                type="button"
                onClick={close}
                className="text-sm font-semibold px-4 py-2 rounded-full bg-header text-surface hover:bg-nav transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

