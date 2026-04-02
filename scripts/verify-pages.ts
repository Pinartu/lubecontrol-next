/**
 * Verify: check every categoryPage has intro text and pdfDownloads field.
 *   npx tsx scripts/verify-pages.ts
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
  const pages: Array<{
    _id: string; path: string; title: string;
    hasIntro: boolean; hasPdfField: boolean;
    introText: string | null;
  }> = await client.fetch(`*[_type == "categoryPage"] | order(path asc) {
    _id, path, title,
    "hasIntro": count(intro) > 0,
    "hasPdfField": defined(pdfDownloads),
    "introText": intro[0].children[0].text
  }`)

  let missingIntro = 0
  let missingPdf = 0

  console.log(`\nFound ${pages.length} categoryPage documents:\n`)
  for (const p of pages) {
    const introOk = p.hasIntro ? '✅' : '❌'
    const pdfOk = p.hasPdfField ? '✅' : '❌'
    if (!p.hasIntro) missingIntro++
    if (!p.hasPdfField) missingPdf++
    const introPreview = p.introText ? p.introText.substring(0, 60) + '...' : '(empty)'
    console.log(`${introOk} Intro | ${pdfOk} PDF | ${p.path}`)
    console.log(`   "${introPreview}"`)
  }

  console.log(`\n── Summary ──`)
  console.log(`Total pages: ${pages.length}`)
  console.log(`Missing intro: ${missingIntro}`)
  console.log(`Missing PDF field: ${missingPdf}`)

  if (missingIntro === 0 && missingPdf === 0) {
    console.log('\n✅ All pages have intro text and PDF download support!')
  } else {
    console.log('\n⚠ Some pages need fixes.')
  }
}

main().catch(console.error)
