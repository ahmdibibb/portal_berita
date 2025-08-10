import { LikesManagement } from "@/components/admin/likes-management";
import { LikesDetail } from "@/components/admin/likes-detail";
import { AdminGuard } from "@/components/admin/admin-guard";

export default function LikesPage() {
  return (
    <AdminGuard>
      <div className="container py-8 space-y-8">
        <LikesManagement />
        <LikesDetail />
      </div>
    </AdminGuard>
  );
}
