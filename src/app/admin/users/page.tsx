import { UsersManagement } from "@/components/admin/users-management"
import { AdminGuard } from "@/components/admin/admin-guard"

export default function UsersPage() {
  return (
    <AdminGuard>
      <div className="container py-8">
        <UsersManagement />
      </div>
    </AdminGuard>
  )
}