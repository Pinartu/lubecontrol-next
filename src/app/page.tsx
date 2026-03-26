import { getHomePage } from '@/lib/cms'
import HeroSection from '@/components/HeroSection'
import FeatureBar from '@/components/FeatureBar'
import WelcomeSection from '@/components/WelcomeSection'
import CategoryGrid from '@/components/CategoryGrid'

export default async function HomePage() {
  const page = await getHomePage()

  const heroSlides  = page?.heroSlides   ?? []
  const featureItems = page?.featureItems ?? []
  const solutionCards = page?.solutionCards ?? []

  return (
    <>
      <HeroSection slides={heroSlides} />
      <FeatureBar items={featureItems} />
      <WelcomeSection
        title={page?.welcomeTitle}
        body={page?.welcomeBody}
        ctaLabel={page?.welcomeCtaLabel}
        ctaHref={page?.welcomeCtaHref}
      />
      <CategoryGrid
        title={page?.solutionsTitle}
        subtitle={page?.solutionsSubtitle}
        cards={solutionCards}
      />
    </>
  )
}
