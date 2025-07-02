import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Clock } from "lucide-react"

interface NewsCardProps {
  news: {
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
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/news/${news.id}`}>
        <div className="relative h-48">
          <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
          <Badge className="absolute top-2 left-2" variant="secondary">
            {news.category}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/news/${news.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors">{news.title}</h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-3">{news.excerpt}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {news.publishedAt} • {news.author}
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 bg-muted/50 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Heart className="h-4 w-4 mr-1" />
            {news.likes}
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-1" />
            {news.comments}
          </div>
        </div>
        <Link href={`/news/${news.id}`} className="text-primary hover:underline text-sm font-medium">
          Baca →
        </Link>
      </CardFooter>
    </Card>
  )
}
