import type {NavItem} from './navigation.types'

/** Used when Sanity has no main navigation document yet */
export const NAVIGATION_FALLBACK: NavItem[] = [
  {label: 'HOME', href: '/'},
  {
    label: 'FLUID HANDLING',
    href: '/fluid-handling',
    children: [
      {
        heading: 'Oil Handling Equipment',
        links: [
          {
            label: 'Oil Guns and Oil Jug',
            href: '/fluid-handling/oil-handling-equipment/oil-guns-and-oil-jug',
          },
          {
            label: 'Manual Oil Pumps',
            href: '/fluid-handling/oil-handling-equipment/oil-pumps-manual',
          },
          {
            label: 'Electric Oil Pumps & Kits',
            href: '/fluid-handling/oil-handling-equipment/oil-drum-pumps',
          },
          {
            label: 'Pneumatic Pumps & Kits',
            href: '/fluid-handling/oil-handling-equipment/air-operated-pumps',
            children: [
              {
                heading: 'Pneumatic Pump Types',
                links: [
                  {
                    label: '20L Oil Drum Pumps',
                    href: '/fluid-handling/oil-handling-equipment/air-operated-pumps/oil-drum-pumps-air',
                  },
                  {
                    label: '205L Oil Pumps',
                    href: '/fluid-handling/oil-handling-equipment/air-operated-pumps/205l-oil-pumps-air',
                  },
                  {
                    label: 'Stub Oil Pumps',
                    href: '/fluid-handling/oil-handling-equipment/air-operated-pumps/stub-oil-pumps-air',
                  },
                  {
                    label: 'Heavy Duty Oil Drum Pumps',
                    href: '/fluid-handling/oil-handling-equipment/air-operated-pumps/heavy-duty-oil-drum-pumps-air',
                  },
                  {
                    label: 'Air Operated Oil Transfer Kits',
                    href: '/fluid-handling/oil-handling-equipment/air-operated-pumps/air-operated-oil-transfer-pumps',
                  },
                  {
                    label: 'Air Operated 1000L/IBC/Pallecon Kits',
                    href: '/fluid-handling/oil-handling-equipment/air-operated-pumps/air-operated-ibcpallecon-kits',
                  },
                ],
              },
            ],
          },
          {
            label: 'Oil Hose Reels',
            href: '/fluid-handling/oil-handling-equipment/oil-hose-reels',
          },
        ],
      },
      {
        heading: 'Grease Transfer Equipment',
        links: [
          {label: '2.5kg Grease Kits', href: '/fluid-handling/grease-transfer-equipment/2-5kg-grease-kits'},
          {label: '400g and 450g Grease Guns', href: '/fluid-handling/grease-transfer-equipment/grease-guns'},
          {label: 'Grease Hose Reels', href: '/fluid-handling/grease-transfer-equipment/grease-hose-reels'},
          {label: 'Grease Control Valves', href: '/fluid-handling/grease-transfer-equipment/grease-control-valves'},
          {label: '20kg Greasing Kits', href: '/fluid-handling/grease-transfer-equipment/20kg-greasing-kits'},
          {label: '180kg Grease Pumps & Kits', href: '/fluid-handling/grease-transfer-equipment/180kg-grease-kits-2'},
          {label: 'Bulk Grease Vessels', href: '/fluid-handling/grease-transfer-equipment/bulk-grease-vessels'},
          {label: 'Grease Meters', href: '/fluid-handling/grease-transfer-equipment/grease-meters'},
          {
            label: 'Manual Grease Monitoring – Lube Right',
            href: '/fluid-handling/grease-transfer-equipment/manual-grease-monitoring-lube-right',
          },
          {
            label: 'Electric Grease Pump 16kg–180kg',
            href: '/fluid-handling/grease-transfer-equipment/electric-grease-pump-16kg-20kg-55kg-and-180kg',
          },
        ],
      },
      {
        heading: 'Fuel Handling Equipment',
        links: [
          {label: 'Fuel Nozzles', href: '/fluid-handling/fuel-handling-equipment/fuel-nozzles'},
          {label: 'Fuel Hose Reels', href: '/fluid-handling/fuel-handling-equipment/fuel-hose-reels'},
          {label: 'Fuel Meters', href: '/fluid-handling/fuel-handling-equipment/fuel-meters'},
          {label: 'Fuel Management Systems', href: '/fluid-handling/fuel-handling-equipment/fuel-management-systems'},
          {label: 'Fuel Accessories', href: '/fluid-handling/fuel-handling-equipment/fuel-accessories'},
          {label: 'Fuel Storage & Dispensing Kits', href: '/fluid-handling/fuel-handling-equipment/fuel-storage'},
          {
            label: 'Fuel Pumps',
            href: '/fluid-handling/fuel-handling-equipment/fuel-pumps',
            children: [
              {
                heading: 'Fuel Pump Types',
                links: [
                  {
                    label: 'Fuel Pumps – Air Operated',
                    href: '/fluid-handling/fuel-handling-equipment/fuel-pumps/fuel-transfer-pumps-refuelling-kits',
                  },
                  {
                    label: 'Fuel Pumps – Manual',
                    href: '/fluid-handling/fuel-handling-equipment/fuel-pumps/manual-fuel-pumps',
                  },
                  {
                    label: 'Fuel Pumps – Electric',
                    href: '/fluid-handling/fuel-handling-equipment/fuel-pumps/fuel-pumps-electric',
                  },
                ],
              },
            ],
          },
          {
            label: 'Mobile & Stationary Fuel Dispensers',
            href: '/fluid-handling/fuel-handling-equipment/mobile-and-stationary-fuel-dispensers',
          },
        ],
      },
    ],
  },
  {
    label: 'LUBRICANTS',
    href: '/lubricants',
    children: [
      {
        heading: 'Lubricant Brands',
        links: [
          {label: 'Anglomoil Lubricants', href: '/lubricants/anglomoil'},
          {label: 'Blaster Products', href: '/lubricants/blaster-products'},
          {label: 'Castrol Performance Lubricants', href: '/lubricants/castrol-performance-lubricants'},
          {label: 'Imperial Oils & Chemicals', href: '/lubricants/imperial-oils-chemicals'},
          {label: 'Inox Lubricants', href: '/lubricants/inox-lubricants'},
          {label: 'Lubrication Engineers', href: '/lubricants/lubrication-engineers'},
        ],
      },
    ],
  },
  {
    label: 'LUBE SERVICES',
    href: '/lube-services',
    children: [
      {
        heading: 'Services',
        links: [
          {label: 'Lubrication Surveys', href: '/lube-services/lubrication-surveys'},
          {label: 'Oil Analysis', href: '/lube-services/oil-analysis'},
          {label: 'Lube Routes', href: '/lube-services/lube-routes'},
          {label: 'Case Studies', href: '/lube-services/case-studies'},
        ],
      },
    ],
  },
  {
    label: 'AUTO LUBE SYSTEMS',
    href: '/auto-lube-systems',
    children: [
      {
        heading: 'Single Point Lubricators',
        links: [
          {label: 'Grease Bomb 120', href: '/auto-lube-systems/grease-bomb-120-single-point-lubricator'},
          {label: 'Pulsarlube', href: '/auto-lube-systems/2225-2'},
          {label: 'Simalube', href: '/auto-lube-systems/simalube'},
          {label: 'Perma Lube', href: '/auto-lube-systems/perma-lube'},
          {label: 'Memolub HPS Lubricator', href: '/auto-lube-systems/memolub-lubricator'},
        ],
      },
      {
        heading: 'Systems & Monitoring',
        links: [
          {label: 'ILC Auto Lubrication Systems', href: '/auto-lube-systems/ilc-autolubrication-systems'},
          {label: 'Oil Rite Lubrication Systems', href: '/auto-lube-systems/oil-rite-lubrication-systems'},
          {label: 'Purgex Lube Systems', href: '/auto-lube-systems/oil-rite-lube-systems'},
          {label: 'Multi Line & Rotary Lube Pumps', href: '/auto-lube-systems/multi-line-and-rotary-lube-pumps'},
          {label: 'Grease Metering & Monitoring', href: '/auto-lube-systems/2486-2'},
        ],
      },
    ],
  },
  {
    label: 'MORE LUBRICATION',
    href: '/more-lubrication',
    children: [
      {
        heading: 'Additional Products',
        links: [
          {label: 'Oil Storage Systems', href: '/more-lubrication/oil-storage'},
          {label: 'Spill Containment', href: '/more-lubrication/spill-containment'},
          {label: 'Lube Cabinets', href: '/more-lubrication/lube-cabinets'},
          {label: 'Oil Sampling', href: '/more-lubrication/oil-sampling'},
          {label: 'Breathers & Air Vents', href: '/more-lubrication/breathers'},
          {label: 'Drum Handling', href: '/more-lubrication/drum-handling'},
          {label: 'Dispensing Meters', href: '/more-lubrication/dispensing-meters'},
        ],
      },
    ],
  },
  {label: 'CATALOGUE LIBRARY', href: '/catalogue'},
  {label: 'CONTACT', href: '/contact'},
]
