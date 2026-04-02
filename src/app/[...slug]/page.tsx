import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getCategoryPageByPath,
  getAllCategoryPaths,
  getMainNav,
  getProductsByCategory,
  getSubcategoriesByCategory,
  getSiteSettings,
} from '@/lib/cms'
import { categoryPageDocumentTitle } from '@/lib/metadataTitle'
import { mapNavItems, getBreadcrumbs } from '@/lib/navigation'
import Breadcrumb from '@/components/Breadcrumb'
import CategoryPageComponent from '@/components/CategoryPage'

interface Props {
  params: Promise<{ slug: string[] }>
}

export async function generateStaticParams() {
  const paths = await getAllCategoryPaths()
  return paths.map(({ path }) => ({
    slug: path.replace(/^\//, '').split('/').filter(Boolean),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const path = '/' + slug.join('/')
  const page = await getCategoryPageByPath(path)
  const fallback = slug[slug.length - 1]?.replace(/-/g, ' ') || path

  return {
    title: categoryPageDocumentTitle(page?.seoTitle, page?.title, fallback),
    description: page?.seoDescription ?? undefined,
  }
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  const path = '/' + slug.join('/')

  const [page, settings, nav] = await Promise.all([
    getCategoryPageByPath(path),
    getSiteSettings(),
    getMainNav(),
  ])

  if (!page) notFound()

  const products = page.productCategory?._id
    ? await getProductsByCategory(page.productCategory._id)
    : []

  const subcategories = page.productCategory?._id
    ? await getSubcategoriesByCategory(page.productCategory._id)
    : []

  const navItems = mapNavItems(nav)
  const breadcrumbs = getBreadcrumbs(navItems, path)
  const pageTitle = slug[slug.length - 1]?.replace(/-/g, ' ') ?? path

  return (
    <div>
      <Breadcrumb items={breadcrumbs} />
      <CategoryPageComponent
        page={page}
        products={products}
        subcategories={subcategories}
        settings={settings}
        pageTitle={pageTitle}
      />
    </div>
  )
}
