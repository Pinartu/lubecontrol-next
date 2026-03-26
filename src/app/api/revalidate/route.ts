import {revalidateTag} from 'next/cache'
import {NextRequest, NextResponse} from 'next/server'

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({message: 'SANITY_REVALIDATE_SECRET not configured'}, {status: 501})
  }

  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({message: 'Invalid authorization'}, {status: 401})
  }

  revalidateTag('sanity')
  return NextResponse.json({revalidated: true, tag: 'sanity'})
}
