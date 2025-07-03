"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Beranda", href: "/" },
  { name: "Olahraga", href: "/category/olahraga" },
  { name: "Otomotif", href: "/category/otomotif" },
  { name: "Kesehatan", href: "/category/kesehatan" },
  { name: "Politik", href: "/category/politik" },
  { name: "Teknologi", href: "/category/teknologi" },
  { name: "Ekonomi", href: "/category/ekonomi" },
];

const moreCategories = [
  { name: "Pendidikan", href: "/category/pendidikan" },
  { name: "Hiburan", href: "/category/hiburan" },
  { name: "Kuliner", href: "/category/kuliner" },
  { name: "Travel", href: "/category/travel" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  "text-blue-800 hover:bg-blue-50 hover:text-blue-700",
                  activeCategory === category.name 
                    ? "bg-blue-50 text-blue-700 font-semibold border-b-2 border-blue-500" 
                    : ""
                )}
                onClick={() => setActiveCategory(category.name)}
              >
                {category.name}
              </Link>
            ))}

            {/* More Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 text-blue-800 hover:bg-blue-50 hover:text-blue-700"
                >
                  <span>Lainnya</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[180px] shadow-lg border border-gray-100">
                {moreCategories.map((category) => (
                  <DropdownMenuItem key={category.name} asChild>
                    <Link
                      href={category.href}
                      className="cursor-pointer px-3 py-2 text-sm text-blue-800 hover:bg-blue-50"
                      onClick={() => setActiveCategory(category.name)}
                    >
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Trending Topics */}
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <span className="text-gray-500 font-medium">Trending:</span>
            <div className="flex items-center space-x-3">
              <Link
                href="/search?q=pemilu"
                className="text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
              >
                #Pemilu2024
              </Link>
              <Link
                href="/search?q=teknologi"
                className="text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
              >
                #TeknologiAI
              </Link>
              <Link
                href="/search?q=olahraga"
                className="text-sm font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
              >
                #TimNasional
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-blue-800 hover:bg-blue-50 hover:text-blue-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="ml-2 font-medium">Kategori</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 bg-white">
            <div className="grid grid-cols-2 gap-2">
              {[...categories, ...moreCategories].map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={cn(
                    "px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                    "text-blue-800 hover:bg-blue-50",
                    activeCategory === category.name && "bg-blue-50 font-semibold"
                  )}
                  onClick={() => {
                    setActiveCategory(category.name);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Mobile Trending */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Trending Topics
              </span>
              <div className="flex flex-wrap gap-2 mt-3">
                <Link
                  href="/search?q=pemilu"
                  className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                >
                  #Pemilu2024
                </Link>
                <Link
                  href="/search?q=teknologi"
                  className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                >
                  #TeknologiAI
                </Link>
                <Link
                  href="/search?q=olahraga"
                  className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                >
                  #TimNasional
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}