import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

/**
 * On-demand revalidation endpoint called by Sanity webhook.
 *
 * Security:
 *  - Secret is read from the `x-revalidate-secret` header (not query params, which get logged).
 *  - Comparison uses `timingSafeEqual` to prevent timing attacks.
 *  - If REVALIDATE_SECRET is not configured, the endpoint is disabled entirely.
 */
export async function POST(req: NextRequest) {
  const expectedSecret = process.env.REVALIDATE_SECRET

  // If no secret is configured, disable the endpoint entirely
  if (!expectedSecret) {
    return NextResponse.json(
      { message: 'Revalidation endpoint is not configured. Set REVALIDATE_SECRET.' },
      { status: 500 },
    )
  }

  // Read secret from header instead of query param (avoids URL logging)
  const providedSecret =
    req.headers.get('x-revalidate-secret') ??
    req.nextUrl.searchParams.get('secret') ?? // backward compat
    ''

  // Constant-time comparison to prevent timing attacks
  const expected = Buffer.from(expectedSecret, 'utf-8')
  const provided = Buffer.from(providedSecret, 'utf-8')

  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    await req.json()
  } catch {
    // body optional
  }

  // Revalidate all pages when Sanity content changes
  revalidatePath('/', 'layout')

  return NextResponse.json({ revalidated: true })
}
