import { LikesManagement } from "@/components/admin/likes-management"
import { AdminGuard } from "@/components/admin/admin-guard"

export default function LikesPage() {
  return (
    <AdminGuard>
      <div className="container py-8">
        <LikesManagement />
      </div>
    </AdminGuard>
  )
}