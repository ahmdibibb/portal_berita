"use client";

import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";
import { AdvancedSearchBar } from "@/components/ui/advanced-search-bar";

const demoSuggestions = [
  {
    id: "1",
    text: "Pemilu 2024",
    type: "trending" as const,
    query: "pemilu 2024",
  },
  {
    id: "2",
    text: "Teknologi AI",
    type: "trending" as const,
    query: "teknologi ai",
  },
  {
    id: "3",
    text: "Tim Nasional",
    type: "trending" as const,
    query: "tim nasional",
  },
  {
    id: "4",
    text: "Ekonomi Indonesia",
    type: "suggestion" as const,
    query: "ekonomi indonesia",
  },
  {
    id: "5",
    text: "Kesehatan Mental",
    type: "suggestion" as const,
    query: "kesehatan mental",
  },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Navbar */}
      <Navbar />

      {/* Demo Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            CNBC-Inspired Component Demo
          </h1>

          {/* Component Showcase */}
          <div className="space-y-12">
            {/* Advanced Search Bar Demo */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Advanced Search Bar Components
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Medium Size (Default)
                  </h3>
                  <AdvancedSearchBar
                    placeholder="Search quotes, news & videos..."
                    suggestions={demoSuggestions}
                    onSearch={(query) => console.log("Search:", query)}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Small Size
                  </h3>
                  <AdvancedSearchBar
                    placeholder="Quick search..."
                    size="sm"
                    suggestions={demoSuggestions}
                    onSearch={(query) => console.log("Search:", query)}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    Large Size
                  </h3>
                  <AdvancedSearchBar
                    placeholder="Search anything..."
                    size="lg"
                    suggestions={demoSuggestions}
                    onSearch={(query) => console.log("Search:", query)}
                  />
                </div>
              </div>
            </section>

            {/* Design Features */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                CNBC-Inspired Design Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-800">
                    Header Features
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Dark blue gradient background</li>
                    <li>• Prominent search bar with placeholder</li>
                    <li>• Real-time clock displays (WIB, WITA, WIT)</li>
                    <li>• Modern sign-in and account creation</li>
                    <li>• Responsive mobile design</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-800">
                    Navbar Features
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Clean category navigation</li>
                    <li>• Dropdown for additional categories</li>
                    <li>• Active state indicators</li>
                    <li>• Mobile-friendly responsive design</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Color Palette */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Color Palette & Design System
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-lg mx-auto mb-2"></div>
                  <span className="text-sm text-gray-600">Primary Blue</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white border-2 border-gray-200 rounded-lg mx-auto mb-2"></div>
                  <span className="text-sm text-gray-600">Clean White</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-400 rounded-lg mx-auto mb-2"></div>
                  <span className="text-sm text-gray-600">Accent Yellow</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
