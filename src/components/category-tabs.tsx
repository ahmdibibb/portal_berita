"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, usePathname } from "next/navigation";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) return;
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (e) {
        // ignore
      }
    };
    load();
  }, []);

  // Set active category based on current pathname
  useEffect(() => {
    if (pathname.startsWith("/category/")) {
      const slug = pathname.split("/category/")[1];
      setActiveCategory(slug);
    } else {
      setActiveCategory("all");
    }
  }, [pathname]);

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    if (value === "all") {
      router.push("/");
    } else {
      router.push(`/category/${value}`);
    }
  };

  return (
    <div className="mb-8 animate-fade-in-up">
      <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-2">
          <TabsTrigger
            key="all"
            value="all"
            className="text-xs md:text-sm transition-all"
          >
            Semua
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger
              key={category.slug}
              value={category.slug}
              className="text-xs md:text-sm transition-all"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
