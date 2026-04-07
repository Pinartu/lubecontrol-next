/**
 * Minimal portable text → plain string for category card blurbs (no extra dependency).
 */
export function blocksToPlainText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return ''
  const parts: string[] = []
  for (const block of blocks) {
    if (typeof block !== 'object' || block === null) continue
    const b = block as {_type?: string; children?: Array<{text?: string}>}
    if (b._type !== 'block' || !Array.isArray(b.children)) continue
    for (const child of b.children) {
      if (child?.text) parts.push(child.text)
    }
    parts.push(' ')
  }
  return parts.join('').replace(/\s+/g, ' ').trim()
}
