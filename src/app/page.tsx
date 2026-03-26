import HeroSection from '@/components/HeroSection'
import FeatureBar from '@/components/FeatureBar'
import CategoryGrid from '@/components/CategoryGrid'
import WelcomeSection from '@/components/WelcomeSection'
import {getHomePage} from '@/lib/cms'
import {urlFor} from '@/lib/sanity'

export default async function Home() {
  const hp = await getHomePage()

  type Slide = {
    heading?: string | null
    subheading?: string | null
    cta?: string | null
    ctaHref?: string | null
    backgroundImage?: {asset?: unknown} | null
  }
  const slides =
    hp?.heroSlides?.map((s: Slide) => ({
      heading: s.heading || '',
      subheading: s.subheading,
      cta: s.cta,
      ctaHref: s.ctaHref,
      backgroundImageUrl: s.backgroundImage?.asset ? urlFor(s.backgroundImage).width(1920).url() : null,
    })) || []

  type Feat = {icon?: string | null; text?: string | null; sub?: string | null}
  const featureItems =
    hp?.featureItems?.map((f: Feat) => ({
      icon: f.icon,
      text: f.text || '',
      sub: f.sub,
    })) || []

  type Card = {
    title?: string | null
    description?: string | null
    href?: string | null
    emoji?: string | null
    image?: {asset?: unknown} | null
  }
  const solutionCards =
    hp?.solutionCards?.map((c: Card) => ({
      title: c.title,
      description: c.description,
      href: c.href,
      emoji: c.emoji,
      image: c.image,
    })) || []

  return (
    <>
      <HeroSection slides={slides} />
      <FeatureBar items={featureItems} />
      <WelcomeSection
        title={hp?.welcomeTitle}
        body={hp?.welcomeBody as unknown[] | undefined}
        ctaLabel={hp?.welcomeCtaLabel}
        ctaHref={hp?.welcomeCtaHref}
      />
      <CategoryGrid title={hp?.solutionsTitle} subtitle={hp?.solutionsSubtitle} cards={solutionCards} />
    </>
  )
}
