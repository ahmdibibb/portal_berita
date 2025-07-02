import { CreateNewsForm } from "@/components/admin/create-news-form"
import { AdminGuard } from "@/components/admin/admin-guard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateNewsPage() {
  return (
    <AdminGuard>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Tambah Berita Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateNewsForm />
          </CardContent>
        </Card>
      </div>
    </AdminGuard>
  )
}
