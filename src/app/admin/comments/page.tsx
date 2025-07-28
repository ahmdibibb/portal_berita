import { CommentsManagement } from "@/components/admin/comments-management"
import { AdminGuard } from "@/components/admin/admin-guard"

export default function CommentsPage() {
  return (
    <AdminGuard>
      <div className="container py-8">
        <CommentsManagement />
      </div>
    </AdminGuard>
  )
}