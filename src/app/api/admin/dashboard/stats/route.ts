// app/api/admin/dashboard/stats/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all stats using Prisma
    const [newsCount, usersCount, viewsCount, commentsCount] =
      await Promise.all([
        prisma.news.count({
          where: { status: "published" },
        }),
        prisma.user.count(),
        prisma.news.aggregate({
          _sum: {
            views: true,
          },
        }),
        prisma.comment.count(),
      ]);

    return NextResponse.json({
      totalNews: newsCount,
      totalUsers: usersCount,
      totalViews: viewsCount._sum.views || 0,
      totalComments: commentsCount,
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil statistik dashboard" },
      { status: 500 }
    );
  }
}
