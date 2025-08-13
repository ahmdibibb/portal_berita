"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NewsLike {
  id: number;
  title: string;
  likes: number;
}

export function LikesManagement() {
  const [data, setData] = useState<NewsLike[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLikesData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/news/likes");
      if (!response.ok) throw new Error("Failed to fetch likes data");
      const result = await response.json();
      setData(result);
    } catch (error) {
      toast.error("Gagal memuat data likes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikesData();
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-blue-600">
            Likes: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const chartData = data.map((item) => ({
    title: item.title,
    likes: item.likes,
  }));

  const totalLikes = data.reduce((sum, item) => sum + item.likes, 0);
  const averageLikes = data.length > 0 ? totalLikes / data.length : 0;
  const mostLikedNews = data.reduce((max, current) =>
    current.likes > max.likes ? current : max
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Statistik Like Berita
        </h2>
        <Button
          onClick={fetchLikesData}
          disabled={loading}
          variant="outline"
          size="sm"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card className="md:col-span-2 lg:col-span-3 xl:col-span-4">
          <CardHeader>
            <CardTitle>Statistik Like Berita</CardTitle>
            <CardDescription>Grafik jumlah like per berita</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-64 flex items-center justify-center">
                <p>Memuat data...</p>
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="likes" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Tidak ada data like
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Like</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalLikes.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Semua berita</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {averageLikes.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Per berita</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Berita Terpopuler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {mostLikedNews?.title?.slice(0, 20)}...
            </div>
            <p className="text-xs text-muted-foreground">
              {mostLikedNews?.likes || 0} likes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Berita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {chartData.length}
            </div>
            <p className="text-xs text-muted-foreground">Berita dengan like</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
