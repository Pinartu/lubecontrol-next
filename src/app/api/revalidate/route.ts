import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
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
