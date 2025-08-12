"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp } from "lucide-react";

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
  showTrending?: boolean;
}

export function SearchBox({
  placeholder = "Cari berita, topik, atau penulis...",
  className = "",
  showTrending = true,
}: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const trendingTopics = [
    { text: "#Pemilu2024", query: "pemilu" },
    { text: "#TeknologiAI", query: "teknologi AI" },
    { text: "#TimNasional", query: "tim nasional" },
    { text: "#EkonomiIndonesia", query: "ekonomi indonesia" },
  ];

  return (
    <div className={className}>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative mb-4">
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pr-20 text-lg py-3 bg-white border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-16 bg-blue-600 hover:bg-blue-700"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {/* Trending Topics */}
      {showTrending && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3 flex items-center justify-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Topik Trending
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {trendingTopics.map((topic, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() =>
                  router.push(`/search?q=${encodeURIComponent(topic.query)}`)
                }
                className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-colors"
              >
                {topic.text}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
