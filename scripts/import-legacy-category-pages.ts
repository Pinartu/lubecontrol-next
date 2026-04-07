/**
 * Scrape https://www.lubecontrol.com.au/ category pages and push intro + PDFs
 * into matching Sanity categoryPage documents (same paths as scripts/nuclear-seed.ts).
 *
 * PDF storage:
 *   • Default: externalUrl only (legacy wp-content / Google Drive).
 *   • With --pdf-dir=… or LEGACY_PDF_FOLDER: if a file in that folder matches the URL
 *     filename (case-insensitive), upload to Sanity and set `file` + keep `externalUrl`
 *     so Preview uses cdn.sanity.io (same behaviour as Catalogue Library / PdfDownloadsGrid).
 *
 * Requirements: SANITY_API_WRITE_TOKEN, network (and local PDF folder if uploading).
 *
 *   npx tsx scripts/import-legacy-category-pages.ts --dry-run
 *   npx tsx scripts/import-legacy-category-pages.ts --pdf-dir="D:/LubeControl/test-pdfs" --dry-run
 *   npx tsx scripts/import-legacy-category-pages.ts --pdf-dir="D:/LubeControl/test-pdfs" --ms=500
 *
 * Default --min-depth=2 skips top-level section pages (/fluid-handling, /lubricants, …).
 */
import * as fs from 'node:fs'
import * as path from 'node:path'
import { loadEnvConfig } from '@next/env'
import { createClient } from '@sanity/client'
import { load } from 'cheerio'

loadEnvConfig(process.cwd())

const LEGACY_ORIGIN = 'https://www.lubecontrol.com.au'
const NUCLEAR_SEED = path.join(process.cwd(), 'scripts', 'nuclear-seed.ts')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '92q6lqnu'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

function rk() {
  return Math.random().toString(36).slice(2, 10)
}

function pageId(routePath: string) {
  return (
    'page-' +
    routePath
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase()
  )
}

function extractPathsFromNuclearSeed(): string[] {
  const src = fs.readFileSync(NUCLEAR_SEED, 'utf8')
  const re = /routePath:\s*'([^']+)'/g
  const paths: string[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) {
    paths.push(m[1])
  }
  return [...new Set(paths)]
}

function pathDepth(p: string): number {
  return p.replace(/^\/|\/$/g, '').split('/').filter(Boolean).length
}

function block(text: string) {
  const t = text.replace(/\s+/g, ' ').trim()
  if (!t) return null
  return {
    _type: 'block',
    _key: rk(),
    style: 'normal' as const,
    markDefs: [],
    children: [{ _type: 'span', _key: rk(), text: t, marks: [] }],
  }
}

function legacyPageUrl(routePath: string): string {
  const normalized = routePath.startsWith('/') ? routePath : `/${routePath}`
  return `${LEGACY_ORIGIN}${normalized.endsWith('/') ? normalized : `${normalized}/`}`
}

function toAbsoluteUrl(href: string): string | null {
  const h = href.trim()
  if (!h) return null
  if (h.startsWith('//')) return `https:${h}`
  if (h.startsWith('http://') || h.startsWith('https://')) return h
  if (h.startsWith('/')) return `${LEGACY_ORIGIN}${h}`
  try {
    return new URL(h, LEGACY_ORIGIN + '/').href
  } catch {
    return null
  }
}

function basenamePdf(u: string): string {
  try {
    const p = new URL(u).pathname.split('/').pop() || 'document.pdf'
    return decodeURIComponent(p.replace(/\.pdf$/i, '')).replace(/[-_]+/g, ' ').trim() || 'PDF'
  } catch {
    return 'PDF'
  }
}

/** lower basename → absolute path (only .pdf in folder root, non-recursive). */
function buildPdfIndex(dir: string): Map<string, string> {
  const m = new Map<string, string>()
  if (!fs.existsSync(dir)) return m
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!f.isFile() || !f.name.toLowerCase().endsWith('.pdf')) continue
    m.set(f.name.toLowerCase(), path.join(dir, f.name))
  }
  return m
}

function findLocalPdf(pdfIndex: Map<string, string>, pdfUrl: string): string | null {
  try {
    const name = decodeURIComponent(new URL(pdfUrl).pathname.split('/').pop() || '')
    if (!name.toLowerCase().endsWith('.pdf')) return null
    return pdfIndex.get(name.toLowerCase()) ?? null
  } catch {
    return null
  }
}

