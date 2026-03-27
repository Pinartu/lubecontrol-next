'use client'
import { useState } from 'react'

interface SalesLink {
  title: string
  description?: string
  href: string
  image?: { asset?: { _ref?: string } }
}

interface Props {
  title?: string
  subtitle?: string
  links: SalesLink[]
}

export default function SalesLinksSection({ title, subtitle, links }: Props) {
  if (!links.length) return null

  return (
    <section className="sales-links-section">
      <div className="sales-links-container">
        {(title || subtitle) && (
          <div className="sales-links-header">
            {title && <h2 className="sales-links-title">{title}</h2>}
            {subtitle && <p className="sales-links-subtitle">{subtitle}</p>}
          </div>
        )}
        <div className="sales-links-grid">
          {links.map((link, i) => (
            <SalesCard key={i} link={link} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SalesCard({ link, index }: { link: SalesLink; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Alternate between two accent styles
  const isRemoteGrease = index === 0
  
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="sales-card"
      data-variant={isRemoteGrease ? 'primary' : 'secondary'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Top accent bar */}
      <div className="sales-card-accent" />
      
      {/* Icon */}
      <div className="sales-card-icon">
        {isRemoteGrease ? (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        ) : (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        )}
      </div>

      {/* Content */}
      <h3 className="sales-card-title">{link.title}</h3>

      {link.description && (
        <p className="sales-card-description">{link.description}</p>
      )}

      {/* Domain badge */}
      <div className="sales-card-domain">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        <span>{new URL(link.href).hostname.replace('www.', '')}</span>
      </div>

      {/* CTA */}
      <div className="sales-card-cta">
        <span>VISIT STORE</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  )
}
