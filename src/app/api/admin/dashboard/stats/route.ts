// app/api/admin/dashboard/stats/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all stats in parallel
    const [newsCount] = await db.execute("SELECT COUNT(*) as total FROM news WHERE status = 'published'")
    const [usersCount] = await db.execute("SELECT COUNT(*) as total FROM users")
    const [viewsCount] = await db.execute("SELECT SUM(views) as total FROM news")
    const [commentsCount] = await db.execute("SELECT COUNT(*) as total FROM comments")

    return NextResponse.json({
      totalNews: (newsCount as any[])[0].total,
      totalUsers: (usersCount as any[])[0].total,
      totalViews: (viewsCount as any[])[0].total || 0,
      totalComments: (commentsCount as any[])[0].total,
    })
  } catch (error) {
    console.error("Get dashboard stats error:", error)
    return NextResponse.json({ error: "Gagal mengambil statistik dashboard" }, { status: 500 })
  }
}