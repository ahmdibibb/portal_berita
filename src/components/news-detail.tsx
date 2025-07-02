"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Eye, User } from "lucide-react"
import type { News } from "@/lib/mock-data"

interface NewsDetailProps {
  newsId: string
}

export function NewsDetail({ newsId }: NewsDetailProps) {
  const [news, setNews] = useState<News | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/news/${newsId}`)
        if (response.ok) {
          const newsData = await response.json()
          setNews(newsData)
        }
      } catch (error) {
        console.error("Failed to fetch news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [newsId])

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
    )
  }

  if (!news) {
    return <div className="text-center py-8">Berita tidak ditemukan</div>
  }

  return (
    <article className="space-y-6">
      <header className="space-y-4">
        <Badge variant="secondary">{news.category}</Badge>
        <h1 className="text-3xl font-bold leading-tight">{news.title}</h1>

        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {news.author}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {news.publishedAt}
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {news.views} views
          </div>
        </div>
      </header>

      <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
        <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
      </div>

      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: news.content }} />
    </article>
  )
}
