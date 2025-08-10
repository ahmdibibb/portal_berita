// app/api/admin/comments/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all comments with relations using Prisma
    const comments = await prisma.comment.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        news: {
          select: {
            title: true,
            slug: true,
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
      status: comment.status,
      created_at: comment.createdAt,
      user: {
        name: comment.user.name,
        email: comment.user.email,
      },
      news: {
        title: comment.news.title,
        slug: comment.news.slug,
      },
    }));

    return NextResponse.json(transformedComments);
  } catch (error) {
    console.error("Get comments error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil komentar" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { commentId } = await request.json();

    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID required" },
        { status: 400 }
      );
    }

    // Delete comment using Prisma
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return NextResponse.json({ message: "Komentar berhasil dihapus" });
  } catch (error) {
    console.error("Delete comment error:", error);
    return NextResponse.json(
      {
        error: "Gagal menghapus komentar",
        detail:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { commentId, status } = await request.json();

    if (!commentId || !status) {
      return NextResponse.json(
        { error: "Comment ID and status required" },
        { status: 400 }
      );
    }

    if (!["pending", "approved", "rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Update comment status using Prisma
    await prisma.comment.update({
      where: { id: commentId },
      data: { status },
    });

    return NextResponse.json({ message: "Status komentar berhasil diupdate" });
  } catch (error) {
    console.error("Update comment status error:", error);
    return NextResponse.json(
      {
        error: "Gagal mengupdate status komentar",
        detail:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
