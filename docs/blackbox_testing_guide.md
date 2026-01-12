# Panduan Blackbox Testing - Portal Berita

Dokumen ini berisi panduan dan skenario pengujian Blackbox untuk aplikasi Portal Berita. Blackbox testing berfokus pada fungsionalitas aplikasi tanpa melihat kode internalnya.

## 📋 Persiapan

1.  Pastikan server berjalan: `npm run dev`
2.  Buka browser dan akses: `http://localhost:3000`
3.  Siapkan dua akun untuk pengujian:
    *   **Akun Admin** (untuk fitur dashboard & moderasi)
    *   **Akun User Biasa** (untuk fitur komentar & save)

---

## 🧪 Skenario Pengujian

Gunakan tabel di bawah ini untuk mencatat hasil pengujian.

### 1. Autentikasi (Authentication)

| ID | Fitur | Langkah Pengujian | Ekspektasi Hasil | Status (Pass/Fail) |
| :--- | :--- | :--- | :--- | :--- |
| **AUTH-01** | **Register** | 1. Buka halaman Register<br>2. Masukkan nama, email valid, password<br>3. Klik tombol Daftar | Akun berhasil dibuat, redirect ke halaman Login atau Home. | |
| **AUTH-02** | **Register (Invalid)** | 1. Buka halaman Register<br>2. Kosongkan salah satu field<br>3. Klik tombol Daftar | Muncul pesan error validasi (wajib diisi). | |
| **AUTH-03** | **Login** | 1. Buka halaman Login<br>2. Masukkan email & password yang benar<br>3. Klik Login | Masuk ke halaman utama, navbar berubah (ada profil). | |
| **AUTH-04** | **Login (Gagal)** | 1. Masukkan password salah<br>2. Klik Login | Muncul pesan error "Invalid credentials". | |
| **AUTH-05** | **Logout** | 1. Klik avatar profil<br>2. Pilih "Logout" | Sesi berakhir, kembali ke posisi guest (tombol Login muncul). | |

### 2. Berita & Tampilan (News Features)

| ID | Fitur | Langkah Pengujian | Ekspektasi Hasil | Status (Pass/Fail) |
| :--- | :--- | :--- | :--- | :--- |
| **NEWS-01** | **Homepage** | 1. Buka halaman utama | Daftar berita muncul, gambar termuat, loading tidak macet. | |
| **NEWS-02** | **Detail Berita** | 1. Klik salah satu kartu berita | Masuk ke detail berita. Teks **rata kanan-kiri (justify)** dan rapi. | |
| **NEWS-03** | **Kategori** | 1. Klik tab kategori (misal: "Teknologi") | Hanya berita kategori tersebut yang muncul. | |
| **NEWS-04** | **Pencarian** | 1. Ketik kata kunci di search bar<br>2. Tekan Enter | Muncul hasil berita yang mengandung kata kunci tersebut. | |

### 3. Interaksi Pengguna (User Interactions)

> **Prasyarat:** Harus Login sebagai User Biasa.

| ID | Fitur | Langkah Pengujian | Ekspektasi Hasil | Status (Pass/Fail) |
| :--- | :--- | :--- | :--- | :--- |
| **INT-01** | **Komentar** | 1. Buka detail berita<br>2. Tulis komentar di kolom bawah<br>3. Kirim | Komentar muncul (atau status "Menunggu Moderasi" jika ada fitur itu). | |
| **INT-02** | **Like Berita** | 1. Klik ikon "Like" (Jempol/Hati) di berita | Counter like bertambah 1. Ikon berubah warna. | |
| **INT-03** | **Save Berita** | 1. Klik ikon "Bookmark/Save"<br>2. Buka profil -> "Berita Disimpan" | Berita tersebut ada di daftar simpanan. | |
| **INT-04** | **Unsave** | 1. Klik ikon Save lagi pada berita tersimpan | Berita hilang dari daftar simpanan. | |

### 4. Fitur Admin (Admin Dashboard)

> **Prasyarat:** Harus Login sebagai Admin (ubah role di database jika belum punya akun admin).

| ID | Fitur | Langkah Pengujian | Ekspektasi Hasil | Status (Pass/Fail) |
| :--- | :--- | :--- | :--- | :--- |
| **ADM-01** | **Akses Dashboard** | 1. Akses URL `/admin` atau klik menu Admin | Halaman dashboard admin terbuka. User biasa tidak bisa akses (Redirect/403). | |
| **ADM-02** | **Create News** | 1. Masuk menu "Buat Berita"<br>2. Isi Judul, Konten, Upload Gambar<br>3. Publish | Berita berhasil dibuat dan muncul di Homepage. | |
| **ADM-03** | **Manage Users** | 1. Buka daftar pengguna<br>2. Coba hapus/edit user | Perubahan tersimpan di database. | |

---

## 🐛 Template Laporan Bug

Jika menemukan bug (Status = Fail), catat dengan format ini:

*   **Judul Bug:** (Contoh: Tombol Like tidak merespon saat diklik cepat)
*   **Skenario ID:** (Contoh: INT-02)
*   **Langkah Reproduksi:**
    1. Login
    2. Buka Berita A
    3. Klik Like 5 kali dengan cepat
*   **Hasil Aktual:** Counter tidak bertambah, error di console.
*   **Hasil yang Diharapkan:** Counter bertambah 1 kali, atau disable tombol setelah klik.
