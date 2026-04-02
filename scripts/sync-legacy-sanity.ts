/**
 * One command after legacy URL work:
 * 1) Runs nuclear-seed (categories + categoryPages)
 * 2) Pushes mainNavigation from src/lib/navigation.fallback.ts
 * 3) Patches siteSettings.categoryCtaPrimaryHref → /make-an-enquiry
 *
 * Requires SANITY_API_WRITE_TOKEN (Editor, with create/update/delete on dataset).
 *
 *   npm run sanity:sync-legacy
 */
import { execSync } from 'node:child_process'
import { loadEnvConfig } from '@next/env'
import { createClient } from '@sanity/client'
import { NAVIGATION_FALLBACK } from '../src/lib/navigation.fallback'
import type { NavItem, NavLink, NavGroup } from '../src/lib/navigation.types'

loadEnvConfig(process.cwd())

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '92q6lqnu'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

function key() {
  return Math.random().toString(36).slice(2, 12)
}

function mapLink(link: NavLink): Record<string, unknown> {
  const base: Record<string, unknown> = {
    _type: 'navLinkNested',
    _key: key(),
    label: link.label,
    href: link.href,
  }
  if (link.children?.length) {
    base.subGroups = link.children.map((sg: NavGroup) => ({
      _type: 'navSubGroup',
      _key: key(),
      heading: sg.heading,
      links: sg.links.map((l) => ({
        _type: 'navSimpleLink',
        _key: key(),
        label: l.label,
        href: l.href,
      })),
    }))
  }
  return base
}

function mapTopItem(item: NavItem): Record<string, unknown> {
  if (!item.children?.length) {
    return {
      _type: 'navTopItem',
      _key: key(),
      label: item.label,
      href: item.href,
    }
  }
  return {
    _type: 'navTopItem',
    _key: key(),
    label: item.label,
    href: item.href,
    columns: item.children.map((col) => ({
      _type: 'navColumn',
      _key: key(),
      heading: col.heading,
      links: col.links.map(mapLink),
    })),
  }
}

async function main() {
  if (!token) {
    console.error(`
Missing SANITY_API_WRITE_TOKEN.

1. Open https://www.sanity.io/manage → your project → API → Tokens
2. Create a token with Editor (or Custom with mutate rights)
3. Add to .env.local in this folder:

   SANITY_API_WRITE_TOKEN=sk...

4. Run again: npm run sanity:sync-legacy
`)
    process.exit(1)
  }

  console.log('\n━━━ Step 1/3: nuclear-seed (categories + pages) ━━━\n')
  execSync('npx tsx scripts/nuclear-seed.ts', {
    cwd: process.cwd(),
    stdio: 'inherit',
    env: { ...process.env, SANITY_API_WRITE_TOKEN: token },
  })

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  })

  console.log('\n━━━ Step 2/3: mainNavigation from navigation.fallback ━━━\n')
  await client.createOrReplace({
    _id: 'mainNavigation',
    _type: 'mainNavigation',
    title: 'Main menu',
    items: NAVIGATION_FALLBACK.map(mapTopItem),
  } as Parameters<typeof client.createOrReplace>[0])

  console.log('  ✓ mainNavigation updated')

  console.log('\n━━━ Step 3/3: siteSettings CTA href ━━━\n')
  const settingsId = await client.fetch<string | null>('*[_type == "siteSettings"][0]._id')
  if (settingsId) {
    await client.patch(settingsId).set({ categoryCtaPrimaryHref: '/make-an-enquiry' }).commit()
    console.log('  ✓ categoryCtaPrimaryHref → /make-an-enquiry')
  } else {
    console.log('  ⚠ No siteSettings document found — set CTA link in Studio if needed')
  }

  console.log('\n✅ Done. Rebuild or revalidate the Next site to refresh static paths.\n')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
