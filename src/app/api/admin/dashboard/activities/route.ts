// app/api/admin/dashboard/activities/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get recent news activities
    const [newsActivities] = await db.execute(
      `SELECT 
        'news' as type,
        CONCAT('Berita baru dipublikasi: ', title) as message,
        published_at as timestamp
      FROM news
      WHERE status = 'published'
      ORDER BY published_at DESC
      LIMIT 3`
    )

    // Get recent user activities
    const [userActivities] = await db.execute(
      `SELECT 
        'user' as type,
        CONCAT('Pengguna baru mendaftar: ', name) as message,
        created_at as timestamp
      FROM users
      ORDER BY created_at DESC
      LIMIT 3`
    )

    // Get recent comment activities
    const [commentActivities] = await db.execute(
      `SELECT 
        'comment' as type,
        CONCAT('Komentar baru ditambahkan oleh ', u.name) as message,
        c.created_at as timestamp
      FROM comments c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
      LIMIT 3`
    )

    // Combine and sort all activities
    const allActivities = [
      ...(newsActivities as any[]),
      ...(userActivities as any[]),
      ...(commentActivities as any[]),
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5) // Get top 5 most recent

    return NextResponse.json(allActivities)
  } catch (error) {
    console.error("Get dashboard activities error:", error)
    return NextResponse.json({ error: "Gagal mengambil aktivitas dashboard" }, { status: 500 })
  }
}