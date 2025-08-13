"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Edit, Plus, Save, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  newsCount?: number;
}

export function CategoriesManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data.data || data);
    } catch (error) {
      toast.error("Gagal memuat kategori");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Nama kategori tidak boleh kosong");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCategory,
          slug: newCategory
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, ""),
          description: `Berita seputar ${newCategory}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menambahkan kategori");
      }

      await fetchCategories(); // Refresh the list
      setNewCategory("");
      toast.success("Kategori berhasil ditambahkan");
    } catch (error: any) {
      toast.error(error.message || "Gagal menambahkan kategori");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
    setEditingDescription(category.description || "");
  };

  const handleSaveEdit = async (id: number) => {
    if (!editingName.trim()) {
      toast.error("Nama kategori tidak boleh kosong");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editingName.trim(),
          description: editingDescription.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal mengupdate kategori");
      }

      await fetchCategories(); // Refresh the list
      setEditingId(null);
      setEditingName("");
      setEditingDescription("");
      toast.success("Kategori berhasil diupdate");
    } catch (error: any) {
      toast.error(error.message || "Gagal mengupdate kategori");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
    setEditingDescription("");
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menghapus kategori");
      }

      setCategories(categories.filter((category) => category.id !== id));
      toast.success("Kategori berhasil dihapus");
    } catch (error: any) {
      toast.error(error.message || "Gagal menghapus kategori");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Kelola Kategori Berita</h2>

      <div className="flex space-x-2">
        <Input
          placeholder="Masukkan nama kategori baru"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          disabled={loading}
          onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
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
              <TableHead>Deskripsi</TableHead>
              <TableHead>Jumlah Berita</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  {editingId === category.id ? (
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-32"
                    />
                  ) : (
                    category.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === category.id ? (
                    <span className="text-sm text-gray-500">
                      {editingName
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]+/g, "")}
                    </span>
                  ) : (
                    category.slug
                  )}
                </TableCell>
                <TableCell>
                  {editingId === category.id ? (
                    <Input
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      className="w-40"
                    />
                  ) : (
                    category.description || "-"
                  )}
                </TableCell>
                <TableCell>{category.newsCount || 0} berita</TableCell>
                <TableCell className="flex justify-end space-x-2">
                  {editingId === category.id ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveEdit(category.id)}
                        disabled={loading}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                        disabled={loading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                        disabled={loading}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={
                          loading ||
                          (category.newsCount && category.newsCount > 0)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
