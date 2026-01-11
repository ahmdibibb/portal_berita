"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Users, Eye, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface DashboardStats {
  totalNews: number;
  totalUsers: number;
  totalViews: number;
  totalComments: number;
}

interface RecentActivity {
  type: string;
  message: string;
  timestamp: string;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch stats
        const statsResponse = await fetch("/api/admin/dashboard/stats");
        if (!statsResponse.ok) throw new Error("Failed to fetch stats");
        const statsData = await statsResponse.json();
        setStats(statsData);

        // Fetch recent activities
        const activitiesResponse = await fetch(
          "/api/admin/dashboard/activities"
        );
        if (!activitiesResponse.ok)
          throw new Error("Failed to fetch activities");
        const activitiesData = await activitiesResponse.json();
        setActivities(activitiesData);
      } catch (error) {
        toast.error("Gagal memuat data dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsData = [
    {
      title: "Total Berita",
      value: stats?.totalNews?.toString() || "-",
      description: "Berita yang telah dipublikasi",
      icon: FileText,
    },
    {
      title: "Total Pengguna",
      value: stats?.totalUsers?.toString() || "-",
      description: "Pengguna terdaftar",
      icon: Users,
    },
    {
      title: "Total Views",
      value: stats?.totalViews?.toString() || "-",
      description: "Total pembaca bulan ini",
      icon: Eye,
    },
    {
      title: "Total Komentar",
      value: stats?.totalComments?.toString() || "-",
      description: "Komentar dari pengguna",
      icon: MessageCircle,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Button asChild className="md:col-span-2 lg:col-span-1">
          <Link href="/admin/news/create">
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah Berita Baru
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/news">
            <FileText className="h-4 w-4 mr-2" />
            Kelola Berita
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/categories">Kelola Kategori</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/users">Kelola Pengguna</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/comments">Kelola Komentar</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/likes">Kelola Like</Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>Aktivitas terbaru di portal berita</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading && activities.length === 0 ? (
              <p>Memuat aktivitas...</p>
            ) : activities.length > 0 ? (
              activities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "news"
                        ? "bg-green-500"
                        : activity.type === "user"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Tidak ada aktivitas terbaru</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
