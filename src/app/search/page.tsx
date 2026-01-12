import { SearchResults } from "@/components/search-results";
import { SearchFilters } from "@/components/search-filters";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const category = params.category || "";
  const sort = params.sort || "relevance";
  const page = Number(params.page) || 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Hasil Pencarian
          </h1>
          {query && (
            <p className="text-lg text-muted-foreground">
              Menampilkan hasil untuk: <span className="font-semibold text-foreground">&quot;{query}&quot;</span>
            </p>
          )}
        </div>

        {/* Search Results - Full Width */}
        <div>
          <SearchResults
            query={query}
            category={category}
            sort={sort}
            page={page}
          />
        </div>
      </div>
    </div>
  );
}
