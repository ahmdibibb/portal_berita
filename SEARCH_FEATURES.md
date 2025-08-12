# Fitur Search Portal Berita

## 🚀 **Fitur yang Tersedia**

### **1. Search Bar di Header**

- **Lokasi:** Header utama website (desktop dan mobile)
- **Fungsi:** Input pencarian dengan tombol search
- **Navigasi:** Otomatis redirect ke halaman search dengan query

### **2. Halaman Search Lengkap**

- **URL:** `/search?q=[query]`
- **Fitur:**
  - Hasil pencarian real-time
  - Filter berdasarkan kategori
  - Sorting (Relevansi, Terbaru, Terlama, Terpopuler)
  - Pagination
  - Sidebar filter

### **3. Halaman Search Sederhana**

- **URL:** `/search/simple`
- **Fitur:** Search box dengan trending topics

## 🔍 **Cara Penggunaan**

### **Pencarian Dasar**

1. Ketik kata kunci di search bar header
2. Tekan Enter atau klik tombol search
3. Akan diarahkan ke halaman hasil pencarian

### **Filter dan Sorting**

1. **Kategori:** Pilih kategori spesifik dari sidebar
2. **Urutan:** Pilih cara pengurutan hasil
3. **Halaman:** Navigasi antar halaman hasil

### **Trending Topics**

- Klik hashtag trending untuk pencarian cepat
- Contoh: #Pemilu2024, #TeknologiAI, #TimNasional

## 📱 **Responsive Design**

### **Desktop**

- Search bar di header utama
- Sidebar filter di sebelah kiri
- Hasil pencarian di sebelah kanan

### **Mobile**

- Search bar dapat di-toggle
- Filter dan hasil dalam layout vertikal
- Optimized untuk layar kecil

## 🛠️ **Komponen Teknis**

### **SearchBar Component**

```typescript
// Lokasi: src/components/search-bar.tsx
// Fitur: Input search dengan form submission
// Props: placeholder, className
```

### **SearchResults Component**

```typescript
// Lokasi: src/components/search-results.tsx
// Fitur: Menampilkan hasil pencarian
// Props: query, category, sort, page
```

### **SearchFilters Component**

```typescript
// Lokasi: src/components/search-filters.tsx
// Fitur: Filter kategori dan sorting
// Props: currentCategory, currentSort, searchQuery
```

## 🔧 **API Endpoint**

### **Search News API**

```
GET /api/news?search=[query]&category=[category]&sort=[sort]&page=[page]&limit=[limit]
```

**Parameter:**

- `search`: Kata kunci pencarian
- `category`: Filter kategori (opsional)
- `sort`: Pengurutan (relevance, newest, oldest, popular)
- `page`: Nomor halaman
- `limit`: Jumlah item per halaman

**Response:**

```json
{
  "data": [...],
  "total": 100,
  "page": 1,
  "limit": 12
}
```

## 📊 **Fitur Pencarian**

### **Search Scope**

- **Judul Berita:** Pencarian di judul artikel
- **Excerpt:** Pencarian di ringkasan berita
- **Konten:** Pencarian di isi berita lengkap

### **Search Algorithm**

- Case-insensitive search
- Partial matching
- Relevance scoring berdasarkan judul

### **Filter Options**

- **Kategori:** Semua kategori yang tersedia
- **Sorting:** 4 opsi pengurutan
- **Pagination:** 12 item per halaman

## 🎨 **UI/UX Features**

### **Loading States**

- Skeleton loading untuk hasil pencarian
- Loading indicator untuk filter

### **Empty States**

- Pesan ketika tidak ada hasil
- Saran pencarian alternatif

### **Error Handling**

- Error message yang informatif
- Tombol retry untuk error

## 🚀 **Cara Testing**

### **1. Test Search Bar Header**

1. Buka website utama
2. Ketik kata kunci di search bar
3. Tekan Enter atau klik search
4. Pastikan redirect ke `/search?q=[query]`

### **2. Test Search Page**

1. Buka `/search?q=test`
2. Pastikan hasil pencarian muncul
3. Test filter kategori
4. Test sorting options
5. Test pagination

### **3. Test Mobile Search**

1. Buka website di mobile
2. Klik icon search di header
3. Pastikan search bar muncul
4. Test pencarian mobile

## 🔍 **Troubleshooting**

### **Search Tidak Berfungsi**

1. Periksa console browser untuk error
2. Pastikan API endpoint `/api/news` berfungsi
3. Periksa network tab untuk request/response

### **Hasil Tidak Muncul**

1. Pastikan ada berita di database
2. Periksa query parameter di URL
3. Test dengan kata kunci yang berbeda

### **Filter Tidak Berfungsi**

1. Periksa API categories
2. Pastikan parameter URL benar
3. Test dengan browser developer tools

## 📈 **Performance**

### **Optimization**

- Lazy loading untuk hasil
- Debounced search input
- Efficient API calls
- Proper error boundaries

### **Caching**

- Recent searches di localStorage
- API response caching
- Optimized re-renders

## 🔮 **Fitur Masa Depan**

### **Advanced Search**

- Full-text search
- Boolean operators
- Date range filtering
- Author filtering

### **Search Analytics**

- Search trends
- Popular queries
- User search behavior

### **AI-Powered Search**

- Semantic search
- Related articles
- Smart suggestions

---

**Versi:** 1.0  
**Update Terakhir:** Desember 2024  
**Status:** ✅ Production Ready
