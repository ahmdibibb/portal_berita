"use client";

import { useState, useEffect } from "react";
import { NewsCard } from "@/components/news-card";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string | null;
  published_at: string | null;
  author: string;
  likes: number;
  comments: number;
}

export function PopularNews() {
  const [popularNews, setPopularNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularNews = async () => {
      try {
        // Ambil banyak data lalu sort di client; bisa dioptimalkan dengan endpoint khusus jika diperlukan
        const response = await fetch("/api/news?limit=50");
        if (response.ok) {
          const payload = await response.json();
          const allNews: NewsItem[] = payload?.data ?? [];
          const sorted = [...allNews].sort(
            (a, b) => (b.likes ?? 0) - (a.likes ?? 0)
          );
          setPopularNews(sorted.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch popular news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularNews();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">Berita Populer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Berita Populer</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularNews.map((news) => (
          <NewsCard
            key={news.id}
            news={{
              id: news.id,
              title: news.title,
              excerpt: news.excerpt,
              category: news.category,
              image: news.image ?? "/placeholder.svg",
              publishedAt: news.published_at ?? "",
              author: news.author,
              likes: news.likes ?? 0,
              comments: news.comments ?? 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
