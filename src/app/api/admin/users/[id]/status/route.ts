// app/api/admin/users/[id]/status/route.ts
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

    const { status } = await request.json();

    if (!status || !["active", "inactive"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Update user status using Prisma
    await prisma.user.update({
      where: { id: userId },
      data: { status },
    });

    return NextResponse.json({ message: "Status pengguna berhasil diupdate" });
  } catch (error) {
    console.error("Update user status error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate status pengguna" },
      { status: 500 }
    );
  }
}
