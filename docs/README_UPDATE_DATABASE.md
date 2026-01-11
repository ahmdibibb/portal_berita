# 📚 Panduan Update Database Portal Berita

## 🎯 **Tujuan**

Mengupdate database agar kategori yang tersedia sesuai dengan yang ada di navbar website, sehingga fitur upload dan edit news berjalan lancar tanpa error.

## 🔍 **Masalah yang Ditemukan**

- Kategori yang dipilih saat upload news tidak sesuai dengan yang ditampilkan
- Database belum memiliki kategori yang lengkap sesuai navbar
- Fitur edit news mengalami error karena kategori tidak ditemukan

## 📋 **Kategori yang Diperlukan**

Berdasarkan navbar website, kategori yang harus tersedia:

1. **Beranda** - Berita utama dan headline
2. **Olahraga** - Berita seputar olahraga dan pertandingan
3. **Otomotif** - Berita seputar mobil, motor, dan transportasi
4. **Kesehatan** - Berita seputar kesehatan dan medis
5. **Politik** - Berita seputar politik dan pemerintahan
6. **Teknologi** - Berita seputar teknologi dan inovasi
7. **Ekonomi** - Berita seputar ekonomi dan bisnis
8. **Pendidikan** - Berita seputar pendidikan dan akademik
9. **Hiburan** - Berita seputar hiburan dan selebriti
10. **Kuliner** - Berita seputar makanan dan kuliner
11. **Travel** - Berita seputar wisata dan perjalanan

## 🗄️ **Script SQL yang Tersedia**

### **1. PostgreSQL (Recommended)**

```bash
# File: add_categories_postgresql.sql
# Gunakan jika menggunakan PostgreSQL
```

### **2. MySQL**

```bash
# File: add_categories_mysql.sql
# Gunakan jika menggunakan MySQL
```

### **3. Script Aman (Tidak Hapus Data)**

```bash
# File: add_categories_safe.sql
# Hanya menambahkan kategori yang belum ada
```

### **4. Script Lengkap (Hapus Semua Data)**

```bash
# File: update_categories.sql
# ⚠️ PERHATIAN: Menghapus semua data existing
```

## 🚀 **Cara Menjalankan Script**

### **Option 1: Menggunakan Command Line**

#### **PostgreSQL:**

```bash
# Masuk ke database
psql -U username -d database_name

# Jalankan script
\i add_categories_postgresql.sql

# Atau copy-paste langsung
```

#### **MySQL:**

```bash
# Masuk ke database
mysql -u username -p database_name

# Jalankan script
source add_categories_mysql.sql;

# Atau copy-paste langsung
```

### **Option 2: Menggunakan GUI Tool**

#### **PostgreSQL (pgAdmin):**

1. Buka pgAdmin
2. Connect ke database
3. Buka Query Tool
4. Copy-paste script SQL
5. Klik Execute

#### **MySQL (phpMyAdmin/MySQL Workbench):**

1. Buka phpMyAdmin atau MySQL Workbench
2. Pilih database
3. Buka tab SQL
4. Copy-paste script SQL
5. Klik Go/Execute

### **Option 3: Menggunakan Prisma Studio**

```bash
# Install Prisma Studio
npx prisma studio

# Buka browser dan akses http://localhost:5555
# Tambahkan kategori manual melalui interface
```

## ✅ **Verifikasi Update Berhasil**

Setelah menjalankan script, jalankan query ini untuk memastikan:

```sql
-- Cek jumlah kategori
SELECT COUNT(*) as total_categories FROM "Category";

-- Cek kategori yang tersedia
SELECT id, name, slug FROM "Category" ORDER BY id;

-- Cek berita yang ada
SELECT n.id, n.title, c.name as category
FROM "News" n
JOIN "Category" c ON n."categoryId" = c.id;
```

**Hasil yang Diharapkan:**

- Total kategori: 11
- Semua nama kategori sesuai dengan navbar
- Berita yang ada terhubung dengan kategori yang benar

## 🔧 **Troubleshooting**

### **Error: "relation does not exist"**

- Pastikan nama tabel benar (Case sensitive di PostgreSQL)
- Gunakan `"Category"` bukan `category` untuk PostgreSQL
- Gunakan `Category` untuk MySQL

### **Error: "duplicate key value"**

- Gunakan script dengan `ON CONFLICT DO NOTHING` (PostgreSQL)
- Atau `INSERT IGNORE` (MySQL)

### **Error: "permission denied"**

- Pastikan user database memiliki permission INSERT/UPDATE
- Gunakan user dengan privilege yang cukup

## 🎉 **Setelah Update Berhasil**

1. **Restart Development Server:**

   ```bash
   npm run dev
   ```

2. **Test Fitur Upload News:**

   - Buka `/admin/news/create`
   - Pilih kategori dari dropdown
   - Pastikan kategori sesuai dengan navbar

3. **Test Fitur Edit News:**

   - Buka `/admin/news`
   - Klik tombol Edit pada berita apapun
   - Pastikan form ter-load dengan data yang benar

4. **Test Frontend:**
   - Buka halaman kategori (misal: `/category/teknologi`)
   - Pastikan berita ditampilkan sesuai kategori

## 📝 **Catatan Penting**

- **Backup database** sebelum menjalankan script
- **Pilih script yang sesuai** dengan database yang digunakan
- **Test di environment development** terlebih dahulu
- **Verifikasi data** setelah update berhasil

## 🆘 **Jika Masih Ada Error**

1. **Cek log database** untuk error detail
2. **Verifikasi struktur tabel** dengan `\d "Category"` (PostgreSQL) atau `DESCRIBE Category` (MySQL)
3. **Pastikan Prisma schema** sesuai dengan struktur database
4. **Restart Prisma** dengan `npx prisma generate`

---

**🎯 Goal:** Database memiliki 11 kategori yang sesuai dengan navbar website, sehingga semua fitur berjalan lancar tanpa error.

