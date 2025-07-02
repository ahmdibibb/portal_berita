"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  { id: "all", name: "Semua" },
  { id: "olahraga", name: "Olahraga" },
  { id: "otomotif", name: "Otomotif" },
  { id: "kesehatan", name: "Kesehatan" },
  { id: "politik", name: "Politik" },
  { id: "teknologi", name: "Teknologi" },
  { id: "ekonomi", name: "Ekonomi" },
]

export function CategoryTabs() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="mb-8">
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
