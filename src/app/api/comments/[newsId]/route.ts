import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { newsId: string } }) {
  try {
    const newsId = Number.parseInt(params.newsId)

    if (isNaN(newsId)) {
      return NextResponse.json({ error: "ID berita tidak valid" }, { status: 400 })
    }

    const [rows] = await db.execute(
      `
      SELECT 
        c.id, c.content, c.created_at, c.parent_id,
        u.name as user_name, u.id as user_id
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.news_id = ? AND c.status = 'approved'
      ORDER BY c.created_at DESC
    `,
      [newsId],
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Fetch comments error:", error)
    return NextResponse.json({ error: "Gagal mengambil komentar" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { newsId: string } }) {
  try {
    const auth = requireAuth(request)

    if (!auth) {
      return NextResponse.json({ error: "Harus login untuk berkomentar" }, { status: 401 })
    }

    const newsId = Number.parseInt(params.newsId)
    const { content, parentId } = await request.json()

    if (isNaN(newsId)) {
      return NextResponse.json({ error: "ID berita tidak valid" }, { status: 400 })
    }

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: "Komentar tidak boleh kosong" }, { status: 400 })
    }

    // Check if news exists
    const [newsRows] = await db.execute("SELECT id FROM news WHERE id = ? AND status = 'published'", [newsId])

    if ((newsRows as any[]).length === 0) {
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 })
    }

    // Insert comment
    const [result] = await db.execute(
      "INSERT INTO comments (news_id, user_id, content, parent_id) VALUES (?, ?, ?, ?)",
      [newsId, auth.userId, content.trim(), parentId || null],
    )

    // Get the created comment with user info
    const [commentRows] = await db.execute(
      `
      SELECT 
        c.id, c.content, c.created_at, c.parent_id,
        u.name as user_name, u.id as user_id
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.id = ?
    `,
      [(result as any).insertId],
    )

    return NextResponse.json((commentRows as any[])[0], { status: 201 })
  } catch (error) {
    console.error("Create comment error:", error)
    return NextResponse.json({ error: "Gagal menambahkan komentar" }, { status: 500 })
  }
}
