/**
 * One-time seed: creates singleton documents in Sanity from local fallbacks.
 * Requires SANITY_API_WRITE_TOKEN in env (Editor token with create rights).
 *
 *   npx tsx scripts/seed-sanity.ts
 */
import {createClient} from '@sanity/client'
import {NAVIGATION_FALLBACK} from '../src/lib/navigation.fallback'
import type {NavItem, NavLink, NavGroup} from '../src/lib/navigation.types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '92q6lqnu'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

function key() {
  return Math.random().toString(36).slice(2, 12)
}

function mapLink(link: NavLink): Record<string, unknown> {
  const base: Record<string, unknown> = {
    _type: 'navLinkNested',
    _key: key(),
    label: link.label,
    href: link.href,
  }
  if (link.children?.length) {
    base.subGroups = link.children.map((sg: NavGroup) => ({
      _type: 'navSubGroup',
      _key: key(),
      heading: sg.heading,
      links: sg.links.map((l) => ({
        _type: 'navSimpleLink',
        _key: key(),
        label: l.label,
        href: l.href,
      })),
    }))
  }
  return base
}

function mapTopItem(item: NavItem): Record<string, unknown> {
  if (!item.children?.length) {
    return {
      _type: 'navTopItem',
      _key: key(),
      label: item.label,
      href: item.href,
    }
  }
  return {
    _type: 'navTopItem',
    _key: key(),
    label: item.label,
    href: item.href,
    columns: item.children.map((col) => ({
      _type: 'navColumn',
      _key: key(),
      heading: col.heading,
      links: col.links.map(mapLink),
    })),
  }
}

function block(text: string, k: string) {
  return {
    _type: 'block',
    _key: k,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: key(), text, marks: []}],
  }
}

