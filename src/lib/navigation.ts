import {client} from '@/lib/sanity'
import {mainNavigationQuery} from '@/lib/queries'
import {NAVIGATION_FALLBACK} from '@/lib/navigation.fallback'
import type {NavGroup, NavItem, NavLink} from '@/lib/navigation.types'

export type {NavGroup, NavItem, NavLink} from '@/lib/navigation.types'

type SanityNavDoc = {
  items?: Array<{
    label?: string
    href?: string
    columns?: Array<{
      heading?: string
      links?: Array<{
        label?: string
        href?: string
        subGroups?: Array<{
          heading?: string
          links?: Array<{label?: string; href?: string}>
        }>
      }>
    }>
  }>
}

type SanityRawLink = NonNullable<
  NonNullable<NonNullable<SanityNavDoc['items']>[number]['columns']>[number]['links']
>[number]

function mapNavLink(raw: SanityRawLink): NavLink {
  const subGroups = raw.subGroups?.filter((sg) => sg.heading && sg.links?.length)
  const children: NavGroup[] | undefined =
    subGroups && subGroups.length > 0
      ? subGroups.map((sg) => ({
          heading: sg.heading!,
          links: (sg.links || [])
            .filter((l) => l.label && l.href)
            .map((l) => ({label: l.label!, href: l.href!})),
        }))
      : undefined
  return {
    label: raw.label || '',
    href: raw.href || '#',
    ...(children && children.length ? {children} : {}),
  }
}

function mapSanityMainNav(doc: SanityNavDoc | null): NavItem[] {
  const items = doc?.items
  if (!items?.length) return NAVIGATION_FALLBACK

  const out: NavItem[] = []
  for (const top of items) {
    if (!top.label || top.href == null) continue
    const cols = top.columns?.filter((c) => c.heading && c.links?.length)
    if (!cols?.length) {
      out.push({label: top.label, href: top.href})
      continue
    }
    const children: NavGroup[] = cols.map((col) => ({
      heading: col.heading!,
      links: (col.links || []).filter((l) => l.label && l.href).map(mapNavLink),
    }))
    out.push({label: top.label, href: top.href, children})
  }
  return out.length ? out : NAVIGATION_FALLBACK
}

const fetchOpts = {next: {tags: ['sanity', 'navigation'], revalidate: 60}}

export async function getNavigation(): Promise<NavItem[]> {
  try {
    const doc = await client.fetch<SanityNavDoc | null>(mainNavigationQuery, {}, fetchOpts)
    return mapSanityMainNav(doc)
  } catch {
    return NAVIGATION_FALLBACK
  }
}

export function getAllNavPaths(navigation: NavItem[]): string[][] {
  const paths: string[][] = []

  function recurse(items: NavItem[] | NavLink[]) {
    for (const item of items) {
      const segments = item.href.split('/').filter(Boolean)
      paths.push(segments)

      if ('children' in item && item.children) {
        for (const group of item.children) {
          recurse(group.links)
        }
      }
    }
  }

  for (const item of navigation) {
    if (item.href === '/') continue
    const segments = item.href.split('/').filter(Boolean)
    paths.push(segments)
    if (item.children) {
      for (const group of item.children) {
        recurse(group.links)
      }
    }
  }

  return paths
}

export function findNavItem(href: string, navigation: NavItem[]): NavItem | NavLink | null {
  function searchGroups(groups: NavGroup[]): NavItem | NavLink | null {
    for (const group of groups) {
      for (const link of group.links) {
        if (link.href === href) return link
        if (link.children) {
          const found = searchGroups(link.children)
          if (found) return found
        }
      }
    }
    return null
  }

  for (const item of navigation) {
    if (item.href === href) return item
    if (item.children) {
      const found = searchGroups(item.children)
      if (found) return found
    }
  }
  return null
}

export function getBreadcrumbs(
  href: string,
  navigation: NavItem[],
): {label: string; href: string}[] {
  const segments = href.split('/').filter(Boolean)
  const crumbs: {label: string; href: string}[] = [{label: 'Home', href: '/'}]

  let currentPath = ''
  for (const seg of segments) {
    currentPath += `/${seg}`
    const found = findNavItem(currentPath, navigation)
    if (found) {
      crumbs.push({label: found.label, href: currentPath})
    } else {
      crumbs.push({
        label: seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        href: currentPath,
      })
    }
  }
  return crumbs
}

/** Canonical path with leading slash for Sanity categoryPage.path */
export function normalizeSitePath(href: string): string {
  if (!href || href === '/') return '/'
  return href.startsWith('/') ? href : `/${href}`
}
