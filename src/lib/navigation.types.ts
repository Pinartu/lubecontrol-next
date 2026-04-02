export type NavLink = {
  label: string
  href: string
  children?: NavGroup[]
}

export type NavGroup = {
  heading: string
  links: NavLink[]
}

export type NavItem = {
  label: string
  href: string
  children?: NavGroup[]
}
