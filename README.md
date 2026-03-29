# Gaming Center Management Platform

A full-stack web application for managing a gaming center — bookings, memberships, tournaments, admin dashboard, CMS, and more.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | JavaScript / TypeScript |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL + Knex.js |
| Auth | NextAuth.js (JWT + Google OAuth) |
| Payments | Stripe |
| Email | Nodemailer |
| Animations | Framer Motion, GSAP |
| Charts | ApexCharts |
| Calendar | FullCalendar |
| 3D / FX | Three.js |

---

## Features

### Public
- Multi-variant landing pages (home-1 to home-4)
- Game catalog browsing
- Booking flow (multi-step, with slot availability & hold)
- Membership plans & pricing
- Coupon/discount codes
- Tournaments listing
- Contact, About, Terms, Refund Policy pages

### Gamer (Authenticated User)
- View & manage own bookings
- Apply coupons at checkout
- Stripe payment integration
- Email confirmations via Nodemailer

### Admin
- Dashboard with analytics (monthly bookings, revenue charts)
- Manage bookings, games, gamers, coupons, shop leaves, tournaments
- CMS settings (edit page sections via UI)
- Role-based access: `USER`, `ADMIN`, `SUPERADMIN`

---

## Roles & Access Control

| Role | Access |
|---|---|
| `USER` | Public pages + own bookings |
| `ADMIN` | `/admin` dashboard |
| `SUPERADMIN` | `/superadmin` + full admin |

Route protection is handled in [middleware.js](middleware.js). Unauthenticated users are redirected to `/auth`.

---

## Project Structure

```
src/
├── app/
│   ├── (admin)/admin/        # Admin pages (bookings, games, gamers, coupons, cms)
│   ├── api/                  # API routes
│   │   ├── auth/             # NextAuth + register
│   │   ├── bookings/         # CRUD, availability, hold
│   │   ├── admin/            # Analytics, admin-only endpoints
│   │   ├── games/            # Game catalog
│   │   ├── memberships/      # Membership plans
│   │   ├── coupons/          # Coupon management
│   │   ├── tournaments/      # Tournaments
│   │   ├── time-slots/       # Slot management
│   │   ├── shop-leaves/      # Closed days/hours
│   │   ├── cms/              # CMS content sections
│   │   └── stripe/           # Payment webhook/session
│   ├── booking/              # Public booking flow
│   └── auth/                 # Login / Register
├── components/
│   ├── admin/                # Admin-specific UI components
│   ├── BookingFlow.jsx        # Multi-step booking component
│   ├── Header.jsx / Footer.jsx
│   └── ...
├── database/
│   ├── migrations/           # Knex migrations (tables)
│   └── seeds/                # Seed data
└── lib/
    ├── db/                   # Repository layer (bookings, games, coupons, etc.)
    └── api/                  # Shared API helpers
```

---

## Getting Started

### 1. Prerequisites

- Node.js 18+
- PostgreSQL running locally

### 2. Install dependencies

```bash
npm install
```

### 3. Environment setup

Copy `.env.example` to `.env.local` and fill in:

```env
# Database
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=skilladiz_nextapp
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# NextAuth
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Email (SMTP)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### 4. Run database migrations

```bash
npx knex migrate:latest
npx knex seed:run
```

### 5. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Key Keywords

`Next.js` `React` `PostgreSQL` `Knex` `NextAuth` `RBAC` `Stripe` `Booking System` `Gaming Center` `Admin Dashboard` `CMS` `Tournaments` `Memberships` `Coupons` `Time Slots` `Tailwind CSS` `Framer Motion` `ApexCharts` `FullCalendar` `Nodemailer` `Google OAuth`
