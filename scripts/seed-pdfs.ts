import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '92q6lqnu'
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET    || 'production'
const token     = process.env.SANITY_API_WRITE_TOKEN

const client = createClient({
  projectId,
  dataset,
  token: token as string,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const PDF_FOLDER = 'D:/LubeControl/test-pdfs'

// ─── CATALOGUE LIBRARY ITEMS (matching live site /catalogue-library/) ─────────
const CATALOGUE_ITEMS: { title: string; filename: string }[] = [
  { title: 'Adams Oilers Catalogue',        filename: 'Adams-Oilers.pdf' },
  { title: 'Alemlube Master Catalogue',     filename: 'ALEMLUBE-Sept-2010-Master-Catalogue-72-page1.pdf' },
  { title: 'Alemlube Hose Reel Catalogue',  filename: 'Alemlube-Hose-Reel-Catalogue.pdf' },
  { title: 'Assalub Overview',              filename: 'Assalube_Overview.pdf' },
  { title: 'Bluequip Catalogue',            filename: 'Bluequip-Catalogue.pdf' },
  { title: 'Cox Hose Reel Catalogue',       filename: 'Coxreels_2008.pdf' },
  { title: 'Dropsa 26-Series Catalogue',    filename: 'Dropsa-26-Series-Catalog-Blue-Book-Complete.pdf' },
  { title: 'EAL Product List',              filename: 'EAL-Product-List.pdf' },
  { title: 'Hydac Filter Systems',          filename: 'E79000-0-11-10_Filtersystembuch_01_Einleitung.pdf' },
  { title: 'GPI Pump & Meter Catalogue',    filename: 'GPI-PUMP-METER-CAT-UPDATED2.pdf' },
  { title: 'Graco Catalogue',              filename: 'Graco-Catalogue1.pdf' },
  { title: 'Lube Mate Catalogue',          filename: 'Lube-Mate-Catalogue1.pdf' },
  { title: 'MacNaught Lubrication Catalogue', filename: 'Macnaught-Lub-Cat-2009.pdf' },
  { title: 'Orion Catalogue',              filename: 'Orion-catalogue.pdf' },
  { title: 'Oil Rite Purgex Catalogue',    filename: 'PurgeX.pdf' },
  { title: 'Oil Rite Spray Systems',       filename: 'spray-systems1.pdf' },
  { title: 'Oil Rite Recirculation Systems', filename: 'Oilrite-circulating-oil-system.pdf' },
  { title: 'Oil Rite Lubricators',         filename: 'lubricators.pdf' },
  { title: 'Oil Rite Sight Glasses',       filename: 'liquid-level-gauges1.pdf' },
  { title: 'Oil Rite Gravity Fed Oilers',  filename: 'Gravity-fed-chain-lubricators-and-brushes1.pdf' },
  { title: 'Oil Rite Valves & Flow Sights', filename: 'Valves-and-flow-sights.pdf' },
  { title: 'Oil Rite Vent Plugs',          filename: 'Vent-plugs-and-filters.pdf' },
  { title: 'Perma Complete Catalogue',     filename: 'Perma-Complete-Catalogue.pdf' },
  { title: 'Spill Station Catalogue',      filename: 'SpillStationCatalogue.pdf' },
  { title: 'STM Fluid Handling Catalogue', filename: 'STM-Catalogue_2018_LR-6.12.2018.pdf' },
  { title: 'Yamada Product Guide',         filename: 'Yamada-America_Product-Guide_ENG_GB0810.pdf' },
]

// ─── RESOURCES PAGE SECTIONS (matching live site /services/) ─────────────────
const RESOURCES_SECTIONS = [
  {
    sectionTitle: 'Lubrication Services',
    sectionDescription: 'Our full range of lubrication system design, survey and contract services.',
    downloads: [
      { title: 'Lube Control Lubrication Survey',     filename: 'Lube-Control-Lubrication-Survey.pdf' },
      { title: 'Lubrication System Design Solutions', filename: 'Lubrication-System-Design-Solutions.pdf' },
      { title: 'Contract Lubrication',                filename: 'Contract-Lubrication-Lube-Control1.pdf' },
    ],
  },
  {
    sectionTitle: 'Oil Analysis & Sampling',
    sectionDescription: 'Resources for oil sampling and analysis.',
    downloads: [
      { title: 'Lube Control Pre-Paid Sample Kits',          filename: 'Lube-Control-Pre-Paid-Sample-Kits.pdf' },
      { title: 'The Basics of Used Oil Sampling',            filename: 'The-basics-of-used-oil-sampling.pdf' },
      { title: 'World Class Oil Sampling',                   filename: 'World-Class-Oil-Sampling.pdf' },
      { title: 'Labcheck Sample Kits',                       filename: 'Labcheck-Kits.pdf' },
    ],
  },
  {
    sectionTitle: 'Technical Reference',
    sectionDescription: 'Viscosity charts, grease compatibility and lubrication equivalents.',
    downloads: [
      { title: 'Oil Viscosity Classification',         filename: 'Oil-Viscosity-Classification.pdf' },
      { title: 'Grease Compatibility Chart',           filename: 'Grease-Compatibility-Chart.pdf' },
      { title: 'Grease Performance Classifications',   filename: 'grease_performance_classifications.pdf' },
      { title: 'SAE Engine Oil Viscosities',           filename: 'sae_engine_oils_viscosities.pdf' },
      { title: 'SAE Gear Oil Viscosities',             filename: 'sae_gear_oils_viscosities.pdf' },
      { title: 'Lubrication Equivalents',              filename: 'lubrication_equivalents.pdf' },
    ],
  },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

async function uploadPdf(filename: string): Promise<string | null> {
  const filePath = path.join(PDF_FOLDER, filename)
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️  File not found: ${filename}`)
    return null
  }
  const buffer = fs.readFileSync(filePath)
  try {
    const asset = await client.assets.upload('file', buffer, {
      filename,
      contentType: 'application/pdf',
    })
    console.log(`  ✅ Uploaded: ${filename}`)
    return asset._id
  } catch (err) {
    console.error(`  ❌ Upload failed for ${filename}:`, err)
    return null
  }
}

// ─── SEED CATALOGUE PAGE ─────────────────────────────────────────────────────

async function seedCataloguePage() {
  console.log('\n📚 Seeding Catalogue Library page...')

  const items = []
  for (const item of CATALOGUE_ITEMS) {
    console.log(`Processing: ${item.title}`)
    const assetId = await uploadPdf(item.filename)
    const entry: Record<string, unknown> = {
      _key: item.filename.replace(/[^a-zA-Z0-9]/g, '-'),
      title: item.title,
    }
    if (assetId) {
      entry.file = { _type: 'file', asset: { _type: 'reference', _ref: assetId } }
    }
    items.push(entry)
  }

  await client.createOrReplace({
    _id: 'cataloguePage',
    _type: 'cataloguePage',
    title: 'Catalogue Library',
    intro: 'Browse our extensive range of product catalogues from leading manufacturers.',
    items,
    bottomTitle: 'Looking for Something Specific?',
    bottomText: 'If you can\'t find what you\'re looking for, contact our team and we\'ll help you find the right product.',
    bottomButtonLabel: 'Contact Us',
    bottomButtonHref: '/contact',
  })

  console.log('✅ Catalogue page seeded!')
}

// ─── SEED RESOURCES PAGE ─────────────────────────────────────────────────────

async function seedResourcesPage() {
  console.log('\n📋 Seeding Resources page...')

  const sections = []
  for (const section of RESOURCES_SECTIONS) {
    const downloads = []
    for (const dl of section.downloads) {
      console.log(`Processing: ${dl.title}`)
      const assetId = await uploadPdf(dl.filename)
      const entry: Record<string, unknown> = {
        _key: dl.filename.replace(/[^a-zA-Z0-9]/g, '-'),
        title: dl.title,
      }
      if (assetId) {
        entry.file = { _type: 'file', asset: { _type: 'reference', _ref: assetId } }
      }
      downloads.push(entry)
    }
    sections.push({
      _key: section.sectionTitle.replace(/[^a-zA-Z0-9]/g, '-'),
      sectionTitle: section.sectionTitle,
      sectionDescription: section.sectionDescription,
      downloads,
    })
  }

  await client.createOrReplace({
    _id: 'resourcesPage',
    _type: 'resourcesPage',
    title: 'Resources & Downloads',
    intro: 'Download our product specifications, technical manuals, and service guides.',
    sections,
  })

  console.log('✅ Resources page seeded!')
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Starting PDF seed to Sanity...')
  console.log(`Project: 92q6lqnu | Dataset: production`)

  if (!token) {
    console.error('❌ SANITY_API_WRITE_TOKEN is not set in .env.local')
    process.exit(1)
  }

  await seedCataloguePage()
  await seedResourcesPage()

  console.log('\n🎉 All done! PDFs uploaded and Sanity documents updated.')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
