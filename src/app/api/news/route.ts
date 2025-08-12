import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface WhereClause {
  status: string;
  category?: {
    is: {
      slug: string;
    };
  };
  OR?: Array<{
    title?: { contains: string };
    excerpt?: { contains: string };
    content?: { contains: string };
  }>;
}

interface OrderByClause {
  publishedAt?: "asc" | "desc";
  views?: "asc" | "desc";
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "relevance";

    console.log("🔍 API News: Request parameters:", {
      category,
      page,
      limit,
      search,
      sort,
    });

    // Build where clause
    const where: WhereClause = {
      status: "published",
    };

    if (category && category !== "all") {
      where.category = {
        is: {
          slug: category,
        },
      };
    }

    if (search) {
      // Simple search without mode parameter for better compatibility
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
      ];
      console.log("🔍 API News: Search query added:", {
        search,
        whereClause: where.OR,
      });
    }

    console.log("🔍 API News: Final where clause:", where);

    // Build orderBy clause based on sort parameter
    let orderBy: OrderByClause = {};
    switch (sort) {
      case "newest":
        orderBy = { publishedAt: "desc" };
        break;
      case "oldest":
        orderBy = { publishedAt: "asc" };
        break;
      case "popular":
        orderBy = { views: "desc" };
        break;
      case "relevance":
      default:
        if (search) {
          // For search results, prioritize title matches first, then by date
          orderBy = { publishedAt: "desc" };
        } else {
          orderBy = { publishedAt: "desc" };
        }
        break;
    }

    // Get total count for pagination
    const total = await prisma.news.count({ where });

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
            comments: true,
          },
        },
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    // Transform data to match expected format for SearchResults component
    const transformedNews = news.map((item) => ({
      id: item.id,
      title: item.title,
      excerpt: item.excerpt,
      slug: item.slug,
      image: item.image,
      publishedAt: item.publishedAt.toISOString(),
      views: item.views || 0,
      category: {
        name: item.category.name,
        slug: item.category.slug,
      },
      author: {
        name: item.author.name,
      },
      _count: {
        likes: item._count.likes || 0,
        comments: item._count.comments || 0,
      },
    }));

    return NextResponse.json({
      data: transformedNews,
      total,
      page,
      limit,
    });
  } catch (error: unknown) {
    console.error("Fetch news error:", error);
    const detail =
      process.env.NODE_ENV !== "production" && error
        ? String(error instanceof Error ? error.message : error)
        : undefined;
    return NextResponse.json(
      { error: "Gagal mengambil berita", detail },
      { status: 500 }
    );
  }
}
