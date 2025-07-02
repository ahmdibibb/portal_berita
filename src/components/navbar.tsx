"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const categories = [
  { name: "Beranda", href: "/" },
  { name: "Olahraga", href: "/category/olahraga" },
  { name: "Otomotif", href: "/category/otomotif" },
  { name: "Kesehatan", href: "/category/kesehatan" },
  { name: "Politik", href: "/category/politik" },
  { name: "Teknologi", href: "/category/teknologi" },
  { name: "Ekonomi", href: "/category/ekonomi" },
]

const moreCategories = [
  { name: "Pendidikan", href: "/category/pendidikan" },
  { name: "Hiburan", href: "/category/hiburan" },
  { name: "Kuliner", href: "/category/kuliner" },
  { name: "Travel", href: "/category/travel" },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
              >
                {category.name}
              </Link>
            ))}

            {/* More Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <span>Lainnya</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {moreCategories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link href={category.href} className="cursor-pointer">
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Trending Topics */}
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <span className="text-gray-500">Trending:</span>
            <div className="flex items-center space-x-3">
              <Link href="/search?q=pemilu" className="text-red-600 hover:underline">
                #Pemilu2024
              </Link>
              <Link href="/search?q=teknologi" className="text-blue-600 hover:underline">
                #TeknologiAI
              </Link>
              <Link href="/search?q=olahraga" className="text-green-600 hover:underline">
                #TimNasional
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="ml-2">Kategori</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t bg-gray-50">
            <div className="grid grid-cols-2 gap-2">
              {[...categories, ...moreCategories].map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-white rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Mobile Trending */}
            <div className="mt-4 pt-4 border-t">
              <span className="text-xs text-gray-500 font-medium">TRENDING TOPICS</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <Link href="/search?q=pemilu" className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                  #Pemilu2024
                </Link>
                <Link href="/search?q=teknologi" className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  #TeknologiAI
                </Link>
                <Link href="/search?q=olahraga" className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  #TimNasional
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
