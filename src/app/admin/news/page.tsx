import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function AdminNewsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Kelola Berita</h1>
          <p className="text-muted-foreground">
            Kelola semua berita yang dipublikasikan
          </p>
        </div>
        <Link href="/admin/news/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Berita
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Berita</CardTitle>
          <CardDescription>
            Semua berita yang telah dipublikasikan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Fitur daftar berita akan segera tersedia</p>
            <p className="text-sm">
              Untuk saat ini, gunakan tombol "Tambah Berita" di atas
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
