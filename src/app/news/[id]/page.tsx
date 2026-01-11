import { NewsDetail } from "@/components/news-detail";
import { CommentSection } from "@/components/comment-section";
import { NewsInteractions } from "@/components/news-interactions";

interface NewsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <NewsDetail newsId={id} />
          <div className="border-t border-border pt-8">
            <NewsInteractions newsId={id} />
          </div>
          <div className="border-t border-border pt-8">
            <CommentSection newsId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
