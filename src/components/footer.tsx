import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Portal Berita</h3>
            <p className="text-gray-400 mb-4">
              Sumber berita terpercaya dengan informasi terkini dari berbagai kategori.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kategori</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/category/olahraga" className="hover:text-white">
                  Olahraga
                </Link>
              </li>
              <li>
                <Link href="/category/otomotif" className="hover:text-white">
                  Otomotif
                </Link>
              </li>
              <li>
                <Link href="/category/kesehatan" className="hover:text-white">
                  Kesehatan
                </Link>
              </li>
              <li>
                <Link href="/category/politik" className="hover:text-white">
                  Politik
                </Link>
              </li>
              <li>
                <Link href="/category/teknologi" className="hover:text-white">
                  Teknologi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Berlangganan</h4>
            <p className="text-gray-400 mb-4">Dapatkan berita terbaru langsung di email Anda.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">Kirim</button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Portal Berita. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
