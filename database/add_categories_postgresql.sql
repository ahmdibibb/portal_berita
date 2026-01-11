-- Script SQL untuk PostgreSQL - Menambahkan kategori yang sesuai dengan navbar
-- Jalankan script ini di database PostgreSQL Anda

-- 1. Insert kategori yang belum ada (dengan ON CONFLICT DO NOTHING untuk PostgreSQL)
INSERT INTO "Category" (id, name, slug, description, "createdAt", "updatedAt") VALUES
(1, 'Beranda', 'beranda', 'Berita utama dan headline', NOW(), NOW()),
(2, 'Olahraga', 'olahraga', 'Berita seputar olahraga dan pertandingan', NOW(), NOW()),
(3, 'Otomotif', 'otomotif', 'Berita seputar mobil, motor, dan transportasi', NOW(), NOW()),
(4, 'Kesehatan', 'kesehatan', 'Berita seputar kesehatan dan medis', NOW(), NOW()),
(5, 'Politik', 'politik', 'Berita seputar politik dan pemerintahan', NOW(), NOW()),
(6, 'Teknologi', 'teknologi', 'Berita seputar teknologi dan inovasi', NOW(), NOW()),
(7, 'Ekonomi', 'ekonomi', 'Berita seputar ekonomi dan bisnis', NOW(), NOW()),
(8, 'Pendidikan', 'pendidikan', 'Berita seputar pendidikan dan akademik', NOW(), NOW()),
(9, 'Hiburan', 'hiburan', 'Berita seputar hiburan dan selebriti', NOW(), NOW()),
(10, 'Kuliner', 'kuliner', 'Berita seputar makanan dan kuliner', NOW(), NOW()),
(11, 'Travel', 'travel', 'Berita seputar wisata dan perjalanan', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. Update kategori yang sudah ada dengan nama yang benar
UPDATE "Category" SET 
    name = 'Beranda',
    slug = 'beranda',
    description = 'Berita utama dan headline',
    "updatedAt" = NOW()
WHERE id = 1;

UPDATE "Category" SET 
    name = 'Olahraga',
    slug = 'olahraga',
    description = 'Berita seputar olahraga dan pertandingan',
    "updatedAt" = NOW()
WHERE id = 2;

UPDATE "Category" SET 
    name = 'Otomotif',
    slug = 'otomotif',
    description = 'Berita seputar mobil, motor, dan transportasi',
    "updatedAt" = NOW()
WHERE id = 3;

UPDATE "Category" SET 
    name = 'Kesehatan',
    slug = 'kesehatan',
    description = 'Berita seputar kesehatan dan medis',
    "updatedAt" = NOW()
WHERE id = 4;

UPDATE "Category" SET 
    name = 'Politik',
    slug = 'politik',
    description = 'Berita seputar politik dan pemerintahan',
    "updatedAt" = NOW()
WHERE id = 5;

UPDATE "Category" SET 
    name = 'Teknologi',
    slug = 'teknologi',
    description = 'Berita seputar teknologi dan inovasi',
    "updatedAt" = NOW()
WHERE id = 6;

UPDATE "Category" SET 
    name = 'Ekonomi',
    slug = 'ekonomi',
    description = 'Berita seputar ekonomi dan bisnis',
    "updatedAt" = NOW()
WHERE id = 7;

UPDATE "Category" SET 
    name = 'Pendidikan',
    slug = 'pendidikan',
    description = 'Berita seputar pendidikan dan akademik',
    "updatedAt" = NOW()
WHERE id = 8;

UPDATE "Category" SET 
    name = 'Hiburan',
    slug = 'hiburan',
    description = 'Berita seputar hiburan dan selebriti',
    "updatedAt" = NOW()
WHERE id = 9;

UPDATE "Category" SET 
    name = 'Kuliner',
    slug = 'kuliner',
    description = 'Berita seputar makanan dan kuliner',
    "updatedAt" = NOW()
WHERE id = 10;

UPDATE "Category" SET 
    name = 'Travel',
    slug = 'travel',
    description = 'Berita seputar wisata dan perjalanan',
    "updatedAt" = NOW()
WHERE id = 11;

-- 3. Verifikasi data yang telah diupdate
SELECT 'Categories:' as info, COUNT(*) as count FROM "Category"
UNION ALL
SELECT 'News:', COUNT(*) FROM "News";

-- 4. Tampilkan kategori yang telah diupdate
SELECT id, name, slug, description FROM "Category" ORDER BY id;

-- 5. Tampilkan berita yang ada (jika ada)
SELECT n.id, n.title, c.name as category, n.status 
FROM "News" n 
JOIN "Category" c ON n."categoryId" = c.id 
ORDER BY n.id;

