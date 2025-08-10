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

    // Check if user already saved this news
    const existingSave = await prisma.savedNews.findUnique({
      where: {
        newsId_userId: {
          newsId: newsId,
          userId: auth.userId,
        },
      },
    });

    if (existingSave) {
      // Unsave: remove the saved news
      await prisma.savedNews.delete({
        where: {
          newsId_userId: {
            newsId: newsId,
            userId: auth.userId,
          },
        },
      });

      return NextResponse.json({
        saved: false,
        message: "Berita dihapus dari simpanan",
      });
    } else {
      // Save: add to saved news
      await prisma.savedNews.create({
        data: {
          newsId: newsId,
          userId: auth.userId,
        },
      });

      return NextResponse.json({ saved: true, message: "Berita disimpan" });
    }
  } catch (error) {
    console.error("Save/unsave error:", error);
    return NextResponse.json(
      { error: "Gagal memproses simpan" },
      { status: 500 }
    );
  }
}
