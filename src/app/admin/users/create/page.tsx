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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, User, Mail, Shield, Lock } from "lucide-react";
import Link from "next/link";

export default function CreateUserPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin/users">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tambah Pengguna Baru
          </h1>
          <p className="text-muted-foreground">
            Buat akun pengguna baru dengan hak akses yang sesuai
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informasi Pengguna
              </CardTitle>
              <CardDescription>
                Isi informasi lengkap untuk pengguna baru
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nama Depan *</Label>
                  <Input id="firstName" placeholder="Contoh: Ahmad" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nama Belakang</Label>
                  <Input id="lastName" placeholder="Contoh: Rahman" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Contoh: ahmad@email.com"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Email akan digunakan untuk login dan notifikasi
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Minimal 8 karakter"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Ulangi password"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role pengguna" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        User - Pengguna biasa
                      </div>
                    </SelectItem>
                    <SelectItem value="editor">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Editor - Dapat membuat dan mengedit berita
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Admin - Akses penuh ke semua fitur
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Role menentukan hak akses pengguna dalam sistem
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input id="phone" placeholder="Contoh: +62 812-3456-7890" />
                <p className="text-sm text-muted-foreground">
                  Opsional, untuk keperluan kontak darurat
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  placeholder="Ceritakan sedikit tentang pengguna ini..."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  Deskripsi singkat tentang pengguna
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Pilih Gambar
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG, atau GIF. Maksimal 2MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Pengaturan Akun
                </h3>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    className="rounded border-border"
                    defaultChecked
                  />
                  <Label htmlFor="isActive">Akun aktif</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="emailVerified"
                    className="rounded border-border"
                  />
                  <Label htmlFor="emailVerified">
                    Email sudah diverifikasi
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="requirePasswordChange"
                    className="rounded border-border"
                  />
                  <Label htmlFor="requirePasswordChange">
                    Wajib ganti password saat login pertama
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sendWelcomeEmail"
                    className="rounded border-border"
                    defaultChecked
                  />
                  <Label htmlFor="sendWelcomeEmail">
                    Kirim email selamat datang
                  </Label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Simpan Pengguna
                </Button>
                <Link href="/admin/users">
                  <Button variant="outline">Batal</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tips Membuat Pengguna</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Gunakan email yang valid dan unik untuk setiap pengguna
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Password minimal 8 karakter dengan kombinasi huruf, angka, dan
                  simbol
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Role Editor cocok untuk jurnalis atau kontributor berita
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Role Admin hanya untuk pengguna yang benar-benar membutuhkan
                  akses penuh
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Avatar membantu pengguna mengidentifikasi diri mereka
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Wajib ganti password saat login pertama meningkatkan keamanan
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

