import type { Metadata } from 'next'
import { getContactPage, getSiteSettings } from '@/lib/cms'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage()
  return {
    title: page?.title ?? 'Contact Us',
    description: page?.intro ?? 'Get in touch with our team.',
  }
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getContactPage(), getSiteSettings()])

  const title   = page?.title ?? 'Contact Us'
  const intro   = page?.intro
  const useSite = page?.useSiteSettingsContact !== false

  const phone   = useSite ? settings?.contactPhone  : undefined
  const email   = useSite ? settings?.contactEmail  : undefined
  const address = useSite ? settings?.address        : page?.locationText

  const formTitle   = page?.formSectionTitle   ?? 'Send us a message'
  const firstLabel  = page?.fieldFirstName     ?? 'First name'
  const lastLabel   = page?.fieldLastName      ?? 'Last name'
  const emailLabel  = page?.fieldEmail         ?? 'Email'
  const phoneLabel  = page?.fieldPhone         ?? 'Phone'
  const msgLabel    = page?.fieldMessage       ?? 'Message'
  const submitLabel = page?.submitLabel        ?? 'Send message'

  const hours = page?.hours

  return (
    <div>
      {/* Header */}
      <div className="bg-header text-white py-12 px-4 border-b-4 border-brand">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">{title}</h1>
          {intro && <p className="mt-3 text-surface/90 max-w-2xl">{intro}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact info */}
        <div>
          <h2 className="text-2xl font-bold text-text mb-6">Contact information</h2>

          <div className="space-y-5">
            {phone && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-soft rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-header" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-muted">Phone</p>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-text hover:text-brand">{phone}</a>
                </div>
              </div>
            )}

            {email && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-soft rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-header" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-muted">Email</p>
                  <a href={`mailto:${email}`} className="text-text hover:text-brand">{email}</a>
                </div>
              </div>
            )}

            {address && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brand-soft rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-header" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-muted">Address</p>
                  <p className="text-text whitespace-pre-line">{address}</p>
                </div>
              </div>
            )}
          </div>

          {/* Hours */}
          {hours && (
            <div className="mt-8">
              <h3 className="font-semibold text-text mb-3">Business hours</h3>
              <div className="space-y-1 text-sm text-text-secondary">
                {hours.weekdays && <p><span className="font-medium">Mon – Fri:</span> {hours.weekdays}</p>}
                {hours.saturday && <p><span className="font-medium">Saturday:</span> {hours.saturday}</p>}
                {hours.sunday && <p><span className="font-medium">Sunday:</span> {hours.sunday}</p>}
              </div>
            </div>
          )}
        </div>

        {/* Contact form */}
        <div>
          <h2 className="text-2xl font-bold text-text mb-6">{formTitle}</h2>
          <form className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-text-secondary mb-1">{firstLabel}</label>
                <input id="firstName" name="firstName" type="text" autoComplete="given-name"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-text-secondary mb-1">{lastLabel}</label>
                <input id="lastName" name="lastName" type="text" autoComplete="family-name"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-brand" />
              </div>
            </div>
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-text-secondary mb-1">{emailLabel}</label>
              <input id="contactEmail" name="email" type="email" autoComplete="email"
                className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-text-secondary mb-1">{phoneLabel}</label>
              <input id="contactPhone" name="phone" type="tel" autoComplete="tel"
                className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">{msgLabel}</label>
              <textarea id="message" name="message" rows={5} autoComplete="off"
                className="w-full border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-brand resize-none" />
            </div>
            <button type="submit"
              className="w-full bg-brand hover:bg-brand-hover text-header font-semibold py-3 rounded-lg transition-colors">
              {submitLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
