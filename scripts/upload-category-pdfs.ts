import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@sanity/client'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '92q6lqnu',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const PDF_DIR = 'D:/LubeControl/test-pdfs'

async function uploadPdf(filename: string): Promise<string | null> {
  const filePath = path.join(PDF_DIR, filename)
  if (!fs.existsSync(filePath)) return null
  try {
    const buffer = fs.readFileSync(filePath)
    const asset = await client.assets.upload('file', buffer, { filename })
    return asset._id
  } catch (err) {
    console.error(`❌ Upload failed for ${filename}:`, err)
    return null
  }
}

async function main() {
  if (!fs.existsSync('pdf-mapping.json')) {
    console.error('pdf-mapping.json missing!')
    process.exit(1)
  }

  const mapping: Record<string, string[]> = JSON.parse(fs.readFileSync('pdf-mapping.json', 'utf8'))
  const categories: Array<{_id: string, routePath: string}> = await client.fetch('*[_type == "productCategory"]{_id, routePath}')

  console.log('Starting PDF Upload process...')
  
  for (const cat of categories) {
    const pdfsToUpload = mapping[cat._id]
    if (!pdfsToUpload || pdfsToUpload.length === 0) continue

    const pageId = 'page-' + cat.routePath.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()
    
    const pdfDownloads = []
    console.log(`\nUploading ${pdfsToUpload.length} PDFs for category: ${cat._id}`)
    
    for (const filename of pdfsToUpload) {
      const assetId = await uploadPdf(filename)
      if (assetId) {
        pdfDownloads.push({
          _key: Math.random().toString(36).substring(2, 10),
          title: filename.replace('.pdf', '').replace(/-/g, ' '),
          file: { _type: 'file', asset: { _type: 'reference', _ref: assetId } }
        })
      }
    }

    if (pdfDownloads.length > 0) {
      await client.patch(pageId).set({ pdfDownloads }).commit()
      console.log(`✅ Patched ${pageId} with ${pdfDownloads.length} PDFs`)
    }
  }

  console.log('\n🎉 All PDFs mapped and uploaded!')
}

main().catch(console.error)
