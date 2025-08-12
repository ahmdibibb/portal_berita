"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X, TrendingUp } from "lucide-react";

interface SearchFiltersProps {
  currentCategory: string;
  currentSort: string;
  searchQuery: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  _count?: {
    news: number;
  };
}

export function SearchFilters({
  currentCategory,
  currentSort,
  searchQuery,
}: SearchFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data || []);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError("Gagal memuat kategori");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryFilter = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams);

    if (categorySlug === currentCategory) {
      params.delete("category");
    } else {
      params.set("category", categorySlug);
    }

    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const handleSortFilter = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("sort");
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  const hasActiveFilters =
    currentCategory || (currentSort && currentSort !== "relevance");

  return (
    <div className="space-y-4">
      {/* Search Query Display */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Mencari:</p>
            <p className="font-semibold text-foreground break-words">
              &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters */}
      {hasActiveFilters && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter Aktif
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {currentCategory && (
                <Badge variant="secondary" className="text-xs">
                  Kategori:{" "}
                  {categories.find((c) => c.slug === currentCategory)?.name ||
                    currentCategory}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                    onClick={() => handleCategoryFilter(currentCategory)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}

              {currentSort && currentSort !== "relevance" && (
                <Badge variant="secondary" className="text-xs">
                  Urutan:{" "}
                  {currentSort === "newest"
                    ? "Terbaru"
                    : currentSort === "oldest"
                    ? "Terlama"
                    : currentSort === "popular"
                    ? "Terpopuler"
                    : currentSort}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                    onClick={() => handleSortFilter("relevance")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="w-full text-xs"
            >
              Hapus Semua Filter
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Category Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Kategori</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-6 bg-muted rounded animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-2">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="text-xs"
              >
                Coba Lagi
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant={currentCategory === "" ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start text-sm"
                onClick={() => handleCategoryFilter("")}
              >
                Semua Kategori
              </Button>

              {categories.map((category) => (
                <Button
                  key={category.slug}
                  variant={
                    currentCategory === category.slug ? "default" : "ghost"
                  }
                  size="sm"
                  className="w-full justify-between text-sm"
                  onClick={() => handleCategoryFilter(category.slug)}
                >
                  <span>{category.name}</span>
                  {/* Safely display news count if available */}
                  {category._count?.news !== undefined && (
                    <Badge variant="secondary" className="text-xs">
                      {category._count.news}
                    </Badge>
                  )}
                </Button>
              ))}
            </>
          )}
        </CardContent>
      </Card>

      {/* Sort Options */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Urutkan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={currentSort === "relevance" ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start text-sm"
            onClick={() => handleSortFilter("relevance")}
          >
            Relevansi
          </Button>

          <Button
            variant={currentSort === "newest" ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start text-sm"
            onClick={() => handleSortFilter("newest")}
          >
            Terbaru
          </Button>

          <Button
            variant={currentSort === "oldest" ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start text-sm"
            onClick={() => handleSortFilter("oldest")}
          >
            Terlama
          </Button>

          <Button
            variant={currentSort === "popular" ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start text-sm"
            onClick={() => handleSortFilter("popular")}
          >
            Terpopuler
          </Button>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Topik Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sm"
            onClick={() => router.push(`/search?q=pemilu&page=1`)}
          >
            #Pemilu2024
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sm"
            onClick={() => router.push(`/search?q=teknologi&page=1`)}
          >
            #TeknologiAI
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sm"
            onClick={() => router.push(`/search?q=olahraga&page=1`)}
          >
            #TimNasional
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sm"
            onClick={() => router.push(`/search?q=ekonomi&page=1`)}
          >
            #EkonomiIndonesia
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
