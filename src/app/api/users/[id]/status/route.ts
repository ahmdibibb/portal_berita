import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = parseInt(id);
    const { status } = await request.json();

    if (!status || !["ACTIVE", "INACTIVE"].includes(status)) {
      return NextResponse.json(
        { error: "Status tidak valid" },
        { status: 400 }
      );
    }

    // Update user status using Prisma
    await prisma.user.update({
      where: { id: userId },
      data: { status },
    });

    return NextResponse.json({
      message: `Status pengguna berhasil diubah menjadi ${
        status === "ACTIVE" ? "aktif" : "nonaktif"
      }`,
    });
  } catch (error) {
    console.error("Update user status error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate status pengguna" },
      { status: 500 }
    );
  }
}
