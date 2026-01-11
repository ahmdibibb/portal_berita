"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-12 animate-fade-in-up">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Brand Section */}
          <div className="space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-xl font-bold font-serif text-white">
              Portal Berita
            </h3>
            <p className="text-gray-400 dark:text-gray-300 leading-relaxed">
              Sumber berita terpercaya dengan informasi terkini dari berbagai
              kategori.
            </p>
            <div className="flex space-x-4 justify-center lg:justify-start">
              <Link
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-red-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services Section */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="font-semibold text-lg mb-4 text-white border-b border-gray-800 pb-2 w-full text-center lg:text-left">
              Layanan
            </h4>
            <ul className="space-y-3 w-full">
              {[
                { name: "Tentang Kami", href: "/about" },
                { name: "Kontak", href: "/contact" },
                { name: "Kebijakan Privasi", href: "/privacy" },
                { name: "Syarat & Ketentuan", href: "/terms" },
                { name: "Pedoman Media Siber", href: "/guidelines" },
              ].map((item) => (
                <li key={item.name} className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-blue-300 transition-colors flex-1"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Extra Section (optional, bisa diisi info kontak atau lainnya) */}
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <h4 className="font-semibold text-lg text-white border-b border-gray-800 pb-2 w-full text-center lg:text-left">
              Info Lainnya
            </h4>
            <ul className="space-y-3 w-full">
              <li>
                <Link
                  href="/sitemap"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Peta Situs
                </Link>
              </li>
              <li>
                <Link
                  href="/advertise"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Iklan
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Karir
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800/80 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear || "2025"} Portal Berita. Semua hak
              dilindungi.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end text-xs">
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Peta Situs
              </Link>
              <span className="hidden md:inline-block text-gray-600">|</span>
              <Link
                href="/advertise"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Iklan
              </Link>
              <span className="hidden md:inline-block text-gray-600">|</span>
              <Link
                href="/careers"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Karir
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
