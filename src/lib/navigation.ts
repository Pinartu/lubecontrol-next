/** Raw Sanity nav shapes */
export interface SanitySimpleLink {
  label: string
  href: string
}

export interface SanitySubGroup {
  heading: string
  links: SanitySimpleLink[]
}

export interface SanityNavLink {
  label: string
  href: string
  subGroups?: SanitySubGroup[]
}

export interface SanityNavColumn {
  heading: string
  links: SanityNavLink[]
}

export interface SanityNavTopItem {
  label: string
  href: string
  columns?: SanityNavColumn[]
}

export interface SanityMainNav {
  items: SanityNavTopItem[]
}

/** Resolved breadcrumb entry */
export interface BreadcrumbItem {
  label: string
  href: string
}

/**
 * Map the raw Sanity navigation document to the nav top-items array.
 * Returns an empty array if no data was fetched yet.
 */
export function mapNavItems(nav: SanityMainNav | null): SanityNavTopItem[] {
  return nav?.items ?? []
}

/**
 * Build breadcrumbs by splitting a URL path and matching against nav items.
 */
export function getBreadcrumbs(
  navItems: SanityNavTopItem[],
  pathname: string,
): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }]

  for (const top of navItems) {
    if (top.href === pathname) {
      crumbs.push({ label: top.label, href: top.href })
      return crumbs
    }
    for (const col of top.columns ?? []) {
      for (const link of col.links ?? []) {
        if (link.href === pathname) {
          crumbs.push({ label: top.label, href: top.href })
          crumbs.push({ label: link.label, href: link.href })
          return crumbs
        }
        for (const sg of link.subGroups ?? []) {
          for (const sl of sg.links ?? []) {
            if (sl.href === pathname) {
              crumbs.push({ label: top.label, href: top.href })
              crumbs.push({ label: link.label, href: link.href })
              crumbs.push({ label: sl.label, href: sl.href })
              return crumbs
            }
          }
        }
      }
    }
  }
  return crumbs
}
