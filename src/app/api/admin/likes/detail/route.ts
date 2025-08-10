// app/api/admin/likes/detail/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all likes with relations using Prisma
    const likes = await prisma.like.findMany({
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
    const transformedLikes = likes.map((like) => ({
      id: like.id,
      created_at: like.createdAt,
      user: {
        name: like.user.name,
        email: like.user.email,
      },
      news: {
        title: like.news.title,
        slug: like.news.slug,
      },
    }));

    return NextResponse.json(transformedLikes);
  } catch (error) {
    console.error("Get likes detail error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil detail likes" },
      { status: 500 }
    );
  }
}
