import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      excerpt,
      content,
      category,
      image,
      slug: inputSlug,
    } = await request.json();

    // Validasi server-side
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: "Semua field wajib harus diisi" },
        { status: 400 }
      );
    }

    if (excerpt.length < 20) {
      return NextResponse.json(
        { error: "Ringkasan harus minimal 20 karakter" },
        { status: 400 }
      );
    }

    if (content.length < 100) {
      return NextResponse.json(
        { error: "Konten berita harus minimal 100 karakter" },
        { status: 400 }
      );
    }

    // Generate slug otomatis jika tidak diisi
    const slug =
      inputSlug ||
      title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .substring(0, 100);

    // Check slug uniqueness using Prisma
    const existingNews = await prisma.news.findUnique({
      where: { slug },
    });

    if (existingNews) {
      return NextResponse.json(
        { error: "Slug sudah digunakan" },
        { status: 400 }
      );
    }

    // Konversi category ke number
    const categoryId = Number(category);
    if (isNaN(categoryId)) {
      return NextResponse.json(
        { error: "Kategori tidak valid" },
        { status: 400 }
      );
    }

    // Insert ke database menggunakan Prisma
    const newNews = await prisma.news.create({
      data: {
        title,
        excerpt,
        content,
        categoryId,
        authorId: auth.userId,
        image: image || null,
        slug,
        status: "published",
        publishedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Berita berhasil dibuat",
        id: newNews.id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Create news error:\n", error);
    return NextResponse.json(
      { error: "Gagal membuat berita: " + error.message },
      { status: 500 }
    );
  }
}
