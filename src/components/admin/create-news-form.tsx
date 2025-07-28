"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface Category {
  id: number
  name: string
}

export function CreateNewsForm() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    slug: ""
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (!response.ok) throw new Error("Failed to fetch categories")
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        toast.error("Gagal memuat kategori")
        console.error("Fetch categories error:", error)
      } finally {
        setCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Generate slug otomatis jika kosong
    const finalSlug = formData.slug || 
      formData.title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
  
    // Validasi client-side sebelum submit
    if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
      toast.error("Harap isi semua field yang wajib diisi")
      return
    }
  
    setLoading(true)
  
    try {
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          category: Number(formData.category),
          slug: finalSlug // Gunakan slug yang sudah di-generate
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Gagal membuat berita")
      }

      toast.success("Berita berhasil dipublikasikan")
      router.push("/news" + data.id)
    } catch (error: any) {
      toast.error("Gagal mempublikasikan: " + error.message)
      console.error("Submit error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
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
              onValueChange={(value) => setFormData({...formData, category: value})}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem 
                    key={category.id}     
                    value={category.id.toString()}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* URL Gambar */}
        <div className="space-y-2">
          <Label htmlFor="image">URL Gambar</Label>
          <Input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/gambar.jpg"
          />
          {formData.image && (
            <div className="mt-2">
              <img 
                src={formData.image} 
                alt="Preview" 
                className="h-40 object-cover rounded-md border"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
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
                          .replace(/\s+/g, '-')
                          .replace(/[^\w-]+/g, '')
            setFormData({...formData, slug: value})
          }}
          placeholder="contoh-berita"
        />
        <p className="text-xs text-muted-foreground">
          Contoh: "{formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')}"
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
        />
      </div>

      {/* Tombol Aksi */}
      <div className="flex justify-end gap-4 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.back()}
        >
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
          ) : "Publikasi Berita"}
        </Button>
      </div>
    </form>
  )
}