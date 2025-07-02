import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "sonner"

// Kombinasi font untuk tampilan lebih premium
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
})

export const metadata: Metadata = {
  title: {
    default: "Portal Berita",
    template: "%s | Portal Berita"
  },
  description: "Portal berita terkini dengan berbagai kategori terupdate",
  keywords: ["berita", "news", "informasi", "update"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://portalberita.com",
    siteName: "Portal Berita",
  },
  twitter: {
    card: "summary_large_image",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-gray-50">
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-white shadow-sm">
              <Header />
              <Navbar />
            </div>

            {/* Main Content with Container */}
            <main className="flex-1">
              <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-12 gap-6">
                  {/* Main Content Area (2/3 width) */}
                  <div className="col-span-12 lg:col-span-8">
                    {children}
                  </div>
                  
                  {/* Sidebar (1/3 width) */}
                  <aside className="hidden lg:block lg:col-span-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
                      <h3 className="font-serif text-xl font-bold mb-4 border-b pb-2">
                        Berita Terpopuler
                      </h3>
                      {/* Popular news placeholder */}
                      <div className="space-y-4">
                        {[1, 2, 3, 4].map((item) => (
                          <div key={item} className="border-b pb-3 last:border-0">
                            <p className="text-sm text-gray-500">#{item} Trending</p>
                            <h4 className="font-medium hover:text-primary transition-colors">
                              Judul Berita Terpopuler {item}
                            </h4>
                          </div>
                        ))}
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </main>

            {/* Footer */}
            <Footer />
          </div>
          
          {/* Notification Toast */}
          <Toaster 
            position="top-center"
            richColors
            closeButton
          />
        </AuthProvider>
      </body>
    </html>
  )
}