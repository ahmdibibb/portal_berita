import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await hashPassword("admin123");
  const admin = await prisma.user.upsert({
    where: { email: "admin@portalberita.com" },
    update: {},
    create: {
      name: "Administrator",
      email: "admin@portalberita.com",
      password: adminPassword,
      role: "admin",
      status: "active",
    },
  });

  // Create test user
  const userPassword = await hashPassword("user123");
  const user = await prisma.user.upsert({
    where: { email: "user@portalberita.com" },
    update: {},
    create: {
      name: "Test User",
      email: "user@portalberita.com",
      password: userPassword,
      role: "user",
      status: "active",
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "teknologi" },
      update: {},
      create: {
        name: "Teknologi",
        slug: "teknologi",
        description: "Berita seputar teknologi terbaru",
      },
    }),
    prisma.category.upsert({
      where: { slug: "olahraga" },
      update: {},
      create: {
        name: "Olahraga",
        slug: "olahraga",
        description: "Berita seputar olahraga",
      },
    }),
    prisma.category.upsert({
      where: { slug: "politik" },
      update: {},
      create: {
        name: "Politik",
        slug: "politik",
        description: "Berita seputar politik",
      },
    }),
    prisma.category.upsert({
      where: { slug: "ekonomi" },
      update: {},
      create: {
        name: "Ekonomi",
        slug: "ekonomi",
        description: "Berita seputar ekonomi",
      },
    }),
    prisma.category.upsert({
      where: { slug: "kesehatan" },
      update: {},
      create: {
        name: "Kesehatan",
        slug: "kesehatan",
        description: "Berita seputar kesehatan",
      },
    }),
  ]);

  // Create sample news
  const sampleNews = [
    {
      title: "Perkembangan Teknologi AI di Indonesia",
      slug: "perkembangan-teknologi-ai-di-indonesia",
      excerpt:
        "Teknologi Artificial Intelligence semakin berkembang pesat di Indonesia dengan berbagai inovasi terbaru.",
      content: `
        <p>Teknologi Artificial Intelligence (AI) telah menjadi salah satu fokus utama dalam pengembangan teknologi di Indonesia. 
        Berbagai perusahaan startup dan institusi pendidikan telah mulai mengadopsi teknologi AI dalam berbagai aspek.</p>
        
        <p>Menurut data terbaru, investasi dalam sektor AI di Indonesia telah mencapai angka yang signifikan dalam beberapa tahun terakhir. 
        Hal ini menunjukkan bahwa Indonesia siap untuk menjadi salah satu pusat pengembangan AI di Asia Tenggara.</p>
        
        <p>Beberapa aplikasi AI yang sudah banyak digunakan di Indonesia meliputi:</p>
        <ul>
          <li>Chatbot untuk customer service</li>
          <li>Sistem rekomendasi untuk e-commerce</li>
          <li>Analisis data untuk bisnis</li>
          <li>Pengenalan wajah untuk keamanan</li>
        </ul>
        
        <p>Dengan dukungan dari pemerintah dan sektor swasta, masa depan AI di Indonesia terlihat sangat menjanjikan.</p>
      `,
      categoryId: categories[0].id, // Teknologi
      authorId: admin.id,
      status: "published",
      publishedAt: new Date(),
      views: 150,
    },
    {
      title: "Timnas Indonesia Raih Kemenangan di Kualifikasi Piala Dunia",
      slug: "timnas-indonesia-raih-kemenangan-di-kualifikasi-piala-dunia",
      excerpt:
        "Tim nasional Indonesia berhasil meraih kemenangan penting dalam pertandingan kualifikasi Piala Dunia.",
      content: `
        <p>Tim nasional Indonesia berhasil meraih kemenangan penting dalam pertandingan kualifikasi Piala Dunia 2026. 
        Pertandingan yang berlangsung di Stadion Gelora Bung Karno ini berhasil dimenangkan dengan skor 2-1.</p>
        
        <p>Gol pertama dicetak oleh pemain muda berbakat pada menit ke-25, disusul dengan gol kedua pada menit ke-67. 
        Meskipun tim lawan berhasil mencetak gol balasan pada menit ke-85, timnas Indonesia tetap mempertahankan keunggulan hingga akhir pertandingan.</p>
        
        <p>Pelatih timnas Indonesia mengungkapkan kebanggaannya atas performa tim yang sangat baik. 
        "Para pemain telah menunjukkan dedikasi dan semangat yang luar biasa. Ini adalah langkah penting menuju Piala Dunia 2026," ujarnya.</p>
        
        <p>Kemenangan ini memberikan harapan baru bagi Indonesia untuk bisa lolos ke Piala Dunia untuk pertama kalinya dalam sejarah.</p>
      `,
      categoryId: categories[1].id, // Olahraga
      authorId: admin.id,
      status: "published",
      publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 hari yang lalu
      views: 320,
    },
    {
      title: "Kebijakan Ekonomi Baru Diumumkan Pemerintah",
      slug: "kebijakan-ekonomi-baru-diumumkan-pemerintah",
      excerpt:
        "Pemerintah mengumumkan serangkaian kebijakan ekonomi baru yang diharapkan dapat mendorong pertumbuhan ekonomi nasional.",
      content: `
        <p>Pemerintah Indonesia mengumumkan serangkaian kebijakan ekonomi baru yang diharapkan dapat mendorong pertumbuhan ekonomi nasional. 
        Kebijakan ini mencakup berbagai aspek mulai dari investasi, perdagangan, hingga pengembangan UMKM.</p>
        
        <p>Menteri Keuangan menjelaskan bahwa kebijakan ini dirancang untuk mengatasi berbagai tantangan ekonomi global yang sedang terjadi. 
        "Kami telah melakukan analisis mendalam dan konsultasi dengan berbagai pihak untuk memastikan kebijakan ini tepat sasaran," ujarnya.</p>
        
        <p>Beberapa poin penting dalam kebijakan ekonomi baru ini meliputi:</p>
        <ul>
          <li>Insentif pajak untuk investasi di sektor prioritas</li>
          <li>Dukungan pembiayaan untuk UMKM</li>
          <li>Kemudahan perizinan usaha</li>
          <li>Pengembangan infrastruktur digital</li>
        </ul>
        
        <p>Para pelaku usaha menyambut baik kebijakan ini dan berharap dapat memberikan dampak positif bagi perekonomian Indonesia.</p>
      `,
      categoryId: categories[3].id, // Ekonomi
      authorId: admin.id,
      status: "published",
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 hari yang lalu
      views: 280,
    },
  ];

  for (const newsData of sampleNews) {
    await prisma.news.upsert({
      where: { slug: newsData.slug },
      update: {},
      create: newsData,
    });
  }

  // Create sample likes
  const createdNews = await prisma.news.findMany({
    where: { status: "published" },
    select: { id: true },
  });

  if (createdNews.length > 0) {
    // Create likes for the first news (admin likes it)
    await prisma.like.upsert({
      where: {
        newsId_userId: {
          newsId: createdNews[0].id,
          userId: admin.id,
        },
      },
      update: {},
      create: {
        newsId: createdNews[0].id,
        userId: admin.id,
      },
    });

    // Create likes for the second news (user likes it)
    if (createdNews.length > 1) {
      await prisma.like.upsert({
        where: {
          newsId_userId: {
            newsId: createdNews[1].id,
            userId: user.id,
          },
        },
        update: {},
        create: {
          newsId: createdNews[1].id,
          userId: user.id,
        },
      });

      // Admin also likes the second news
      await prisma.like.upsert({
        where: {
          newsId_userId: {
            newsId: createdNews[1].id,
            userId: admin.id,
          },
        },
        update: {},
        create: {
          newsId: createdNews[1].id,
          userId: admin.id,
        },
      });
    }
  }

  console.log("✅ Database seeded successfully!");
  console.log(`👤 Admin user: admin@portalberita.com / admin123`);
  console.log(`👤 Test user: user@portalberita.com / user123`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
