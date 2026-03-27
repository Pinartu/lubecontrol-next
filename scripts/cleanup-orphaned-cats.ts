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
  ]},
  { id: 'lubricants', title: 'Lubricants', slug: 'lubricants', routePath: '/lubricants', description: 'Quality lubricants from leading brands for every industrial and commercial application.', intro: 'Lube Control is an authorised reseller of quality lubricant brands including Anglomoil, Blaster, Castrol, Imperial Oils, Inox, and Lubrication Engineers. We stock a wide range of engine oils, hydraulic oils, gear oils, greases, and specialty lubricants.', subcategories: [
    { id: 'anglomoil', title: 'Anglomoil Lubricants', slug: 'anglomoil', routePath: '/lubricants/anglomoil', parentId: 'lubricants', description: 'Australian owned premium lubricant brand — engine oils, gear oils, greases and more.', intro: 'Anglomoil is an Australian owned and operated lubricant company offering a comprehensive range of high-performance lubricants including engine oils, gear oils, hydraulic fluids, greases, and specialty products.' },
    { id: 'blaster-products', title: 'Blaster Products', slug: 'blaster-products', routePath: '/lubricants/blaster-products', parentId: 'lubricants', description: 'Penetrating oils, lubricants, and maintenance sprays from Blaster.', intro: 'Blaster Products offer a range of specialty penetrating oils, rust removers, lubricants, and maintenance sprays trusted by professionals worldwide.' },
    { id: 'castrol-performance-lubricants', title: 'Castrol Performance Lubricants', slug: 'castrol-performance-lubricants', routePath: '/lubricants/castrol-performance-lubricants', parentId: 'lubricants', description: 'World-class performance lubricants — engine, industrial, and specialty oils.', intro: 'Castrol is a world leader in lubricant technology, offering premium engine oils, industrial lubricants, gear fluids, and specialty greases. Trusted by leading automotive, marine, and industrial manufacturers globally.' },
    { id: 'imperial-oils-chemicals', title: 'Imperial Oils & Chemicals', slug: 'imperial-oils-chemicals', routePath: '/lubricants/imperial-oils-chemicals', parentId: 'lubricants', description: 'Quality industrial and specialty lubricants from Imperial Oils & Chemicals.', intro: 'Imperial Oils & Chemicals provides high-quality industrial lubricants, cutting fluids, metalworking oils, and specialty chemical products designed to improve efficiency and reduce maintenance costs.' },
    { id: 'inox-lubricants', title: 'Inox Lubricants', slug: 'inox-lubricants', routePath: '/lubricants/inox-lubricants', parentId: 'lubricants', description: 'Multi-purpose lubricants and rust inhibitors — Australian made INOX products.', intro: 'INOX is an Australian-made lubricant that combines cutting-edge technology with multi-purpose use. INOX products protect metal surfaces, displace moisture, and provide long-lasting lubrication.' },
    { id: 'lubrication-engineers', title: 'Lubrication Engineers', slug: 'lubrication-engineers', routePath: '/lubricants/lubrication-engineers', parentId: 'lubricants', description: 'Specialty lubricants from Lubrication Engineers (LE) for demanding applications.', intro: 'Lubrication Engineers (LE) is a global leader in specialty lubricants, providing high-performance solutions for extreme operating conditions including greases, gear oils, hydraulic fluids, and food-grade lubricants.' },
  ]},
  { id: 'lube-services', title: 'Lube Services', slug: 'lube-services', routePath: '/lube-services', description: 'Professional lubrication surveys, oil analysis, lube routes and case studies.', intro: 'Lube Control provides professional lubrication services to help you optimise your maintenance programs, reduce downtime, and extend equipment life. Our expert team can assess your current lubrication practices and recommend improvements.', subcategories: [
    { id: 'lubrication-surveys', title: 'Lubrication Surveys', slug: 'lubrication-surveys', routePath: '/lube-services/lubrication-surveys', parentId: 'lube-services', description: 'Professional on-site lubrication surveys to optimise your maintenance program.', intro: 'Our lubrication surveys provide a comprehensive assessment of your current lubrication practices — identifying inefficiencies, safety risks, and opportunities to reduce costs and equipment downtime.' },
    { id: 'oil-analysis', title: 'Oil Analysis', slug: 'oil-analysis', routePath: '/lube-services/oil-analysis', parentId: 'lube-services', description: 'Oil sampling and laboratory analysis to monitor lubricant and equipment health.', intro: 'Oil analysis is a proactive maintenance tool that reveals the condition of both your lubricants and your machinery. Regular oil sampling can detect contamination, wear metals, and lubricant degradation before they cause failures.' },
    { id: 'lube-routes', title: 'Lube Routes', slug: 'lube-routes', routePath: '/lube-services/lube-routes', parentId: 'lube-services', description: 'Structured lubrication route planning to ensure consistent and effective greasing.', intro: 'A well-designed lube route ensures that all critical lubrication points are serviced on time, every time. Lube Control can help you develop systematic lubrication routes that reduce missed points and extend equipment life.' },
    { id: 'case-studies', title: 'Case Studies', slug: 'case-studies', routePath: '/lube-services/case-studies', parentId: 'lube-services', description: 'Real-world examples of lubrication improvements and savings achieved for our clients.', intro: 'Explore our collection of case studies showing how Lube Control has helped Australian businesses reduce maintenance costs, eliminate lubrication failures, and extend the life of critical equipment.' },
  ]},
  { id: 'auto-lube-systems', title: 'Auto Lube Systems', slug: 'auto-lube-systems', routePath: '/auto-lube-systems', description: 'Automatic lubrication systems including ILC, remote grease lines, and single/multi-point lubricators.', intro: 'Lube Control is Australia\'s trusted supplier of automatic lubrication systems. From remote grease lines that allow safe greasing without entering hazardous areas, to fully automated centralised lubrication systems — we have the solution for your equipment.', subcategories: [
    { id: 'ilc-autolubrication-systems', title: 'ILC Autolubrication Systems', slug: 'ilc-autolubrication-systems', routePath: '/auto-lube-systems/ilc-autolubrication-systems', parentId: 'auto-lube-systems', description: 'ILC automatic lubrication systems for heavy-duty industrial and mining applications.', intro: 'ILC Auto Lubrication Systems are rugged, reliable automatic greasing systems designed for the harshest Australian conditions. Used in mining, agriculture, construction, and manufacturing, ILC systems deliver precise quantities of grease to multiple points simultaneously.' },
    { id: 'remote-grease-lines', title: 'Remote Grease Lines', slug: 'remote-grease-lines', routePath: '/auto-lube-systems/remote-grease-lines', parentId: 'auto-lube-systems', description: 'Grease bearing points safely without removing guards or entering hazardous zones.', intro: 'Remote grease lines allow maintenance personnel to grease bearing points from a safe, accessible location — without removing machine guards or entering confined or hazardous spaces. Custom designed and installed to suit your specific machinery.' },
    { id: 'single-point-lubricators', title: 'Single Point Lubricators', slug: 'single-point-lubricators', routePath: '/auto-lube-systems/single-point-lubricators', parentId: 'auto-lube-systems', description: 'Automatic single-point lubricators for continuous, precise grease delivery to one bearing.', intro: 'Single point lubricators automatically deliver a controlled amount of grease or oil to a single bearing point over time. Easy to install and maintain, they are ideal for difficult-to-reach or hazardous bearing locations.' },
    { id: 'multi-point-lubricators', title: 'Multi Point Lubricators', slug: 'multi-point-lubricators', routePath: '/auto-lube-systems/multi-point-lubricators', parentId: 'auto-lube-systems', description: 'Automatic lubricators delivering grease to multiple points from a single unit.', intro: 'Multi-point lubricators supply grease to several bearing points simultaneously from one central unit. They are a cost-effective alternative to full centralised systems for machines with up to 8 lubrication points.' },
    { id: 'centralised-lubrication-systems', title: 'Centralised Lubrication Systems', slug: 'centralised-lubrication-systems', routePath: '/auto-lube-systems/centralised-lubrication-systems', parentId: 'auto-lube-systems', description: 'Full automatic centralised lubrication systems for large machinery and fleets.', intro: 'Centralised lubrication systems automatically and continuously supply the correct amount of lubricant to all bearing and lubrication points of a machine from a central pump unit. Essential for large, complex machinery where manual lubrication is impractical or unsafe.' },
  ]},
  { id: 'more-lubrication', title: 'More Lubrication', slug: 'more-lubrication', routePath: '/more-lubrication', description: 'Oil storage, spill containment, lube cabinets, breathers, drum handling, and dispensing meters.', intro: 'Beyond our main product categories, Lube Control stocks a wide variety of ancillary lubrication products — from oil storage systems and spill containment to lube cabinets, breathers, drum handling equipment, and dispensing meters.', subcategories: [
    { id: 'oil-storage', title: 'Oil Storage Systems', slug: 'oil-storage', routePath: '/more-lubrication/oil-storage', parentId: 'more-lubrication', description: 'Safe oil storage tanks, units, and modular storage systems for workshops and sites.', intro: 'Lube Control supplies a range of oil storage solutions including modular tank units, self-bunded storage tanks, and workshop oil storage skids designed to comply with Australian EPA regulations.' },
    { id: 'spill-containment', title: 'Spill Containment', slug: 'spill-containment', routePath: '/more-lubrication/spill-containment', parentId: 'more-lubrication', description: 'Spill trays, bunded pallets, and containment systems to meet environmental compliance.', intro: 'Our spill containment range includes spill trays, bunded pallets, drum containment units, and portable spill kits to help you comply with Australian environmental regulations.' },
    { id: 'lube-cabinets', title: 'Lube Cabinets', slug: 'lube-cabinets', routePath: '/more-lubrication/lube-cabinets', parentId: 'more-lubrication', description: 'Organised lubrication storage cabinets to keep oils, greases and fittings accessible.', intro: 'Lube cabinets provide a central, organised storage point for all your lubricants, tools, and accessories. Designed for workshops, maintenance bays, and on-site use.' },
    { id: 'oil-sampling', title: 'Oil Sampling', slug: 'oil-sampling', routePath: '/more-lubrication/oil-sampling', parentId: 'more-lubrication', description: 'Oil sampling tools, sampling valves, and kits for proactive oil analysis programs.', intro: 'Proper oil sampling technique is critical to obtaining accurate results from your oil analysis program. Lube Control supplies sampling valves, vacuum pumps, and complete sampling kits.' },
    { id: 'breathers', title: 'Breathers & Air Vents', slug: 'breathers', routePath: '/more-lubrication/breathers', parentId: 'more-lubrication', description: 'Desiccant breathers and air vents to protect gearboxes, hydraulic tanks and reservoirs.', intro: 'Lube Control\'s range of desiccant breathers and air vents filter moisture and particulates from incoming air, protecting gearboxes, hydraulic reservoirs, and other enclosed lubrication systems.' },
    { id: 'drum-handling', title: 'Drum Handling', slug: 'drum-handling', routePath: '/more-lubrication/drum-handling', parentId: 'more-lubrication', description: 'Drum cradles, trolleys, rotators, and handling equipment for safe drum management.', intro: 'Our drum handling range includes drum trolleys, cradles, rotators, dispensing cradles, and scissor lift platforms to make drum handling safer and more efficient.' },
    { id: 'dispensing-meters', title: 'Dispensing Meters', slug: 'dispensing-meters', routePath: '/more-lubrication/dispensing-meters', parentId: 'more-lubrication', description: 'Oil, grease, and fuel meters for accurate dispensing and inventory tracking.', intro: 'Dispensing meters provide accurate measurement of oils, greases, and fuels during dispensing. Lube Control stocks digital and mechanical meters for both fixed installations and portable dispensing systems.' },
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
    seoTitle: `${cat.title} | Lube Control`,
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
