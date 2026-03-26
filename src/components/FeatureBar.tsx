import {Truck, Package, Mail, Phone, type LucideIcon} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  package: Package,
  mail: Mail,
  phone: Phone,
}

export type FeatureItem = {
  icon?: string | null
  text: string
  sub?: string | null
}

type Props = {
  items: FeatureItem[]
}

const defaultItems: FeatureItem[] = [
  {icon: 'truck', text: 'FAST DELIVERY WITHIN AUSTRALIA !'},
  {icon: 'package', text: 'AUSTRALIA-WIDE DELIVERY !'},
  {icon: 'mail', text: 'CONTACT US', sub: 'sales@lubecontrol.com.au | 1300 917 946'},
]

export default function FeatureBar({items}: Props) {
  const list = items.length ? items : defaultItems
  return (
    <div className="border-b border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {list.map(({icon, text, sub}, idx) => {
          const Icon = (icon && iconMap[icon]) || Package
          return (
            <div key={`feat-${idx}-${icon || 'default'}`} className="flex flex-col items-center space-y-2">
              <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
              <p className="font-heading font-bold text-secondary tracking-wide text-sm">{text}</p>
              {sub ? <p className="text-xs text-muted">{sub}</p> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
