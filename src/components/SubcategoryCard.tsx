import { urlForImage } from '@/lib/sanity'
import { blocksToPlainText } from '@/lib/blocksToPlainText'
import CategoryPreviewCard from '@/components/CategoryPreviewCard'
import type { PdfDownload } from '@/components/PdfDownloadsGrid'

export interface Subcategory {
  _id: string
  title: string
  slug?: string
  description?: string
  image?: { asset?: { _ref?: string } }
  /** https image when no uploaded `image` */
  previewImageUrl?: string | null
  routePath?: string
  /** From linked Category Page intro — used for card text when `description` is empty */
  intro?: unknown[]
  /** From linked Category Page — shown under the card on the parent category (catalogue-style grid) */
  pdfDownloads?: PdfDownload[]
}

interface Props {
  subcategory: Subcategory
  basePath?: string
}

export default function SubcategoryCard({ subcategory, basePath = '' }: Props) {
  const fromUpload = subcategory.image?.asset
    ? urlForImage(subcategory.image).width(800).height(480).url()
    : null
  const fromUrl = subcategory.previewImageUrl?.trim() || null
  const imgUrl = fromUpload ?? fromUrl
  const useNativeImg = !fromUpload && Boolean(fromUrl)

  const href = subcategory.routePath
    ? subcategory.routePath.startsWith('/')
      ? subcategory.routePath
      : `/${subcategory.routePath}`
    : subcategory.slug
      ? `${basePath}/${subcategory.slug}`
      : '#'

  const blurb =
    subcategory.description?.trim() ||
    blocksToPlainText(subcategory.intro ?? []) ||
    undefined

  return (
    <CategoryPreviewCard
      href={href}
      title={subcategory.title}
      description={blurb}
      imageUrl={imgUrl}
      imageAlt={subcategory.title}
      useNativeImg={useNativeImg}
    />
  )
}
