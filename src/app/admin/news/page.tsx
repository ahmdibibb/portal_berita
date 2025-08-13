"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  FileText,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Tag,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface News {
  id: number;
  title: string;
  excerpt: string;
  image: string | null;
  status: string;
  category: {
    name: string;
  };
  author: {
    name: string;
  };
  publishedAt: string | null;
  views: number;
  _count: {
    likes: number;
    comments: number;
  };
}

export default function NewsManagementPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/news");
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      setNews(data);
    } catch (error) {
      toast.error("Gagal memuat data berita");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge variant="default" className="bg-green-600">
            Published
          </Badge>
        );
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "archived":
        return <Badge variant="destructive">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Belum dipublikasikan";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" ||
      item.category.name.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Kelola Berita
            </h1>
            <p className="text-muted-foreground">
              Kelola semua berita yang dipublikasikan dan draft
            </p>
          </div>
          <Link href="/admin/news/create">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tambah Berita
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari judul berita atau penulis..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {Array.from(new Set(news.map((n) => n.category.name))).map(
                    (category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* News List */}
        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Memuat data berita...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {searchQuery ||
                statusFilter !== "all" ||
                categoryFilter !== "all"
                  ? "Tidak ada berita yang sesuai filter"
                  : "Belum Ada Berita"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ||
                statusFilter !== "all" ||
                categoryFilter !== "all"
                  ? "Coba ubah filter pencarian Anda"
                  : "Mulai dengan membuat berita pertama"}
              </p>
              <Link href="/admin/news/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Berita Pertama
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredNews.map((newsItem) => (
              <Card
                key={newsItem.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* News Image */}
                    <div className="relative h-24 w-32 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={newsItem.image || "/placeholder.svg"}
                        alt={newsItem.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* News Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(newsItem.status)}
                          <Badge variant="outline">
                            {newsItem.category.name}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(newsItem.publishedAt)}</span>
                        </div>
                      </div>

                      <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
                        {newsItem.title}
                      </h3>

                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {newsItem.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{newsItem.author.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{newsItem.views} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            <span>{newsItem._count.likes} likes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            <span>{newsItem._count.comments} komentar</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Link href={`/news/${newsItem.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Lihat
                            </Button>
                          </Link>
                          <Link href={`/admin/news/${newsItem.id}/edit`}>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Hapus
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Ringkasan Berita
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{news.length}</p>
                    <p className="text-sm text-muted-foreground">
                      Total Berita
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {news.filter((n) => n.status === "published").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Published</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {news.filter((n) => n.status === "draft").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Draft</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Eye className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {news
                        .reduce((sum, n) => sum + n.views, 0)
                        .toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Aksi Massal</CardTitle>
              <CardDescription>
                Lakukan aksi pada beberapa berita sekaligus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Publish Semua yang Dipilih
                </Button>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Draft Semua yang Dipilih
                </Button>
                <Button variant="outline">
                  <Tag className="h-4 w-4 mr-2" />
                  Ubah Kategori
                </Button>
                <Button variant="outline" className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus Semua yang Dipilih
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
