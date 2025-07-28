import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "sonner";

// Font setup
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Portal Berita",
    template: "%s | Portal Berita",
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-blue-50/10">
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            {/* Sticky Header with subtle shadow */}
            <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-blue-100">
              <Header />
              <Navbar />
            </div>

            {/* Main Content with Container */}
            <main className="flex-1">
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-12 gap-6">
                  {/* Main Content Area (2/3 width) */}
                  <div className="col-span-12 lg:col-span-8">
                    <div className="bg-white rounded-lg shadow-sm border border-blue-50 p-6">
                      {children}
                    </div>
                  </div>

                  {/* Sidebar (1/3 width) */}
                  <aside className="hidden lg:block lg:col-span-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-50 sticky top-24">
                      <h3 className="font-serif text-xl font-bold mb-4 pb-2 border-b border-blue-100 text-blue-800">
                        Berita Terpopuler
                      </h3>
                      {/* Popular news */}
                      <div className="space-y-4">
                        {[1, 2, 3, 4].map((item) => (
                          <div
                            key={item}
                            className="border-b border-blue-50 pb-4 last:border-0"
                          >
                            <p className="text-xs font-medium text-blue-500 mb-1">
                              #{item} Trending
                            </p>
                            <h4 className="font-medium text-blue-800 hover:text-blue-600 transition-colors">
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
            toastOptions={{
              style: {
                border: "1px solid #EFF6FF",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
