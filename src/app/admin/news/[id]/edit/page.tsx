"use client";

import { use } from "react";
import dynamic from "next/dynamic";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Dynamic import dengan no SSR untuk mencegah hydration error
const EditNewsForm = dynamic(
  () =>
    import("@/components/admin/edit-news-form").then((mod) => ({
      default: mod.EditNewsForm,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Memuat...
          </Button>
        </div>
      </div>
    ),
  }
);

interface EditNewsPageProps {
  params: {
    id: string;
  };
}

export default function EditNewsPage({ params }: EditNewsPageProps) {
  const { id } = use(params);

  return (
    <div className="container mx-auto py-8" suppressHydrationWarning>
      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Berita</CardTitle>
          <CardDescription>
            Perbarui informasi berita yang sudah ada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditNewsForm newsId={id} />
        </CardContent>
      </Card>
    </div>
  );
}
