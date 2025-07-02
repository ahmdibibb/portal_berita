import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAuth } from "@/lib/auth"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = requireAuth(request)

    if (!auth) {
      return NextResponse.json({ error: "Harus login untuk menyimpan berita" }, { status: 401 })
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

    // Check if already saved
    const [existingSaves] = await db.execute("SELECT id FROM saved_news WHERE user_id = ? AND news_id = ?", [
      auth.userId,
      newsId,
    ])

    if ((existingSaves as any[]).length > 0) {
      // Unsave
      await db.execute("DELETE FROM saved_news WHERE user_id = ? AND news_id = ?", [auth.userId, newsId])
      return NextResponse.json({ saved: false, message: "Berita dihapus dari daftar simpan" })
    } else {
      // Save
      await db.execute("INSERT INTO saved_news (user_id, news_id) VALUES (?, ?)", [auth.userId, newsId])
      return NextResponse.json({ saved: true, message: "Berita berhasil disimpan" })
    }
  } catch (error) {
    console.error("Save news error:", error)
    return NextResponse.json({ error: "Gagal memproses simpan berita" }, { status: 500 })
  }
}
