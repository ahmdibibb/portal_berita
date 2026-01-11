import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET single news item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("🔍 GET /api/admin/news/[id] - params:", params);

    if (!params.id) {
      console.error("❌ Missing ID parameter");
      return NextResponse.json(
        { error: "ID parameter tidak ditemukan" },
        { status: 400 }
      );
    }

    const id = parseInt(params.id);
    console.log("🔍 Parsed ID:", id);

    if (isNaN(id)) {
      console.error("❌ Invalid ID format:", params.id);
      return NextResponse.json(
        { error: "Format ID tidak valid" },
        { status: 400 }
      );
    }

    console.log("🔍 Fetching news with ID:", id);

    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        category: true,
        author: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    console.log("🔍 News found:", news ? "Yes" : "No");

    if (!news) {
      console.log("❌ News not found for ID:", id);
      return NextResponse.json(
        { error: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    console.log("✅ News fetched successfully");
    return NextResponse.json(news);
  } catch (error) {
    console.error("💥 Error fetching news:", error);
    console.error("💥 Error stack:", error.stack);
    return NextResponse.json(
      { error: "Gagal mengambil data berita", details: error.message },
      { status: 500 }
    );
  }
}

// PUT update news
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("🔄 PUT /api/admin/news/[id] - params:", params);

    if (!params.id) {
      console.error("❌ Missing ID parameter");
      return NextResponse.json(
        { error: "ID parameter tidak ditemukan" },
        { status: 400 }
      );
    }

    const id = parseInt(params.id);
    console.log("🔍 Parsed ID:", id);

    if (isNaN(id)) {
      console.error("❌ Invalid ID format:", params.id);
      return NextResponse.json(
        { error: "Format ID tidak valid" },
        { status: 400 }
      );
    }

    console.log("📝 Parsing request body...");
    const body = await request.json();
    console.log("📝 Request body:", body);

    const {
      title,
      excerpt,
      content,
      category,
      image,
      slug,
      status = "draft",
    } = body;

    console.log("📝 Extracted data:", {
      title,
      excerpt,
      content,
      category,
      image,
      slug,
      status,
    });

    // Validasi input
    if (!title || !excerpt || !content || !category) {
      console.error("❌ Validation failed:", {
        title,
        excerpt,
        content,
        category,
      });
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    console.log("🔍 Checking if news exists...");
    // Check if news exists
    const existingNews = await prisma.news.findUnique({
      where: { id },
    });

    if (!existingNews) {
      console.error("❌ News not found for ID:", id);
      return NextResponse.json(
        { error: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    console.log("✅ News exists, updating...");
    // Update news
    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title,
        excerpt,
        content,
        categoryId: parseInt(category),
        image: image || null,
        slug,
        status,
        publishedAt: status === "published" ? new Date() : null,
      },
      include: {
        category: true,
        author: true,
      },
    });

    console.log("✅ News updated successfully");
    return NextResponse.json({
      message: "Berita berhasil diperbarui",
      news: updatedNews,
    });
  } catch (error) {
    console.error("💥 Error updating news:", error);
    console.error("💥 Error stack:", error.stack);
    return NextResponse.json(
      { error: "Gagal memperbarui berita", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE news
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // Check if news exists
    const existingNews = await prisma.news.findUnique({
      where: { id },
    });

    if (!existingNews) {
      return NextResponse.json(
        { error: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    // Delete related data first (due to foreign key constraints)
    await prisma.comment.deleteMany({
      where: { newsId: id },
    });

    await prisma.like.deleteMany({
      where: { newsId: id },
    });

    // Then delete the news
    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Berita berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { error: "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}
