import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const newsId = parseInt(id);
    const auth = requireAuth(request);

    // Get news with relations using Prisma
    const news = await prisma.news.findUnique({
      where: {
        id: newsId,
        status: "published",
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
        author: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!news) {
      return NextResponse.json(
        { error: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    // Approved comments count
    const approvedCount = await prisma.comment.count({
      where: { newsId, status: "approved" },
    });

    // Increment view count
    await prisma.news.update({
      where: { id: newsId },
      data: { views: { increment: 1 } },
    });

    // Check if user has liked this news
    let userLiked = false;
    let userSaved = false;

    if (auth) {
      const [like, saved] = await Promise.all([
        prisma.like.findUnique({
          where: {
            newsId_userId: {
              newsId: newsId,
              userId: auth.userId,
            },
          },
        }),
        prisma.savedNews.findUnique({
          where: {
            newsId_userId: {
              newsId: newsId,
              userId: auth.userId,
            },
          },
        }),
      ]);

      userLiked = !!like;
      userSaved = !!saved;
    }

    // Transform data to match expected format
    const transformedNews = {
      id: news.id,
      title: news.title,
      slug: news.slug,
      excerpt: news.excerpt,
      content: news.content,
      image: news.image,
      views: news.views + 1, // Include the increment
      publishedAt: news.publishedAt,
      category: news.category.name,
      category_slug: news.category.slug,
      author: news.author.name,
      likes: news._count.likes,
      comments: approvedCount,
      userLiked,
      userSaved,
    };

    return NextResponse.json(transformedNews);
  } catch (error) {
    console.error("Fetch news detail error:\n", error);
    return NextResponse.json(
      { error: "Gagal mengambil detail berita" },
      { status: 500 }
    );
  }
}
