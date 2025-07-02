import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminGuard } from "@/components/admin/admin-guard"

export default function AdminPage() {
  return (
    <AdminGuard>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>
        <AdminDashboard />
      </div>
    </AdminGuard>
  )
}
