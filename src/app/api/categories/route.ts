import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const [rows] = await db.execute("SELECT id, name, slug, description FROM categories ORDER BY name")

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Fetch categories error:", error)
    return NextResponse.json({ error: "Gagal mengambil kategori" }, { status: 500 })
  }
}
