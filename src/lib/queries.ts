// Singleton document queries
export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]`
export const mainNavQuery      = `*[_type == "mainNavigation" && _id == "mainNavigation"][0]`
export const footerQuery       = `*[_type == "footerContent" && _id == "footerContent"][0]`
export const homePageQuery     = `*[_type == "homePage" && _id == "homePage"][0]`
export const cataloguePageQuery = `*[_type == "cataloguePage" && _id == "cataloguePage"][0]{
  title,
  intro,
  items[]{
    _key,
    title,
    description,
    externalUrl,
    file{
      asset->{
        url
      }
    }
  },
  bottomTitle,
  bottomText,
  bottomButtonLabel,
  bottomButtonHref
}`
export const contactPageQuery   = `*[_type == "contactPage" && _id == "contactPage"][0]`
export const resourcesPageQuery = `*[_type == "resourcesPage" && _id == "resourcesPage"][0]{
  title,
  intro,
  sections[]{
    _key,
    sectionTitle,
    sectionDescription,
    downloads[]{
      _key,
      title,
      description,
      externalUrl,
      file{
        asset->{
          url
        }
      }
    }
  }
}`

// Dynamic content queries
export const categoryPageByPathQuery = `*[_type == "categoryPage" && path == $path][0]{
  ...,
  productCategory->{
    _id, title, slug, description, image
  },
  pdfDownloads[]{
    _key,
    title,
    externalUrl,
    file{
      asset->{
        url
      }
    },
    thumbnail{
      asset->{
        url
      }
    }
  }
}`

export const productsByCategoryQuery = `*[_type == "product" && category._ref == $catId]{
  _id,
  title,
  "slug": slug.current,
  description,
  image
}`

export const allCategoryPathsQuery = `*[_type == "categoryPage"]{path}`

export const subcategoriesByCategoryQuery = `*[_type == "productCategory" && parent._ref == $catId]{
  _id,
  title,
  "slug": slug.current,
  description,
  image,
  routePath
}`
