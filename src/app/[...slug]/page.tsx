import {notFound} from 'next/navigation'
import Breadcrumb from '@/components/Breadcrumb'
import CategoryPage from '@/components/CategoryPage'
import {
  getNavigation,
  findNavItem,
  getBreadcrumbs,
  getAllNavPaths,
  normalizeSitePath,
} from '@/lib/navigation'
import {getCategoryPageByPath, getProductsByCategoryId, getSiteSettings} from '@/lib/cms'
import type {Metadata} from 'next'

type Props = {
  params: {slug: string[]}
}

export async function generateStaticParams() {
  const navigation = await getNavigation()
  const paths = getAllNavPaths(navigation)
  return paths.map((slug) => ({slug}))
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const navigation = await getNavigation()
  const href = '/' + params.slug.join('/')
  const item = findNavItem(href, navigation)
  const path = normalizeSitePath(href)
  const cat = await getCategoryPageByPath(path)
  const titleBase = cat?.seoTitle || cat?.title || item?.label || params.slug[params.slug.length - 1].replace(/-/g, ' ')
  return {
    title: `${titleBase} | Lube Control`,
    description:
      cat?.seoDescription ||
      `Browse ${titleBase} products and solutions by Lube Control Australia.`,
  }
}

export default async function SlugPage({params}: Props) {
  const href = '/' + params.slug.join('/')
  const navigation = await getNavigation()
  const item = findNavItem(href, navigation)

  if (!item) return notFound()

  const crumbs = getBreadcrumbs(href, navigation)
  const path = normalizeSitePath(href)
  const [categoryContent, siteSettings] = await Promise.all([
    getCategoryPageByPath(path),
    getSiteSettings(),
  ])

  const categoryId = categoryContent?.productCategory?._id
  const products = categoryId ? await getProductsByCategoryId(categoryId) : []

  const siteCta = siteSettings
    ? {
        categoryCtaTitle: siteSettings.categoryCtaTitle,
        categoryCtaSubtitle: siteSettings.categoryCtaSubtitle,
        categoryCtaPrimaryLabel: siteSettings.categoryCtaPrimaryLabel,
        categoryCtaPrimaryHref: siteSettings.categoryCtaPrimaryHref,
        categoryCtaSecondaryLabel: siteSettings.categoryCtaSecondaryLabel,
        categoryCtaSecondaryHref: siteSettings.categoryCtaSecondaryHref,
      }
    : null

  return (
    <>
      <Breadcrumb crumbs={crumbs} />
      <CategoryPage
        item={item}
        categoryContent={categoryContent}
        products={products || []}
        siteCta={siteCta}
      />
    </>
  )
}
