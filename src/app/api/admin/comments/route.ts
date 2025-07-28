// app/api/admin/comments/route.ts
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
        c.id, c.content, c.created_at, c.status,
        u.name as user_name,
        n.title as news_title
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN news n ON c.news_id = n.id
      ORDER BY c.created_at DESC`
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Get comments error:", error)
    return NextResponse.json({ error: "Gagal mengambil komentar" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = requireAuth(request)
    
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const commentId = Number.parseInt(params.id)
    if (isNaN(commentId)) {
      return NextResponse.json({ error: "ID komentar tidak valid" }, { status: 400 })
    }

    await db.execute("DELETE FROM comments WHERE id = ?", [commentId])

    return NextResponse.json({ message: "Komentar berhasil dihapus" })
  } catch (error) {
    console.error("Delete comment error:", error)
    return NextResponse.json({ error: "Gagal menghapus komentar" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = requireAuth(request)
    
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const commentId = Number.parseInt(params.id)
    if (isNaN(commentId)) {
      return NextResponse.json({ error: "ID komentar tidak valid" }, { status: 400 })
    }

    const { status } = await request.json()
    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: "Status tidak valid" }, { status: 400 })
    }

    await db.execute("UPDATE comments SET status = ? WHERE id = ?", [status, commentId])

    return NextResponse.json({ message: `Komentar berhasil di${status === 'approved' ? 'setujui' : 'tolak'}` })
  } catch (error) {
    console.error("Update comment status error:", error)
    return NextResponse.json({ error: "Gagal mengupdate status komentar" }, { status: 500 })
  }
}