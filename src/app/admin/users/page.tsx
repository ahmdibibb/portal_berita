import { UsersManagement } from "@/components/admin/users-management";
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

export default function UsersPage() {
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
            Kelola Pengguna
          </h1>
          <p className="text-gray-600">
            Kelola role dan status pengguna dalam sistem
          </p>
        </div>

        {/* Users Management Component */}
        <Card>
          <CardContent className="p-6">
            <UsersManagement />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
