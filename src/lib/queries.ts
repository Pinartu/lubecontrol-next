import {defineQuery} from 'next-sanity'

export const siteSettingsQuery = defineQuery(`*[_id == "siteSettings"][0]{
  title,
  description,
  logo,
  ogImage,
  phones,
  emails,
  contactEmail,
  contactPhone,
  address,
  searchPlaceholder,
  socialLinks,
  categoryCtaTitle,
  categoryCtaSubtitle,
  categoryCtaPrimaryLabel,
  categoryCtaPrimaryHref,
  categoryCtaSecondaryLabel,
  categoryCtaSecondaryHref
}`)

export const mainNavigationQuery = defineQuery(`*[_id == "mainNavigation"][0]{
  items[]{
    label,
    href,
    columns[]{
      heading,
      links[]{
        label,
        href,
        subGroups[]{
          heading,
          links[]{ label, href }
        }
      }
    }
  }
}`)

export const homePageQuery = defineQuery(`*[_id == "homePage"][0]{
  heroSlides[]{ heading, subheading, cta, ctaHref, backgroundImage },
  featureItems[]{ icon, text, sub },
  welcomeTitle,
  welcomeBody,
  welcomeCtaLabel,
  welcomeCtaHref,
  solutionsTitle,
  solutionsSubtitle,
  solutionCards[]{ title, description, href, emoji, image }
}`)

export const footerContentQuery = defineQuery(`*[_id == "footerContent"][0]{
  columns[]{ title, body, links[]{ label, href } },
  copyrightCompany
}`)

export const cataloguePageQuery = defineQuery(`*[_id == "cataloguePage"][0]{
  title,
  intro,
  items[]{ title, description, externalUrl, "fileUrl": file.asset->url },
  bottomTitle,
  bottomText,
  bottomButtonLabel,
  bottomButtonHref
}`)

export const contactPageQuery = defineQuery(`*[_id == "contactPage"][0]{
  title,
  intro,
  useSiteSettingsContact,
  locationLabel,
  locationText,
  hours,
  formSectionTitle,
  fieldFirstName,
  fieldLastName,
  fieldEmail,
  fieldPhone,
  fieldMessage,
  submitLabel
}`)

export const categoryPageByPathQuery = defineQuery(`
  *[_type == "categoryPage" && path == $path][0]{
    path,
    title,
    seoTitle,
    seoDescription,
    intro,
    productCategory->{ _id, title, slug },
    ctaTitle,
    ctaSubtitle,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref
  }
`)

export const productsByCategoryQuery = defineQuery(`
  *[_type == "product" && category._ref == $categoryId] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    images,
    description,
    features
  }
`)
