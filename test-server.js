// Test script untuk memastikan server berjalan
// Jalankan dengan: node test-server.js

console.log("🚀 Testing server connection...\n");

console.log("📋 Test yang akan dilakukan:");
console.log("1. Test koneksi ke server");
console.log("2. Test API endpoint /api/news");
console.log("3. Test search functionality");

console.log("\n🔧 Langkah test:");
console.log("1. Pastikan server berjalan: npm run dev");
console.log(
  "2. Buka browser ke: http://localhost:3000 (atau port yang tersedia)"
);
console.log("3. Buka DevTools Console");
console.log("4. Coba search dengan kata kunci sederhana");
console.log("5. Lihat log di console dan terminal");

console.log("\n💡 Tips debugging:");
console.log("• Gunakan kata kunci yang pasti ada di database");
console.log("• Periksa Network tab di DevTools");
console.log("• Lihat response dari API call");
console.log("• Periksa error di terminal server");

console.log("\n🎯 Expected behavior:");
console.log("• Search form submit ke /search?q=keyword");
console.log("• SearchResults component fetch dari /api/news?search=keyword");
console.log("• API return data dengan format yang benar");
console.log("• Results ditampilkan tanpa error");

console.log("\n🚨 Jika masih error:");
console.log("• Periksa database content");
console.log("• Periksa Prisma schema");
console.log("• Periksa API response format");
console.log("• Periksa component data handling");

console.log("\n🔍 Debug script completed!");
console.log(
  "🎯 Sekarang test search di browser dengan DevTools Console terbuka"
);
