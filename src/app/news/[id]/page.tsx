import { NewsDetail } from "@/components/news-detail";
import { CommentSection } from "@/components/comment-section";
import { RelatedNews } from "@/components/related-news";
import { NewsInteractions } from "@/components/news-interactions";

interface NewsPageProps {
  params: {
    id: string;
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <NewsDetail newsId={id} />
          <NewsInteractions newsId={id} />
          <CommentSection newsId={id} />
        </div>
        <div className="lg:col-span-1">
          <RelatedNews newsId={id} />
        </div>
      </div>
    </div>
  );
}
