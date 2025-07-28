import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { requireAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, excerpt, content, category, image, slug: inputSlug } = await request.json()

    // Validasi server-side
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: "Semua field wajib harus diisi" },
        { status: 400 }
      )
    }

    if (excerpt.length < 20) {
      return NextResponse.json(
        { error: "Ringkasan harus minimal 20 karakter" },
        { status: 400 }
      )
    }

    if (content.length < 100) {
      return NextResponse.json(
        { error: "Konten berita harus minimal 100 karakter" },
        { status: 400 }
      )
    }

    // Generate slug otomatis jika tidak diisi
    const slug = inputSlug || 
      title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .substring(0, 100)

    // Check slug uniqueness - FIXED VERSION
    const [existing] = await db.execute(
      "SELECT id FROM news WHERE slug = ?", 
      [slug]
    ) as [any[], any];

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "Slug sudah digunakan" },
        { status: 400 }
      )
    }

    // Konversi category ke number
    const categoryId = Number(category)
    if (isNaN(categoryId)) {
      return NextResponse.json(
        { error: "Kategori tidak valid" },
        { status: 400 }
      )
    }

    // Insert ke database
    const [result] = await db.execute(
      "INSERT INTO news (title, excerpt, content, category_id, author_id, image, slug) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, excerpt, content, categoryId, auth.userId, image || null, slug]
    )

    return NextResponse.json(
      { 
        message: "Berita berhasil dibuat", 
        id: (result as any).insertId 
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Create news error:", error)
    return NextResponse.json(
      { error: "Gagal membuat berita: " + error.message },
      { status: 500 }
    )
  }
}