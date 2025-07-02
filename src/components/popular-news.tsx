"use client"

import { useState, useEffect } from "react"
import { NewsCard } from "@/components/news-card"
import { Skeleton } from "@/components/ui/skeleton"
import type { News } from "@/lib/mock-data"

export function PopularNews() {
  const [popularNews, setPopularNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularNews = async () => {
      try {
        const response = await fetch("/api/news")
        if (response.ok) {
          const allNews = await response.json()
          // Sort by likes and get top 3
          const sorted = allNews.sort((a: News, b: News) => b.likes - a.likes)
          setPopularNews(sorted.slice(0, 3))
        }
      } catch (error) {
        console.error("Failed to fetch popular news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularNews()
  }, [])

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
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Berita Populer</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  )
}
