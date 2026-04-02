/**
 * Comprehensive seed: creates ALL category pages, subcategory pages, and parent ProductCategory
 * documents to reflect the full lubecontrol.com.au navigation structure.
 *
 * Run with:
 *   npx tsx scripts/seed-all-categories.ts
 */
import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '92q6lqnu'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error('Set SANITY_API_WRITE_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

function k(base: string) {
  // Generate stable, deterministic IDs from path strings
  return base.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()
}

function key() {
  return Math.random().toString(36).substring(2, 10)
}

function block(text: string) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }
}

interface CategoryDef {
  id: string
  title: string
  slug: string
  routePath: string
  parentId?: string
  description: string
  intro: string
  subcategories?: CategoryDef[]
}

const CATEGORIES: CategoryDef[] = [
  // ─── FLUID HANDLING ────────────────────────────────────────────────────────
  {
    id: 'fluid-handling',
    title: 'Fluid Handling',
    slug: 'fluid-handling',
    routePath: '/fluid-handling',
    description: 'Comprehensive range of oil, grease, and fuel handling equipment for Australian industry.',
    intro: 'Lube Control provides a comprehensive range of fluid handling equipment for oil, grease, and fuel. Whether you need pumps, hose reels, nozzles, or dispensing systems, we have the right solution for your industry.',
    subcategories: [
      {
        id: 'oil-handling-equipment',
        title: 'Oil Handling Equipment',
        slug: 'oil-handling-equipment',
        routePath: '/fluid-handling/oil-handling-equipment',
        parentId: 'fluid-handling',
        description: 'Oil guns, pumps, hose reels and dispensing equipment for all oil handling applications.',
        intro: 'Our oil handling equipment range includes oil guns, manual and powered pumps, hose reels, and complete dispensing kits suitable for 20L drums through to 205L drums and IBC containers.',
      },
      {
        id: 'grease-transfer-equipment',
        title: 'Grease Transfer Equipment',
        slug: 'grease-transfer-equipment',
        routePath: '/fluid-handling/grease-transfer-equipment',
        parentId: 'fluid-handling',
        description: 'Grease kits, guns, pumps, hose reels, and bulk grease vessel systems.',
        intro: 'From 400g grease guns to 180kg bulk grease pumps, Lube Control supplies a complete range of grease transfer equipment to suit any application – from workshop to heavy industrial.',
      },
      {
        id: 'fuel-handling-equipment',
        title: 'Fuel Handling Equipment',
        slug: 'fuel-handling-equipment',
        routePath: '/fluid-handling/fuel-handling-equipment',
        parentId: 'fluid-handling',
        description: 'Fuel nozzles, hose reels, meters, pumps, and complete fuel dispensing systems.',
        intro: 'Lube Control\'s fuel handling range covers everything from fuel nozzles and hose reels through to complete fuel storage and dispensing systems. Our fuel management solutions are designed for industrial, mining, and agricultural applications across Australia.',
      },
      {
        id: 'waste-oil',
        title: 'Waste Oil',
        slug: 'waste-oil',
        routePath: '/fluid-handling/waste-oil',
        parentId: 'fluid-handling',
        description: 'Waste oil handling, storage, and disposal solutions for workshops and industry.',
        intro: 'Lube Control supplies equipment and systems for the safe handling, storage, and transfer of waste oil — helping you meet environmental obligations and keep sites clean.',
      },
    ],
  },

  // ─── LUBRICANTS ────────────────────────────────────────────────────────────
  {
    id: 'lubricants',
    title: 'Lubricants',
    slug: 'lubricants',
    routePath: '/lubricants',
    description: 'Quality lubricants from leading brands for every industrial and commercial application.',
    intro: 'Lube Control is an authorised reseller of quality lubricant brands including Anglomoil, Blaster, Castrol, Imperial Oils, Inox, and Lubrication Engineers. We stock a wide range of engine oils, hydraulic oils, gear oils, greases, and specialty lubricants.',
    subcategories: [
      {
        id: 'anglomoil',
        title: 'Anglomoil Lubricants',
        slug: 'anglomoil',
        routePath: '/lubricants/anglomoil',
        parentId: 'lubricants',
        description: 'Australian owned premium lubricant brand — engine oils, gear oils, greases and more.',
        intro: 'Anglomoil is an Australian owned and operated lubricant company offering a comprehensive range of high-performance lubricants including engine oils, gear oils, hydraulic fluids, greases, and specialty products. Manufactured to international standards for demanding Australian conditions.',
      },
      {
        id: 'blaster-products',
        title: 'Blaster Products',
        slug: 'blaster-products',
        routePath: '/lubricants/blaster-products',
        parentId: 'lubricants',
        description: 'Penetrating oils, lubricants, and maintenance sprays from Blaster.',
        intro: 'Blaster Products offer a range of specialty penetrating oils, rust removers, lubricants, and maintenance sprays trusted by professionals worldwide. Ideal for loosening rust, lubricating moving parts, and protecting metals.',
      },
      {
        id: 'castrol-performance-lubricants',
        title: 'Castrol Performance Lubricants',
        slug: 'castrol-performance-lubricants',
        routePath: '/lubricants/castrol-performance-lubricants',
        parentId: 'lubricants',
        description: 'World-class performance lubricants — engine, industrial, and specialty oils.',
        intro: 'Castrol is a world leader in lubricant technology, offering premium engine oils, industrial lubricants, gear fluids, and specialty greases. Trusted by leading automotive, marine, and industrial manufacturers globally.',
      },
      {
        id: 'imperial-oils-chemicals',
        title: 'Imperial Oils & Chemicals',
        slug: 'imperial-oils-chemicals',
        routePath: '/lubricants/imperial-oils-chemicals',
        parentId: 'lubricants',
        description: 'Quality industrial and specialty lubricants from Imperial Oils & Chemicals.',
        intro: 'Imperial Oils & Chemicals provides high-quality industrial lubricants, cutting fluids, metalworking oils, and specialty chemical products designed to improve efficiency and reduce maintenance costs.',
      },
      {
        id: 'inox-lubricants',
        title: 'Inox Lubricants',
        slug: 'inox-lubricants',
        routePath: '/lubricants/inox-lubricants',
        parentId: 'lubricants',
        description: 'Multi-purpose lubricants and rust inhibitors — Australian made INOX products.',
        intro: 'INOX is an Australian-made lubricant that combines cutting-edge technology with multi-purpose use. INOX products protect metal surfaces, displace moisture, and provide long-lasting lubrication. Available in sprays, aerosols, and bulk formats.',
      },
      {
        id: 'lubrication-engineers',
        title: 'Lubrication Engineers',
        slug: 'lubrication-engineers',
        routePath: '/lubricants/lubrication-engineers',
        parentId: 'lubricants',
        description: 'Specialty lubricants from Lubrication Engineers (LE) for demanding applications.',
        intro: 'Lubrication Engineers (LE) is a global leader in specialty lubricants, providing high-performance solutions for extreme operating conditions. Their product range includes greases, gear oils, hydraulic fluids, and food-grade lubricants used across mining, agriculture, and manufacturing.',
      },
    ],
  },

  // ─── SERVICES (legacy /services/) ──────────────────────────────────────────
  {
    id: 'services',
    title: 'Lube Services',
    slug: 'services',
    routePath: '/services',
    description: 'Professional lubrication surveys, oil analysis, lube routes and case studies.',
    intro: 'Lube Control provides professional lubrication services to help you optimise your maintenance programs, reduce downtime, and extend equipment life. Our expert team can assess your current lubrication practices and recommend improvements.',
    subcategories: [
      {
        id: 'lubrication-surveys',
        title: 'Lubrication Surveys',
        slug: 'lubrication-surveys',
        routePath: '/services/lubrication-surveys',
        parentId: 'services',
        description: 'Professional on-site lubrication surveys to optimise your maintenance program.',
        intro: 'Our lubrication surveys provide a comprehensive assessment of your current lubrication practices — identifying inefficiencies, safety risks, and opportunities to reduce costs and equipment downtime. We deliver actionable recommendations tailored to your operation.',
      },
      {
        id: 'oil-analysis',
        title: 'Oil Analysis',
        slug: 'oil-analysis',
        routePath: '/services/oil-analysis',
        parentId: 'services',
        description: 'Oil sampling and laboratory analysis to monitor lubricant and equipment health.',
        intro: 'Oil analysis is a proactive maintenance tool that reveals the condition of both your lubricants and your machinery. Regular oil sampling can detect contamination, wear metals, and lubricant degradation before they cause catastrophic failures.',
      },
      {
        id: 'lube-routes',
        title: 'Lube Routes',
        slug: 'lube-routes',
        routePath: '/services/lube-routes',
        parentId: 'services',
        description: 'Structured lubrication route planning to ensure consistent and effective greasing.',
        intro: 'A well-designed lube route ensures that all critical lubrication points are serviced on time, every time. Lube Control can help you develop systematic lubrication routes that reduce missed points, prevent over- or under-greasing, and extend equipment life.',
      },
      {
        id: 'case-studies',
        title: 'Case Studies',
        slug: 'case-studies',
        routePath: '/services/case-studies',
        parentId: 'services',
        description: 'Real-world examples of lubrication improvements and savings achieved for our clients.',
        intro: 'Explore our collection of case studies showing how Lube Control has helped Australian businesses reduce maintenance costs, eliminate lubrication failures, and extend the life of critical equipment through tailored lubrication solutions.',
      },
    ],
  },

  // ─── AUTO LUBE SYSTEMS (legacy URLs) ───────────────────────────────────────
  {
    id: 'auto-lube-systems',
    title: 'Auto Lube Systems',
    slug: 'auto-lube-systems',
    routePath: '/auto-lube-systems',
    description: 'Automatic single-point lubricators and centralised systems — Simalube, Pulsarlube, ILC, Oil Rite, and more.',
    intro: 'Lube Control is Australia\'s trusted supplier of automatic lubrication systems — from compact single-point lubricators to ILC and Oil Rite centralised systems.',
    subcategories: [
      { id: 'simalube', title: 'Simalube', slug: 'simalube', routePath: '/auto-lube-systems/simalube', parentId: 'auto-lube-systems', description: 'Simalube automatic single-point lubricators from simatec.', intro: 'Simalube by simatec is a Swiss-made automatic lubricator that delivers grease or oil to individual lubrication points.' },
      { id: 'pulsarlube', title: 'Pulsarlube', slug: '2225-2', routePath: '/auto-lube-systems/2225-2', parentId: 'auto-lube-systems', description: 'Pulsarlube automatic single-point lubricators.', intro: 'Pulsarlube offers automatic single-point lubricators using electrochemical and electromechanical drive technology.' },
      { id: 'perma-lube', title: 'Perma Lube', slug: 'perma-lube', routePath: '/auto-lube-systems/perma-lube', parentId: 'auto-lube-systems', description: 'Perma automatic lubrication systems.', intro: 'Perma lubrication systems offer single-point and multi-point automatic lubricators for industrial applications.' },
      { id: 'grease-bomb-120-single-point-lubricator', title: 'Grease Bomb 120 Single Point Lubricator', slug: 'grease-bomb-120-single-point-lubricator', routePath: '/auto-lube-systems/grease-bomb-120-single-point-lubricator', parentId: 'auto-lube-systems', description: 'Compact self-contained single-point grease lubricator.', intro: 'The Grease Bomb 120 is a compact, button-activated single-point automatic grease lubricator.' },
      { id: 'memolub-lubricator', title: 'Memolub HPS Lubricator', slug: 'memolub-lubricator', routePath: '/auto-lube-systems/memolub-lubricator', parentId: 'auto-lube-systems', description: 'Memolub HPS electromechanical lubricator.', intro: 'The Memolub HPS is a programmable electromechanical single-point lubricator with replaceable cartridges.' },
      { id: 'oil-rite-lubrication-systems', title: 'Oil Rite Lubrication Systems', slug: 'oil-rite-lubrication-systems', routePath: '/auto-lube-systems/oil-rite-lubrication-systems', parentId: 'auto-lube-systems', description: 'Oil Rite centralised and gravity-feed lubrication systems.', intro: 'Oil Rite manufactures centralised, gravity-feed, and metered lubrication systems for industrial machinery.' },
      { id: 'oil-rite-lube-systems', title: 'Purgex Lube Systems', slug: 'oil-rite-lube-systems', routePath: '/auto-lube-systems/oil-rite-lube-systems', parentId: 'auto-lube-systems', description: 'Purgex positive-displacement lubrication systems.', intro: 'Purgex systems use positive-displacement technology for precise, metered oil or grease delivery.' },
      { id: 'ilc-autolubrication-systems', title: 'ILC Auto Lubrication Systems', slug: 'ilc-autolubrication-systems', routePath: '/auto-lube-systems/ilc-autolubrication-systems', parentId: 'auto-lube-systems', description: 'ILC automatic lubrication systems for heavy-duty applications.', intro: 'ILC Auto Lubrication Systems are rugged, reliable automatic greasing systems for mining, agriculture, construction, and manufacturing.' },
      { id: 'multi-line-and-rotary-lube-pumps', title: 'Multi Line and Rotary Lube Pumps', slug: 'multi-line-and-rotary-lube-pumps', routePath: '/auto-lube-systems/multi-line-and-rotary-lube-pumps', parentId: 'auto-lube-systems', description: 'Multi-line divider and rotary pump centralised systems.', intro: 'Multi-line and rotary lube pumps provide centralised automated lubrication to multiple points via divider blocks.' },
      { id: 'grease-metering-grease-monitoring', title: 'Grease Metering and Grease Monitoring', slug: '2486-2', routePath: '/auto-lube-systems/2486-2', parentId: 'auto-lube-systems', description: 'Grease metering and monitoring for precision lubrication.', intro: 'Grease metering and monitoring systems control and record grease volumes at each point for consistency and accountability.' },
    ],
  },

  // ─── MORE LUBRICATION ──────────────────────────────────────────────────────
  {
    id: 'more-lubrication',
    title: 'More Lubrication',
    slug: 'more-lubrication',
    routePath: '/more-lubrication',
    description: 'Lubrication storage, sampling, remote greasing, breathers, spill containment, and related accessories.',
    intro: 'Lube Control stocks ancillary lubrication products — storage, remote greasing lines, breathers, level gauges, spill containment, and more.',
    subcategories: [
      { id: 'lubrication-storage', title: 'Lubrication Storage', slug: 'lubrication-storage', routePath: '/more-lubrication/lubrication-storage', parentId: 'more-lubrication', description: 'Safe lubricant storage tanks and modular systems.', intro: 'Oil and lubricant storage solutions including modular tank units and self-bunded storage tanks for compliant workshop and site storage.' },
      { id: 'oil-sampling', title: 'Oil Sampling', slug: 'oil-sampling', routePath: '/more-lubrication/oil-sampling', parentId: 'more-lubrication', description: 'Oil sampling tools and kits.', intro: 'Sampling valves, vacuum pumps, and kits for proactive oil analysis programs.' },
      { id: 'remote-greasing-equipment', title: 'Remote Grease Lines and Fittings', slug: 'remote-greasing-equipment', routePath: '/more-lubrication/remote-greasing-equipment', parentId: 'more-lubrication', description: 'Remote grease lines — grease bearings safely without removing guards.', intro: 'Remote grease lines let you grease bearing points from a safe location without removing machine guards or entering hazardous spaces.' },
      { id: 'breathers', title: 'Breathers', slug: 'breathers', routePath: '/more-lubrication/breathers', parentId: 'more-lubrication', description: 'Desiccant breathers and air vents.', intro: 'Desiccant breathers filter moisture and particulates from incoming air, protecting gearboxes and hydraulic systems.' },
      { id: 'liquid-level-gauges', title: 'Liquid Level Gauges', slug: 'liquid-level-gauges', routePath: '/more-lubrication/liquid-level-gauges', parentId: 'more-lubrication', description: 'Sight glasses and level indicators for tanks and reservoirs.', intro: 'Liquid level gauges provide clear visual indication of oil and fluid levels in tanks, gearboxes, and reservoirs.' },
      { id: 'vent-plugs', title: 'Vent Plugs', slug: 'vent-plugs', routePath: '/more-lubrication/vent-plugs', parentId: 'more-lubrication', description: 'Tank and reservoir vent plugs.', intro: 'Vent plugs allow controlled breathing of reservoirs while reducing contamination ingress.' },
      { id: 'constant-level-oilers', title: 'Constant Level Oilers', slug: 'constant-level-oilers', routePath: '/more-lubrication/constant-level-oilers', parentId: 'more-lubrication', description: 'Automatic constant-level oil feed devices.', intro: 'Constant level oilers maintain a steady oil level in bearings and gearboxes without manual topping up.' },
      { id: 'oil-spill-containment', title: 'Oil Spill Containment', slug: 'oil-spill-containment', routePath: '/more-lubrication/oil-spill-containment', parentId: 'more-lubrication', description: 'Spill trays, bunded pallets, and containment systems.', intro: 'Spill containment including trays, bunded pallets, and portable spill kits for environmental compliance.' },
      { id: 'vibration-greasing-device', title: 'Vibration Greasing Device', slug: 'vibration-greasing-device', routePath: '/more-lubrication/vibration-greasing-device', parentId: 'more-lubrication', description: 'Vibration-activated greasing solutions.', intro: 'Vibration greasing devices help deliver grease in response to equipment vibration for selected applications.' },
      { id: 'filter-carts', title: 'Filter Carts', slug: 'filter-carts', routePath: '/more-lubrication/filter-carts', parentId: 'more-lubrication', description: 'Portable filtration carts for hydraulic and lubricating oils.', intro: 'Filter carts for offline filtration, flushing, and transfer of hydraulic and lubricating oils in the field or workshop.' },
    ],
  },
]

