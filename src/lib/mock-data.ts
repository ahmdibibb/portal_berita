export interface User {
    id: number
    name: string
    email: string
    role: "user" | "admin"
    avatar?: string
  }
  
  export interface News {
    id: number
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    image: string
    publishedAt: string
    author: string
    likes: number
    comments: number
    views: number
    isLiked?: boolean
    isSaved?: boolean
  }
  
  export interface Comment {
    id: number
    newsId: number
    userId: number
    userName: string
    content: string
    createdAt: string
    replies?: Comment[]
  }
  
  // Mock users
  export const mockUsers: User[] = [
    {
      id: 1,
      name: "Admin Portal",
      email: "admin@portalberita.com",
      role: "admin",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
    },
  ]
  
  // Mock news data
  export const mockNews: News[] = [
    {
      id: 1,
      title: "Tim Nasional Raih Medali Emas di Kompetisi Internasional",
      slug: "tim-nasional-raih-medali-emas-kompetisi-internasional",
      excerpt: "Prestasi gemilang tim nasional dalam ajang kompetisi internasional yang berlangsung selama seminggu.",
      content: `
        <p>Tim nasional berhasil meraih medali emas dalam kompetisi internasional yang berlangsung selama seminggu. Pencapaian ini merupakan hasil kerja keras para atlet yang telah berlatih intensif selama berbulan-bulan.</p>
        
        <p>Pelatih tim nasional menyatakan bahwa kemenangan ini adalah buah dari dedikasi dan kerja sama yang solid antara para atlet dan tim pelatih. "Kami sangat bangga dengan pencapaian ini dan berharap dapat mempertahankan prestasi di kompetisi mendatang," ujar pelatih kepala.</p>
        
        <p>Para atlet yang terlibat dalam kompetisi ini telah mempersiapkan diri dengan sangat matang, mulai dari latihan fisik, mental, hingga strategi permainan. Dukungan dari berbagai pihak juga menjadi faktor penting dalam meraih kesuksesan ini.</p>
        
        <p>Prestasi ini diharapkan dapat menjadi motivasi bagi atlet-atlet muda Indonesia untuk terus berprestasi di kancah internasional.</p>
      `,
      category: "Olahraga",
      image: "/placeholder.svg?height=400&width=600",
      publishedAt: "2024-01-15",
      author: "Jane Smith",
      likes: 156,
      comments: 23,
      views: 1250,
    },
    {
      id: 2,
      title: "Inovasi Kendaraan Listrik Terbaru Diluncurkan",
      slug: "inovasi-kendaraan-listrik-terbaru-diluncurkan",
      excerpt:
        "Industri otomotif meluncurkan teknologi kendaraan listrik terdepan dengan efisiensi baterai yang lebih tinggi.",
      content: `
        <p>Industri otomotif kembali menghadirkan inovasi terbaru dalam teknologi kendaraan listrik. Dengan efisiensi baterai yang lebih tinggi dan jangkauan yang lebih jauh, kendaraan ini diharapkan dapat mengubah paradigma transportasi.</p>
        
        <p>Teknologi baterai terbaru yang digunakan mampu bertahan hingga 500 kilometer dalam sekali pengisian. Selain itu, waktu pengisian yang lebih cepat menjadi keunggulan utama dari kendaraan listrik generasi terbaru ini.</p>
        
        <p>Fitur-fitur canggih seperti autonomous driving, sistem infotainment terintegrasi, dan desain aerodinamis menjadi daya tarik tersendiri bagi konsumen yang peduli lingkungan.</p>
      `,
      category: "Otomotif",
      image: "/placeholder.svg?height=400&width=600",
      publishedAt: "2024-01-14",
      author: "Mike Johnson",
      likes: 89,
      comments: 15,
      views: 890,
    },
    {
      id: 3,
      title: "Tips Menjaga Kesehatan di Musim Hujan",
      slug: "tips-menjaga-kesehatan-musim-hujan",
      excerpt:
        "Para ahli kesehatan memberikan rekomendasi untuk menjaga imunitas tubuh tetap optimal selama musim hujan.",
      content: `
        <p>Musim hujan seringkali menjadi tantangan bagi kesehatan tubuh. Para ahli kesehatan merekomendasikan beberapa langkah penting untuk menjaga imunitas tubuh tetap optimal selama musim hujan.</p>
        
        <p>Pertama, pastikan asupan vitamin C yang cukup melalui buah-buahan segar seperti jeruk, kiwi, dan jambu biji. Vitamin C berperan penting dalam meningkatkan sistem kekebalan tubuh.</p>
        
        <p>Kedua, jaga kebersihan diri dengan mencuci tangan secara teratur dan menghindari menyentuh wajah dengan tangan yang kotor. Hal ini dapat mencegah masuknya virus dan bakteri ke dalam tubuh.</p>
        
        <p>Ketiga, pastikan tidur yang cukup dan berkualitas. Tidur yang baik membantu tubuh memproduksi sel-sel kekebalan yang diperlukan untuk melawan infeksi.</p>
      `,
      category: "Kesehatan",
      image: "/placeholder.svg?height=400&width=600",
      publishedAt: "2024-01-13",
      author: "Dr. Sarah Wilson",
      likes: 234,
      comments: 45,
      views: 1890,
    },
    {
      id: 4,
      title: "Kebijakan Politik Terbaru Mendapat Respons Positif",
      slug: "kebijakan-politik-terbaru-mendapat-respons-positif",
      excerpt: "Pemerintah mengumumkan kebijakan baru yang diharapkan dapat meningkatkan kesejahteraan masyarakat.",
      content: `
        <p>Pemerintah mengumumkan kebijakan baru yang diharapkan dapat meningkatkan kesejahteraan masyarakat. Kebijakan ini mencakup berbagai aspek mulai dari ekonomi, pendidikan, hingga kesehatan.</p>
        
        <p>Dalam bidang ekonomi, pemerintah akan memberikan stimulus kepada UMKM untuk mendorong pertumbuhan ekonomi di tingkat grassroot. Program ini diharapkan dapat menciptakan lapangan kerja baru dan meningkatkan daya beli masyarakat.</p>
        
        <p>Di sektor pendidikan, akan ada peningkatan anggaran untuk infrastruktur sekolah dan pelatihan guru. Hal ini bertujuan untuk meningkatkan kualitas pendidikan di seluruh Indonesia.</p>
      `,
      category: "Politik",
      image: "/placeholder.svg?height=400&width=600",
      publishedAt: "2024-01-12",
      author: "Robert Brown",
      likes: 67,
      comments: 28,
      views: 756,
    },
    {
      id: 5,
      title: "Revolusi Digital Mengubah Cara Kerja di Era Modern",
      slug: "revolusi-digital-mengubah-cara-kerja-era-modern",
      excerpt:
        "Transformasi digital membawa perubahan signifikan dalam dunia kerja dengan adopsi teknologi AI dan automation.",
      content: `
        <p>Transformasi digital membawa perubahan signifikan dalam dunia kerja dengan adopsi teknologi AI dan automation. Perusahaan-perusahaan mulai mengintegrasikan teknologi canggih untuk meningkatkan efisiensi dan produktivitas.</p>
        
        <p>Artificial Intelligence (AI) kini menjadi bagian integral dalam berbagai proses bisnis, mulai dari customer service hingga analisis data. Teknologi ini memungkinkan perusahaan untuk memberikan layanan yang lebih personal dan responsif.</p>
        
        <p>Remote work dan hybrid working model juga menjadi tren yang semakin populer. Teknologi cloud computing memungkinkan karyawan untuk bekerja dari mana saja tanpa mengurangi produktivitas.</p>
      `,
      category: "Teknologi",
      image: "/placeholder.svg?height=400&width=600",
      publishedAt: "2024-01-11",
      author: "Lisa Chen",
      likes: 198,
      comments: 67,
      views: 2340,
    },
    {
      id: 6,
      title: "Ekonomi Nasional Menunjukkan Tren Positif",
      slug: "ekonomi-nasional-menunjukkan-tren-positif",
      excerpt: "Data ekonomi terbaru menunjukkan pertumbuhan yang menggembirakan di berbagai sektor industri.",
      content: `
        <p>Data ekonomi terbaru menunjukkan pertumbuhan yang menggembirakan di berbagai sektor industri. Pertumbuhan PDB mencapai 5.2% pada kuartal ini, melampaui ekspektasi para ekonom.</p>
        
        <p>Sektor manufaktur menjadi kontributor utama pertumbuhan dengan peningkatan produksi yang signifikan. Ekspor juga menunjukkan tren positif dengan peningkatan permintaan dari pasar internasional.</p>
        
        <p>Investasi asing langsung (FDI) juga mengalami peningkatan, menunjukkan kepercayaan investor terhadap stabilitas ekonomi Indonesia. Hal ini diharapkan dapat menciptakan lebih banyak lapangan kerja.</p>
      `,
      category: "Ekonomi",
      image: "/placeholder.svg?height=400&width=600",
      publishedAt: "2024-01-10",
      author: "David Lee",
      likes: 123,
      comments: 34,
      views: 1456,
    },
  ]
  
  // Mock comments
  export const mockComments: Comment[] = [
    {
      id: 1,
      newsId: 1,
      userId: 2,
      userName: "John Doe",
      content: "Selamat untuk tim nasional! Prestasi yang membanggakan.",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      newsId: 1,
      userId: 3,
      userName: "Jane Smith",
      content: "Semoga ini menjadi motivasi untuk atlet-atlet muda lainnya.",
      createdAt: "2024-01-15T11:15:00Z",
    },
    {
      id: 3,
      newsId: 2,
      userId: 2,
      userName: "John Doe",
      content: "Teknologi yang sangat menarik, kapan bisa tersedia di Indonesia?",
      createdAt: "2024-01-14T14:20:00Z",
    },
  ]
  
  export const categories = [
    { id: "all", name: "Semua" },
    { id: "olahraga", name: "Olahraga" },
    { id: "otomotif", name: "Otomotif" },
    { id: "kesehatan", name: "Kesehatan" },
    { id: "politik", name: "Politik" },
    { id: "teknologi", name: "Teknologi" },
    { id: "ekonomi", name: "Ekonomi" },
  ]
  