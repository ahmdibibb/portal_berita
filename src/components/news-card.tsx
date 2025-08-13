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
    <Card className="overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-200 rounded-xl h-full flex flex-col">
      <Link href={`/news/${news.id}`}>
        <div className="relative h-40">
          <Image
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            fill
            className="object-cover"
          />
          <Badge className="absolute top-2 left-2 bg-blue-600 text-white shadow-md text-xs px-2 py-1 rounded-md">
            {news.category}
          </Badge>
        </div>
      </Link>

      <CardContent className="p-4 flex-1">
        <Link href={`/news/${news.id}`}>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-primary transition-colors font-serif">
            {news.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {news.excerpt}
        </p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span className="line-clamp-1">
            {news.publishedAt} • {news.author}
          </span>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 bg-muted/50 flex items-center justify-between mt-auto">
        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Heart className="h-3 w-3 mr-1" />
            <span className="text-xs">{news.likes}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-3 w-3 mr-1" />
            <span className="text-xs">{news.comments}</span>
          </div>
        </div>
        <Link
          href={`/news/${news.id}`}
          className="text-primary hover:underline text-xs font-medium"
        >
          Baca →
        </Link>
      </CardFooter>
    </Card>
  );
}
