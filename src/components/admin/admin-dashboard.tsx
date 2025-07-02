"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Users, Eye, MessageCircle } from "lucide-react"
import Link from "next/link"

export function AdminDashboard() {
  const stats = [
    {
      title: "Total Berita",
      value: "156",
      description: "Berita yang telah dipublikasi",
      icon: FileText,
    },
    {
      title: "Total Pengguna",
      value: "1,234",
      description: "Pengguna terdaftar",
      icon: Users,
    },
    {
      title: "Total Views",
      value: "45,678",
      description: "Total pembaca bulan ini",
      icon: Eye,
    },
    {
      title: "Total Komentar",
      value: "2,345",
      description: "Komentar dari pengguna",
      icon: MessageCircle,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link href="/admin/news/create">
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah Berita Baru
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/categories">Kelola Kategori</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/users">Kelola Pengguna</Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>Aktivitas terbaru di portal berita</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Berita baru dipublikasi</p>
                <p className="text-xs text-muted-foreground">2 jam yang lalu</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Pengguna baru mendaftar</p>
                <p className="text-xs text-muted-foreground">4 jam yang lalu</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Komentar baru ditambahkan</p>
                <p className="text-xs text-muted-foreground">6 jam yang lalu</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
