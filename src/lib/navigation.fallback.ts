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
            label: 'Manual Grease Monitoring - Lube Right',
            href: '/fluid-handling/grease-transfer-equipment/manual-grease-monitoring-lube-right',
          },
          {
            label: 'Electric Grease Pump 16kg 20kg 55kg and 180kg',
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
          {label: 'Fuel Storage and Dispensing Kits', href: '/fluid-handling/fuel-handling-equipment/fuel-storage'},
          {
            label: 'Fuel Pumps',
            href: '/fluid-handling/fuel-handling-equipment/fuel-pumps',
            children: [
              {
                heading: 'Fuel Pump Types',
                links: [
                  {
                    label: 'Fuel Pumps - Air Operated',
                    href: '/fluid-handling/fuel-handling-equipment/fuel-pumps/fuel-transfer-pumps-refuelling-kits',
                  },
                  {
                    label: 'Fuel Pumps - Manual',
                    href: '/fluid-handling/fuel-handling-equipment/fuel-pumps/manual-fuel-pumps',
                  },
                  {
                    label: 'Fuel Pumps - Electric',
                    href: '/fluid-handling/fuel-handling-equipment/fuel-pumps/fuel-pumps-electric',
                  },
                ],
              },
            ],
          },
          {
            label: 'Mobile And Stationary Fuel Dispensers',
            href: '/fluid-handling/fuel-handling-equipment/mobile-and-stationary-fuel-dispensers',
          },
          {label: 'Waste Oil', href: '/fluid-handling/waste-oil'},
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
    href: '/services',
    children: [
      {
        heading: 'Services',
        links: [
          {label: 'Lubrication Surveys', href: '/services/lubrication-surveys'},
          {label: 'Oil Analysis', href: '/services/oil-analysis'},
          {label: 'Lube Routes', href: '/services/lube-routes'},
          {label: 'Case Studies', href: '/services/case-studies'},
        ],
      },
    ],
  },
  {
    label: 'AUTO LUBE SYSTEMS',
    href: '/auto-lube-systems',
    children: [
      {
        heading: 'Single point & specialty',
        links: [
          {label: 'Simalube', href: '/auto-lube-systems/simalube'},
          {label: 'Pulsarlube', href: '/auto-lube-systems/2225-2'},
          {label: 'Perma Lube', href: '/auto-lube-systems/perma-lube'},
          {label: 'Grease Bomb 120 Single Point Lubricator', href: '/auto-lube-systems/grease-bomb-120-single-point-lubricator'},
          {label: 'Memolub HPS Lubricator', href: '/auto-lube-systems/memolub-lubricator'},
        ],
      },
      {
        heading: 'Systems & monitoring',
        links: [
          {label: 'Oil Rite Lubrication Systems', href: '/auto-lube-systems/oil-rite-lubrication-systems'},
          {label: 'Purgex Lube Systems', href: '/auto-lube-systems/oil-rite-lube-systems'},
          {label: 'ILC Auto Lubrication Systems', href: '/auto-lube-systems/ilc-autolubrication-systems'},
          {label: 'Multi Line and Rotary Lube Pumps', href: '/auto-lube-systems/multi-line-and-rotary-lube-pumps'},
          {label: 'Grease Metering and Grease Monitoring', href: '/auto-lube-systems/2486-2'},
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
          {label: 'Lubrication Storage', href: '/more-lubrication/lubrication-storage'},
          {label: 'Oil Sampling', href: '/more-lubrication/oil-sampling'},
          {label: 'Remote Grease Lines and Fittings', href: '/more-lubrication/remote-greasing-equipment'},
          {label: 'Breathers', href: '/more-lubrication/breathers'},
          {label: 'Liquid Level Gauges', href: '/more-lubrication/liquid-level-gauges'},
          {label: 'Vent Plugs', href: '/more-lubrication/vent-plugs'},
          {label: 'Constant Level Oilers', href: '/more-lubrication/constant-level-oilers'},
          {label: 'Oil Spill Containment', href: '/more-lubrication/oil-spill-containment'},
          {label: 'Vibration Greasing Device', href: '/more-lubrication/vibration-greasing-device'},
          {label: 'Filter Carts', href: '/more-lubrication/filter-carts'},
        ],
      },
    ],
  },
  {label: 'CATALOGUE LIBRARY', href: '/catalogue-library'},
  {label: 'CONTACT', href: '/make-an-enquiry'},
]
