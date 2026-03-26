import {PortableText, type PortableTextComponents, type PortableTextBlock} from '@portabletext/react'
import Image from 'next/image'
import {urlFor} from '@/lib/sanity'
const components: PortableTextComponents = {
  types: {
    image: ({value}) => {
      if (!value?.asset) return null
      const src = urlFor(value).width(800).url()
      return (
        <figure className="my-6">
          <Image
            src={src}
            alt={value.alt || 'Content image'}
            width={800}
            height={450}
            className="rounded-sm w-full h-auto object-cover max-h-[400px]"
          />
        </figure>
      )
    },
  },
  block: {
    h2: ({children}) => <h2 className="font-heading text-2xl text-secondary mt-8 mb-3">{children}</h2>,
    h3: ({children}) => <h3 className="font-heading text-xl text-secondary mt-6 mb-2">{children}</h3>,
    normal: ({children}) => <p className="text-muted leading-relaxed mb-3">{children}</p>,
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold text-secondary">{children}</strong>,
    link: ({value, children}) => {
      const href = value?.href || '#'
      const external = href.startsWith('http')
      return (
        <a
          href={href}
          className="text-primary underline hover:no-underline"
          {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
        >
          {children}
        </a>
      )
    },
  },
}

type Props = {
  value: PortableTextBlock[] | unknown[] | null | undefined
  className?: string
}

export default function PortableBody({value, className}: Props) {
  if (!value?.length) return null
  return (
    <div className={className}>
      <PortableText value={value as PortableTextBlock[]} components={components} />
    </div>
  )
}
