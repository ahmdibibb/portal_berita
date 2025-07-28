import { CreateNewsForm } from "@/components/admin/create-news-form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function CreateNewsPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Tambah Berita Baru</CardTitle>
          <CardDescription>
            Isi form berikut untuk mempublikasikan berita baru
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateNewsForm />
        </CardContent>
      </Card>
    </div>
  )
}