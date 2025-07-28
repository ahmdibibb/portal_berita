// app/api/admin/users/route.ts
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
      "SELECT id, name, email, role, is_active as isActive FROM users"
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json({ error: "Gagal mengambil data pengguna" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = requireAuth(request)
    
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, ...updateData } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "User ID diperlukan" }, { status: 400 })
    }

    // Build update query dynamically based on provided fields
    const fieldsToUpdate = Object.keys(updateData)
    if (fieldsToUpdate.length === 0) {
      return NextResponse.json({ error: "Tidak ada data yang diupdate" }, { status: 400 })
    }

    const setClause = fieldsToUpdate.map(field => `${field} = ?`).join(', ')
    const values = fieldsToUpdate.map(field => updateData[field])
    values.push(id)

    await db.execute(
      `UPDATE users SET ${setClause} WHERE id = ?`,
      values
    )

    return NextResponse.json({ message: "User berhasil diupdate" })
  } catch (error) {
    console.error("Update user error:", error)
    return NextResponse.json({ error: "Gagal mengupdate user" }, { status: 500 })
  }
}