async function upsert(doc: Record<string, unknown>) {
  try {
    await client.createIfNotExists(doc as Parameters<typeof client.createIfNotExists>[0])
    console.log(`  ✓ Created: ${doc._id}`)
  } catch (e: unknown) {
    const err = e as { message?: string; statusCode?: number }
    if (err?.message?.includes('already exists') || err?.statusCode === 409) {
      await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0])
      console.log(`  ↺ Updated: ${doc._id}`)
    } else {
      console.error(`  ✗ Failed: ${doc._id}`, err?.message)
    }
  }
}

async function seedCategory(cat: CategoryDef, parentDocId?: string) {
  const catId = k(cat.id)
  const pageId = `page-${k(cat.routePath)}`

  // productCategory document
  const catDoc: Record<string, unknown> = {
    _id: catId,
    _type: 'productCategory',
    title: cat.title,
    slug: { _type: 'slug', current: cat.slug },
    description: cat.description,
    routePath: cat.routePath,
  }
  if (parentDocId) {
    catDoc.parent = { _type: 'reference', _ref: parentDocId }
  }
  await upsert(catDoc)

  const existingPage = await client.fetch<{ pdfDownloads?: unknown[] } | null>(
    '*[_id == $id][0]{ pdfDownloads }',
    { id: pageId },
  )
  const pdfDownloads =
    Array.isArray(existingPage?.pdfDownloads) && existingPage.pdfDownloads.length > 0
      ? existingPage.pdfDownloads
      : []

  // categoryPage document (used by the [...slug] route)
  const pageDoc: Record<string, unknown> = {
    _id: pageId,
    _type: 'categoryPage',
    path: cat.routePath,
    title: cat.title,
    seoTitle: `${cat.title} | Lube Control`,
    seoDescription: cat.description,
    intro: [block(cat.intro)],
    productCategory: { _type: 'reference', _ref: catId },
    pdfDownloads,
    // CTA — inherit from global siteSettings by leaving blank
  }
  await upsert(pageDoc)

  // Recurse into subcategories
  if (cat.subcategories?.length) {
    for (const sub of cat.subcategories) {
      await seedCategory(sub, catId)
    }
  }
}

async function main() {
  console.log(`\n🚀 Seeding all categories to Sanity (${projectId}/${dataset})...\n`)
  for (const cat of CATEGORIES) {
    console.log(`\n📁 ${cat.title}`)
    await seedCategory(cat)
  }
  console.log('\n✅ Done! All categories seeded successfully.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
