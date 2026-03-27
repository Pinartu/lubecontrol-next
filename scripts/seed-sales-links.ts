/**
 * Seed the salesLinks into the homePage document.
 *   npx tsx scripts/seed-sales-links.ts
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
  await client.patch('homePage').set({
    salesLinksTitle: 'Our Online Stores',
    salesLinksSubtitle: 'Shop online for remote grease line kits and lubrication products — delivered Australia wide.',
    salesLinks: [
      {
        _type: 'object',
        _key: rk(),
        title: 'Remote Grease Lines',
        description: 'Custom-engineered remote grease line kits for safe, accessible greasing of machinery bearing points. Designed and manufactured in Australia for mining, agriculture and heavy industry.',
        href: 'https://www.remotegreaselines.com.au',
      },
      {
        _type: 'object',
        _key: rk(),
        title: 'Lube Control Shop',
        description: 'Shop our full range of lubrication equipment, pumps, hose reels, grease guns, and accessories online. Fast delivery across Australia with expert technical support.',
        href: 'https://www.lubecontrolshop.com.au',
      },
    ],
  }).commit()

  console.log('✅ Sales links seeded into homePage!')
}

main().catch(console.error)
