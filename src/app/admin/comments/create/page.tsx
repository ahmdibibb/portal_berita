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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, MessageSquare, User, FileText } from "lucide-react";
import Link from "next/link";

export default function CreateCommentPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin/comments">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tambah Komentar Baru
          </h1>
          <p className="text-muted-foreground">
            Buat komentar baru untuk berita tertentu
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Informasi Komentar
              </CardTitle>
              <CardDescription>
                Isi informasi lengkap untuk komentar baru
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="news">Berita *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih berita untuk komentar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Perkembangan Teknologi AI di Indonesia
                      </div>
                    </SelectItem>
                    <SelectItem value="2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Timnas Indonesia Lolos ke Piala Asia
                      </div>
                    </SelectItem>
                    <SelectItem value="3">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Pemilu 2024: Calon Presiden Mulai Kampanye
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Pilih berita yang akan dikomentari
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Penulis Komentar *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="author"
                    placeholder="Contoh: Ahmad Rahman"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Nama penulis komentar
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Penulis</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Contoh: ahmad@email.com"
                />
                <p className="text-sm text-muted-foreground">
                  Email penulis (opsional, untuk notifikasi)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Isi Komentar *</Label>
                <Textarea
                  id="content"
                  placeholder="Tulis komentar Anda di sini..."
                  rows={6}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Isi komentar yang akan ditampilkan
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select defaultValue="pending">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status komentar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                        Pending - Menunggu moderasi
                      </div>
                    </SelectItem>
                    <SelectItem value="approved">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Approved - Disetujui
                      </div>
                    </SelectItem>
                    <SelectItem value="rejected">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        Rejected - Ditolak
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Status komentar menentukan apakah akan ditampilkan atau tidak
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentComment">Komentar Induk</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih komentar induk (jika reply)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tidak ada (komentar utama)</SelectItem>
                    <SelectItem value="1">
                      Artikel yang sangat informatif!
                    </SelectItem>
                    <SelectItem value="2">
                      Saya setuju dengan pendapat penulis
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Pilih komentar induk jika ini adalah balasan
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website Penulis</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="Contoh: https://website.com"
                />
                <p className="text-sm text-muted-foreground">
                  Website penulis (opsional)
                </p>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Pengaturan Komentar
                </h3>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isSpam"
                    className="rounded border-border"
                  />
                  <Label htmlFor="isSpam">Tandai sebagai spam</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isHighlighted"
                    className="rounded border-border"
                  />
                  <Label htmlFor="isHighlighted">
                    Tampilkan sebagai komentar unggulan
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sendNotification"
                    className="rounded border-border"
                    defaultChecked
                  />
                  <Label htmlFor="sendNotification">
                    Kirim notifikasi ke penulis berita
                  </Label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Simpan Komentar
                </Button>
                <Link href="/admin/comments">
                  <Button variant="outline">Batal</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tips Membuat Komentar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Pilih berita yang sesuai dengan topik komentar</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Gunakan nama asli atau nama pena yang konsisten</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Komentar harus relevan dengan isi berita</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Hindari komentar yang mengandung spam atau konten tidak pantas
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Status pending cocok untuk komentar yang perlu dimoderasi
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Komentar induk berguna untuk membuat thread diskusi</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

