"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface LikeDetail {
  id: number;
  created_at: string;
  user: {
    name: string;
    email: string;
  };
  news: {
    title: string;
    slug: string;
  };
}

export function LikesDetail() {
  const [likes, setLikes] = useState<LikeDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const fetchLikesDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/likes/detail");
      if (!response.ok) throw new Error("Failed to fetch likes detail");
      const result = await response.json();
      setLikes(result);
    } catch (error) {
      toast.error("Gagal memuat detail likes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showDetails) {
      fetchLikesDetail();
    }
  }, [showDetails]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Detail Likes</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowDetails(!showDetails)}
            variant="outline"
            size="sm"
          >
            {showDetails ? (
              <EyeOff className="h-4 w-4 mr-2" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            {showDetails ? "Sembunyikan" : "Tampilkan"} Detail
          </Button>
          {showDetails && (
            <Button
              onClick={fetchLikesDetail}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="bg-white rounded-lg border border-gray-200">
          {loading ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">Memuat detail likes...</p>
            </div>
          ) : likes.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">Belum ada data likes</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Berita
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Like
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {likes.map((like) => (
                    <tr key={like.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {like.user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {like.user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {like.news.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(like.created_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
