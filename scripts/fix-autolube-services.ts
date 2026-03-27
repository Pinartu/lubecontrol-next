/**
 * Fix: update Auto Lube Systems with all 10 actual subcategories from lubecontrol.com.au
 * and update navigation fallback to match.
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

// ═══════════════════════════════════════════════════════════════════════════
// AUTO LUBE SYSTEMS — 10 actual subcategories from lubecontrol.com.au
// ═══════════════════════════════════════════════════════════════════════════
const AUTO_LUBE_CHILDREN: Cat[] = [
  { id: 'grease-bomb-120-single-point-lubricator', title: 'Grease Bomb 120 Single Point Lubricator', slug: 'grease-bomb-120-single-point-lubricator', routePath: '/auto-lube-systems/grease-bomb-120-single-point-lubricator',
    description: 'The Grease Bomb 120 is a compact, self-contained single-point lubricator delivering consistent grease to one bearing.',
    intro: 'The Grease Bomb 120 is a compact, button-activated single-point automatic grease lubricator designed for continuous and reliable greasing of individual bearing points. Perfect for hard-to-reach or hazardous locations.' },
  { id: 'grease-metering-and-monitoring', title: 'Grease Metering and Grease Monitoring', slug: '2486-2', routePath: '/auto-lube-systems/2486-2',
    description: 'Automated grease metering and monitoring systems for accountability and precision lubrication.',
    intro: 'Grease metering and monitoring systems allow you to precisely control and record the amount of grease applied to each lubrication point, ensuring consistency and accountability in your maintenance program.' },
  { id: 'pulsarlube', title: 'Pulsarlube', slug: '2225-2', routePath: '/auto-lube-systems/2225-2',
    description: 'Pulsarlube automatic single-point lubricators — electrochemical and electromechanical models.',
    intro: 'Pulsarlube offers a range of automatic single-point lubricators using electrochemical and electromechanical drive technology. Reliable, compact, and suitable for bearings, chains, guides, and other lubrication points.' },
  { id: 'simalube', title: 'Simalube', slug: 'simalube', routePath: '/auto-lube-systems/simalube',
    description: 'Simalube automatic single-point lubricators from simatec — Swiss precision engineering.',
    intro: 'Simalube by simatec is a Swiss-made automatic lubricator that delivers grease or oil to individual lubrication points. Known for precision, reliability, and ease of use. Available in multiple sizes from 15ml to 250ml.' },
  { id: 'perma-lube', title: 'Perma Lube', slug: 'perma-lube', routePath: '/auto-lube-systems/perma-lube',
    description: 'Perma automatic lubrication systems — single and multi-point solutions.',
    intro: 'Perma lubrication systems offer a wide range of single-point and multi-point automatic lubricators. German engineering ensures precise, reliable, and maintenance-free lubrication for industrial applications.' },
  { id: 'memolub-lubricator', title: 'Memolub HPS Lubricator', slug: 'memolub-lubricator', routePath: '/auto-lube-systems/memolub-lubricator',
    description: 'Memolub HPS electromechanical lubricator — programmable and reusable.',
    intro: 'The Memolub HPS is an electromechanical single-point lubricator with a programmable dispensing rate. Fully reusable with replaceable cartridges, it\'s an economical and environmentally friendly automatic lubrication solution.' },
  { id: 'purgex-lube-systems', title: 'Purgex Lube Systems', slug: 'oil-rite-lube-systems', routePath: '/auto-lube-systems/oil-rite-lube-systems',
    description: 'Purgex positive-displacement lubrication systems for precise oil and grease delivery.',
    intro: 'Purgex lube systems use positive-displacement technology to deliver precise, metered volumes of oil or grease. Ideal for machine tools, packaging equipment, and other applications requiring accurate, repeat lubrication.' },
  { id: 'oil-rite-lubrication-systems', title: 'Oil Rite Lubrication Systems', slug: 'oil-rite-lubrication-systems', routePath: '/auto-lube-systems/oil-rite-lubrication-systems',
    description: 'Oil Rite centralised and gravity-feed lubrication systems for industrial machinery.',
    intro: 'Oil Rite manufactures a comprehensive range of centralised, gravity-feed, and metered lubrication systems for industrial machinery. Their solutions cover oil and grease applications for all types of manufacturing equipment.' },
  { id: 'ilc-autolubrication-systems', title: 'ILC Auto Lubrication Systems', slug: 'ilc-autolubrication-systems', routePath: '/auto-lube-systems/ilc-autolubrication-systems',
    description: 'ILC automatic lubrication systems for heavy-duty industrial and mining applications.',
    intro: 'ILC Auto Lubrication Systems are rugged, reliable automatic greasing systems designed for the harshest Australian conditions. Used in mining, agriculture, construction, and manufacturing.' },
  { id: 'multi-line-and-rotary-lube-pumps', title: 'Multi Line and Rotary Lube Pumps', slug: 'multi-line-and-rotary-lube-pumps', routePath: '/auto-lube-systems/multi-line-and-rotary-lube-pumps',
    description: 'Multi-line divider block and rotary lube pump systems for centralised lubrication.',
    intro: 'Multi-line and rotary lube pumps provide centralised, automated lubrication to multiple points via divider blocks and progressive distribution. Suitable for large machinery, conveyors, and processing equipment.' },
]

// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  // Step 1: Delete old Auto Lube subcategories that don't match
  const OLD_AUTO_LUBE_IDS = ['remote-grease-lines', 'single-point-lubricators', 'multi-point-lubricators', 'centralised-lubrication-systems']
  console.log('\n🗑 Removing old/wrong Auto Lube subcategories...')
  for (const oldId of OLD_AUTO_LUBE_IDS) {
    // Remove any references to this doc first
    const refs: Array<{_id: string}> = await client.fetch(`*[references($id)]{_id}`, { id: oldId })
    for (const ref of refs) {
      try { await client.delete(ref._id) } catch { /* ok */ }
    }
    try {
      await client.delete(oldId)
      console.log(`  🗑 Deleted: ${oldId}`)
    } catch { console.log(`  ⚠ Not found: ${oldId}`) }
    // Delete associated page
    const pid = pageId('/auto-lube-systems/' + oldId)
    try { await client.delete(pid) } catch { /* ok */ }
  }

  // Step 2: Create all 10 actual Auto Lube subcategories
  console.log('\n🚀 Seeding Auto Lube Systems (10 subcategories)...')
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
      seoTitle: `${cat.title} | Lube Control`,
      seoDescription: cat.description,
      intro: [block(cat.intro)],
      productCategory: { _type: 'reference', _ref: cat.id },
      pdfDownloads: [],
    } as Parameters<typeof client.createOrReplace>[0])

    console.log(`  ✓ ${cat.id}`)
  }

  // Step 3: Update parent Auto Lube Systems page with correct intro
  await client.createOrReplace({
    _id: 'auto-lube-systems', _type: 'productCategory',
    title: 'Auto Lube Systems',
    slug: { _type: 'slug', current: 'auto-lube-systems' },
    description: 'Automatic lubrication systems — single point, multi-point, centralised, and speciality lubricators.',
    routePath: '/auto-lube-systems',
  } as Parameters<typeof client.createOrReplace>[0])

  await client.createOrReplace({
    _id: pageId('/auto-lube-systems'), _type: 'categoryPage',
    path: '/auto-lube-systems', title: 'Auto Lube Systems',
    seoTitle: 'Auto Lube Systems | Lube Control',
    seoDescription: 'Automatic lubrication systems — single point, multi-point, centralised, and speciality lubricators.',
    intro: [block('Lube Control is Australia\'s trusted supplier of automatic lubrication systems. From compact single-point lubricators like the Grease Bomb and Simalube, to fully automated centralised lubrication systems from ILC and Oil Rite — we have the solution for your equipment.')],
    productCategory: { _type: 'reference', _ref: 'auto-lube-systems' },
    pdfDownloads: [],
  } as Parameters<typeof client.createOrReplace>[0])

  console.log('\n✅ Auto Lube Systems fixed with 10 subcategories!')
}

main().catch((e) => { console.error(e); process.exit(1) })
