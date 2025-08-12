import { SearchBox } from "@/components/search-box";

export default function SimpleSearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cari Berita</h1>
          <p className="text-lg text-gray-600 mb-8">
            Temukan berita terbaru dan terpercaya sesuai dengan yang Anda cari
          </p>

          <SearchBox
            placeholder="Ketik kata kunci berita yang ingin Anda cari..."
            className="mb-8"
          />

          <div className="text-sm text-gray-500">
            <p>💡 Tips pencarian:</p>
            <ul className="mt-2 space-y-1">
              <li>
                • Gunakan kata kunci yang spesifik untuk hasil yang lebih akurat
              </li>
              <li>• Gunakan tanda kutip untuk pencarian yang tepat</li>
              <li>• Coba kata kunci yang berbeda jika tidak ada hasil</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