async function uploadPdfFile(
  client: ReturnType<typeof createClient>,
  filePath: string,
): Promise<string | null> {
  const filename = path.basename(filePath)
  const buffer = fs.readFileSync(filePath)
  try {
    const asset = await client.assets.upload('file', buffer, {
      filename,
      contentType: 'application/pdf',
    })
    return asset._id
  } catch (e) {
    console.warn(`  ⚠ Upload failed: ${filename}`, e)
    return null
  }
}

async function buildPdfDownloads(
  client: ReturnType<typeof createClient>,
  pdfs: { url: string; title: string }[],
  pdfIndex: Map<string, string> | null,
  dryRun: boolean,
  assetCache: Map<string, string>,
): Promise<Record<string, unknown>[]> {
  const out: Record<string, unknown>[] = []
  for (let i = 0; i < pdfs.length; i++) {
    const p = pdfs[i]
    const entry: Record<string, unknown> = {
      _key: `leg-${i}-${rk()}`,
      title: p.title,
    }
    const local = pdfIndex ? findLocalPdf(pdfIndex, p.url) : null

    if (local) {
      if (dryRun) {
        entry.externalUrl = p.url
        entry._dryUpload = path.basename(local)
      } else {
        const bn = path.basename(local).toLowerCase()
        let assetId = assetCache.get(bn)
        if (!assetId) {
          const uploaded = await uploadPdfFile(client, local)
          if (uploaded) {
            assetId = uploaded
            assetCache.set(bn, uploaded)
          }
        }
        if (assetId) {
          entry.file = {
            _type: 'file',
            asset: { _type: 'reference', _ref: assetId },
          }
        }
        entry.externalUrl = p.url
      }
    } else {
      entry.externalUrl = p.url
    }
    out.push(entry)
  }
  return out
}

interface ScrapeResult {
  intro: ReturnType<typeof block>[]
  pdfs: { url: string; title: string }[]
}

function chunkTextToBlocks(full: string, maxChunks = 24): ReturnType<typeof block>[] {
  const cleaned = full.replace(/\s+/g, ' ').trim()
  if (cleaned.length < 30) return []
  const blocks: ReturnType<typeof block>[] = []
  const maxLen = 900
  let i = 0
  let guard = 0
  while (i < cleaned.length && blocks.length < maxChunks && guard++ < 40) {
    let end = Math.min(i + maxLen, cleaned.length)
    if (end < cleaned.length) {
      const cut = cleaned.lastIndexOf('. ', end)
      if (cut > i + 80) end = cut + 1
    }
    const slice = cleaned.slice(i, end).trim()
    if (slice.length >= 25) {
      const b = block(slice)
      if (b) blocks.push(b)
    }
    i = end
  }
  return blocks
}

function scrapeLegacyHtml(html: string): ScrapeResult {
  const $ = load(html)
  // lubecontrol.com.au WordPress: #page #content .post .entry (tables, not .entry-content)
  let main = $('#page #content .post .entry').first()
  if (!main.length) main = $('.entry-content').first()
  if (!main.length) main = $('.post-content').first()
  if (!main.length) main = $('article').first()

  const introBlocks: ReturnType<typeof block>[] = []
  if (main.length) {
    main.find('p').each((_, el) => {
      const t = $(el).text()
      const b = block(t)
      if (b) introBlocks.push(b)
    })
    if (introBlocks.length === 0) {
      const clone = main.clone()
      clone.find('script,style,noscript,iframe,form').remove()
      const raw = clone.text().replace(/\s+/g, ' ').trim()
      introBlocks.push(...chunkTextToBlocks(raw))
    }
  }

  const pdfSeen = new Set<string>()
  const pdfs: { url: string; title: string }[] = []

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href')
    if (!href) return
    const abs = toAbsoluteUrl(href)
    if (!abs) return
    const lower = abs.toLowerCase()
    const isPdf = lower.includes('.pdf') && !lower.includes('?format=pdf') // still ok
    const isGdrive = /drive\.google\.com\/file\/d\//i.test(abs)
    if (!isPdf && !isGdrive) return
    if (pdfSeen.has(abs)) return
    pdfSeen.add(abs)
    let title = $(el).text().replace(/\s+/g, ' ').trim()
    if (!title || title.length > 200) title = basenamePdf(abs)
    pdfs.push({ url: abs, title })
  })

  return { intro: introBlocks, pdfs }
}

