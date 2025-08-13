import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        {
          user: {
            name: {
              contains: search,
            },
          },
        },
        {
          news: {
            title: {
              contains: search,
            },
          },
        },
      ];
    }

    // Get total count
    const total = await prisma.like.count({ where });

    // Get likes with relations
    const likes = await prisma.like.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        news: {
          select: {
            id: true,
            title: true,
            slug: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Transform data
    const transformedLikes = likes.map((like) => ({
      id: like.id,
      user: {
        name: like.user.name,
        email: like.user.email,
      },
      newsTitle: like.news.title,
      newsCategory: like.news.category.name,
      likedAt: like.createdAt.toISOString(),
      isActive: like.isActive,
    }));

    return NextResponse.json({
      data: transformedLikes,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("Get admin likes error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data likes" },
      { status: 500 }
    );
  }
}
