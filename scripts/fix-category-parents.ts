/**
 * Fix orphaned productCategory records and ensure all fluid-handling children
 * point to the correct parent ID.
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

async function main() {
  // List all productCategory docs
  const all = await client.fetch('*[_type == "productCategory"]{_id, title, "parentId": parent._ref}')
  console.log('All productCategory docs:')
  console.log(JSON.stringify(all, null, 2))

  // Force-replace the fluid-handling subcategories with correct parent ref
  const fluidChildren = [
    {
      _id: 'oil-handling-equipment',
      title: 'Oil Handling Equipment',
      slug: { _type: 'slug', current: 'oil-handling-equipment' },
      description: 'Oil guns, pumps, hose reels and dispensing equipment for all oil handling applications.',
      routePath: '/fluid-handling/oil-handling-equipment',
      parent: { _type: 'reference', _ref: 'fluid-handling' },
    },
    {
      _id: 'grease-transfer-equipment',
      title: 'Grease Transfer Equipment',
      slug: { _type: 'slug', current: 'grease-transfer-equipment' },
      description: 'Grease kits, guns, pumps, hose reels, and bulk grease vessel systems.',
      routePath: '/fluid-handling/grease-transfer-equipment',
      parent: { _type: 'reference', _ref: 'fluid-handling' },
    },
    {
      _id: 'fuel-handling-equipment',
      title: 'Fuel Handling Equipment',
      slug: { _type: 'slug', current: 'fuel-handling-equipment' },
      description: 'Fuel nozzles, hose reels, meters, pumps, and complete fuel dispensing systems.',
      routePath: '/fluid-handling/fuel-handling-equipment',
      parent: { _type: 'reference', _ref: 'fluid-handling' },
    },
  ]

  for (const doc of fluidChildren) {
    await client.createOrReplace({ _type: 'productCategory', ...doc })
    console.log(`✓ Fixed: ${doc._id}`)
  }

  // Also delete any orphaned grease-handling-equipment (old test record with wrong name)
  try {
    await client.delete('grease-handling-equipment')
    console.log('✓ Deleted orphaned: grease-handling-equipment')
  } catch {
    console.log('  (grease-handling-equipment not found, skip)')
  }

  // Also fix the categoryPage for grease-transfer-equipment path
  const greasePage = await client.fetch('*[_type == "categoryPage" && path == "/fluid-handling/grease-transfer-equipment"][0]{_id}')
  if (!greasePage) {
    await client.createIfNotExists({
      _id: 'page-fluid-handling-grease-transfer-equipment',
      _type: 'categoryPage',
      path: '/fluid-handling/grease-transfer-equipment',
      title: 'Grease Transfer Equipment',
      seoTitle: 'Grease Transfer Equipment | Lube Control',
      seoDescription: 'Grease kits, guns, pumps, hose reels, and bulk grease vessel systems.',
      productCategory: { _type: 'reference', _ref: 'grease-transfer-equipment' },
      pdfDownloads: [],
      intro: [{ _type: 'block', _key: 'intro1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: 'From 400g grease guns to 180kg bulk grease pumps, Lube Control supplies a complete range of grease transfer equipment to suit any application – from workshop to heavy industrial.', marks: [] }] }]
    })
    console.log('✓ Created categoryPage for grease-transfer-equipment')
  }

  // Fix categoryPage for fuel-handling-equipment
  const fuelPage = await client.fetch('*[_type == "categoryPage" && path == "/fluid-handling/fuel-handling-equipment"][0]{_id}')
  if (!fuelPage) {
    await client.createIfNotExists({
      _id: 'page-fluid-handling-fuel-handling-equipment',
      _type: 'categoryPage',
      path: '/fluid-handling/fuel-handling-equipment',
      title: 'Fuel Handling Equipment',
      seoTitle: 'Fuel Handling Equipment | Lube Control',
      seoDescription: 'Fuel nozzles, hose reels, meters, pumps, and complete fuel dispensing systems.',
      productCategory: { _type: 'reference', _ref: 'fuel-handling-equipment' },
      pdfDownloads: [],
      intro: [{ _type: 'block', _key: 'intro1', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's1', text: 'Lube Control\'s fuel handling range covers everything from fuel nozzles and hose reels through to complete fuel storage and dispensing systems. Our fuel management solutions are designed for industrial, mining, and agricultural applications across Australia.', marks: [] }] }]
    })
    console.log('✓ Created categoryPage for fuel-handling-equipment')
  } else {
    console.log('  categoryPage for fuel-handling-equipment already exists')
  }

  console.log('\n✅ Fix complete!')
}

main().catch(console.error)
