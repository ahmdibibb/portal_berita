import { NewsGrid } from "@/components/news-grid"
import { CategoryTabs } from "@/components/category-tabs"
import { HeroSection } from "@/components/hero-section"
import { PopularNews } from "@/components/popular-news"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Berita Terkini</h2>
        <CategoryTabs />
        <NewsGrid />
      </div>

      <div className="mt-12">
        <PopularNews />
      </div>
    </div>
  )
}
