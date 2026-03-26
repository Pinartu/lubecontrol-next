import Breadcrumb from '@/components/Breadcrumb'
import {Mail, Phone, MapPin} from 'lucide-react'
import {getContactPage, getSiteSettings} from '@/lib/cms'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const p = await getContactPage()
  return {
    title: p?.title ? `${p.title} | Lube Control` : 'Contact Us | Lube Control',
    description: p?.intro || 'Get in touch with Lube Control Pty Ltd — lubrication solutions for Australian industry.',
  }
}

export default async function ContactPage() {
  const [p, site] = await Promise.all([getContactPage(), getSiteSettings()])

  const title = p?.title || 'CONTACT US'
  const intro =
    p?.intro || 'Get in touch with our team for expert lubrication advice and product enquiries.'

  const useSite = p?.useSiteSettingsContact !== false
  type PhoneRow = {number?: string | null; label?: string | null}
  const phones: PhoneRow[] =
    useSite && site?.phones?.length
      ? site.phones.filter((x: PhoneRow) => x?.number)
      : [{number: '1300917946'}, {number: '+61 8 2985 5630'}]
  const email =
    useSite && site?.contactEmail
      ? site.contactEmail
      : useSite && site?.emails?.[0]
        ? site.emails[0]
        : 'sales@lubecontrol.com.au'
  const locationLabel = p?.locationLabel || 'Location'
  const locationText =
    p?.locationText || site?.address || 'Australia Wide Delivery'

  const hours = p?.hours

  return (
    <>
      <Breadcrumb crumbs={[{label: 'Home', href: '/'}, {label: 'Contact', href: '/contact'}]} />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-10 border-b-4 border-primary pb-4">
          <h1 className="font-heading text-4xl font-black text-secondary mb-3">{title}</h1>
          <p className="text-muted">{intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading font-bold text-xl text-secondary uppercase mb-6 border-b border-gray-200 pb-2">
              Get In Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full p-2 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-bold text-secondary mb-1">Phone</p>
                  {phones.map((ph, i) => (
                    <a
                      key={i}
                      href={`tel:${String(ph.number).replace(/\s/g, '')}`}
                      className="text-muted hover:text-primary transition-colors block"
                    >
                      {ph.number}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full p-2 shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-bold text-secondary mb-1">Email</p>
                  <a href={`mailto:${email}`} className="text-muted hover:text-primary transition-colors">
                    {email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary rounded-full p-2 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-bold text-secondary mb-1">{locationLabel}</p>
                  <p className="text-muted whitespace-pre-line">{locationText}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-[#1a2d4f] text-white p-6 rounded-sm">
              <h3 className="font-heading font-bold text-xl uppercase mb-2">Business Hours</h3>
              <div className="space-y-1 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="font-semibold text-primary">
                    {hours?.weekdays || '8:00am – 5:00pm'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold text-gray-400">{hours?.saturday || 'Closed'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold text-gray-400">{hours?.sunday || 'Closed'}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-heading font-bold text-xl text-secondary uppercase mb-6 border-b border-gray-200 pb-2">
              {p?.formSectionTitle || 'Send An Enquiry'}
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-fname" className="block text-sm font-semibold text-secondary mb-1">
                    {p?.fieldFirstName || 'First Name'} *
                  </label>
                  <input
                    id="contact-fname"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-primary rounded-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-lname" className="block text-sm font-semibold text-secondary mb-1">
                    {p?.fieldLastName || 'Last Name'} *
                  </label>
                  <input
                    id="contact-lname"
                    type="text"
                    required
                    autoComplete="family-name"
                    className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-primary rounded-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-semibold text-secondary mb-1">
                  {p?.fieldEmail || 'Email'} *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-primary rounded-sm"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-semibold text-secondary mb-1">
                  {p?.fieldPhone || 'Phone'}
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-primary rounded-sm"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-semibold text-secondary mb-1">
                  {p?.fieldMessage || 'Message'} *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  className="w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-primary rounded-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-hover text-secondary font-heading font-bold py-3 px-8 uppercase tracking-wider transition-colors text-sm"
              >
                {p?.submitLabel || 'Send Enquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
