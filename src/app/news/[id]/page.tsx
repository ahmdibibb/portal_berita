import { NewsDetail } from "@/components/news-detail"
import { CommentSection } from "@/components/comment-section"
import { RelatedNews } from "@/components/related-news"
import { NewsInteractions } from "@/components/news-interactions"

interface NewsPageProps {
  params: {
    id: string
  }
}

export default function NewsPage({ params }: NewsPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <NewsDetail newsId={params.id} />
          <NewsInteractions newsId={params.id} />
          <CommentSection newsId={params.id} />
        </div>
        <div className="lg:col-span-1">
          <RelatedNews newsId={params.id} />
        </div>
      </div>
    </div>
  )
}
