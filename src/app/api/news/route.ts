import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search")

    let query = `
      SELECT 
        n.id, n.title, n.slug, n.excerpt, n.image, n.views, n.published_at,
        c.name as category, c.slug as category_slug,
        u.name as author,
        (SELECT COUNT(*) FROM likes WHERE news_id = n.id) as likes,
        (SELECT COUNT(*) FROM comments WHERE news_id = n.id AND status = 'approved') as comments
      FROM news n
      LEFT JOIN categories c ON n.category_id = c.id
      LEFT JOIN users u ON n.author_id = u.id
      WHERE n.status = 'published'
    `

    const params: any[] = []

    if (category && category !== "all") {
      query += " AND c.slug = ?"
      params.push(category)
    }

    if (search) {
      query += " AND (n.title LIKE ? OR n.excerpt LIKE ?)"
      params.push(`%${search}%`, `%${search}%`)
    }

    query += " ORDER BY n.published_at DESC"

    // Add pagination
    const offset = (page - 1) * limit
    query += " LIMIT ? OFFSET ?"
    params.push(limit, offset)

    const [rows] = await db.execute(query, params)

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM news n
      LEFT JOIN categories c ON n.category_id = c.id
      WHERE n.status = 'published'
    `

    const countParams: any[] = []

    if (category && category !== "all") {
      countQuery += " AND c.slug = ?"
      countParams.push(category)
    }

    if (search) {
      countQuery += " AND (n.title LIKE ? OR n.excerpt LIKE ?)"
      countParams.push(`%${search}%`, `%${search}%`)
    }

    const [countRows] = await db.execute(countQuery, countParams)
    const total = (countRows as any[])[0].total

    return NextResponse.json({
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Fetch news error:", error)
    return NextResponse.json({ error: "Gagal mengambil berita" }, { status: 500 })
  }
}
