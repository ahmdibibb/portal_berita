import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
      ];
    }

    // Get total count
    const total = await prisma.category.count({ where });

    // Get categories with relations
    const categories = await prisma.category.findMany({
      where,
      include: {
        _count: {
          select: {
            news: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Transform data
    const transformedCategories = categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color,
      status: category.status,
      newsCount: category._count.news,
    }));

    return NextResponse.json({
      data: transformedCategories,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("Get admin categories error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data kategori" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request);

    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, description, color } = body;

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { error: "Nama dan slug wajib diisi" },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Slug kategori sudah ada" },
        { status: 400 }
      );
    }

    // Create new category
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || "",
        color: color || "#3B82F6",
        status: "active",
      },
    });

    return NextResponse.json(
      {
        message: "Kategori berhasil dibuat",
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          color: category.color,
          status: category.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create admin category error:", error);
    return NextResponse.json(
      { error: "Gagal membuat kategori" },
      { status: 500 }
    );
  }
}
