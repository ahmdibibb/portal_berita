"use client"

import { useState, useEffect } from "react"
import { NewsCard } from "@/components/news-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface News {
  id: number
  title: string
  excerpt: string
  category: string
  image: string
  publishedAt: string
  author: string
  likes: number
  comments: number
}

export function NewsGrid() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Mock data - replace with actual API call
  const mockNews: News[] = [
    {
      id: 1,
      title: "Perkembangan Olahraga Nasional Mencapai Prestasi Gemilang",
      excerpt: "Tim nasional berhasil meraih medali emas dalam kompetisi internasional...",
      category: "Olahraga",
      image: "/placeholder.svg?height=200&width=300",
      publishedAt: "2024-01-15",
      author: "Jane Smith",
      likes: 45,
      comments: 12,
    },
    {
      id: 2,
      title: "Inovasi Otomotif Terbaru Menghadirkan Kendaraan Ramah Lingkungan",
      excerpt: "Industri otomotif meluncurkan teknologi baru yang lebih efisien...",
      category: "Otomotif",
      image: "/placeholder.svg?height=200&width=300",
      publishedAt: "2024-01-14",
      author: "Mike Johnson",
      likes: 32,
      comments: 8,
    },
    {
      id: 3,
      title: "Tips Kesehatan untuk Menjaga Imunitas di Musim Hujan",
      excerpt: "Para ahli kesehatan memberikan rekomendasi untuk menjaga kesehatan...",
      category: "Kesehatan",
      image: "/placeholder.svg?height=200&width=300",
      publishedAt: "2024-01-13",
      author: "Dr. Sarah Wilson",
      likes: 67,
      comments: 23,
    },
    {
      id: 4,
      title: "Kebijakan Politik Terbaru Mendapat Respons Positif Masyarakat",
      excerpt: "Pemerintah mengumumkan kebijakan baru yang diharapkan dapat...",
      category: "Politik",
      image: "/placeholder.svg?height=200&width=300",
      publishedAt: "2024-01-12",
      author: "Robert Brown",
      likes: 89,
      comments: 34,
    },
    {
      id: 5,
      title: "Revolusi Digital Mengubah Cara Kerja di Era Modern",
      excerpt: "Transformasi digital membawa perubahan signifikan dalam dunia kerja...",
      category: "Teknologi",
      image: "/placeholder.svg?height=200&width=300",
      publishedAt: "2024-01-11",
      author: "Lisa Chen",
      likes: 156,
      comments: 45,
    },
    {
      id: 6,
      title: "Ekonomi Nasional Menunjukkan Tren Positif di Kuartal Ini",
      excerpt: "Data ekonomi terbaru menunjukkan pertumbuhan yang menggembirakan...",
      category: "Ekonomi",
      image: "/placeholder.svg?height=200&width=300",
      publishedAt: "2024-01-10",
      author: "David Lee",
      likes: 78,
      comments: 19,
    },
  ]

  useEffect(() => {
    // Simulate API call
    const fetchNews = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setNews(mockNews)
      setLoading(false)
    }

    fetchNews()
  }, [])

  const loadMore = () => {
    setPage((prev) => prev + 1)
    // In real implementation, fetch more news based on page
  }

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
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <NewsCard key={article.id} news={article} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <Button onClick={loadMore} variant="outline">
            Muat Lebih Banyak
          </Button>
        </div>
      )}
    </div>
  )
}
