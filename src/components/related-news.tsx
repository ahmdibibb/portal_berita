"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


interface RelatedNewsProps {
  newsId: string
}

type News = {
  id: string | number
  title: string
  image?: string
  category?: string
  publishedAt?: string
}

export function RelatedNews({ newsId }: RelatedNewsProps) {
  const [relatedNews, setRelatedNews] = useState<News[]>([])

  useEffect(() => {
    const fetchRelatedNews = async () => {
      try {
        const response = await fetch("/api/news")
        if (response.ok) {
          const allNews = await response.json()
          // Filter out current news and get random 3 articles
          const filtered = allNews.filter((news: News) => news.id.toString() !== newsId)
          const shuffled = filtered.sort(() => 0.5 - Math.random())
          setRelatedNews(shuffled.slice(0, 3))
        }
      } catch (error) {
        console.error("Failed to fetch related news:", error)
      }
    }

    fetchRelatedNews()
  }, [newsId])

  if (relatedNews.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Berita Terkait</h3>
      <div className="space-y-4">
        {relatedNews.map((news) => (
          <Card key={news.id} className="overflow-hidden">
            <Link href={`/news/${news.id}`}>
              <div className="flex">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                </div>
                <CardContent className="flex-1 p-3">
                  <Badge variant="secondary" className="text-xs mb-1">
                    {news.category}
                  </Badge>
                  <h4 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                    {news.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{news.publishedAt}</p>
                </CardContent>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
