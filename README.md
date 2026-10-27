# ARUNARA ATELIER

Web app storefront dan back office untuk brand parfum small-batch ARUNARA ATELIER.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Lucide React
- React Context + localStorage untuk mock state yang langsung interaktif
- Prisma schema PostgreSQL untuk jalur migrasi ke database produksi

## Menjalankan lokal

Pastikan Node.js 18.18+ dan npm tersedia, lalu:

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

Untuk mengganti nomor WhatsApp checkout, buat `.env.local`:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxxx
```

## Routing

- `/` — public storefront
- `/loginadmin` — login admin tersembunyi
- `/admin/dashboard` — ringkasan
- `/admin/inventory` — stok produk, bahan, dan kemasan
- `/admin/batches` — produksi, maserasi, dan QC
- `/admin/finance` — buku kas, HPP, dan laba rugi

## Demo admin

- Username: `admin@arunara.com`
- Password: `atelier123`

> Login ini hanya mock untuk demo lokal. Untuk deployment produksi, ganti dengan Auth.js/Clerk atau backend session dengan password hash, database, CSRF protection, rate limit, dan secret server-side.

## Data demo

Data awal tersedia otomatis di browser:

- 160 botol produk jadi.
- 3 SKU utama, Tester Kit, dan Trio Bundle.
- Bahan baku dan kemasan.
- Batch `AR-MV-2601-001`.
- Transaksi pemasukan dan pengeluaran.

Perubahan data disimpan di `localStorage` dengan key `arunara-app-state-v1`. Hapus key tersebut dari browser untuk mengembalikan data demo.

## Database

`prisma/schema.prisma` berisi model `User`, `Product`, `RawMaterial`, `Batch`, dan `Transaction`. Untuk memakai PostgreSQL:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Sebelum produksi, pindahkan operasi state pada `components/app-data-provider.tsx` ke server actions/API dan gunakan secret database di environment variable.

## Neon

Project ini sudah memiliki `neon.ts` yang terhubung ke branch `production`. Service yang aktif:

- Postgres
- Neon Auth
- Object Storage bucket `assets`
- Neon Function `hello`
- Realtime

AI Gateway tidak diaktifkan karena project Neon menggunakan Free plan.

Setup/deploy:

```bash
neon deploy
npm run build
```

Env Neon ditarik ke `.env.local` dan sudah di-ignore oleh Git. Route integrasi:

- `GET /api/neon/health` — health check seluruh service
- `GET /api/neon/function` — proxy ke Neon Function
- `POST /api/neon/storage` — upload bucket `assets`, membutuhkan session admin
- `GET /api/neon/realtime` — konfigurasi public Realtime endpoint
- `/api/neon-auth/[...path]` — proxy Managed Neon Auth
# ARUNARA-ATELIER
