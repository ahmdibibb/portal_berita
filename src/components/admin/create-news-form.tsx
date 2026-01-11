"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Link as LinkIcon } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

// Default categories sesuai dengan yang ada di project
const defaultCategories: Category[] = [
  { id: 1, name: "Beranda" },
  { id: 2, name: "Olahraga" },
  { id: 3, name: "Otomotif" },
  { id: 4, name: "Kesehatan" },
  { id: 5, name: "Politik" },
  { id: 6, name: "Teknologi" },
  { id: 7, name: "Ekonomi" },
  { id: 8, name: "Pendidikan" },
  { id: 9, name: "Hiburan" },
  { id: 10, name: "Kuliner" },
  { id: 11, name: "Travel" },
];

export function CreateNewsForm() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    slug: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [useUrlInput, setUseUrlInput] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Set mounted state untuk mencegah hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const response = await fetch("/api/categories");
        if (response.ok) {
        const data = await response.json();
          // Gabungkan kategori dari API dengan default, hapus duplikat
          const apiCategories = data || [];
          const allCategories = [...defaultCategories, ...apiCategories];
          const uniqueCategories = allCategories.filter(
            (category, index, self) =>
              index ===
              self.findIndex(
                (c) => c.name.toLowerCase() === category.name.toLowerCase()
              )
          );
          setCategories(uniqueCategories);
        } else {
          // Jika API gagal, gunakan kategori default
          console.warn("API categories failed, using default categories");
          setCategories(defaultCategories);
        }
      } catch (error) {
        // Jika ada error, gunakan kategori default
        console.warn(
          "Fetch categories failed, using default categories:",
          error
        );
        setCategories(defaultCategories);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, [mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Generate slug otomatis jika kosong
    const finalSlug =
      formData.slug ||
      formData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

    // Validasi client-side sebelum submit
    if (
      !formData.title ||
      !formData.excerpt ||
      !formData.content ||
      !formData.category
    ) {
      toast.error("Harap isi semua field yang wajib diisi");
      return;
    }

    // Validasi panjang konten
    if (formData.excerpt.length < 20) {
      toast.error("Ringkasan harus minimal 20 karakter");
      return;
    }

    if (formData.content.length < 100) {
      toast.error("Konten berita harus minimal 100 karakter");
      return;
    }

    // Validasi gambar (opsional tapi jika diisi harus valid)
    if (
      formData.image &&
      !formData.image.startsWith("/uploads/") &&
      !formData.image.startsWith("http")
    ) {
      toast.error("Format gambar tidak valid. Silakan upload ulang.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          category: Number(formData.category),
          slug: finalSlug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal membuat berita");
      }

      toast.success("Berita berhasil dipublikasikan");
      router.push("/admin/news");
    } catch (error: any) {
      toast.error("Gagal mempublikasikan: " + error.message);
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  const toggleImageInput = () => {
    setUseUrlInput(!useUrlInput);
    if (!useUrlInput) {
      setFormData((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Nama kategori tidak boleh kosong");
      return;
    }

    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories([...categories, newCategory]);
        setFormData({ ...formData, category: newCategory.id.toString() });
        setNewCategoryName("");
        setShowAddCategory(false);
        toast.success(`Kategori "${newCategory.name}" berhasil ditambahkan`);
      } else {
        throw new Error("Failed to add category");
      }
    } catch (error) {
      toast.error("Gagal menambahkan kategori");
      console.error("Add category error:", error);
    }
  };

  // Mencegah hydration error dengan conditional rendering
  if (!mounted) {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      {/* Judul Berita */}
      <div className="space-y-2">
        <Label htmlFor="title">Judul Berita*</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Contoh: Perkembangan Terkini Teknologi AI di Indonesia"
          required
          suppressHydrationWarning
        />
      </div>

      {/* Grid Kategori dan Gambar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kategori */}
        <div className="space-y-2">
          <Label htmlFor="category">Kategori*</Label>
          {categoriesLoading ? (
            <Input disabled placeholder="Memuat kategori..." />
          ) : (
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih kategori berita..." />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                    {category.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    Tidak ada kategori tersedia
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          )}
          {!categoriesLoading && categories.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {categories.length} kategori tersedia
            </p>
          )}

          {/* Tombol Tambah Kategori */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAddCategory(!showAddCategory)}
              className="text-xs"
            >
              {showAddCategory ? "Batal" : "+ Tambah Kategori"}
            </Button>
          </div>

          {/* Form Tambah Kategori */}
          {showAddCategory && (
            <div className="space-y-2 p-3 border rounded-md bg-muted/30">
              <Label htmlFor="newCategory" className="text-xs">
                Nama Kategori Baru
              </Label>
              <div className="flex gap-2">
                <Input
                  id="newCategory"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Masukkan nama kategori baru"
                  className="text-sm"
                  suppressHydrationWarning
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                >
                  Tambah
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Gambar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Gambar Berita</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={toggleImageInput}
              className="text-xs"
            >
              {useUrlInput ? (
                <>
                  <LinkIcon className="h-3 w-3 mr-1" />
                  Upload Lokal
                </>
              ) : (
                <>
                  <LinkIcon className="h-3 w-3 mr-1" />
                  Input URL
                </>
              )}
            </Button>
          </div>

          {useUrlInput ? (
            <Input
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/gambar.jpg"
              suppressHydrationWarning
            />
          ) : (
            <ImageUpload
              value={formData.image}
              onChange={handleImageChange}
              label=""
              placeholder="Upload gambar berita"
            />
          )}
        </div>
      </div>

      {/* Slug URL */}
      <div className="space-y-2">
        <Label htmlFor="slug">URL Slug</Label>
        <Input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={(e) => {
            const value = e.target.value
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]+/g, "");
            setFormData({ ...formData, slug: value });
          }}
          placeholder="contoh-berita"
          suppressHydrationWarning
        />
        <p className="text-xs text-muted-foreground">
          Contoh: "
          {formData.title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")}
          "
        </p>
      </div>

      {/* Ringkasan */}
      <div className="space-y-2">
        <Label htmlFor="excerpt">Ringkasan* (minimal 20 karakter)</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="Ringkasan singkat berita yang akan muncul di halaman utama"
          rows={3}
          minLength={20}
          required
          suppressHydrationWarning
        />
      </div>

      {/* Konten Berita */}
      <div className="space-y-2">
        <Label htmlFor="content">Konten Berita* (minimal 100 karakter)</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Tulis konten lengkap berita di sini..."
          rows={10}
          minLength={100}
          required
          suppressHydrationWarning
        />
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Batal
        </Button>
        <Button
          type="submit"
          disabled={loading || categoriesLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Memproses...
            </>
          ) : (
            "Publikasi Berita"
          )}
        </Button>
      </div>
    </form>
  );
}
