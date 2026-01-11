import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthProvider, RouteProgress } from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
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
        <ThemeProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              {/* Sticky Header with subtle shadow */}
              <div className="sticky top-0 z-50 bg-white dark:bg-card shadow-sm border-b border-blue-100 dark:border-border">
                {/* Route Progress Bar */}
                <div id="route-progress" className="route-progress hidden" />
                <Header />
                <Navbar />
                {/* Route progress controller */}
                <RouteProgress />
              </div>

              {/* Main Content with Container */}
              <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                  <div className="bg-white dark:bg-card rounded-lg shadow-sm border border-blue-50 dark:border-border p-6">
                    {children}
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
        </ThemeProvider>
      </body>
    </html>
  );
}
