// Test script untuk API admin comments
const fetch = require("node-fetch");

async function testCommentsAPI() {
  const baseURL = "http://localhost:3000";

  try {
    // Test GET comments (akan error karena tidak ada auth, tapi bisa lihat response)
    console.log("Testing GET /api/admin/comments...");
    const getResponse = await fetch(`${baseURL}/api/admin/comments`);
    console.log("GET Response status:", getResponse.status);
    const getData = await getResponse.json();
    console.log("GET Response:", JSON.stringify(getData, null, 2));
  } catch (error) {
    console.error("Error testing API:", error.message);
  }
}

testCommentsAPI();
