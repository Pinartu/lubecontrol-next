import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())
import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid' // Or just Math.random() fallback
// We'll just use a simple random string for _id if uuid is not installed

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '92q6lqnu'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

function generateId() {
  return 'drafts.' + Math.random().toString(36).substring(2, 15)
}

function generateCleanId() {
  return Math.random().toString(36).substring(2, 15)
}

async function main() {
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

  console.log('Client initialized')

  // Create Parent Category
  const parentId = generateCleanId()
  await client.createIfNotExists({
    _id: parentId,
    _type: 'productCategory',
    title: 'Fluid Handling',
    slug: { _type: 'slug', current: 'fluid-handling' },
    description: 'Equipment for handling various fluids',
    routePath: '/fluid-handling'
  })

  // Create Parent Category Page
  await client.createIfNotExists({
    _id: generateCleanId(),
    _type: 'categoryPage',
    title: 'Fluid Handling',
    path: '/fluid-handling',
    productCategory: {
      _type: 'reference',
      _ref: parentId
    }
  })

  // Create Subcategory 1
  const sub1Id = generateCleanId()
  await client.createIfNotExists({
    _id: sub1Id,
    _type: 'productCategory',
    title: 'Oil Handling Equipment',
    slug: { _type: 'slug', current: 'oil-handling-equipment' },
    description: 'Pumps, guns, and meters for oil',
    routePath: '/fluid-handling/oil-handling-equipment',
    parent: {
      _type: 'reference',
      _ref: parentId
    }
  })

  // Create Subcategory 1 Page
  await client.createIfNotExists({
    _id: generateCleanId(),
    _type: 'categoryPage',
    title: 'Oil Handling Equipment',
    path: '/fluid-handling/oil-handling-equipment',
    productCategory: {
      _type: 'reference',
      _ref: sub1Id
    }
  })

  // Create Subcategory 2
  const sub2Id = generateCleanId()
  await client.createIfNotExists({
    _id: sub2Id,
    _type: 'productCategory',
    title: 'Grease Handling Equipment',
    slug: { _type: 'slug', current: 'grease-handling-equipment' },
    description: 'Grease pumps, kits, and accessories',
    routePath: '/fluid-handling/grease-handling-equipment',
    parent: {
      _type: 'reference',
      _ref: parentId
    }
  })

  // Create Subcategory 2 Page
  await client.createIfNotExists({
    _id: generateCleanId(),
    _type: 'categoryPage',
    title: 'Grease Handling Equipment',
    path: '/fluid-handling/grease-handling-equipment',
    productCategory: {
      _type: 'reference',
      _ref: sub2Id
    }
  })

  // Create a product in Subcategory 1
  await client.createIfNotExists({
    _id: generateCleanId(),
    _type: 'product',
    title: 'Test Oil Pump 1000',
    slug: { _type: 'slug', current: 'test-oil-pump-1000' },
    description: 'A test product for oil handling',
    category: {
      _type: 'reference',
      _ref: sub1Id
    }
  })

  console.log('Successfully seeded categories and pages!')
}

main().catch(console.error)
