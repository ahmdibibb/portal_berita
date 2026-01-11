// Test simple API endpoints
const testSimpleAPI = async () => {
  try {
    console.log("🧪 Testing Simple API Endpoints...");

    // Test 1: Basic API route
    console.log("\n1️⃣ Testing /api/categories...");
    const categoriesResponse = await fetch(
      "http://localhost:3000/api/categories"
    );
    console.log("Status:", categoriesResponse.status);
    console.log(
      "Content-Type:",
      categoriesResponse.headers.get("content-type")
    );

    if (categoriesResponse.ok) {
      const data = await categoriesResponse.json();
      console.log("✅ Categories Response:", data.length, "categories");
    } else {
      const errorText = await categoriesResponse.text();
      console.log("❌ Categories Error:", errorText.substring(0, 200));
    }

    // Test 2: Admin categories API
    console.log("\n2️⃣ Testing /api/admin/categories...");
    const adminCategoriesResponse = await fetch(
      "http://localhost:3000/api/admin/categories"
    );
    console.log("Status:", adminCategoriesResponse.status);
    console.log(
      "Content-Type:",
      adminCategoriesResponse.headers.get("content-type")
    );

    if (adminCategoriesResponse.ok) {
      const data = await adminCategoriesResponse.json();
      console.log("✅ Admin Categories Response:", data.length, "categories");
    } else {
      const errorText = await adminCategoriesResponse.text();
      console.log("❌ Admin Categories Error:", errorText.substring(0, 200));
    }

    // Test 3: News API
    console.log("\n3️⃣ Testing /api/news...");
    const newsResponse = await fetch("http://localhost:3000/api/news");
    console.log("Status:", newsResponse.status);
    console.log("Content-Type:", newsResponse.headers.get("content-type"));

    if (newsResponse.ok) {
      const data = await newsResponse.json();
      console.log("✅ News Response:", data.length, "news items");
    } else {
      const errorText = await newsResponse.text();
      console.log("❌ News Error:", errorText.substring(0, 200));
    }
  } catch (error) {
    console.error("💥 Test Error:", error.message);
  }
};

// Jalankan test jika script dijalankan langsung
if (typeof window === "undefined") {
  testSimpleAPI();
}

