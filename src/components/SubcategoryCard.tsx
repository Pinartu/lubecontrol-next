import { urlForImage } from '@/lib/sanity'
import CategoryPreviewCard from '@/components/CategoryPreviewCard'

export interface Subcategory {
  _id: string
  title: string
  slug?: string
  description?: string
  image?: { asset?: { _ref?: string } }
  /** https image when no uploaded `image` */
  previewImageUrl?: string | null
  routePath?: string
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

  return (
    <CategoryPreviewCard
      href={href}
      title={subcategory.title}
      description={subcategory.description}
      imageUrl={imgUrl}
      imageAlt={subcategory.title}
      useNativeImg={useNativeImg}
    />
  )
}
