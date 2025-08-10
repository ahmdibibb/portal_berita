import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ newsId: string }> }
) {
  try {
    const { newsId: newsIdParam } = await params;
    const newsId = parseInt(newsIdParam);

    // Get comments using Prisma
    const comments = await prisma.comment.findMany({
      where: {
        newsId,
        status: "approved",
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform data to match expected format
    const transformedComments = comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      user: {
        name: comment.user.name,
        avatar: comment.user.avatar,
      },
    }));

    return NextResponse.json(transformedComments);
  } catch (error) {
    console.error("Fetch comments error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil komentar" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ newsId: string }> }
) {
  try {
    const auth = requireAuth(request);

    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newsId: newsIdParam } = await params;
    const newsId = parseInt(newsIdParam);
    const { content } = await request.json();

    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Komentar tidak boleh kosong" },
        { status: 400 }
      );
    }

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

    // Create comment using Prisma
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        newsId,
        userId: auth.userId,
        status: "pending", // Default to pending for moderation
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });

    // Transform data to match expected format
    const transformedComment = {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      user: {
        name: comment.user.name,
        avatar: comment.user.avatar,
      },
    };

    return NextResponse.json(transformedComment, { status: 201 });
  } catch (error) {
    console.error("Create comment error:", error);
    return NextResponse.json(
      { error: "Gagal membuat komentar" },
      { status: 500 }
    );
  }
}
