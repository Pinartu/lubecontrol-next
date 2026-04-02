/**
 * NUCLEAR cleanup + full deep hierarchy seed.
 * Deletes ALL productCategory and categoryPage documents, then re-creates everything from scratch.
 * This avoids any orphan/reference issues.
 *
 *   npx tsx scripts/nuclear-seed.ts
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
  description: string; intro: string; children?: Cat[]
}

// ═══════════════════════════════════════════════════════════════════════════
// FULL CATEGORY TREE from lubecontrol.com.au
// ═══════════════════════════════════════════════════════════════════════════

const TREE: Cat[] = [
  // ─── FLUID HANDLING ────────────────────────────────────────────────────
  { id: 'fluid-handling', title: 'Fluid Handling', slug: 'fluid-handling', routePath: '/fluid-handling',
    description: 'Comprehensive range of oil, grease, and fuel handling equipment for Australian industry.',
    intro: 'Lube Control provides a comprehensive range of fluid handling equipment for oil, grease, and fuel. Whether you need pumps, hose reels, nozzles, or dispensing systems, we have the right solution for your industry.',
    children: [
      // Oil Handling Equipment
      { id: 'oil-handling-equipment', title: 'Oil Handling Equipment', slug: 'oil-handling-equipment', routePath: '/fluid-handling/oil-handling-equipment',
        description: 'Oil guns, pumps, hose reels and dispensing equipment for all oil handling applications.',
        intro: 'Our oil handling equipment range includes oil guns, manual and powered pumps, hose reels, and complete dispensing kits suitable for 20L drums through to 205L drums and IBC containers.',
        children: [
          { id: 'oil-guns-and-oil-jug', title: 'Oil Guns and Oil Jug', slug: 'oil-guns-and-oil-jug', routePath: '/fluid-handling/oil-handling-equipment/oil-guns-and-oil-jug',
            description: 'Oil measure jugs, trigger-action oil guns, and flexible spouts for precise oil dispensing.',
            intro: 'Oil guns and oil jugs make it easy to dispense measured quantities of oil directly to engines, gearboxes, and other equipment. Our range includes trigger-action oil guns, gravity-feed oil cans, and graduated measure jugs.' },
          { id: 'oil-pumps-manual', title: 'Manual Oil Pumps', slug: 'oil-pumps-manual', routePath: '/fluid-handling/oil-handling-equipment/oil-pumps-manual',
            description: 'Hand-operated rotary and lever oil pumps for drum and container dispensing.',
            intro: 'Manual oil pumps provide a simple, cost-effective way to transfer oil from drums and containers. Our range includes rotary hand pumps, lever-action pumps, and piston pumps suitable for various viscosities.' },
          { id: 'oil-drum-pumps', title: 'Electric Oil Pumps & Kits', slug: 'oil-drum-pumps', routePath: '/fluid-handling/oil-handling-equipment/oil-drum-pumps',
            description: 'Electric-powered oil pumps and complete dispensing kits for efficient oil transfer.',
            intro: 'Electric oil pumps and kits provide fast, efficient oil transfer from drums and tanks. Ideal for workshops, service bays, and industrial applications where manual pumping is impractical.' },
          { id: 'air-operated-pumps', title: 'Pneumatic Pumps & Kits', slug: 'air-operated-pumps', routePath: '/fluid-handling/oil-handling-equipment/air-operated-pumps',
            description: 'Air-operated oil pumps for 20L drums, 205L drums, stub pumps, and heavy-duty applications.',
            intro: 'Pneumatic (air-operated) oil pumps are the workhorse of professional oil dispensing. Available for 20L drums, 205L drums, stub mounting, and heavy-duty IBC/pallecon containers.',
            children: [
              { id: 'oil-drum-pumps-air', title: '20L Oil Drum Pumps', slug: 'oil-drum-pumps-air', routePath: '/fluid-handling/oil-handling-equipment/air-operated-pumps/oil-drum-pumps-air',
                description: 'Air-operated pumps designed for 20-litre oil drums.', intro: 'Compact air-operated pumps specifically designed for 20-litre oil drums. Perfect for workshop use where space is limited.' },
              { id: '205l-oil-pumps-air', title: '205L Oil Pumps', slug: '205l-oil-pumps-air', routePath: '/fluid-handling/oil-handling-equipment/air-operated-pumps/205l-oil-pumps-air',
                description: 'Air-operated pumps for standard 205-litre oil drums.', intro: 'Heavy-duty air-operated pumps designed for standard 205-litre (44-gallon) oil drums, the most common format in Australian industry.' },
              { id: 'stub-oil-pumps-air', title: 'Stub Oil Pumps', slug: 'stub-oil-pumps-air', routePath: '/fluid-handling/oil-handling-equipment/air-operated-pumps/stub-oil-pumps-air',
                description: 'Stub-mounted air-operated oil pumps for tank and reservoir installations.', intro: 'Stub oil pumps mount directly into tanks and reservoirs via a threaded stub connection. Ideal for permanent oil dispensing installations.' },
              { id: 'heavy-duty-oil-drum-pumps-air', title: 'Heavy Duty Oil Drum Pumps', slug: 'heavy-duty-oil-drum-pumps-air', routePath: '/fluid-handling/oil-handling-equipment/air-operated-pumps/heavy-duty-oil-drum-pumps-air',
                description: 'Heavy-duty air-operated pumps for high-viscosity oils and demanding applications.', intro: 'Heavy-duty air-operated oil drum pumps designed for high-viscosity oils and continuous-use demanding applications in industrial and mining environments.' },
              { id: 'air-operated-oil-transfer-pumps', title: 'Air Operated Oil Transfer Kits', slug: 'air-operated-oil-transfer-pumps', routePath: '/fluid-handling/oil-handling-equipment/air-operated-pumps/air-operated-oil-transfer-pumps',
                description: 'Complete air-operated oil transfer pump kits with hoses, meters, and nozzles.', intro: 'Complete air-operated oil transfer kits include pump, hose, meter, and nozzle — everything you need for professional oil dispensing from drums and tanks.' },
              { id: 'air-operated-ibcpallecon-kits', title: 'Air Operated 1000L/IBC/Pallecon Kits', slug: 'air-operated-ibcpallecon-kits', routePath: '/fluid-handling/oil-handling-equipment/air-operated-pumps/air-operated-ibcpallecon-kits',
                description: 'Air-operated pump kits for 1000L IBC and pallecon containers.', intro: 'Specialised air-operated pump kits designed for 1000-litre IBC (Intermediate Bulk Container) and pallecon containers, common in bulk oil distribution.' },
            ] },
          { id: 'oil-hose-reels', title: 'Oil Hose Reels', slug: 'oil-hose-reels', routePath: '/fluid-handling/oil-handling-equipment/oil-hose-reels',
            description: 'Spring-retractable and manual oil hose reels for clean, organised dispensing.',
            intro: 'Oil hose reels keep your workshop tidy and extend the life of dispensing hoses. Available in spring-retractable and manual wind configurations for various hose lengths and oil types.' },
        ] },

      // Grease Transfer Equipment
      { id: 'grease-transfer-equipment', title: 'Grease Transfer Equipment', slug: 'grease-transfer-equipment', routePath: '/fluid-handling/grease-transfer-equipment',
        description: 'Grease kits, guns, pumps, hose reels, and bulk grease vessel systems.',
        intro: 'From 400g grease guns to 180kg bulk grease pumps, Lube Control supplies a complete range of grease transfer equipment to suit any application – from workshop to heavy industrial.',
        children: [
          { id: '2-5kg-grease-kits', title: '2.5kg Grease Kits', slug: '2-5kg-grease-kits', routePath: '/fluid-handling/grease-transfer-equipment/2-5kg-grease-kits',
            description: 'Compact 2.5kg grease dispensing kits for small-scale applications.', intro: 'Portable 2.5kg grease kits are perfect for mobile maintenance, small workshops, and field service applications.' },
          { id: 'grease-guns', title: '400g and 450g Grease Guns', slug: 'grease-guns', routePath: '/fluid-handling/grease-transfer-equipment/grease-guns',
            description: 'Professional cartridge and bulk-fill grease guns for precise greasing.', intro: 'Our range of 400g and 450g grease guns includes lever-action, pistol-grip, and continuous-flow models for precise, professional greasing.' },
          { id: 'grease-hose-reels', title: 'Grease Hose Reels', slug: 'grease-hose-reels', routePath: '/fluid-handling/grease-transfer-equipment/grease-hose-reels',
            description: 'High-pressure grease hose reels for organised workshop dispensing.', intro: 'Grease hose reels designed for high-pressure grease lines, keeping hoses organised and protected in busy workshops and maintenance bays.' },
          { id: 'grease-control-valves', title: 'Grease Control Valves', slug: 'grease-control-valves', routePath: '/fluid-handling/grease-transfer-equipment/grease-control-valves',
            description: 'Metering and control valves for accurate grease dispensing.', intro: 'Grease control valves provide accurate, measured grease dispensing to prevent over-greasing and waste.' },
          { id: '20kg-greasing-kits', title: '20kg Greasing Kits', slug: '20kg-greasing-kits', routePath: '/fluid-handling/grease-transfer-equipment/20kg-greasing-kits',
            description: 'Medium-duty 20kg grease pump kits for workshops and mobile use.', intro: 'Complete 20kg greasing kits with pump, hose, and grease gun — ideal for medium-duty workshop and mobile maintenance applications.' },
          { id: '180kg-grease-kits-2', title: '180kg Grease Pumps & Kits', slug: '180kg-grease-kits-2', routePath: '/fluid-handling/grease-transfer-equipment/180kg-grease-kits-2',
            description: 'Heavy-duty 180kg grease drum pump kits for industrial applications.', intro: 'Our 180kg grease pump kits handle the demands of heavy industrial and mining greasing applications.' },
          { id: 'bulk-grease-vessels', title: 'Bulk Grease Vessels', slug: 'bulk-grease-vessels', routePath: '/fluid-handling/grease-transfer-equipment/bulk-grease-vessels',
            description: 'Large-capacity bulk grease storage and dispensing vessels.', intro: 'Bulk grease vessels provide centralised grease storage for high-volume greasing operations, feeding multiple grease lines and pumps.' },
          { id: 'grease-meters', title: 'Grease Meters', slug: 'grease-meters', routePath: '/fluid-handling/grease-transfer-equipment/grease-meters',
            description: 'Inline grease meters for measuring and tracking grease usage.', intro: 'Grease meters accurately measure dispensed grease volumes, helping you track usage, prevent over-greasing, and plan maintenance schedules.' },
          { id: 'manual-grease-monitoring-lube-right', title: 'Manual Grease Monitoring - Lube Right', slug: 'manual-grease-monitoring-lube-right', routePath: '/fluid-handling/grease-transfer-equipment/manual-grease-monitoring-lube-right',
            description: 'Lube Right manual grease monitoring systems for accountability and traceability.', intro: 'The Lube Right system provides a simple, effective method to track and monitor manual greasing activities, ensuring all lubrication points are serviced correctly.' },
          { id: 'electric-grease-pump', title: 'Electric Grease Pump 16kg 20kg 55kg and 180kg', slug: 'electric-grease-pump-16kg-20kg-55kg-and-180kg', routePath: '/fluid-handling/grease-transfer-equipment/electric-grease-pump-16kg-20kg-55kg-and-180kg',
            description: 'Electric grease pumps in 16kg, 20kg, 55kg and 180kg sizes.', intro: 'Electric grease pumps provide powered, continuous grease delivery. Available in 16kg, 20kg, 55kg, and 180kg configurations for various container sizes.' },
        ] },

      // Fuel Handling Equipment
      { id: 'fuel-handling-equipment', title: 'Fuel Handling Equipment', slug: 'fuel-handling-equipment', routePath: '/fluid-handling/fuel-handling-equipment',
        description: 'Fuel nozzles, hose reels, meters, pumps, and complete fuel dispensing systems.',
        intro: 'Lube Control\'s fuel handling range covers everything from fuel nozzles and hose reels through to complete fuel storage and dispensing systems designed for industrial, mining, and agricultural use.',
        children: [
          { id: 'fuel-nozzles', title: 'Fuel Nozzles', slug: 'fuel-nozzles', routePath: '/fluid-handling/fuel-handling-equipment/fuel-nozzles',
            description: 'Manual and automatic fuel dispensing nozzles for diesel, petrol, and AdBlue.', intro: 'Professional fuel nozzles for safe, efficient dispensing of diesel, petrol, and AdBlue. Available in manual and automatic shut-off configurations.' },
          { id: 'fuel-hose-reels', title: 'Fuel Hose Reels', slug: 'fuel-hose-reels', routePath: '/fluid-handling/fuel-handling-equipment/fuel-hose-reels',
            description: 'Spring-wound and manual fuel hose reels for safe, tidy fuel dispensing.', intro: 'Fuel hose reels keep fuel hoses protected and organised, reducing trip hazards and extending hose life.' },
          { id: 'fuel-meters', title: 'Fuel Meters', slug: 'fuel-meters', routePath: '/fluid-handling/fuel-handling-equipment/fuel-meters',
            description: 'Mechanical and digital fuel flow meters for accurate fuel measurement.', intro: 'Fuel meters provide accurate measurement of fuel dispensed, essential for tracking fuel consumption and managing inventory.' },
          { id: 'fuel-management-systems', title: 'Fuel Management Systems', slug: 'fuel-management-systems', routePath: '/fluid-handling/fuel-handling-equipment/fuel-management-systems',
            description: 'Electronic fuel management and access control systems.', intro: 'Fuel management systems provide electronic control and monitoring of fuel dispensing, including user access control, transaction logging, and reporting.' },
          { id: 'fuel-accessories', title: 'Fuel Accessories', slug: 'fuel-accessories', routePath: '/fluid-handling/fuel-handling-equipment/fuel-accessories',
            description: 'Filters, strainers, couplings, and accessories for fuel handling systems.', intro: 'Essential fuel accessories including filters, strainers, quick-connect couplings, breakaway valves, and anti-siphon devices.' },
          { id: 'fuel-storage', title: 'Fuel Storage and Dispensing Kits', slug: 'fuel-storage', routePath: '/fluid-handling/fuel-handling-equipment/fuel-storage',
            description: 'Complete fuel storage tanks and dispensing kit solutions.', intro: 'Complete fuel storage and dispensing kits including self-bunded tanks, portable fuel cubes, and wall-mounted dispensing units.' },
          { id: 'fuel-pumps', title: 'Fuel Pumps', slug: 'fuel-pumps', routePath: '/fluid-handling/fuel-handling-equipment/fuel-pumps',
            description: 'Air-operated, electric, and manual fuel transfer pumps.',
            intro: 'Our fuel pump range covers all power types: air-operated, electric, and manual, suitable for diesel, petrol, and other fuel types.',
            children: [
              { id: 'fuel-transfer-pumps-refuelling-kits', title: 'Fuel Pumps - Air Operated', slug: 'fuel-transfer-pumps-refuelling-kits', routePath: '/fluid-handling/fuel-handling-equipment/fuel-pumps/fuel-transfer-pumps-refuelling-kits',
                description: 'Air-operated fuel transfer pumps and refuelling kits.', intro: 'Air-operated fuel pumps and refuelling kits for safe, efficient diesel and petrol transfer in workshop and field environments.' },
              { id: 'manual-fuel-pumps', title: 'Fuel Pumps - Manual', slug: 'manual-fuel-pumps', routePath: '/fluid-handling/fuel-handling-equipment/fuel-pumps/manual-fuel-pumps',
                description: 'Hand-operated fuel transfer pumps for portable fuel dispensing.', intro: 'Manual fuel pumps provide a reliable, electricity-free method for fuel transfer. Ideal for remote sites and emergency fuel supply.' },
              { id: 'fuel-pumps-electric', title: 'Fuel Pumps - Electric', slug: 'fuel-pumps-electric', routePath: '/fluid-handling/fuel-handling-equipment/fuel-pumps/fuel-pumps-electric',
                description: 'Electric fuel transfer pumps for high-volume diesel and petrol dispensing.', intro: 'Electric fuel pumps provide fast, high-volume fuel transfer for fixed installations and mobile dispensing units.' },
            ] },
          { id: 'mobile-and-stationary-fuel-dispensers', title: 'Mobile And Stationary Fuel Dispensers', slug: 'mobile-and-stationary-fuel-dispensers', routePath: '/fluid-handling/fuel-handling-equipment/mobile-and-stationary-fuel-dispensers',
            description: 'Self-contained mobile and fixed fuel dispensing units.', intro: 'Mobile and stationary fuel dispensers provide complete fuel dispensing solutions including pump, meter, hose, and nozzle in a self-contained unit.' },
        ] },

      { id: 'waste-oil', title: 'Waste Oil', slug: 'waste-oil', routePath: '/fluid-handling/waste-oil',
        description: 'Waste oil handling, storage, and disposal solutions for workshops and industry.',
        intro: 'Lube Control supplies equipment and systems for the safe handling, storage, and transfer of waste oil — helping you meet environmental obligations and keep sites clean.' },
    ] },

  // ─── LUBRICANTS ────────────────────────────────────────────────────────
  { id: 'lubricants', title: 'Lubricants', slug: 'lubricants', routePath: '/lubricants',
    description: 'Quality lubricants from leading brands for every industrial and commercial application.',
    intro: 'Lube Control is an authorised reseller of quality lubricant brands including Anglomoil, Blaster, Castrol, Imperial Oils, Inox, and Lubrication Engineers.',
    children: [
      { id: 'anglomoil', title: 'Anglomoil Lubricants', slug: 'anglomoil', routePath: '/lubricants/anglomoil', description: 'Australian owned premium lubricant brand.', intro: 'Anglomoil is an Australian owned and operated lubricant company offering engine oils, gear oils, hydraulic fluids, greases, and specialty products.' },
      { id: 'blaster-products', title: 'Blaster Products', slug: 'blaster-products', routePath: '/lubricants/blaster-products', description: 'Penetrating oils, lubricants, and maintenance sprays.', intro: 'Blaster Products offer specialty penetrating oils, rust removers, and maintenance sprays trusted by professionals worldwide.' },
      { id: 'castrol-performance-lubricants', title: 'Castrol Performance Lubricants', slug: 'castrol-performance-lubricants', routePath: '/lubricants/castrol-performance-lubricants', description: 'World-class performance lubricants.', intro: 'Castrol is a world leader in lubricant technology, offering premium engine oils, industrial lubricants, and specialty greases.' },
      { id: 'imperial-oils-chemicals', title: 'Imperial Oils & Chemicals', slug: 'imperial-oils-chemicals', routePath: '/lubricants/imperial-oils-chemicals', description: 'Quality industrial and specialty lubricants.', intro: 'Imperial Oils & Chemicals provides high-quality industrial lubricants, cutting fluids, and specialty chemical products.' },
      { id: 'inox-lubricants', title: 'Inox Lubricants', slug: 'inox-lubricants', routePath: '/lubricants/inox-lubricants', description: 'Multi-purpose lubricants — Australian made INOX.', intro: 'INOX is an Australian-made lubricant that protects metal surfaces, displaces moisture, and provides long-lasting lubrication.' },
      { id: 'lubrication-engineers', title: 'Lubrication Engineers', slug: 'lubrication-engineers', routePath: '/lubricants/lubrication-engineers', description: 'Specialty lubricants from LE for demanding applications.', intro: 'Lubrication Engineers (LE) provides high-performance solutions for extreme operating conditions including greases, gear oils, and food-grade lubricants.' },
    ] },

  // ─── SERVICES (legacy URL /services/) ─────────────────────────────────
  { id: 'services', title: 'Lube Services', slug: 'services', routePath: '/services',
    description: 'Professional lubrication surveys, oil analysis, lube routes and case studies.',
    intro: 'Lube Control provides professional lubrication services to help you optimise your maintenance programs, reduce downtime, and extend equipment life.',
    children: [
      { id: 'lubrication-surveys', title: 'Lubrication Surveys', slug: 'lubrication-surveys', routePath: '/services/lubrication-surveys', description: 'Professional on-site lubrication surveys.', intro: 'Comprehensive assessment of your lubrication practices — identifying inefficiencies, safety risks, and cost reduction opportunities.' },
      { id: 'oil-analysis', title: 'Oil Analysis', slug: 'oil-analysis', routePath: '/services/oil-analysis', description: 'Oil sampling and laboratory analysis.', intro: 'Oil analysis detects contamination, wear metals, and lubricant degradation before they cause catastrophic failures.' },
      { id: 'lube-routes', title: 'Lube Routes', slug: 'lube-routes', routePath: '/services/lube-routes', description: 'Structured lubrication route planning.', intro: 'Systematic lubrication routes ensure all critical points are serviced on time, reducing missed points and extending equipment life.' },
      { id: 'case-studies', title: 'Case Studies', slug: 'case-studies', routePath: '/services/case-studies', description: 'Real-world lubrication improvement examples.', intro: 'Case studies showing how Lube Control has helped Australian businesses reduce maintenance costs and extend equipment life.' },
    ] },

  // ─── AUTO LUBE SYSTEMS (legacy slugs under /auto-lube-systems/) ────────
  { id: 'auto-lube-systems', title: 'Auto Lube Systems', slug: 'auto-lube-systems', routePath: '/auto-lube-systems',
    description: 'Automatic single-point lubricators and centralised systems — Simalube, Pulsarlube, ILC, Oil Rite, and more.',
    intro: 'Lube Control is Australia\'s trusted supplier of automatic lubrication systems — from compact single-point lubricators to ILC and Oil Rite centralised systems.',
    children: [
      { id: 'simalube', title: 'Simalube', slug: 'simalube', routePath: '/auto-lube-systems/simalube', description: 'Simalube automatic single-point lubricators from simatec.', intro: 'Simalube by simatec is a Swiss-made automatic lubricator that delivers grease or oil to individual lubrication points. Known for precision, reliability, and ease of use.' },
      { id: 'pulsarlube', title: 'Pulsarlube', slug: '2225-2', routePath: '/auto-lube-systems/2225-2', description: 'Pulsarlube automatic single-point lubricators.', intro: 'Pulsarlube offers automatic single-point lubricators using electrochemical and electromechanical drive technology for bearings, chains, guides, and other points.' },
      { id: 'perma-lube', title: 'Perma Lube', slug: 'perma-lube', routePath: '/auto-lube-systems/perma-lube', description: 'Perma automatic lubrication systems.', intro: 'Perma lubrication systems offer single-point and multi-point automatic lubricators with precise, reliable dispensing for industrial applications.' },
      { id: 'grease-bomb-120-single-point-lubricator', title: 'Grease Bomb 120 Single Point Lubricator', slug: 'grease-bomb-120-single-point-lubricator', routePath: '/auto-lube-systems/grease-bomb-120-single-point-lubricator', description: 'Compact self-contained single-point grease lubricator.', intro: 'The Grease Bomb 120 is a compact, button-activated single-point automatic grease lubricator for continuous, reliable greasing of individual bearing points.' },
      { id: 'memolub-lubricator', title: 'Memolub HPS Lubricator', slug: 'memolub-lubricator', routePath: '/auto-lube-systems/memolub-lubricator', description: 'Memolub HPS electromechanical lubricator.', intro: 'The Memolub HPS is a programmable electromechanical single-point lubricator with replaceable cartridges — economical and reusable.' },
      { id: 'oil-rite-lubrication-systems', title: 'Oil Rite Lubrication Systems', slug: 'oil-rite-lubrication-systems', routePath: '/auto-lube-systems/oil-rite-lubrication-systems', description: 'Oil Rite centralised and gravity-feed lubrication systems.', intro: 'Oil Rite manufactures centralised, gravity-feed, and metered lubrication systems for industrial machinery — oil and grease applications.' },
      { id: 'oil-rite-lube-systems', title: 'Purgex Lube Systems', slug: 'oil-rite-lube-systems', routePath: '/auto-lube-systems/oil-rite-lube-systems', description: 'Purgex positive-displacement lubrication systems.', intro: 'Purgex systems use positive-displacement technology for precise, metered oil or grease delivery on machine tools and packaging equipment.' },
      { id: 'ilc-autolubrication-systems', title: 'ILC Auto Lubrication Systems', slug: 'ilc-autolubrication-systems', routePath: '/auto-lube-systems/ilc-autolubrication-systems', description: 'ILC automatic lubrication systems for heavy-duty applications.', intro: 'ILC Auto Lubrication Systems are rugged, reliable automatic greasing systems for mining, agriculture, construction, and manufacturing.' },
      { id: 'multi-line-and-rotary-lube-pumps', title: 'Multi Line and Rotary Lube Pumps', slug: 'multi-line-and-rotary-lube-pumps', routePath: '/auto-lube-systems/multi-line-and-rotary-lube-pumps', description: 'Multi-line divider and rotary pump centralised systems.', intro: 'Multi-line and rotary lube pumps provide centralised automated lubrication to multiple points via divider blocks and progressive distribution.' },
      { id: 'grease-metering-grease-monitoring', title: 'Grease Metering and Grease Monitoring', slug: '2486-2', routePath: '/auto-lube-systems/2486-2', description: 'Grease metering and monitoring for precision lubrication.', intro: 'Grease metering and monitoring systems control and record grease volumes at each point for consistency and accountability.' },
    ] },

  // ─── MORE LUBRICATION (legacy slugs) ───────────────────────────────────
  { id: 'more-lubrication', title: 'More Lubrication', slug: 'more-lubrication', routePath: '/more-lubrication',
    description: 'Lubrication storage, sampling, remote greasing, breathers, spill containment, and related accessories.',
    intro: 'Lube Control stocks ancillary lubrication products — storage, remote greasing lines, breathers, level gauges, spill containment, and more.',
    children: [
      { id: 'lubrication-storage', title: 'Lubrication Storage', slug: 'lubrication-storage', routePath: '/more-lubrication/lubrication-storage', description: 'Safe lubricant storage tanks and modular systems.', intro: 'Oil and lubricant storage solutions including modular tank units and self-bunded storage tanks for compliant workshop and site storage.' },
      { id: 'oil-sampling', title: 'Oil Sampling', slug: 'oil-sampling', routePath: '/more-lubrication/oil-sampling', description: 'Oil sampling tools and kits.', intro: 'Sampling valves, vacuum pumps, and kits for proactive oil analysis programs.' },
      { id: 'remote-greasing-equipment', title: 'Remote Grease Lines and Fittings', slug: 'remote-greasing-equipment', routePath: '/more-lubrication/remote-greasing-equipment', description: 'Remote grease lines — grease bearings safely without removing guards.', intro: 'Remote grease lines let you grease bearing points from a safe location without removing machine guards or entering hazardous spaces.' },
      { id: 'breathers', title: 'Breathers', slug: 'breathers', routePath: '/more-lubrication/breathers', description: 'Desiccant breathers and air vents.', intro: 'Desiccant breathers filter moisture and particulates from incoming air, protecting gearboxes and hydraulic systems.' },
      { id: 'liquid-level-gauges', title: 'Liquid Level Gauges', slug: 'liquid-level-gauges', routePath: '/more-lubrication/liquid-level-gauges', description: 'Sight glasses and level indicators for tanks and reservoirs.', intro: 'Liquid level gauges provide clear visual indication of oil and fluid levels in tanks, gearboxes, and reservoirs.' },
      { id: 'vent-plugs', title: 'Vent Plugs', slug: 'vent-plugs', routePath: '/more-lubrication/vent-plugs', description: 'Tank and reservoir vent plugs.', intro: 'Vent plugs allow controlled breathing of reservoirs while reducing contamination ingress.' },
      { id: 'constant-level-oilers', title: 'Constant Level Oilers', slug: 'constant-level-oilers', routePath: '/more-lubrication/constant-level-oilers', description: 'Automatic constant-level oil feed devices.', intro: 'Constant level oilers maintain a steady oil level in bearings and gearboxes without manual topping up.' },
      { id: 'oil-spill-containment', title: 'Oil Spill Containment', slug: 'oil-spill-containment', routePath: '/more-lubrication/oil-spill-containment', description: 'Spill trays, bunded pallets, and containment systems.', intro: 'Spill containment including trays, bunded pallets, and portable spill kits for environmental compliance.' },
      { id: 'vibration-greasing-device', title: 'Vibration Greasing Device', slug: 'vibration-greasing-device', routePath: '/more-lubrication/vibration-greasing-device', description: 'Vibration-activated greasing solutions.', intro: 'Vibration greasing devices help deliver grease in response to equipment vibration for selected applications.' },
      { id: 'filter-carts', title: 'Filter Carts', slug: 'filter-carts', routePath: '/more-lubrication/filter-carts', description: 'Portable filtration carts for hydraulic and lubricating oils.', intro: 'Filter carts for offline filtration, flushing, and transfer of hydraulic and lubricating oils in the field or workshop.' },
    ] },
]

// ═══════════════════════════════════════════════════════════════════════════

function collectAllIds(cats: Cat[], ids: Set<string> = new Set()): Set<string> {
  for (const c of cats) {
    ids.add(c.id)
    if (c.children) collectAllIds(c.children, ids)
  }
  return ids
}

function collectAllRoutePaths(cats: Cat[], paths: Set<string> = new Set()): Set<string> {
  for (const c of cats) {
    paths.add(c.routePath)
    if (c.children) collectAllRoutePaths(c.children, paths)
  }
  return paths
}

async function seedCat(cat: Cat, parentId?: string) {
  const catDoc: Record<string, unknown> = {
    _id: cat.id, _type: 'productCategory',
    title: cat.title,
    slug: { _type: 'slug', current: cat.slug },
    description: cat.description,
    routePath: cat.routePath,
  }
  if (parentId) catDoc.parent = { _type: 'reference', _ref: parentId }
  await client.createOrReplace(catDoc as Parameters<typeof client.createOrReplace>[0])

  const pid = pageId(cat.routePath)
  // Keep PDFs already attached in Studio — otherwise every re-seed wipes category downloads (cataloguePage is separate).
  const existingPage = await client.fetch<{ pdfDownloads?: unknown[] } | null>(
    '*[_id == $id][0]{ pdfDownloads }',
    { id: pid },
  )
  const pdfDownloads =
    Array.isArray(existingPage?.pdfDownloads) && existingPage.pdfDownloads.length > 0
      ? existingPage.pdfDownloads
      : []

  await client.createOrReplace({
    _id: pid, _type: 'categoryPage',
    path: cat.routePath, title: cat.title,
    seoTitle: `${cat.title} » Lube Control`,
    seoDescription: cat.description,
    intro: [block(cat.intro)],
    productCategory: { _type: 'reference', _ref: cat.id },
    pdfDownloads,
  } as Parameters<typeof client.createOrReplace>[0])

  process.stdout.write(`  ✓ ${cat.id}\n`)

  if (cat.children) {
    for (const child of cat.children) await seedCat(child, cat.id)
  }
}

async function main() {
  const allExpectedIds = collectAllIds(TREE)
  const allExpectedPaths = collectAllRoutePaths(TREE)

  console.log(`\n🔍 Expected: ${allExpectedIds.size} categories, ${allExpectedPaths.size} pages`)

  // Step 1: Delete ALL orphaned productCategory and product docs
  const existingCats: Array<{_id: string; title: string}> = await client.fetch('*[_type == "productCategory"]{_id, title}')
  const orphans = existingCats.filter(d => !allExpectedIds.has(d._id))

  if (orphans.length > 0) {
    console.log(`\n🗑 Deleting ${orphans.length} orphaned productCategory docs...`)
    // First, remove parent references pointing to orphans
    for (const orphan of orphans) {
      const children: Array<{_id: string}> = await client.fetch(`*[_type == "productCategory" && parent._ref == $id]{_id}`, { id: orphan._id })
      for (const child of children) {
        await client.patch(child._id).unset(['parent']).commit()
      }
      const pages: Array<{_id: string}> = await client.fetch(`*[references($id)]{_id}`, { id: orphan._id })
      for (const page of pages) {
        try { await client.delete(page._id) } catch { /* ignore */ }
      }
      try { await client.delete(orphan._id); console.log(`  🗑 ${orphan._id} ("${orphan.title}")`) } catch { console.log(`  ⚠ Could not delete ${orphan._id}`) }
    }
  }

  // Step 2: Delete orphaned categoryPage docs
  const existingPages: Array<{_id: string; path: string}> = await client.fetch('*[_type == "categoryPage"]{_id, path}')
  const orphanPages = existingPages.filter(p => !allExpectedPaths.has(p.path))
  if (orphanPages.length > 0) {
    console.log(`\n🗑 Deleting ${orphanPages.length} orphaned categoryPage docs...`)
    for (const p of orphanPages) {
      try { await client.delete(p._id); console.log(`  🗑 page: ${p.path}`) } catch { /* ignore */ }
    }
  }

  // Step 3: Seed all categories
  console.log('\n🚀 Seeding all categories...\n')
  for (const cat of TREE) {
    console.log(`\n📁 ${cat.title}`)
    await seedCat(cat)
  }

  console.log('\n✅ Done! All categories seeded.')
}

main().catch((e) => { console.error(e); process.exit(1) })
