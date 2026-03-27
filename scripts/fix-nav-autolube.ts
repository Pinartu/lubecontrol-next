/**
 * Update the mainNavigation document in Sanity to include all 10 Auto Lube subcategories.
 *   npx tsx scripts/fix-nav-autolube.ts
 */
import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '92q6lqnu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

function rk() { return Math.random().toString(36).substring(2, 10) }

async function main() {
  // Fetch the current mainNavigation document
  const nav = await client.fetch('*[_type == "mainNavigation" && _id == "mainNavigation"][0]')
  if (!nav) {
    console.error('mainNavigation document not found!')
    process.exit(1)
  }

  console.log('Current nav items:')
  for (const item of nav.items) {
    console.log(`  ${item.label} (${item.href})`)
    if (item.columns) {
      for (const col of item.columns) {
        console.log(`    [${col.heading}]`)
        for (const link of col.links || []) {
          console.log(`      - ${link.label} → ${link.href}`)
        }
      }
    }
  }

  // Find the AUTO LUBE SYSTEMS item and replace its columns
  const autoLubeIndex = nav.items.findIndex((item: {label: string}) =>
    item.label.toUpperCase().includes('AUTO LUBE')
  )

  if (autoLubeIndex === -1) {
    console.error('AUTO LUBE SYSTEMS nav item not found!')
    process.exit(1)
  }

  console.log(`\nFound AUTO LUBE SYSTEMS at index ${autoLubeIndex}`)

  // New columns with all 10 items
  const newColumns = [
    {
      _type: 'navColumn',
      _key: rk(),
      heading: 'Single Point Lubricators',
      links: [
        { _type: 'navLinkNested', _key: rk(), label: 'Grease Bomb 120', href: '/auto-lube-systems/grease-bomb-120-single-point-lubricator' },
        { _type: 'navLinkNested', _key: rk(), label: 'Pulsarlube', href: '/auto-lube-systems/2225-2' },
        { _type: 'navLinkNested', _key: rk(), label: 'Simalube', href: '/auto-lube-systems/simalube' },
        { _type: 'navLinkNested', _key: rk(), label: 'Perma Lube', href: '/auto-lube-systems/perma-lube' },
        { _type: 'navLinkNested', _key: rk(), label: 'Memolub HPS Lubricator', href: '/auto-lube-systems/memolub-lubricator' },
      ],
    },
    {
      _type: 'navColumn',
      _key: rk(),
      heading: 'Systems & Monitoring',
      links: [
        { _type: 'navLinkNested', _key: rk(), label: 'ILC Auto Lubrication Systems', href: '/auto-lube-systems/ilc-autolubrication-systems' },
        { _type: 'navLinkNested', _key: rk(), label: 'Oil Rite Lubrication Systems', href: '/auto-lube-systems/oil-rite-lubrication-systems' },
        { _type: 'navLinkNested', _key: rk(), label: 'Purgex Lube Systems', href: '/auto-lube-systems/oil-rite-lube-systems' },
        { _type: 'navLinkNested', _key: rk(), label: 'Multi Line & Rotary Lube Pumps', href: '/auto-lube-systems/multi-line-and-rotary-lube-pumps' },
        { _type: 'navLinkNested', _key: rk(), label: 'Grease Metering & Monitoring', href: '/auto-lube-systems/2486-2' },
      ],
    },
  ]

  // Update the specific item's columns
  nav.items[autoLubeIndex].columns = newColumns

  // Patch the document
  await client.patch('mainNavigation').set({ items: nav.items }).commit()

  console.log('\n✅ Auto Lube Systems navigation updated with all 10 subcategories!')
  console.log('Columns:')
  for (const col of newColumns) {
    console.log(`  [${col.heading}]`)
    for (const link of col.links) {
      console.log(`    - ${link.label} → ${link.href}`)
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
