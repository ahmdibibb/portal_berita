import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = requireAuth(request);

    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const newsId = parseInt(id);

    // Check if news exists and is published
    const news = await prisma.news.findUnique({
      where: {
        id: newsId,
        status: "published",
      },
    });

    if (!news) {
      return NextResponse.json(
        { error: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    // Check if user already liked this news
    const existingLike = await prisma.like.findUnique({
      where: {
        newsId_userId: {
          newsId: newsId,
          userId: auth.userId,
        },
      },
    });

    if (existingLike) {
      // Unlike: remove the like
      await prisma.like.delete({
        where: {
          newsId_userId: {
            newsId: newsId,
            userId: auth.userId,
          },
        },
      });

      return NextResponse.json({
        liked: false,
        message: "Berita tidak disukai lagi",
      });
    } else {
      // Like: add the like
      await prisma.like.create({
        data: {
          newsId: newsId,
          userId: auth.userId,
        },
      });

      return NextResponse.json({ liked: true, message: "Berita disukai" });
    }
  } catch (error) {
    console.error("Like/unlike error:", error);
    return NextResponse.json(
      { error: "Gagal memproses like" },
      { status: 500 }
    );
  }
}
