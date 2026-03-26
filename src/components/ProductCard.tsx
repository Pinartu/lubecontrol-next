import Image from 'next/image'
import {urlFor} from '@/lib/sanity'
import {blocksToPlainText} from '@/lib/blocksToPlainText'

export type ProductListItem = {
  _id: string
  title?: string | null
  slug?: string | null
  images?: unknown[] | null
  description?: unknown[] | null
  features?: string[] | null
}

type Props = {
  product: ProductListItem
}

export default function ProductCard({product}: Props) {
  const firstImage = product.images?.[0] as {asset?: unknown} | undefined
  const imgUrl = firstImage?.asset ? urlFor(firstImage).width(400).height(280).url() : null
  const excerpt = blocksToPlainText(product.description, 180)

  return (
    <article className="border border-gray-200 rounded-sm overflow-hidden bg-white hover:border-primary hover:shadow-md transition-all flex flex-col">
      <div className="relative aspect-[4/3] bg-gray-100">
        {imgUrl ? (
          <Image src={imgUrl} alt={product.title || 'Product image'} fill className="object-cover" sizes="(max-width:768px) 100vw, 25vw" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted text-sm">No image</div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-heading font-bold text-sm text-secondary uppercase leading-tight mb-2">{product.title}</h3>
        {excerpt ? <p className="text-xs text-muted leading-relaxed flex-grow">{excerpt}</p> : null}
        {product.features?.length ? (
          <ul className="mt-2 text-xs text-gray-500 list-disc list-inside">
            {product.features.slice(0, 3).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}
