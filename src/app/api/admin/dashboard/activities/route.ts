// app/api/admin/dashboard/activities/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get recent activities using Prisma
    const [recentNews, recentUsers, recentComments] = await Promise.all([
      // Recent news
      prisma.news.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: { name: true },
          },
          category: {
            select: { name: true },
          },
        },
      }),

      // Recent users
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),

      // Recent comments
      prisma.comment.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true },
          },
          news: {
            select: { title: true },
          },
        },
      }),
    ]);

    // Transform activities
    const activities = [];

    // Add news activities
    recentNews.forEach((news) => {
      activities.push({
        type: "news",
        message: `Berita "${news.title}" ditambahkan oleh ${news.author.name}`,
        timestamp: news.createdAt,
      });
    });

    // Add user activities
    recentUsers.forEach((user) => {
      activities.push({
        type: "user",
        message: `Pengguna baru "${user.name}" (${user.email}) mendaftar`,
        timestamp: user.createdAt,
      });
    });

    // Add comment activities
    recentComments.forEach((comment) => {
      activities.push({
        type: "comment",
        message: `Komentar baru dari ${comment.user.name} pada berita "${comment.news.title}"`,
        timestamp: comment.createdAt,
      });
    });

    // Sort by timestamp and take latest 10
    activities.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    const recentActivities = activities.slice(0, 10);

    return NextResponse.json(recentActivities);
  } catch (error) {
    console.error("Get activities error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil aktivitas" },
      { status: 500 }
    );
  }
}
