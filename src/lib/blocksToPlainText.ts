type BlockChild = {_type?: string; text?: string}
type Block = {_type?: string; children?: BlockChild[]}

export function blocksToPlainText(blocks: unknown, maxLen = 200): string {
  if (!Array.isArray(blocks)) return ''
  const parts: string[] = []
  for (const b of blocks as Block[]) {
    if (b._type !== 'block' || !b.children) continue
    for (const c of b.children) {
      if (c.text) parts.push(c.text)
    }
  }
  const s = parts.join(' ').replace(/\s+/g, ' ').trim()
  return s.length > maxLen ? `${s.slice(0, maxLen)}…` : s
}
