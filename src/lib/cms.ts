import { client } from './sanity'
import {
  siteSettingsQuery,
  mainNavQuery,
  footerQuery,
  homePageQuery,
  cataloguePageQuery,
  contactPageQuery,
  categoryPageByPathQuery,
  productsByCategoryQuery,
  allCategoryPathsQuery,
  subcategoriesByCategoryQuery,
} from './queries'

const revalidate = 60

export async function getSiteSettings() {
  return client.fetch(siteSettingsQuery, {}, { next: { revalidate, tags: ['siteSettings'] } })
}

export async function getMainNav() {
  return client.fetch(mainNavQuery, {}, { next: { revalidate, tags: ['mainNavigation'] } })
}

export async function getFooter() {
  return client.fetch(footerQuery, {}, { next: { revalidate, tags: ['footerContent'] } })
}

export async function getHomePage() {
  return client.fetch(homePageQuery, {}, { next: { revalidate, tags: ['homePage'] } })
}

export async function getCataloguePage() {
  return client.fetch(cataloguePageQuery, {}, { next: { revalidate, tags: ['cataloguePage'] } })
}

export async function getContactPage() {
  return client.fetch(contactPageQuery, {}, { next: { revalidate, tags: ['contactPage'] } })
}

export async function getCategoryPageByPath(path: string) {
  return client.fetch(categoryPageByPathQuery, { path }, { next: { revalidate, tags: ['categoryPage'] } })
}

export async function getProductsByCategory(catId: string) {
  return client.fetch(productsByCategoryQuery, { catId }, { next: { revalidate, tags: ['product'] } })
}

export async function getAllCategoryPaths(): Promise<Array<{ path: string }>> {
  return client.fetch(allCategoryPathsQuery, {}, { next: { revalidate } })
}

export async function getSubcategoriesByCategory(catId: string) {
  return client.fetch(subcategoriesByCategoryQuery, { catId }, { next: { revalidate, tags: ['productCategory'] } })
}
