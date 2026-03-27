import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@sanity/client'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '92q6lqnu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const PDF_DIR = 'D:/LubeControl/test-pdfs'

interface Category {
  _id: string
  title: string
  routePath: string
}

function extractKeywords(text: string): string[] {
  // split by non-alphanumeric, filter out small stop words
  const words = text.toLowerCase().split(/[^a-z0-9]+/).filter(w => w.length > 2)
  const stopwords = ['and', 'for', 'the', 'with', 'equipment', 'systems', 'handling', 'control']
  return words.filter(w => !stopwords.includes(w))
}

async function main() {
  console.log('Fetching categories from Sanity...')
  const categories: Category[] = await client.fetch('*[_type == "productCategory"]{_id, title, routePath}')
  
  if (!fs.existsSync(PDF_DIR)) {
    console.error('PDF directory not found:', PDF_DIR)
    process.exit(1)
  }

  const pdfFiles = fs.readdirSync(PDF_DIR).filter(f => f.toLowerCase().endsWith('.pdf'))
  console.log(`Found ${pdfFiles.length} PDFs. Mapping to ${categories.length} categories...`)

  const mapping: Record<string, string[]> = {} // categoryId -> array of pdf filenames

  // Manual explicit mappings based on common tricky terms
  const manualKeywordMap: Record<string, string[]> = {
    'oil-handling': ['oil'],
    'grease-transfer': ['grease'],
    'fuel-handling': ['fuel', 'diesel', 'petrol'],
    'auto-lube-systems': ['auto', 'lubricator', 'centralised', 'ilc'],
    'oil-pumps-manual': ['hand', 'manual', 'lever', 'rotary'],
    'oil-drum-pumps': ['electric', 'drum'],
    'air-operated-pumps': ['air', 'pneumatic'],
    'stub-oil-pumps-air': ['stub', 'r500', 'r100', 'r300', 'samoa', 'air'],
  }

  for (const cat of categories) {
    mapping[cat._id] = []
    
    // Combine category title keywords + explicitly mapped keywords for better matching
    const catKeywords = extractKeywords(cat.routePath + ' ' + cat.title)
    if (manualKeywordMap[cat._id]) {
      catKeywords.push(...manualKeywordMap[cat._id])
    }

    // Evaluate each PDF against this category
    for (const pdf of pdfFiles) {
      const pdfKeywords = extractKeywords(pdf)
      
      // Calculate intersection
      let matches = 0
      for (const pk of pdfKeywords) {
        if (catKeywords.includes(pk)) {
          matches++
        }
      }

      // If at least 2 distinct strong keywords match, or proportion is high, link it
      // Also require at least 1 core material keyword (oil, grease, fuel, etc) if present in category
      const hasCore = ['oil', 'grease', 'fuel', 'lube', 'lubricant'].some(core => 
        catKeywords.includes(core) ? pdfKeywords.includes(core) : true
      )

      if (matches >= 2 && hasCore) {
        mapping[cat._id].push(pdf)
      } else if (matches === 1 && pdfKeywords.length <= 3 && hasCore) {
        // Strict exact short name match
        mapping[cat._id].push(pdf)
      }
    }
  }

  // Save to JSON
  fs.writeFileSync('pdf-mapping.json', JSON.stringify(mapping, null, 2))
  console.log('✅ Generated pdf-mapping.json successfully!')

  // Check stats
  let totalMapped = 0
  let emptyCats = 0
  for (const [catId, pdfs] of Object.entries(mapping)) {
    if (pdfs.length > 0) totalMapped++
    else emptyCats++
  }
  console.log(`Categories with PDFs: ${totalMapped}. Empty categories: ${emptyCats}.`)
}

main().catch(console.error)
