// app/api/admin/news/likes/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const [rows] = await db.execute(
      `SELECT 
        n.id, 
        n.title, 
        COUNT(l.id) as likes
      FROM news n
      LEFT JOIN likes l ON n.id = l.news_id
      GROUP BY n.id
      ORDER BY likes DESC
      LIMIT 10`
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Get likes stats error:", error)
    return NextResponse.json({ error: "Gagal mengambil statistik likes" }, { status: 500 })
  }
}