async function main() {
  if (!token) {
    console.error('Set SANITY_API_WRITE_TOKEN in .env.local')
    process.exit(1)
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  })

  const tx = client.transaction()

  tx.createOrReplace({
    _id: 'mainNavigation',
    _type: 'mainNavigation',
    title: 'Main menu',
    items: NAVIGATION_FALLBACK.map(mapTopItem),
  })

  tx.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    title: 'Lube Control Rebuild',
    description: 'Global Supplier of Quality Lubrication Solutions & Products',
    phones: [
      {number: '1300917946'},
      {number: '+61829855630'},
    ],
    emails: ['sales@lubecontrol.com.au'],
    contactEmail: 'sales@lubecontrol.com.au',
    contactPhone: '1300 917 946',
    address: 'Australia Wide Delivery',
    searchPlaceholder: 'Search products...',
    categoryCtaTitle: 'Need Help Choosing?',
    categoryCtaSubtitle: 'Our team of experts is ready to help you find the right solution.',
    categoryCtaPrimaryLabel: 'Contact Us',
    categoryCtaPrimaryHref: '/contact',
    categoryCtaSecondaryLabel: '1300 917 946',
    categoryCtaSecondaryHref: 'tel:1300917946',
  })

  tx.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    title: 'Home',
    heroSlides: [
      {
        _key: key(),
        heading: 'INNOVATION MEETS EFFICIENCY',
        subheading: 'Premium Lubrication Solutions for Australian Industry',
        cta: 'Explore Products',
        ctaHref: '/more-lubrication',
      },
      {
        _key: key(),
        heading: 'REMOTE GREASE LINES',
        subheading: 'Safe greasing without removing guards or accessing hazardous areas',
        cta: 'Learn More',
        ctaHref: '/auto-lube-systems/remote-grease-lines',
      },
      {
        _key: key(),
        heading: 'AUTOMATIC LUBRICATION',
        subheading: 'ILC Auto Lubrication Systems — reducing downtime, saving money',
        cta: 'View Systems',
        ctaHref: '/auto-lube-systems/ilc-autolubrication-systems',
      },
    ],
    featureItems: [
      {_key: key(), icon: 'truck', text: 'FAST DELIVERY WITHIN AUSTRALIA !'},
      {_key: key(), icon: 'package', text: 'AUSTRALIA-WIDE DELIVERY !'},
      {
        _key: key(),
        icon: 'mail',
        text: 'CONTACT US',
        sub: 'sales@lubecontrol.com.au | 1300 917 946',
      },
    ],
    welcomeTitle: 'WELCOME TO LUBE CONTROL',
    welcomeBody: [
      block(
        'Lube Control Pty Ltd is an Australian supplier of quality lubrication solutions and products. We offer Automatic Lubrication Systems, Lubricants, Fluid Handling Equipment, and multifarious lubrication products including oil storage systems, spill containment, and more.',
        'w1',
      ),
      block(
        'Lube Control are resellers of ILC Auto Lubrication Systems. Our remote grease lines allow you to grease bearings safely without removing machine guards or entering hazardous zones.',
        'w2',
      ),
    ],
    welcomeCtaLabel: 'View Catalogue Library',
    welcomeCtaHref: '/catalogue',
    solutionsTitle: 'OUR SOLUTIONS',
    solutionsSubtitle:
      'Explore our comprehensive range of lubrication products and systems designed for Australian industry.',
    solutionCards: [
      {
        _key: key(),
        title: 'Remote Grease Lines',
        description: 'Safe greasing without removing machine guards.',
        href: '/auto-lube-systems/remote-grease-lines',
        emoji: '🔧',
      },
      {
        _key: key(),
        title: 'Auto Lube Systems',
        description: 'Automated lubrication for heavy machinery.',
        href: '/auto-lube-systems/ilc-autolubrication-systems',
        emoji: '⚙️',
      },
      {
        _key: key(),
        title: 'Lubricants',
        description: 'Quality lubrication products from leading brands.',
        href: '/lubricants',
        emoji: '🛢️',
      },
      {
        _key: key(),
        title: 'Oil Sampling',
        description: 'Monitor your lubricant health with oil sampling.',
        href: '/more-lubrication/oil-sampling',
        emoji: '🧪',
      },
      {
        _key: key(),
        title: 'Fluid Handling',
        description: 'Oil, grease, and fuel handling equipment.',
        href: '/fluid-handling',
        emoji: '🚿',
      },
      {
        _key: key(),
        title: 'Breathers & Air Vents',
        description: 'Protect your equipment from contamination.',
        href: '/more-lubrication/breathers',
        emoji: '💨',
      },
    ],
  })

  tx.createOrReplace({
    _id: 'footerContent',
    _type: 'footerContent',
    copyrightCompany: 'Lube Control Pty Ltd',
    columns: [
      {
        _key: key(),
        title: 'ABOUT US',
        body: 'Global Supplier of Quality Lubrication Solutions & Products. We offer Automatic Lubrication Systems, Lubricants, Fluid Handling Equipment, and more.',
      },
      {
        _key: key(),
        title: 'QUICK LINKS',
        links: [
          {_key: key(), label: 'Products', href: '/fluid-handling'},
          {_key: key(), label: 'Catalogue', href: '/catalogue'},
          {_key: key(), label: 'Contact', href: '/contact'},
        ],
      },
      {
        _key: key(),
        title: 'CATEGORIES',
        links: [
          {_key: key(), label: 'Fluid Handling', href: '/fluid-handling'},
          {_key: key(), label: 'Auto Lube Systems', href: '/auto-lube-systems'},
          {_key: key(), label: 'Lubricants', href: '/lubricants'},
        ],
      },
      {
        _key: key(),
        title: 'CONTACT',
        body: '1300 917 946\nsales@lubecontrol.com.au\nAustralia Wide Delivery',
      },
    ],
  })

  tx.createOrReplace({
    _id: 'cataloguePage',
    _type: 'cataloguePage',
    title: 'CATALOGUE LIBRARY',
    intro: 'Download or view our full product catalogues. All catalogues are available in PDF format.',
    items: [
      {
        _key: key(),
        title: 'Remote Grease Lines & Automatic Lubrication Fittings',
        description: 'Complete guide to remote grease line systems and automatic lubrication fittings.',
        externalUrl: 'https://drive.google.com/file/d/18xRnobRF9GMzWbo4Kqi8_C5gPAx7M3Xl/view',
      },
      {
        _key: key(),
        title: 'Fluid Handling Equipment Catalogue',
        description: 'Full range of oil, grease, and fuel handling equipment.',
      },
      {
        _key: key(),
        title: 'ILC Auto Lubrication Systems',
        description: 'Automatic lubrication systems for industrial machinery.',
      },
      {
        _key: key(),
        title: 'Lubricants Catalogue',
        description: 'Anglomoil, Castrol, Inox, LE and other premium brands.',
      },
      {
        _key: key(),
        title: 'Spill Containment & Oil Storage',
        description: 'Solutions for safe handling and storage of lubricants.',
      },
    ],
    bottomTitle: 'Need a Specific Catalogue?',
    bottomText: 'Contact us and we will send you the relevant product information.',
    bottomButtonLabel: 'Email Us',
    bottomButtonHref: 'mailto:sales@lubecontrol.com.au',
  })

  tx.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    title: 'CONTACT US',
    intro: 'Get in touch with our team for expert lubrication advice and product enquiries.',
    useSiteSettingsContact: true,
    locationLabel: 'Location',
    hours: {
      weekdays: '8:00am – 5:00pm',
      saturday: 'Closed',
      sunday: 'Closed',
    },
    formSectionTitle: 'Send An Enquiry',
    fieldFirstName: 'First Name',
    fieldLastName: 'Last Name',
    fieldEmail: 'Email',
    fieldPhone: 'Phone',
    fieldMessage: 'Message',
    submitLabel: 'Send Enquiry',
  })

  await tx.commit()
  console.log('Seeded singleton documents:', projectId, dataset)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
