import { PortableText } from 'next-sanity'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = any

interface Props {
  value: Block[]
  className?: string
}

export default function PortableBody({ value, className }: Props) {
  if (!value?.length) return null

  return (
    <div className={className}>
      <PortableText
        value={value}
        components={{
          block: {
            normal: ({ children }) => <p className="mb-4 leading-relaxed text-text-secondary">{children}</p>,
            h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 text-text">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 text-text">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-semibold mb-3 text-text">{children}</h3>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-brand pl-4 italic text-text-muted mb-4">{children}</blockquote>
            ),
          },
          marks: {
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            link: ({ value: markValue, children }) => (
              <a
                href={markValue?.href}
                className="text-brand underline underline-offset-2 hover:text-brand-hover"
                target={markValue?.href?.startsWith('http') ? '_blank' : undefined}
                rel={markValue?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
          },
          list: {
            bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-text-secondary">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-text-secondary">{children}</ol>,
          },
          listItem: {
            bullet: ({ children }) => <li>{children}</li>,
            number: ({ children }) => <li>{children}</li>,
          },
          types: {
            image: ({ value: imgValue }) => {
              if (!imgValue?.asset) return null
              const url = urlForImage(imgValue).width(900).url()
              return (
                <div className="my-6">
                  <Image
                    src={url}
                    alt={imgValue.alt || 'Content image'}
                    width={900}
                    height={500}
                    className="rounded-lg w-full h-auto object-cover"
                  />
                </div>
              )
            },
          },
        }}
      />
    </div>
  )
}
