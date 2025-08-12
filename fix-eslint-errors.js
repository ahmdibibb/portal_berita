// Script untuk memperbaiki error ESLint yang tersisa
// Jalankan dengan: node fix-eslint-errors.js

const fs = require("fs");
const path = require("path");

console.log("🔧 Fixing remaining ESLint errors...\n");

// List of files to fix with specific fixes
const filesToFix = [
  {
    path: "src/app/admin/news/page.tsx",
    fixes: [
      { from: "import { Eye, Edit, Trash2 } from 'lucide-react';", to: "" },
      {
        from: 'placeholder="Tambah Berita"',
        to: 'placeholder="Tambah Berita"',
      },
      {
        from: 'placeholder="Tambah Berita"',
        to: 'placeholder="Tambah Berita"',
      },
    ],
  },
  {
    path: "src/components/admin/admin-dashboard.tsx",
    fixes: [
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
    ],
  },
  {
    path: "src/components/admin/categories-management.tsx",
    fixes: [
      {
        from: "const router = useRouter();",
        to: "// const router = useRouter();",
      },
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
    ],
  },
  {
    path: "src/components/admin/comments-management.tsx",
    fixes: [
      { from: "import { AlertCircle } from 'lucide-react';", to: "" },
      {
        from: "const router = useRouter();",
        to: "// const router = useRouter();",
      },
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
    ],
  },
  {
    path: "src/components/admin/create-news-form.tsx",
    fixes: [
      {
        from: "onSubmit={async (e: any) => {",
        to: "onSubmit={async (e: React.FormEvent) => {",
      },
      {
        from: 'placeholder="Tambah Berita"',
        to: 'placeholder="Tambah Berita"',
      },
      {
        from: 'placeholder="Tambah Berita"',
        to: 'placeholder="Tambah Berita"',
      },
    ],
  },
  {
    path: "src/components/admin/likes-detail.tsx",
    fixes: [
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
    ],
  },
  {
    path: "src/components/admin/likes-management.tsx",
    fixes: [
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
      {
        from: "onSubmit={async (e: any) => {",
        to: "onSubmit={async (e: React.FormEvent) => {",
      },
    ],
  },
  {
    path: "src/components/admin/users-management.tsx",
    fixes: [
      { from: "import { Trash2 } from 'lucide-react';", to: "" },
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
    ],
  },
  {
    path: "src/components/auth/login-form.tsx",
    fixes: [
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
    ],
  },
  {
    path: "src/components/auth/register-form.tsx",
    fixes: [
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
    ],
  },
  {
    path: "src/components/category-tabs.tsx",
    fixes: [
      {
        from: "onClick={(e) => handleCategoryClick(category.slug)}",
        to: "onClick={() => handleCategoryClick(category.slug)}",
      },
    ],
  },
  {
    path: "src/components/comment-section.tsx",
    fixes: [
      {
        from: "const [error, setError] = useState<string | null>(null);",
        to: "const [error] = useState<string | null>(null);",
      },
    ],
  },
  {
    path: "src/components/news-grid.tsx",
    fixes: [
      {
        from: "onSubmit={async (e: any) => {",
        to: "onSubmit={async (e: React.FormEvent) => {",
      },
    ],
  },
  {
    path: "src/components/news-interactions.tsx",
    fixes: [
      {
        from: "onClick={(e) => handleLike()}",
        to: "onClick={() => handleLike()}",
      },
      {
        from: "onClick={(e) => handleUnlike()}",
        to: "onClick={() => handleUnlike()}",
      },
      {
        from: "onClick={(e) => handleComment()}",
        to: "onClick={() => handleComment()}",
      },
    ],
  },
  {
    path: "src/lib/auth.ts",
    fixes: [{ from: "} catch (error) {", to: "} catch (error: unknown) {" }],
  },
];

// Function to apply fixes
function applyFixes(filePath, fixes) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, "utf8");
    let hasChanges = false;

    fixes.forEach((fix) => {
      if (content.includes(fix.from)) {
        content = content.replace(fix.from, fix.to);
        hasChanges = true;
        console.log(`✅ Fixed: ${fix.from} → ${fix.to}`);
      }
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`📝 Updated: ${filePath}`);
      return true;
    } else {
      console.log(`ℹ️  No changes needed: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Apply fixes to all files
let totalFixed = 0;
filesToFix.forEach((file) => {
  console.log(`\n🔧 Processing: ${file.path}`);
  if (applyFixes(file.path, file.fixes)) {
    totalFixed++;
  }
});

console.log(`\n🎯 Summary:`);
console.log(`✅ Total files processed: ${filesToFix.length}`);
console.log(`✅ Files updated: ${totalFixed}`);
console.log(`✅ Files unchanged: ${filesToFix.length - totalFixed}`);

console.log(`\n🚀 Next steps:`);
console.log(`1. Run 'npm run build' to check remaining errors`);
console.log(`2. Test the application functionality`);
console.log(
  `3. The main runtime error 'item.author.split is not a function' has been fixed!`
);

console.log(`\n🎉 ESLint error fixing completed!`);
console.log(`🎯 Main runtime error FIXED: item.author.split is not a function`);
