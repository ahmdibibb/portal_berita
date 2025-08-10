# Portal Berita

Portal berita modern dengan Next.js, TypeScript, dan Prisma ORM.

## Fitur

- 🔐 **Authentication System** - Login/Register dengan JWT
- 📰 **News Management** - CRUD berita dengan kategori
- 💬 **Comment System** - Sistem komentar dengan moderasi
- 👍 **Like System** - Like/unlike berita
- 💾 **Save System** - Simpan berita favorit
- 👥 **User Management** - Manajemen pengguna dan role
- 📊 **Admin Dashboard** - Dashboard admin dengan statistik
- 🎨 **Modern UI** - Interface modern dengan Tailwind CSS

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, Shadcn/ui
- **Database:** MySQL dengan Prisma ORM
- **Authentication:** JWT dengan bcryptjs
- **State Management:** React Context API

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL Database
- npm atau yarn

### Installation

1. **Clone repository**

```bash
git clone <repository-url>
cd portal_berita
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup Environment Variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` dan sesuaikan konfigurasi database:

```env
DATABASE_URL="mysql://username:password@localhost:3306/portal_berita"
JWT_SECRET="your-very-secure-jwt-secret-key"
```

4. **Setup Database**

```bash
# Generate Prisma client
npm run db:generate

# Push schema ke database (untuk development)
npm run db:push

# Atau gunakan migration (untuk production)
npm run db:migrate
```

5. **Seed Database (Optional)**

```bash
# Buat data awal untuk testing
npx prisma db seed
```

6. **Run Development Server**

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Database Schema

Proyek menggunakan Prisma ORM dengan schema berikut:

- **User** - Pengguna sistem (admin/user)
- **Category** - Kategori berita
- **News** - Berita dengan relasi ke category dan author
- **Comment** - Komentar berita dengan moderasi
- **Like** - Like/unlike berita
- **SavedNews** - Berita yang disimpan pengguna

## Available Scripts

- `npm run dev` - Development server
- `npm run build` - Build untuk production
- `npm run start` - Start production server
- `npm run lint` - Lint code
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema ke database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### News

- `GET /api/news` - Get news list dengan pagination
- `GET /api/news/[id]` - Get news detail
- `POST /api/admin/news` - Create news (admin only)

### Comments

- `GET /api/comments/[newsId]` - Get comments for news
- `POST /api/comments/[newsId]` - Create comment

### Interactions

- `POST /api/news/[id]/like` - Like/unlike news
- `POST /api/news/[id]/save` - Save/unsave news

### Admin

- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/dashboard/activities` - Recent activities
- `GET /api/admin/users` - Get all users
- `GET /api/admin/comments` - Get all comments
- `GET /api/admin/news/likes` - Get likes statistics

## Development

### Database Management

**Prisma Studio** - GUI untuk mengelola database:

```bash
npm run db:studio
```

**Migration** - Untuk perubahan schema:

```bash
# Buat migration baru
npx prisma migrate dev --name add_new_field

# Deploy migration ke production
npx prisma migrate deploy
```

**Reset Database** (Development only):

```bash
npx prisma migrate reset
```

### Code Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── admin/          # Admin pages
│   ├── auth/           # Auth pages
│   └── news/           # News pages
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── admin/         # Admin components
│   └── auth/          # Auth components
├── lib/               # Utilities
│   ├── db.ts         # Prisma client
│   ├── auth.ts       # Auth utilities
│   └── utils.ts      # General utilities
└── hooks/            # Custom React hooks
```

## Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy

### Manual Deployment

1. Build aplikasi:

```bash
npm run build
```

2. Start production server:

```bash
npm run start
```

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push ke branch
5. Create Pull Request

## License

MIT License
