import { CategoriesManagement } from "@/components/admin/categories-management"
import { AdminGuard } from "@/components/admin/admin-guard"

export default function CategoriesPage() {
  return (
    <AdminGuard>
      <div className="container py-8">
        <CategoriesManagement />
      </div>
    </AdminGuard>
  )
}   