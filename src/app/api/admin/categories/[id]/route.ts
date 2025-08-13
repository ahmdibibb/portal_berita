// app/api/admin/categories/[id]/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const categoryId = parseInt(params.id);
    if (isNaN(categoryId)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    // Check if category has news
    const newsCount = await prisma.news.count({
      where: { categoryId },
    });

    if (newsCount > 0) {
      return NextResponse.json(
        { error: "Kategori tidak dapat dihapus karena masih memiliki berita" },
        { status: 400 }
      );
    }

    // Delete category using Prisma
    await prisma.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus kategori" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const categoryId = parseInt(params.id);
    if (isNaN(categoryId)) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 400 }
      );
    }

    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Nama kategori wajib diisi" },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    // Check if slug already exists (excluding current category)
    const existingCategory = await prisma.category.findFirst({
      where: {
        slug,
        id: { not: categoryId },
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Slug kategori sudah ada" },
        { status: 400 }
      );
    }

    // Update category using Prisma
    await prisma.category.update({
      where: { id: categoryId },
      data: {
        name,
        slug,
        description: description || "",
      },
    });

    return NextResponse.json({ message: "Kategori berhasil diupdate" });
  } catch (error) {
    console.error("Update category error:", error);
    return NextResponse.json(
      { error: "Gagal mengupdate kategori" },
      { status: 500 }
    );
  }
}
