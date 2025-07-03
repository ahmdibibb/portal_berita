import { NewsGrid } from "@/components/news-grid";
import { HeroSection } from "@/components/hero-section";
import { PopularNews } from "@/components/popular-news";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <HeroSection />

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Berita Terkini</h2>
          <div className="text-sm text-gray-500">Diperbarui setiap hari</div>
        </div>
        <NewsGrid />
      </div>

      <div className="mt-12">
        <PopularNews />
      </div>
    </div>
  );
}
