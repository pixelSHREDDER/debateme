import FeaturesSection from '@/components/LandingPage/FeaturesSection/FeaturesSection'
import FooterSection from '@/components/LandingPage/FooterSection/FooterSection'
import HeroSection from '@/components/LandingPage/HeroSection/HeroSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeroSection />
      <FeaturesSection />
      <FooterSection />
    </main>
  )
}
