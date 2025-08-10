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

      {loading ? (
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500">Memuat data...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500">Belum ada data likes</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="title"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                  stroke="#666"
                />
                <YAxis fontSize={12} stroke="#666" />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="likes"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  stroke="#2563eb"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ringkasan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">
                  Total Berita
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {data.length}
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-medium">
                  Total Likes
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {data.reduce((sum, item) => sum + item.likes, 0)}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">
                  Rata-rata Likes
                </p>
                <p className="text-2xl font-bold text-purple-900">
                  {data.length > 0
                    ? Math.round(
                        data.reduce((sum, item) => sum + item.likes, 0) /
                          data.length
                      )
                    : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
