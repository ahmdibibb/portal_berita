import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { hashPassword } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password minimal 6 karakter" }, { status: 400 })
    }

    // Check if user already exists
    const [existingUsers] = await db.execute("SELECT id FROM users WHERE email = ?", [email])

    if ((existingUsers as any[]).length > 0) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Insert new user
    const [result] = await db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashedPassword,
    ])

    return NextResponse.json({ message: "Akun berhasil dibuat" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
