import Link from 'next/link'
import PortableBody from '@/components/PortableBody'

type Props = {
  title?: string | null
  body?: unknown[] | null
  ctaLabel?: string | null
  ctaHref?: string | null
}

export default function WelcomeSection({title, body, ctaLabel, ctaHref}: Props) {
  const h = title || 'WELCOME TO LUBE CONTROL'
  const showCta = ctaLabel && ctaHref
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-secondary mb-4">{h}</h2>
          {body?.length ? (
            <PortableBody value={body} className="text-muted text-left max-w-none [&_p]:text-center" />
          ) : (
            <>
              <p className="text-muted leading-relaxed">
                Lube Control Pty Ltd is an Australian supplier of quality lubrication solutions and products. We offer
                Automatic Lubrication Systems, Lubricants, Fluid Handling Equipment, and multifarious lubrication
                products including oil storage systems, spill containment, and more.
              </p>
              <p className="text-muted mt-4 leading-relaxed">
                Lube Control are resellers of <strong>ILC Auto Lubrication Systems</strong>. Our remote grease lines
                allow you to grease bearings safely without removing machine guards or entering hazardous zones.
              </p>
            </>
          )}
          {showCta ? (
            <Link
              href={ctaHref}
              className="mt-8 inline-block bg-primary hover:bg-primary-hover text-secondary font-bold font-heading py-3 px-8 uppercase tracking-wider transition-all duration-200 shadow"
            >
              {ctaLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
