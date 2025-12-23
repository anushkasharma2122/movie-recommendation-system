import { HeroSection } from "@/components/hero-section"
import { RecommendationDashboard } from "@/components/recommendation-dashboard"
import { HowItWorks } from "@/components/how-it-works"
import { TechStack } from "@/components/tech-stack"
import { Footer } from "@/components/footer"
import { ApiStatusBanner } from "@/components/api-status-banner"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <ApiStatusBanner />

      {/* Hero Section with gradient background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 gradient-animate" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />
        <HeroSection />
      </div>

      {/* Main Content */}
      <RecommendationDashboard />
      <HowItWorks />
      <TechStack />
      <Footer />
    </main>
  )
}
