import { getHomePage } from '@/lib/cms'
import HeroSection from '@/components/HeroSection'
import FeatureBar from '@/components/FeatureBar'
import WelcomeSection from '@/components/WelcomeSection'
import SalesLinksSection from '@/components/SalesLinksSection'

export default async function HomePage() {
  const page = await getHomePage()

  const heroSlides  = page?.heroSlides   ?? []
  const featureItems = page?.featureItems ?? []
  const salesLinks = page?.salesLinks ?? []

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
      <SalesLinksSection
        title={page?.salesLinksTitle}
        subtitle={page?.salesLinksSubtitle}
        links={salesLinks}
      />
    </>
  )
}
