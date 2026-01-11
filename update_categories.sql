-- Script SQL untuk update database portal berita
-- Menambahkan kategori yang sesuai dengan navbar

-- 1. Hapus data kategori yang ada (jika ada)
DELETE FROM "Like" WHERE "newsId" IN (SELECT id FROM "News");
DELETE FROM "Comment" WHERE "newsId" IN (SELECT id FROM "News");
DELETE FROM "News";
DELETE FROM "Category";

-- 2. Reset auto-increment untuk tabel Category
ALTER SEQUENCE "Category_id_seq" RESTART WITH 1;

-- 3. Insert kategori baru sesuai dengan navbar
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
(11, 'Travel', 'travel', 'Berita seputar wisata dan perjalanan', NOW(), NOW());

-- 4. Insert beberapa berita contoh untuk testing
INSERT INTO "News" (id, title, excerpt, content, slug, image, status, "categoryId", "authorId", "publishedAt", "createdAt", "updatedAt") VALUES
(1, 'Teknologi AI Terbaru di Indonesia', 'Perkembangan teknologi AI yang revolusioner di Indonesia', 'Indonesia kini menjadi pusat pengembangan teknologi AI yang revolusioner. Dengan dukungan dari berbagai universitas dan perusahaan teknologi, negeri ini berhasil menciptakan inovasi-inovasi yang mengagumkan dalam bidang artificial intelligence. Teknologi ini tidak hanya membantu dalam efisiensi bisnis, tetapi juga memberikan solusi untuk berbagai masalah sosial dan lingkungan.', 'teknologi-ai-terbaru-indonesia', '/uploads/ai-tech.jpg', 'published', 6, 1, NOW(), NOW(), NOW()),

(2, 'Pertandingan Sepak Bola Liga Indonesia', 'Tim favorit berhasil meraih kemenangan gemilang', 'Tim favorit berhasil meraih kemenangan gemilang dalam pertandingan Liga Indonesia yang seru. Dengan strategi yang matang dan kerja tim yang solid, mereka berhasil mengalahkan lawan dengan skor yang meyakinkan. Pertandingan ini menjadi bukti bahwa sepak bola Indonesia terus berkembang dan semakin profesional.', 'pertandingan-sepak-bola-liga-indonesia', '/uploads/football-match.jpg', 'published', 2, 1, NOW(), NOW(), NOW()),

(3, 'Tips Kesehatan di Era Digital', 'Panduan lengkap menjaga kesehatan di tengah kemajuan teknologi', 'Di era digital yang serba cepat ini, menjaga kesehatan menjadi tantangan tersendiri. Artikel ini memberikan panduan lengkap tentang bagaimana tetap sehat sambil tetap produktif dengan teknologi. Mulai dari pola makan, olahraga, hingga manajemen stres, semua dibahas secara detail dan praktis.', 'tips-kesehatan-era-digital', '/uploads/health-tips.jpg', 'published', 4, 1, NOW(), NOW(), NOW()),

(4, 'Ekonomi Indonesia di Tahun 2024', 'Analisis mendalam pertumbuhan ekonomi Indonesia', 'Ekonomi Indonesia menunjukkan pertumbuhan yang positif di tahun 2024. Dengan berbagai kebijakan yang tepat dan dukungan dari sektor swasta, negeri ini berhasil mengatasi berbagai tantangan global. Artikel ini menganalisis faktor-faktor yang mendorong pertumbuhan dan prospek ke depannya.', 'ekonomi-indonesia-2024', '/uploads/economy-chart.jpg', 'published', 7, 1, NOW(), NOW(), NOW()),

(5, 'Destinasi Wisata Terpopuler', 'Rekomendasi tempat wisata yang wajib dikunjungi', 'Indonesia memiliki begitu banyak destinasi wisata yang menakjubkan. Dari pantai yang indah hingga gunung yang megah, setiap tempat memiliki keunikan tersendiri. Artikel ini merekomendasikan tempat-tempat wisata terpopuler yang wajib dikunjungi, lengkap dengan tips dan informasi praktis untuk perjalanan yang menyenangkan.', 'destinasi-wisata-terpopuler', '/uploads/travel-destination.jpg', 'published', 11, 1, NOW(), NOW(), NOW());

-- 5. Reset auto-increment untuk tabel News
ALTER SEQUENCE "News_id_seq" RESTART WITH 6;

-- 6. Verifikasi data yang telah diinsert
SELECT 'Categories:' as info, COUNT(*) as count FROM "Category"
UNION ALL
SELECT 'News:', COUNT(*) FROM "News";

-- 7. Tampilkan kategori yang telah diinsert
SELECT id, name, slug FROM "Category" ORDER BY id;

-- 8. Tampilkan berita yang telah diinsert
SELECT n.id, n.title, c.name as category, n.status 
FROM "News" n 
JOIN "Category" c ON n."categoryId" = c.id 
ORDER BY n.id;

