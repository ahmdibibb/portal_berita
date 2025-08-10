"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface Item {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string | null;
  published_at: string | null;
  author: string;
  views?: number;
}

export function HeroSection() {
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/news?limit=1&page=1");
        if (!res.ok) return;
        const json = await res.json();
        const first = (json?.data ?? [])[0];
        if (first) setItem(first);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  if (!item) return null;

  return (
    <section className="mb-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-96">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="destructive" className="bg-red-600">
                BREAKING NEWS
              </Badge>
            </div>
          </div>
          <div className="p-6 lg:p-8 flex flex-col justify-center">
            <div className="flex items-center space-x-2 mb-3">
              <Badge variant="secondary">{item.category}</Badge>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">Terbaru</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight text-gray-900">
              {item.title}
            </h1>

            <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
              {item.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {item.published_at ?? "-"}
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {item.views ?? 0}
                </div>
              </div>
              <Link
                href={`/news/${item.id}`}
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors"
              >
                Baca Selengkapnya →
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {item.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.author}
                  </p>
                  <p className="text-xs text-gray-500">Jurnalis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
