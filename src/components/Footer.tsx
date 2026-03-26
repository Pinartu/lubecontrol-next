import Link from 'next/link'

export type FooterColumn = {
  title?: string | null
  body?: string | null
  links?: {label?: string | null; href?: string | null}[] | null
}

type Props = {
  columns?: FooterColumn[] | null
  copyrightCompany?: string | null
}

const defaultColumns: FooterColumn[] = [
  {
    title: 'ABOUT US',
    body: 'Global Supplier of Quality Lubrication Solutions & Products. We offer Automatic Lubrication Systems, Lubricants, Fluid Handling Equipment, and more.',
  },
  {
    title: 'QUICK LINKS',
    links: [
      {label: 'Products', href: '/fluid-handling'},
      {label: 'Catalogue', href: '/catalogue'},
      {label: 'Contact', href: '/contact'},
    ],
  },
  {
    title: 'CATEGORIES',
    links: [
      {label: 'Fluid Handling', href: '/fluid-handling'},
      {label: 'Auto Lube Systems', href: '/auto-lube-systems'},
      {label: 'Lubricants', href: '/lubricants'},
    ],
  },
  {
    title: 'CONTACT',
    body: '1300 917 946\nsales@lubecontrol.com.au\nAustralia Wide Delivery',
  },
]

export default function Footer({columns, copyrightCompany}: Props) {
  const cols = columns?.filter((c) => c.title)?.length ? columns : defaultColumns
  const company = copyrightCompany || 'Lube Control Pty Ltd'

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {cols.map((col, idx) => (
          <div key={`footer-col-${idx}`}>
            <h3 className="font-heading font-bold text-xl mb-4 text-primary">{col.title}</h3>
            {col.body ? (
              <p className="text-sm text-gray-400 mb-4 leading-relaxed whitespace-pre-line">{col.body}</p>
            ) : null}
            {col.links?.length ? (
              <ul className="space-y-2 text-sm text-gray-400">
                {col.links.map(
                  (l) =>
                    l.href &&
                    l.label && (
                      <li key={l.href}>
                        <Link href={l.href} className="hover:text-primary transition-colors">
                          {l.label}
                        </Link>
                      </li>
                    ),
                )}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
      <div className="container mx-auto px-4 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} {company}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
