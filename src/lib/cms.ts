import {client} from '@/lib/sanity'
import {
  cataloguePageQuery,
  categoryPageByPathQuery,
  contactPageQuery,
  footerContentQuery,
  homePageQuery,
  productsByCategoryQuery,
  siteSettingsQuery,
} from '@/lib/queries'

const opts = {next: {tags: ['sanity'] as string[], revalidate: 60}}

export async function getSiteSettings() {
  return client.fetch(siteSettingsQuery, {}, opts)
}

export async function getHomePage() {
  return client.fetch(homePageQuery, {}, opts)
}

export async function getFooterContent() {
  return client.fetch(footerContentQuery, {}, opts)
}

export async function getCataloguePage() {
  return client.fetch(cataloguePageQuery, {}, opts)
}

export async function getContactPage() {
  return client.fetch(contactPageQuery, {}, opts)
}

export async function getCategoryPageByPath(path: string) {
  return client.fetch(categoryPageByPathQuery, {path}, opts)
}

export async function getProductsByCategoryId(categoryId: string) {
  return client.fetch(productsByCategoryQuery, {categoryId}, opts)
}
