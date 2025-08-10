import { NewsGrid } from "@/components/news-grid";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Kategori: {slug.charAt(0).toUpperCase() + slug.slice(1)}
        </h1>
        <p className="text-gray-600">
          Berita terbaru dalam kategori{" "}
          {slug.charAt(0).toUpperCase() + slug.slice(1)}
        </p>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Berita {slug.charAt(0).toUpperCase() + slug.slice(1)}
          </h2>
        </div>
        <NewsGrid category={slug} />
      </div>
    </div>
  );
}
