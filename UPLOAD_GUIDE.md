# Panduan Upload Berita - Portal Berita

## 🚀 **Fitur Upload yang Tersedia**

### **Tipe File yang Didukung:**

- ✅ **JPEG/JPG** - Format gambar standar
- ✅ **PNG** - Format gambar dengan transparansi
- ✅ **WebP** - Format gambar modern yang efisien
- ✅ **GIF** - Format gambar animasi

### **Batasan File:**

- 📏 **Ukuran Maksimal:** 10MB per file
- 🖼️ **Resolusi:** Tidak dibatasi (akan dioptimasi otomatis)
- 📁 **Lokasi Penyimpanan:** `/public/uploads/`

## 🔧 **Cara Upload Gambar**

### **Metode 1: Upload File Lokal**

1. Klik area "Upload Gambar" pada form
2. Pilih file gambar dari komputer
3. Atau drag & drop file ke area upload
4. Tunggu proses upload selesai

### **Metode 2: Input URL Gambar**

1. Klik tombol "Input URL"
2. Masukkan URL gambar yang valid
3. Pastikan URL dapat diakses publik

## ⚠️ **Masalah Umum & Solusi**

### **1. File Terlalu Besar**

**Gejala:** Error "Ukuran file terlalu besar"
**Solusi:**

- Kompres gambar sebelum upload
- Gunakan format WebP yang lebih efisien
- Resize gambar ke ukuran yang lebih kecil

### **2. Format File Tidak Didukung**

**Gejala:** Error "Tipe file tidak didukung"
**Solusi:**

- Konversi ke format JPEG, PNG, atau WebP
- Gunakan tool online seperti convertio.co
- Pastikan ekstensi file sesuai dengan tipe file

### **3. Upload Gagal**

**Gejala:** Error "Upload gagal"
**Solusi:**

- Periksa koneksi internet
- Coba upload file yang lebih kecil
- Refresh halaman dan coba lagi
- Periksa console browser untuk error detail

### **4. Gambar Tidak Muncul**

**Gejala:** Gambar tidak tampil setelah upload
**Solusi:**

- Periksa apakah file tersimpan di `/public/uploads/`
- Pastikan permission folder uploads benar
- Coba upload ulang gambar

## 🛠️ **Troubleshooting Lanjutan**

### **Periksa Console Browser:**

1. Buka Developer Tools (F12)
2. Lihat tab Console
3. Cari error yang terkait upload

### **Periksa Network Tab:**

1. Buka Developer Tools (F12)
2. Lihat tab Network
3. Coba upload dan lihat request ke `/api/upload`
4. Periksa response dari server

### **Periksa File System:**

1. Pastikan folder `/public/uploads/` ada
2. Pastikan folder memiliki permission write
3. Pastikan ada file `.gitkeep` di folder uploads

## 📱 **Tips Upload yang Baik**

### **Optimasi Gambar:**

- **Resolusi:** 1200x800px untuk berita (cukup untuk web)
- **Format:** WebP untuk efisiensi, JPEG untuk kompatibilitas
- **Ukuran:** Kompres hingga di bawah 1MB untuk loading cepat

### **Nama File:**

- Gunakan nama yang deskriptif
- Hindari spasi dan karakter khusus
- Gunakan bahasa Inggris untuk kompatibilitas

### **Kualitas Gambar:**

- Pastikan gambar jelas dan tidak blur
- Gunakan gambar yang relevan dengan konten
- Pertimbangkan aspek ratio yang baik

## 🔒 **Keamanan Upload**

### **Validasi Server:**

- ✅ Tipe file divalidasi
- ✅ Ukuran file dibatasi
- ✅ Nama file dibuat unik
- ✅ File disimpan di folder yang aman

### **Best Practices:**

- Jangan upload file executable
- Gunakan gambar dari sumber yang terpercaya
- Backup gambar penting secara terpisah

## 📞 **Bantuan Tambahan**

Jika masih mengalami masalah:

1. Periksa log error di console
2. Coba dengan file gambar yang berbeda
3. Periksa koneksi internet
4. Hubungi admin sistem

---

**Versi:** 1.0  
**Update Terakhir:** Desember 2024  
**Dibuat oleh:** Portal Berita Team
