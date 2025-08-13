// app/api/admin/users/[id]/role/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(params.id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const { role } = await request.json();

    if (!role || !["admin", "user"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Update user role using Prisma
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return NextResponse.json({ message: "Role pengguna berhasil diupdate" });
  } catch (error) {
    console.error("Update user role error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate role pengguna" },
      { status: 500 }
    );
  }
}
