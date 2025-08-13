import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Tag } from "lucide-react";
import Link from "next/link";

export default function CreateCategoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin/categories">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tambah Kategori Baru
          </h1>
          <p className="text-muted-foreground">
            Buat kategori baru untuk mengorganisir berita dengan lebih baik
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Informasi Kategori
              </CardTitle>
              <CardDescription>
                Isi informasi lengkap untuk kategori baru
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Kategori *</Label>
                <Input
                  id="name"
                  placeholder="Contoh: Teknologi, Olahraga, Politik"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Nama yang akan ditampilkan kepada pengguna
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  placeholder="Contoh: teknologi, olahraga, politik"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  URL-friendly identifier (hanya huruf kecil, angka, dan dash)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan apa yang termasuk dalam kategori ini..."
                  rows={4}
                />
                <p className="text-sm text-muted-foreground">
                  Deskripsi singkat untuk membantu pengguna memahami kategori
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Warna Kategori</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-12 h-12 bg-blue-500 hover:bg-blue-600"
                    title="Biru"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-12 h-12 bg-green-500 hover:bg-green-600"
                    title="Hijau"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-12 h-12 bg-red-500 hover:bg-red-600"
                    title="Merah"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-12 h-12 bg-yellow-500 hover:bg-yellow-600"
                    title="Kuning"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-12 h-12 bg-purple-500 hover:bg-purple-600"
                    title="Ungu"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-12 h-12 bg-orange-500 hover:bg-orange-600"
                    title="Oranye"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Pilih warna untuk membedakan kategori
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon Kategori</Label>
                <div className="grid grid-cols-6 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-12 h-12 flex items-center justify-center"
                    title="Teknologi"
                  >
                    💻
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-12 h-12 flex items-center justify-center"
                    title="Olahraga"
                  >
                    ⚽
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-12 h-12 flex items-center justify-center"
                    title="Politik"
                  >
                    🏛️
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-12 h-12 flex items-center justify-center"
                    title="Ekonomi"
                  >
                    💰
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-12 h-12 flex items-center justify-center"
                    title="Hiburan"
                  >
                    🎬
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-12 h-12 flex items-center justify-center"
                    title="Lainnya"
                  >
                    ✨
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Pilih icon yang mewakili kategori
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="parent">Kategori Induk</Label>
                <select
                  id="parent"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="">Tidak ada (kategori utama)</option>
                  <option value="1">Teknologi</option>
                  <option value="2">Olahraga</option>
                  <option value="3">Politik</option>
                </select>
                <p className="text-sm text-muted-foreground">
                  Pilih kategori induk jika ini adalah sub-kategori
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  className="rounded border-border"
                  defaultChecked
                />
                <Label htmlFor="isActive">Kategori aktif</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  className="rounded border-border"
                />
                <Label htmlFor="isFeatured">Tampilkan di halaman utama</Label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Simpan Kategori
                </Button>
                <Link href="/admin/categories">
                  <Button variant="outline">Batal</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tips Membuat Kategori</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Gunakan nama yang jelas dan mudah dipahami</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Slug harus unik dan tidak boleh ada spasi</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Deskripsi membantu pengguna memahami isi kategori</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Pilih warna dan icon yang sesuai dengan tema kategori
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Kategori induk berguna untuk membuat hierarki</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

