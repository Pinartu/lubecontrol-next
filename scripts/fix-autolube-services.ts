/**
 * Fix: align Auto Lube Systems subcategories with legacy lubecontrol.com.au URLs.
 *
 *   npx tsx scripts/fix-autolube-services.ts
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
function block(text: string) {
  return { _type: 'block', _key: rk(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: rk(), text, marks: [] }] }
}
function pageId(routePath: string) {
  return 'page-' + routePath.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()
}

interface Cat {
  id: string; title: string; slug: string; routePath: string;
  description: string; intro: string
}

// Keep in sync with scripts/nuclear-seed.ts (auto-lube-systems children)
const AUTO_LUBE_CHILDREN: Cat[] = [
  { id: 'simalube', title: 'Simalube', slug: 'simalube', routePath: '/auto-lube-systems/simalube',
    description: 'Simalube automatic single-point lubricators from simatec.',
    intro: 'Simalube by simatec is a Swiss-made automatic lubricator that delivers grease or oil to individual lubrication points. Known for precision, reliability, and ease of use.' },
  { id: 'pulsarlube', title: 'Pulsarlube', slug: '2225-2', routePath: '/auto-lube-systems/2225-2',
    description: 'Pulsarlube automatic single-point lubricators.',
    intro: 'Pulsarlube offers automatic single-point lubricators using electrochemical and electromechanical drive technology for bearings, chains, guides, and other points.' },
  { id: 'perma-lube', title: 'Perma Lube', slug: 'perma-lube', routePath: '/auto-lube-systems/perma-lube',
    description: 'Perma automatic lubrication systems.',
    intro: 'Perma lubrication systems offer single-point and multi-point automatic lubricators with precise, reliable dispensing for industrial applications.' },
  { id: 'grease-bomb-120-single-point-lubricator', title: 'Grease Bomb 120 Single Point Lubricator', slug: 'grease-bomb-120-single-point-lubricator', routePath: '/auto-lube-systems/grease-bomb-120-single-point-lubricator',
    description: 'Compact self-contained single-point grease lubricator.',
    intro: 'The Grease Bomb 120 is a compact, button-activated single-point automatic grease lubricator for continuous, reliable greasing of individual bearing points.' },
  { id: 'memolub-lubricator', title: 'Memolub HPS Lubricator', slug: 'memolub-lubricator', routePath: '/auto-lube-systems/memolub-lubricator',
    description: 'Memolub HPS electromechanical lubricator.',
    intro: 'The Memolub HPS is a programmable electromechanical single-point lubricator with replaceable cartridges — economical and reusable.' },
  { id: 'oil-rite-lubrication-systems', title: 'Oil Rite Lubrication Systems', slug: 'oil-rite-lubrication-systems', routePath: '/auto-lube-systems/oil-rite-lubrication-systems',
    description: 'Oil Rite centralised and gravity-feed lubrication systems.',
    intro: 'Oil Rite manufactures centralised, gravity-feed, and metered lubrication systems for industrial machinery — oil and grease applications.' },
  { id: 'oil-rite-lube-systems', title: 'Purgex Lube Systems', slug: 'oil-rite-lube-systems', routePath: '/auto-lube-systems/oil-rite-lube-systems',
    description: 'Purgex positive-displacement lubrication systems.',
    intro: 'Purgex systems use positive-displacement technology for precise, metered oil or grease delivery on machine tools and packaging equipment.' },
  { id: 'ilc-autolubrication-systems', title: 'ILC Auto Lubrication Systems', slug: 'ilc-autolubrication-systems', routePath: '/auto-lube-systems/ilc-autolubrication-systems',
    description: 'ILC automatic lubrication systems for heavy-duty applications.',
    intro: 'ILC Auto Lubrication Systems are rugged, reliable automatic greasing systems for mining, agriculture, construction, and manufacturing.' },
  { id: 'multi-line-and-rotary-lube-pumps', title: 'Multi Line and Rotary Lube Pumps', slug: 'multi-line-and-rotary-lube-pumps', routePath: '/auto-lube-systems/multi-line-and-rotary-lube-pumps',
    description: 'Multi-line divider and rotary pump centralised systems.',
    intro: 'Multi-line and rotary lube pumps provide centralised automated lubrication to multiple points via divider blocks and progressive distribution.' },
  { id: 'grease-metering-grease-monitoring', title: 'Grease Metering and Grease Monitoring', slug: '2486-2', routePath: '/auto-lube-systems/2486-2',
    description: 'Grease metering and monitoring for precision lubrication.',
    intro: 'Grease metering and monitoring systems control and record grease volumes at each point for consistency and accountability.' },
]

async function main() {
  const OLD_AUTO_LUBE_IDS = [
    'remote-grease-lines',
    'single-point-lubricators',
    'multi-point-lubricators',
    'centralised-lubrication-systems',
    'grease-metering-and-monitoring',
  ]
  console.log('\n🗑 Removing obsolete Auto Lube subcategories...')
  for (const oldId of OLD_AUTO_LUBE_IDS) {
    const refs: Array<{_id: string}> = await client.fetch(`*[references($id)]{_id}`, { id: oldId })
    for (const ref of refs) {
      try { await client.delete(ref._id) } catch { /* ok */ }
    }
    try {
      await client.delete(oldId)
      console.log(`  🗑 Deleted: ${oldId}`)
    } catch { console.log(`  ⚠ Not found: ${oldId}`) }
    const pid = pageId(`/auto-lube-systems/${oldId}`)
    try { await client.delete(pid) } catch { /* ok */ }
  }

  console.log('\n🚀 Seeding Auto Lube Systems (legacy URLs)...')
  for (const cat of AUTO_LUBE_CHILDREN) {
    await client.createOrReplace({
      _id: cat.id, _type: 'productCategory',
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
      description: cat.description,
      routePath: cat.routePath,
      parent: { _type: 'reference', _ref: 'auto-lube-systems' },
    } as Parameters<typeof client.createOrReplace>[0])

    const pid = pageId(cat.routePath)
    await client.createOrReplace({
      _id: pid, _type: 'categoryPage',
      path: cat.routePath, title: cat.title,
      seoTitle: `${cat.title} » Lube Control`,
      seoDescription: cat.description,
      intro: [block(cat.intro)],
      productCategory: { _type: 'reference', _ref: cat.id },
      pdfDownloads: [],
    } as Parameters<typeof client.createOrReplace>[0])

    console.log(`  ✓ ${cat.id}`)
  }

  await client.createOrReplace({
    _id: 'auto-lube-systems', _type: 'productCategory',
    title: 'Auto Lube Systems',
    slug: { _type: 'slug', current: 'auto-lube-systems' },
    description: 'Automatic single-point lubricators and centralised systems — Simalube, Pulsarlube, ILC, Oil Rite, and more.',
    routePath: '/auto-lube-systems',
  } as Parameters<typeof client.createOrReplace>[0])

  await client.createOrReplace({
    _id: pageId('/auto-lube-systems'), _type: 'categoryPage',
    path: '/auto-lube-systems', title: 'Auto Lube Systems',
    seoTitle: 'Auto Lube Systems » Lube Control',
    seoDescription: 'Automatic single-point lubricators and centralised systems — Simalube, Pulsarlube, ILC, Oil Rite, and more.',
    intro: [block('Lube Control is Australia\'s trusted supplier of automatic lubrication systems. From compact single-point lubricators to ILC and Oil Rite centralised systems — we have the solution for your equipment.')],
    productCategory: { _type: 'reference', _ref: 'auto-lube-systems' },
    pdfDownloads: [],
  } as Parameters<typeof client.createOrReplace>[0])

  console.log('\n✅ Auto Lube Systems aligned with legacy paths.')
}

main().catch((e) => { console.error(e); process.exit(1) })
