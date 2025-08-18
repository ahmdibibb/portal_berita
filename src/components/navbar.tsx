"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Beranda", href: "/" },
  { name: "Olahraga", href: "/category/olahraga" },
  { name: "Otomotif", href: "/category/otomotif" },
  { name: "Kesehatan", href: "/category/kesehatan" },
  { name: "Politik", href: "/category/politik" },
  { name: "Teknologi", href: "/category/teknologi" },
  { name: "Ekonomi", href: "/category/ekonomi" },
  { name: "Pendidikan", href: "/category/pendidikan" },
  { name: "Hiburan", href: "/category/hiburan" },
  { name: "Kuliner", href: "/category/kuliner" },
  { name: "Travel", href: "/category/travel" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 border-b border-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  "text-white hover:bg-blue-700/50 hover:text-blue-100",
                  activeCategory === category.name
                    ? "bg-blue-700/50 text-blue-100 font-semibold border-b-2 border-yellow-400"
                    : ""
                )}
                onClick={() => setActiveCategory(category.name)}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-blue-700/50 hover:text-blue-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <span className="font-medium">Menu</span>
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-blue-600 bg-blue-700/30">
            {/* Main Categories Grid */}
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={cn(
                    "px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                    "text-white hover:bg-blue-700/50",
                    activeCategory === category.name &&
                      "bg-blue-700/50 font-semibold border-l-2 border-yellow-400"
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
          </div>
        )}
      </div>
    </nav>
  );
}
