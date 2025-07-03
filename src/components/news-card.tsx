import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Clock } from "lucide-react";

interface NewsCardProps {
  news: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    image: string;
    publishedAt: string;
    author: string;
    likes: number;
    comments: number;
  };
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-transform duration-200 rounded-2xl">
      <Link href={`/news/${news.id}`}>
        <div className="relative h-48">
          <Image
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-2 left-2 bg-blue-600 text-white shadow-md text-xs px-3 py-1 rounded-md">
            {news.category}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-5">
        <Link href={`/news/${news.id}`}>
          <h3 className="font-bold text-xl mb-2 line-clamp-2 hover:text-primary transition-colors font-serif">
            {news.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
          {news.excerpt}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {news.publishedAt} • {news.author}
        </div>
      </CardContent>

      <CardFooter className="px-5 py-3 bg-muted/50 flex items-center justify-between">
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
        <Link
          href={`/news/${news.id}`}
          className="text-primary hover:underline text-sm font-medium"
        >
          Baca →
        </Link>
      </CardFooter>
    </Card>
  );
}
