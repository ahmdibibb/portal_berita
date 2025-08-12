"use client";

import { useState, useEffect } from "react";
import { NewsCard } from "@/components/news-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface News {
  id: number;
  title: string;
  excerpt: string;
  category: {
    name: string;
    slug: string;
  };
  image: string | null;
  publishedAt: string;
  author: {
    name: string;
  };
  _count?: {
    likes: number;
    comments: number;
  };
}

interface NewsGridProps {
  category?: string;
}

export function NewsGrid({ category }: NewsGridProps) {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const limit = 9;

  const fetchNews = async (pageToLoad: number) => {
    try {
      if (pageToLoad === 1) setLoading(true);
      else setIsLoadingMore(true);

      const params = new URLSearchParams({
        page: pageToLoad.toString(),
        limit: limit.toString(),
      });

      if (category) {
        params.append("category", category);
      }

      const res = await fetch(`/api/news?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch news");
      const json = await res.json();
      const items = (json?.data ?? []) as News[];

      // Data sudah dalam format yang benar dari API, tidak perlu mapping
      setNews((prev) => (pageToLoad === 1 ? items : [...prev, ...items]));

      const total = json?.total ?? 0;
      const totalPages = Math.ceil(total / limit);
      setHasMore(pageToLoad < totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchNews(1);
  }, [category]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchNews(next);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <NewsCard
            key={article.id}
            news={{
              id: article.id,
              title: article.title,
              excerpt: article.excerpt,
              category: article.category.name, // Extract name from category object
              image: article.image ?? "/placeholder.svg",
              publishedAt: article.publishedAt,
              author: article.author.name, // Extract name from author object
              likes: article._count?.likes ?? 0,
              comments: article._count?.comments ?? 0,
            }}
          />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <Button onClick={loadMore} variant="outline" disabled={isLoadingMore}>
            {isLoadingMore ? "Memuat..." : "Muat Lebih Banyak"}
          </Button>
        </div>
      )}
    </div>
  );
}
