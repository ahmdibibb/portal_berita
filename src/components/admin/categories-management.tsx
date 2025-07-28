"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Edit, Plus } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Category {
  id: number
  name: string
  slug: string
  description: string | null
}

export function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/categories')
      if (!response.ok) throw new Error("Failed to fetch categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      toast.error("Gagal memuat kategori")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Nama kategori tidak boleh kosong")
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory }),
      })

      if (!response.ok) throw new Error("Gagal menambahkan kategori")

      await fetchCategories() // Refresh the list
      setNewCategory("")
      toast.success("Kategori berhasil ditambahkan")
    } catch (error) {
      toast.error("Gagal menambahkan kategori")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (id: number) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error("Gagal menghapus kategori")

      setCategories(categories.filter(category => category.id !== id))
      toast.success("Kategori berhasil dihapus")
    } catch (error) {
      toast.error("Gagal menghapus kategori")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Kelola Kategori Berita</h2>

      <div className="flex space-x-2">
        <Input
          placeholder="Masukkan nama kategori baru"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          disabled={loading}
        />
        <Button onClick={handleAddCategory} disabled={loading}>
          <Plus className="h-4 w-4 mr-2" /> 
          {loading ? "Memproses..." : "Tambah"}
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Kategori</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" disabled={loading}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}