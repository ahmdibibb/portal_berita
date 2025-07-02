import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAuth } from "@/lib/auth"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = requireAuth(request)

    if (!auth) {
      return NextResponse.json({ error: "Harus login untuk menyukai berita" }, { status: 401 })
    }

    const newsId = Number.parseInt(params.id)

    if (isNaN(newsId)) {
      return NextResponse.json({ error: "ID berita tidak valid" }, { status: 400 })
    }

    // Check if news exists
    const [newsRows] = await db.execute("SELECT id FROM news WHERE id = ? AND status = 'published'", [newsId])

    if ((newsRows as any[]).length === 0) {
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 })
    }

    // Check if already liked
    const [existingLikes] = await db.execute("SELECT id FROM likes WHERE user_id = ? AND news_id = ?", [
      auth.userId,
      newsId,
    ])

    if ((existingLikes as any[]).length > 0) {
      // Unlike
      await db.execute("DELETE FROM likes WHERE user_id = ? AND news_id = ?", [auth.userId, newsId])
      return NextResponse.json({ liked: false, message: "Batal menyukai berita" })
    } else {
      // Like
      await db.execute("INSERT INTO likes (user_id, news_id) VALUES (?, ?)", [auth.userId, newsId])
      return NextResponse.json({ liked: true, message: "Berhasil menyukai berita" })
    }
  } catch (error) {
    console.error("Like news error:", error)
    return NextResponse.json({ error: "Gagal memproses like" }, { status: 500 })
  }
}
