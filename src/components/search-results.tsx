"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Eye, User, Search, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SearchResultsProps {
  query: string;
  category: string;
  sort: string;
  page: number;
}

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  image?: string | null;
  publishedAt: string;
  views: number;
  category: {
    name: string;
    slug: string;
  };
  author: {
    name: string;
  };
  _count?: {
    likes: number;
    comments: number;
  };
}

export function SearchResults({
  query,
  category,
  sort,
  page,
}: SearchResultsProps) {
  const [results, setResults] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      console.log("🔍 SearchResults: Starting search with:", {
        query,
        category,
        sort,
        page,
      });
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          search: query,
          page: page.toString(),
          limit: "12",
        });

        if (category) {
          params.append("category", category);
        }

        if (sort && sort !== "relevance") {
          params.append("sort", sort);
        }

        const apiUrl = `/api/news?${params.toString()}`;
        console.log("🔍 SearchResults: Fetching from:", apiUrl);

        const response = await fetch(apiUrl);
        console.log("🔍 SearchResults: Response status:", response.status);
        console.log("🔍 SearchResults: Response ok:", response.ok);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("🔍 SearchResults: Response error:", errorText);
          throw new Error(
            `Gagal memuat hasil pencarian: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("🔍 SearchResults: Response data:", data);

        setResults(data.data || []);
        setTotalResults(data.total || 0);
        console.log("🔍 SearchResults: Search completed successfully");
      } catch (error: unknown) {
        console.error("🔍 SearchResults: Search error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setError(`Terjadi kesalahan saat mencari berita: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, category, sort, page]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/search?${params.toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">
          Mulai Pencarian
        </h3>
        <p className="text-muted-foreground">
          Masukkan kata kunci untuk mencari berita
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in-up">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Skeleton className="h-24 w-32 rounded-lg shimmer" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-3/4 shimmer" />
                  <Skeleton className="h-4 w-full shimmer" />
                  <Skeleton className="h-4 w-2/3 shimmer" />
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-20 shimmer" />
                    <Skeleton className="h-4 w-16 shimmer" />
                    <Skeleton className="h-4 w-24 shimmer" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Terjadi Kesalahan
        </h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Tidak Ada Hasil
        </h3>
        <p className="text-muted-foreground mb-4">
          Tidak ada berita yang ditemukan untuk &ldquo;{query}&rdquo;
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Saran pencarian:</p>
          <ul className="space-y-1">
            <li>• Pastikan semua kata dieja dengan benar</li>
            <li>• Coba kata kunci yang berbeda</li>
            <li>• Coba kata kunci yang lebih umum</li>
          </ul>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(totalResults / 12);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Ditemukan <span className="font-semibold">{totalResults}</span>{" "}
            berita
          </p>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Urutkan:</span>
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="text-sm border border-border rounded-md px-3 py-1 bg-background"
          >
            <option value="relevance">Relevansi</option>
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="popular">Terpopuler</option>
          </select>
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-4">
        {results.map((news, index) => (
          <Card
            key={news.id}
            className="hover:shadow-md transition-shadow animate-fade-in-up"
            style={{ ["--i" as any]: index, animationDelay: `${index * 60}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* News Image */}
                <div className="relative h-24 w-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={news.image || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* News Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {news.category.name}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(news.publishedAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <Link href={`/news/${news.id}`}>
                    <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
                      {news.title}
                    </h3>
                  </Link>

                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {news.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{news.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{news.views || 0} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{news._count?.comments || 0} komentar</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            Sebelumnya
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="w-10 h-10 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Selanjutnya
          </Button>
        </div>
      )}
    </div>
  );
}
