import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request)

    if (!auth) {
      return NextResponse.json({ error: "Tidak terautentikasi" }, { status: 401 })
    }

    // Get user data from database
    const [rows] = await db.execute("SELECT id, name, email, role, avatar FROM users WHERE id = ?", [auth.userId])
    const users = rows as any[]
    const user = users[0]

    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
