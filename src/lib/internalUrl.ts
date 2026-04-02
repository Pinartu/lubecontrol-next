/**
 * Internal URL helpers for `trailingSlash: true` (legacy site parity: paths end with `/`).
 */

/** Paths that look like static files must not get a trailing `/` (breaks e.g. `/docs/brochure.pdf`). */
function looksLikeStaticFilePath(pathname: string): boolean {
  const last = pathname.split('/').pop() ?? ''
  return /\.[a-z0-9]{2,8}$/i.test(last)
}

function isExternalOrSpecial(href: string): boolean {
  const t = href.trim()
  return (
    t.startsWith('//') ||
    /^https?:/i.test(t) ||
    t.startsWith('mailto:') ||
    t.startsWith('tel:') ||
    t === '#' ||
    t.startsWith('#')
  )
}

/**
 * Adds trailing slash to same-origin path links. Root stays `/`.
 * External URLs, mailto, tel, and hash-only links are unchanged.
 */
export function withTrailingSlash(href: string | undefined | null): string {
  if (href == null || href === '') return '#'
  const raw = href.trim()
  if (raw === '' || raw === '#') return '#'
  if (isExternalOrSpecial(raw)) return href

  if (!raw.startsWith('/')) return href

  const hashIndex = raw.indexOf('#')
  const pathAndQuery = hashIndex >= 0 ? raw.slice(0, hashIndex) : raw
  const hash = hashIndex >= 0 ? raw.slice(hashIndex) : ''

  const qIndex = pathAndQuery.indexOf('?')
  const pathOnly = qIndex >= 0 ? pathAndQuery.slice(0, qIndex) : pathAndQuery
  const query = qIndex >= 0 ? pathAndQuery.slice(qIndex) : ''

  if (pathOnly === '/' || pathOnly === '') {
    return `/${query}${hash}`.replace(/\/{2,}/g, '/')
  }

  if (looksLikeStaticFilePath(pathOnly)) {
    return `${pathOnly}${query}${hash}`
  }

  const withSlash = pathOnly.endsWith('/') ? pathOnly : `${pathOnly}/`
  return `${withSlash}${query}${hash}`
}

/** Compare paths ignoring optional trailing slash (nav vs request path). */
export function pathsMatch(a: string, b: string): boolean {
  return normalizePathKey(a) === normalizePathKey(b)
}

export function normalizePathKey(pathname: string): string {
  if (!pathname || pathname === '/') return '/'
  return pathname.replace(/\/+$/, '') || '/'
}