function parseArgs() {
  const argv = process.argv.slice(2)
  const dryRun = argv.includes('--dry-run')
  let minDepth = 2
  let delayMs = 450
  let pathFilter: string[] | null = null
  let pdfDir: string | null = process.env.LEGACY_PDF_FOLDER?.trim() || null
  for (const a of argv) {
    if (a.startsWith('--min-depth=')) minDepth = Math.max(1, parseInt(a.split('=')[1], 10) || 1)
    if (a.startsWith('--ms=')) delayMs = Math.max(0, parseInt(a.split('=')[1], 10) || 0)
    if (a.startsWith('--pdf-dir=')) {
      const v = a.slice('--pdf-dir='.length).trim()
      pdfDir = v ? v.replace(/^["']|["']$/g, '') : null
    }
    if (a.startsWith('--path=')) {
      pathFilter = a
        .slice('--path='.length)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    }
  }
  return { dryRun, minDepth, delayMs, pathFilter, pdfDir }
}

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms))
}

async function main() {
  const { dryRun, minDepth, delayMs, pathFilter, pdfDir } = parseArgs()

  let pdfIndex: Map<string, string> | null = null
  if (pdfDir) {
    if (!fs.existsSync(pdfDir)) {
      console.warn(`⚠ PDF folder not found (${pdfDir}) — using external URLs only.`)
    } else {
      pdfIndex = buildPdfIndex(pdfDir)
      console.log(`📁 PDF folder: ${pdfIndex.size} file(s) in ${pdfDir} (match by URL filename)`)
    }
  }

  let paths = extractPathsFromNuclearSeed()
  if (pathFilter?.length) {
    const set = new Set(pathFilter.map((p) => (p.startsWith('/') ? p : `/${p}`)))
    paths = paths.filter((p) => set.has(p))
  } else {
    paths = paths.filter((p) => pathDepth(p) >= minDepth)
  }
  console.log(`Found ${paths.length} paths (min depth ${minDepth}). Dry run: ${dryRun}`)

  if (!token && !dryRun) {
    console.error('Set SANITY_API_WRITE_TOKEN in .env.local (or use --dry-run).')
    process.exit(1)
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token: token || 'dry',
    useCdn: false,
  })

  let ok = 0
  let skip = 0
  let fail = 0
  const assetCache = new Map<string, string>()

  for (const routePath of paths) {
    const url = legacyPageUrl(routePath)
    const pid = pageId(routePath)

    if (!dryRun) {
      const exists = await client.fetch<string | null>('*[_id == $id][0]._id', { id: pid })
      if (!exists) {
        console.warn(`  ⚠ No categoryPage ${pid} — run nuclear-seed first`)
        skip++
        continue
      }
    }

    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'LubeControlMigration/1.0 (+internal; contact@lubecontrol.com.au)',
          Accept: 'text/html',
        },
      })
      if (!res.ok) {
        console.warn(`  ⚠ ${res.status} ${url}`)
        fail++
        await sleep(delayMs)
        continue
      }
      const html = await res.text()
      const { intro, pdfs } = scrapeLegacyHtml(html)

      const pdfRaw = await buildPdfDownloads(client, pdfs, pdfIndex, dryRun, assetCache)
      const pdfDownloads = pdfRaw.map((row) => {
        const copy = { ...row }
        delete copy._dryUpload
        return copy
      })

      const updates: Record<string, unknown> = {}
      if (intro.length) updates.intro = intro
      if (pdfDownloads.length) updates.pdfDownloads = pdfDownloads

      if (dryRun) {
        console.log(`\n── ${routePath} ──`)
        console.log(`  URL: ${url}`)
        console.log(`  Intro blocks: ${intro.length}, PDFs: ${pdfDownloads.length}`)
        if (pdfDownloads.length) {
          const summary = pdfs.map((p, i) => {
            const dry = pdfRaw[i]?._dryUpload as string | undefined
            return dry ? `${p.title} [upload: ${dry}]` : `${p.title} [external]`
          })
          console.log(`  PDFs: ${summary.join(' | ')}`)
        }
        if (!Object.keys(updates).length) console.log(`  (would skip — nothing to import)`)
        ok++
      } else {
        if (!Object.keys(updates).length) {
          console.log(`  · skip ${routePath} — no intro or PDFs found on legacy page`)
          skip++
        } else {
          await client.patch(pid).set(updates).commit()
          const parts: string[] = []
          if (intro.length) parts.push(`intro ${intro.length} blocks`)
          if (pdfDownloads.length) parts.push(`${pdfDownloads.length} PDFs`)
          console.log(`  ✓ ${routePath} — ${parts.join(', ')}`)
          ok++
        }
      }
    } catch (e) {
      console.error(`  ✗ ${url}`, e)
      fail++
    }

    await sleep(delayMs)
  }

  console.log(`\nDone. Updated/skipped/fail: ${ok} / ${skip} / ${fail}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
