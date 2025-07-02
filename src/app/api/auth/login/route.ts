import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { comparePassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password harus diisi" }, { status: 400 })
    }

    // Find user by email
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email])
    const users = rows as any[]
    const user = users[0]

    if (!user) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 })
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })

    // Create response
    const response = NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })

    // Set HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
