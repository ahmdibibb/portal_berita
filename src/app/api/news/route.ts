import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");

    // Build where clause
    const where: any = {
      status: "published",
    };

    if (category && category !== "all") {
      // Relasi to-one: gunakan 'is' untuk filter yang lebih kompatibel
      where.category = {
        is: {
          slug: category,
        },
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get news with relations using Prisma
    const news = await prisma.news.findMany({
      where,
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
            comments: true, // total comments (tanpa filter). Nanti kita timpa dengan approvedCount
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Ambil jumlah komentar APPROVED per berita via groupBy (satu query untuk semua id)
    const newsIds = news.map((n) => n.id);
    const approvedGroups = newsIds.length
      ? await prisma.comment.groupBy({
          by: ["newsId"],
          where: { newsId: { in: newsIds }, status: "approved" },
          _count: { _all: true },
        })
      : [];

    const approvedCountMap = new Map<number, number>();
    for (const g of approvedGroups) {
      approvedCountMap.set(g.newsId as number, g._count._all);
    }

    // Get total count for pagination
    const total = await prisma.news.count({ where });

    // Transform data to match expected format
    const transformedNews = news.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      image: item.image,
      views: item.views,
      published_at: item.publishedAt,
      category: item.category.name,
      category_slug: item.category.slug,
      author: item.author.name,
      likes: item._count.likes,
      comments: approvedCountMap.get(item.id) ?? 0,
    }));

    return NextResponse.json({
      data: transformedNews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Fetch news error:\n", error);
    const detail =
      process.env.NODE_ENV !== "production" && error
        ? String(error?.message || error)
        : undefined;
    return NextResponse.json(
      { error: "Gagal mengambil berita", detail },
      { status: 500 }
    );
  }
}
