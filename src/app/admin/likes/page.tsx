import { LikesManagement } from "@/components/admin/likes-management";
import { LikesDetail } from "@/components/admin/likes-detail";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LikesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Kelola Like Berita
          </h1>
          <p className="text-gray-600">
            Lihat statistik dan detail likes untuk setiap berita
          </p>
        </div>

        {/* Likes Management Component */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <LikesManagement />
          </CardContent>
        </Card>

        {/* Likes Detail Component */}
        <Card>
          <CardContent className="p-6">
            <LikesDetail />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
