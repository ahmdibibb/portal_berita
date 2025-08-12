"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Eye, User } from "lucide-react";

interface NewsDetailProps {
  newsId: string;
}

type News = {
  image: string;
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  views?: number;
};

export function NewsDetail({ newsId }: NewsDetailProps) {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news/${newsId}`);
        if (response.ok) {
          const newsData = await response.json();
          setNews(newsData);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [newsId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  if (!news) {
    return <div className="text-center py-8">Berita tidak ditemukan</div>;
  }

  return (
    <article className="space-y-8">
      <header className="space-y-6">
        <Badge variant="secondary" className="text-sm px-3 py-1">
          {news.category}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          {news.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border pb-6">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            <span className="font-medium">{news.author}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{news.publishedAt}</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            <span>{news.views || 0} views</span>
          </div>
        </div>
      </header>

      <div className="relative h-80 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
        <Image
          src={news.image || "/placeholder.svg"}
          alt={news.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div
        className="prose prose-lg max-w-none news-content"
        dangerouslySetInnerHTML={{ __html: news.content }}
        style={{
          lineHeight: "1.8",
          textAlign: "left",
        }}
      />
    </article>
  );
}
