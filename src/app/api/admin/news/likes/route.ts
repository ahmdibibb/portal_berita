// app/api/admin/news/likes/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all published news
    const allNews = await prisma.news.findMany({
      where: {
        status: "published",
      },
      select: {
        id: true,
        title: true,
      },
    });

    // Get like counts for each news
    const newsWithLikes = await Promise.all(
      allNews.map(async (news) => {
        const likeCount = await prisma.like.count({
          where: {
            newsId: news.id,
          },
        });
        return {
          id: news.id,
          title: news.title,
          likes: likeCount,
        };
      })
    );

    // Sort by likes count and take top 10
    const sortedNews = newsWithLikes
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 10);

    // Transform data for chart
    const chartData = sortedNews.map((news) => ({
      id: news.id,
      title:
        news.title.length > 30
          ? news.title.substring(0, 30) + "..."
          : news.title,
      likes: news.likes,
    }));

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Get likes error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data likes" },
      { status: 500 }
    );
  }
}
