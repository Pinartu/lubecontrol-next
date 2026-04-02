/**
 * Nuclear cleanup: purge ALL productCategory and categoryPage documents and
 * re-seed from scratch. This guarantees a clean state.
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

function k(base: string) {
  return base.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()
}

function key() { return Math.random().toString(36).substring(2, 10) }

function block(text: string) {
  return { _type: 'block', _key: key(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: key(), text, marks: [] }] }
}

interface CatDef {
  id: string; title: string; slug: string; routePath: string; parentId?: string;
  description: string; intro: string; subcategories?: CatDef[]
}

const CATS: CatDef[] = [
  { id: 'fluid-handling', title: 'Fluid Handling', slug: 'fluid-handling', routePath: '/fluid-handling', description: 'Comprehensive range of oil, grease, and fuel handling equipment for Australian industry.', intro: 'Lube Control provides a comprehensive range of fluid handling equipment for oil, grease, and fuel. Whether you need pumps, hose reels, nozzles, or dispensing systems, we have the right solution for your industry.', subcategories: [
    { id: 'oil-handling-equipment', title: 'Oil Handling Equipment', slug: 'oil-handling-equipment', routePath: '/fluid-handling/oil-handling-equipment', parentId: 'fluid-handling', description: 'Oil guns, pumps, hose reels and dispensing equipment for all oil handling applications.', intro: 'Our oil handling equipment range includes oil guns, manual and powered pumps, hose reels, and complete dispensing kits suitable for 20L drums through to 205L drums and IBC containers.' },
    { id: 'grease-transfer-equipment', title: 'Grease Transfer Equipment', slug: 'grease-transfer-equipment', routePath: '/fluid-handling/grease-transfer-equipment', parentId: 'fluid-handling', description: 'Grease kits, guns, pumps, hose reels, and bulk grease vessel systems.', intro: 'From 400g grease guns to 180kg bulk grease pumps, Lube Control supplies a complete range of grease transfer equipment to suit any application – from workshop to heavy industrial.' },
    { id: 'fuel-handling-equipment', title: 'Fuel Handling Equipment', slug: 'fuel-handling-equipment', routePath: '/fluid-handling/fuel-handling-equipment', parentId: 'fluid-handling', description: 'Fuel nozzles, hose reels, meters, pumps, and complete fuel dispensing systems.', intro: 'Lube Control\'s fuel handling range covers everything from fuel nozzles and hose reels through to complete fuel storage and dispensing systems, designed for industrial, mining, and agricultural use.' },
    { id: 'waste-oil', title: 'Waste Oil', slug: 'waste-oil', routePath: '/fluid-handling/waste-oil', parentId: 'fluid-handling', description: 'Waste oil handling, storage, and disposal solutions.', intro: 'Equipment and systems for the safe handling, storage, and transfer of waste oil.' },
  ]},
  { id: 'lubricants', title: 'Lubricants', slug: 'lubricants', routePath: '/lubricants', description: 'Quality lubricants from leading brands for every industrial and commercial application.', intro: 'Lube Control is an authorised reseller of quality lubricant brands including Anglomoil, Blaster, Castrol, Imperial Oils, Inox, and Lubrication Engineers. We stock a wide range of engine oils, hydraulic oils, gear oils, greases, and specialty lubricants.', subcategories: [
    { id: 'anglomoil', title: 'Anglomoil Lubricants', slug: 'anglomoil', routePath: '/lubricants/anglomoil', parentId: 'lubricants', description: 'Australian owned premium lubricant brand — engine oils, gear oils, greases and more.', intro: 'Anglomoil is an Australian owned and operated lubricant company offering a comprehensive range of high-performance lubricants including engine oils, gear oils, hydraulic fluids, greases, and specialty products.' },
    { id: 'blaster-products', title: 'Blaster Products', slug: 'blaster-products', routePath: '/lubricants/blaster-products', parentId: 'lubricants', description: 'Penetrating oils, lubricants, and maintenance sprays from Blaster.', intro: 'Blaster Products offer a range of specialty penetrating oils, rust removers, lubricants, and maintenance sprays trusted by professionals worldwide.' },
    { id: 'castrol-performance-lubricants', title: 'Castrol Performance Lubricants', slug: 'castrol-performance-lubricants', routePath: '/lubricants/castrol-performance-lubricants', parentId: 'lubricants', description: 'World-class performance lubricants — engine, industrial, and specialty oils.', intro: 'Castrol is a world leader in lubricant technology, offering premium engine oils, industrial lubricants, gear fluids, and specialty greases. Trusted by leading automotive, marine, and industrial manufacturers globally.' },
    { id: 'imperial-oils-chemicals', title: 'Imperial Oils & Chemicals', slug: 'imperial-oils-chemicals', routePath: '/lubricants/imperial-oils-chemicals', parentId: 'lubricants', description: 'Quality industrial and specialty lubricants from Imperial Oils & Chemicals.', intro: 'Imperial Oils & Chemicals provides high-quality industrial lubricants, cutting fluids, metalworking oils, and specialty chemical products designed to improve efficiency and reduce maintenance costs.' },
    { id: 'inox-lubricants', title: 'Inox Lubricants', slug: 'inox-lubricants', routePath: '/lubricants/inox-lubricants', parentId: 'lubricants', description: 'Multi-purpose lubricants and rust inhibitors — Australian made INOX products.', intro: 'INOX is an Australian-made lubricant that combines cutting-edge technology with multi-purpose use. INOX products protect metal surfaces, displace moisture, and provide long-lasting lubrication.' },
    { id: 'lubrication-engineers', title: 'Lubrication Engineers', slug: 'lubrication-engineers', routePath: '/lubricants/lubrication-engineers', parentId: 'lubricants', description: 'Specialty lubricants from Lubrication Engineers (LE) for demanding applications.', intro: 'Lubrication Engineers (LE) is a global leader in specialty lubricants, providing high-performance solutions for extreme operating conditions including greases, gear oils, hydraulic fluids, and food-grade lubricants.' },
  ]},
  { id: 'services', title: 'Lube Services', slug: 'services', routePath: '/services', description: 'Professional lubrication surveys, oil analysis, lube routes and case studies.', intro: 'Lube Control provides professional lubrication services to help you optimise your maintenance programs, reduce downtime, and extend equipment life.', subcategories: [
    { id: 'lubrication-surveys', title: 'Lubrication Surveys', slug: 'lubrication-surveys', routePath: '/services/lubrication-surveys', parentId: 'services', description: 'Professional on-site lubrication surveys.', intro: 'Comprehensive assessment of your lubrication practices — identifying inefficiencies, safety risks, and cost reduction opportunities.' },
    { id: 'oil-analysis', title: 'Oil Analysis', slug: 'oil-analysis', routePath: '/services/oil-analysis', parentId: 'services', description: 'Oil sampling and laboratory analysis.', intro: 'Oil analysis detects contamination, wear metals, and lubricant degradation before they cause failures.' },
    { id: 'lube-routes', title: 'Lube Routes', slug: 'lube-routes', routePath: '/services/lube-routes', parentId: 'services', description: 'Structured lubrication route planning.', intro: 'Systematic lubrication routes ensure all critical points are serviced on time.' },
    { id: 'case-studies', title: 'Case Studies', slug: 'case-studies', routePath: '/services/case-studies', parentId: 'services', description: 'Real-world lubrication improvement examples.', intro: 'Case studies showing how Lube Control has helped Australian businesses reduce maintenance costs.' },
  ]},
  { id: 'auto-lube-systems', title: 'Auto Lube Systems', slug: 'auto-lube-systems', routePath: '/auto-lube-systems', description: 'Automatic single-point lubricators and centralised systems.', intro: 'Lube Control is Australia\'s trusted supplier of automatic lubrication systems.', subcategories: [
    { id: 'simalube', title: 'Simalube', slug: 'simalube', routePath: '/auto-lube-systems/simalube', parentId: 'auto-lube-systems', description: 'Simalube automatic single-point lubricators.', intro: 'Simalube by simatec delivers grease or oil to individual lubrication points.' },
    { id: 'pulsarlube', title: 'Pulsarlube', slug: '2225-2', routePath: '/auto-lube-systems/2225-2', parentId: 'auto-lube-systems', description: 'Pulsarlube automatic lubricators.', intro: 'Electrochemical and electromechanical single-point lubricators.' },
    { id: 'perma-lube', title: 'Perma Lube', slug: 'perma-lube', routePath: '/auto-lube-systems/perma-lube', parentId: 'auto-lube-systems', description: 'Perma automatic lubrication systems.', intro: 'Single-point and multi-point automatic lubricators.' },
    { id: 'grease-bomb-120-single-point-lubricator', title: 'Grease Bomb 120 Single Point Lubricator', slug: 'grease-bomb-120-single-point-lubricator', routePath: '/auto-lube-systems/grease-bomb-120-single-point-lubricator', parentId: 'auto-lube-systems', description: 'Compact single-point grease lubricator.', intro: 'Button-activated automatic grease lubricator for individual bearing points.' },
    { id: 'memolub-lubricator', title: 'Memolub HPS Lubricator', slug: 'memolub-lubricator', routePath: '/auto-lube-systems/memolub-lubricator', parentId: 'auto-lube-systems', description: 'Memolub HPS electromechanical lubricator.', intro: 'Programmable lubricator with replaceable cartridges.' },
    { id: 'oil-rite-lubrication-systems', title: 'Oil Rite Lubrication Systems', slug: 'oil-rite-lubrication-systems', routePath: '/auto-lube-systems/oil-rite-lubrication-systems', parentId: 'auto-lube-systems', description: 'Oil Rite centralised systems.', intro: 'Centralised and gravity-feed lubrication for industrial machinery.' },
    { id: 'oil-rite-lube-systems', title: 'Purgex Lube Systems', slug: 'oil-rite-lube-systems', routePath: '/auto-lube-systems/oil-rite-lube-systems', parentId: 'auto-lube-systems', description: 'Purgex positive-displacement systems.', intro: 'Precise metered oil or grease delivery.' },
    { id: 'ilc-autolubrication-systems', title: 'ILC Auto Lubrication Systems', slug: 'ilc-autolubrication-systems', routePath: '/auto-lube-systems/ilc-autolubrication-systems', parentId: 'auto-lube-systems', description: 'ILC automatic systems.', intro: 'Rugged automatic greasing for mining, agriculture, construction, and manufacturing.' },
    { id: 'multi-line-and-rotary-lube-pumps', title: 'Multi Line and Rotary Lube Pumps', slug: 'multi-line-and-rotary-lube-pumps', routePath: '/auto-lube-systems/multi-line-and-rotary-lube-pumps', parentId: 'auto-lube-systems', description: 'Multi-line and rotary pump systems.', intro: 'Centralised automated lubrication via divider blocks.' },
    { id: 'grease-metering-grease-monitoring', title: 'Grease Metering and Grease Monitoring', slug: '2486-2', routePath: '/auto-lube-systems/2486-2', parentId: 'auto-lube-systems', description: 'Grease metering and monitoring.', intro: 'Control and record grease volumes at each lubrication point.' },
  ]},
  { id: 'more-lubrication', title: 'More Lubrication', slug: 'more-lubrication', routePath: '/more-lubrication', description: 'Lubrication storage, sampling, remote greasing, breathers, and accessories.', intro: 'Ancillary lubrication products — storage, remote greasing, breathers, spill containment, and more.', subcategories: [
    { id: 'lubrication-storage', title: 'Lubrication Storage', slug: 'lubrication-storage', routePath: '/more-lubrication/lubrication-storage', parentId: 'more-lubrication', description: 'Safe lubricant storage systems.', intro: 'Modular tank units and self-bunded storage tanks.' },
    { id: 'oil-sampling', title: 'Oil Sampling', slug: 'oil-sampling', routePath: '/more-lubrication/oil-sampling', parentId: 'more-lubrication', description: 'Oil sampling tools and kits.', intro: 'Sampling valves, vacuum pumps, and kits for oil analysis programs.' },
    { id: 'remote-greasing-equipment', title: 'Remote Grease Lines and Fittings', slug: 'remote-greasing-equipment', routePath: '/more-lubrication/remote-greasing-equipment', parentId: 'more-lubrication', description: 'Remote grease lines.', intro: 'Grease bearing points safely without removing guards.' },
    { id: 'breathers', title: 'Breathers', slug: 'breathers', routePath: '/more-lubrication/breathers', parentId: 'more-lubrication', description: 'Desiccant breathers and air vents.', intro: 'Filter moisture and particulates from incoming air.' },
    { id: 'liquid-level-gauges', title: 'Liquid Level Gauges', slug: 'liquid-level-gauges', routePath: '/more-lubrication/liquid-level-gauges', parentId: 'more-lubrication', description: 'Sight glasses and level indicators.', intro: 'Visual indication of fluid levels in tanks and reservoirs.' },
    { id: 'vent-plugs', title: 'Vent Plugs', slug: 'vent-plugs', routePath: '/more-lubrication/vent-plugs', parentId: 'more-lubrication', description: 'Tank and reservoir vent plugs.', intro: 'Controlled breathing of reservoirs.' },
    { id: 'constant-level-oilers', title: 'Constant Level Oilers', slug: 'constant-level-oilers', routePath: '/more-lubrication/constant-level-oilers', parentId: 'more-lubrication', description: 'Constant-level oil feed devices.', intro: 'Maintain steady oil level in bearings and gearboxes.' },
    { id: 'oil-spill-containment', title: 'Oil Spill Containment', slug: 'oil-spill-containment', routePath: '/more-lubrication/oil-spill-containment', parentId: 'more-lubrication', description: 'Spill trays and bunded pallets.', intro: 'Environmental compliance spill containment.' },
    { id: 'vibration-greasing-device', title: 'Vibration Greasing Device', slug: 'vibration-greasing-device', routePath: '/more-lubrication/vibration-greasing-device', parentId: 'more-lubrication', description: 'Vibration-activated greasing.', intro: 'Grease delivery in response to equipment vibration.' },
    { id: 'filter-carts', title: 'Filter Carts', slug: 'filter-carts', routePath: '/more-lubrication/filter-carts', parentId: 'more-lubrication', description: 'Portable filtration carts.', intro: 'Offline filtration and transfer of hydraulic and lubricating oils.' },
  ]},
]

async function seedCat(cat: CatDef, parentId?: string) {
  const catDoc: Record<string, unknown> = {
    _id: cat.id, _type: 'productCategory',
    title: cat.title,
    slug: { _type: 'slug', current: cat.slug },
    description: cat.description,
    routePath: cat.routePath,
  }
  if (parentId) catDoc.parent = { _type: 'reference', _ref: parentId }
  await client.createOrReplace(catDoc as Parameters<typeof client.createOrReplace>[0])

  const pageId = 'page-' + k(cat.routePath)
  const pageDoc: Record<string, unknown> = {
    _id: pageId, _type: 'categoryPage',
    path: cat.routePath, title: cat.title,
    seoTitle: `${cat.title} » Lube Control`,
    seoDescription: cat.description,
    intro: [block(cat.intro)],
    productCategory: { _type: 'reference', _ref: cat.id },
    pdfDownloads: [],
  }
  await client.createOrReplace(pageDoc as Parameters<typeof client.createOrReplace>[0])
  console.log(`  ✓ ${cat.id}`)

  if (cat.subcategories) {
    for (const sub of cat.subcategories) await seedCat(sub, cat.id)
  }
}

async function main() {
  // Step 1: Get all existing ids
  const existingCats: Array<{_id: string}> = await client.fetch('*[_type == "productCategory"]{_id}')
  const existingPages: Array<{_id: string}> = await client.fetch('*[_type == "categoryPage"]{_id}')
  
  const expectedCatIds = new Set(CATS.flatMap(c => [c.id, ...(c.subcategories?.map(s => s.id) ?? [])]))
  const expectedPageIds = new Set(CATS.flatMap(c => ['page-' + k(c.routePath), ...(c.subcategories?.map(s => 'page-' + k(s.routePath)) ?? [])]))

  // Step 2: Remove parent references from orphan children (to allow deletion)
  const orphanCatIds = existingCats.filter(d => !expectedCatIds.has(d._id)).map(d => d._id)
  console.log(`Orphaned cats to delete: ${orphanCatIds.join(', ') || 'none'}`)
  
  for (const orphanId of orphanCatIds) {
    // Remove references to this orphan in other docs (children pointing to it as parent)
    const children: Array<{_id: string}> = await client.fetch(`*[_type == "productCategory" && parent._ref == $id]{_id}`, { id: orphanId })
    for (const child of children) {
      await client.patch(child._id).unset(['parent']).commit()
    }
    const refPages: Array<{_id: string}> = await client.fetch(`*[_type == "categoryPage" && productCategory._ref == $id]{_id}`, { id: orphanId })
    for (const p of refPages) { await client.delete(p._id) }
    await client.delete(orphanId)
    console.log(`  🗑 Deleted orphan: ${orphanId}`)
  }

  const orphanPageIds = existingPages.filter(d => !expectedPageIds.has(d._id)).map(d => d._id)
  for (const pid of orphanPageIds) {
    await client.delete(pid)
    console.log(`  🗑 Deleted orphan page: ${pid}`)
  }

  // Step 3: Seed all
  console.log('\nSeeding all categories...')
  for (const cat of CATS) {
    console.log(`\n📁 ${cat.title}`)
    await seedCat(cat)
  }

  console.log('\n✅ All done!')
}

main().catch(console.error)
