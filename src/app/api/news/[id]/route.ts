import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const newsId = Number.parseInt(params.id)

    if (isNaN(newsId)) {
      return NextResponse.json({ error: "ID berita tidak valid" }, { status: 400 })
    }

    // Get news with category and author info
    const [rows] = await db.execute(
      `
      SELECT 
        n.id, n.title, n.slug, n.excerpt, n.content, n.image, n.views, n.published_at, n.created_at,
        c.name as category, c.slug as category_slug,
        u.name as author, u.id as author_id,
        (SELECT COUNT(*) FROM likes WHERE news_id = n.id) as likes,
        (SELECT COUNT(*) FROM comments WHERE news_id = n.id AND status = 'approved') as comments
      FROM news n
      LEFT JOIN categories c ON n.category_id = c.id
      LEFT JOIN users u ON n.author_id = u.id
      WHERE n.id = ? AND n.status = 'published'
    `,
      [newsId],
    )

    const news = (rows as any[])[0]

    if (!news) {
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 })
    }

    // Update view count
    await db.execute("UPDATE news SET views = views + 1 WHERE id = ?", [newsId])

    // Check if user has liked or saved this news
    const auth = requireAuth(request)
    if (auth) {
      const [likeRows] = await db.execute("SELECT id FROM likes WHERE user_id = ? AND news_id = ?", [
        auth.userId,
        newsId,
      ])
      const [saveRows] = await db.execute("SELECT id FROM saved_news WHERE user_id = ? AND news_id = ?", [
        auth.userId,
        newsId,
      ])

      news.isLiked = (likeRows as any[]).length > 0
      news.isSaved = (saveRows as any[]).length > 0
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error("Fetch news detail error:", error)
    return NextResponse.json({ error: "Gagal mengambil detail berita" }, { status: 500 })
  }
}
