import type {Metadata} from 'next'

/** Legacy inner pages used « Page » Lube Control »; seed/CMS may still use " | Lube Control". */
const LEGACY_PIPE_SUFFIX = /\s*\|\s*Lube Control\s*$/i

/**
 * Category / CMS pages: if seoTitle (or title) is already a full document title, return it as
 * `absolute` so the root layout template is not applied twice.
 */
export function categoryPageDocumentTitle(
  seoTitle: string | undefined | null,
  pageTitle: string | undefined | null,
  fallback: string,
): Metadata['title'] {
  const candidate = (seoTitle ?? '').trim() || (pageTitle ?? '').trim() || fallback.trim()
  const looksLikeFullTitle = candidate.includes('»') || LEGACY_PIPE_SUFFIX.test(candidate)

  if (looksLikeFullTitle) {
    const normalized = candidate.replace(LEGACY_PIPE_SUFFIX, ' » Lube Control')
    return {absolute: normalized}
  }

  return candidate
}

/** Default browser title for `/` to match legacy indexed title. */
export const LEGACY_HOME_DOCUMENT_TITLE = 'Lube Control Pty Ltd - Australian lubrication solutions'
