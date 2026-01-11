// Test database connection
const { PrismaClient } = require("@prisma/client");

const testDBConnection = async () => {
  const prisma = new PrismaClient();

  try {
    console.log("🔌 Testing database connection...");

    // Test basic connection
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    // Test simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Basic query successful:", result);

    // Test news table
    const newsCount = await prisma.news.count();
    console.log("✅ News table accessible, count:", newsCount);

    // Test categories table
    const categoriesCount = await prisma.category.count();
    console.log("✅ Categories table accessible, count:", categoriesCount);
  } catch (error) {
    console.error("💥 Database connection error:", error.message);
    console.error("💥 Error stack:", error.stack);
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Database disconnected");
  }
};

testDBConnection();

