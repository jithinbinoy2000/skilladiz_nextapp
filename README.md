# Skilladiz - Gaming Arena Booking Platform

## Description

Skilladiz is a comprehensive gaming arena and entertainment booking platform built with Next.js. It provides an all-in-one solution for managing gaming facilities, including pool tables, PS5 gaming arenas, VR zones, and other gaming experiences. The platform enables users to browse services, book gaming sessions, manage memberships, participate in tournaments, and handle payments seamlessly.

**Key Purpose:** Streamline the booking experience for gaming enthusiasts while providing arena owners with robust management tools for inventory, bookings, memberships, and customer analytics.

## Features

- **Multi-Service Booking:** Book various gaming experiences (8-Ball Pool, PS5 Arena, VR Zone, etc.)
- **Real-Time Availability:** Interactive calendar with time-slot management
- **Membership Management:** Flexible membership plans with benefits and pricing tiers
- **Tournament System:** Create, manage, and participate in competitive tournaments
- **Payment Integration:** Seamless payment processing with Stripe integration
- **Admin Dashboard:** Comprehensive admin panel for business analytics and management
- **User Authentication:** Secure authentication with NextAuth & role-based access control
- **Image Management:** File upload and gallery management capabilities
- **CMS Integration:** Content management for dynamic site content
- **Email Notifications:** Automated email notifications for bookings and updates
- **Coupon System:** Create and manage promotional coupons
- **Refund Management:** Handle refunds and booking cancellations
- **Shop Management:** Product and inventory management system
- **Mobile Responsive:** Fully responsive design optimized for all devices

## Preview

### Home Page
Homepage showcasing featured gaming services and quick access to booking system.

![Skilladiz Home Page](public/readme/home.png)

### Booking Page
Interactive booking interface with real-time availability and time-slot selection.

![Skilladiz Booking Page](public/readme/booking.png)

## Table of Contents

- [Installation Prerequisites](#installation-prerequisites)
- [Preview](#preview)
- [Environment Variables](#environment-variables)
- [Quick Start](#quick-start)
- [Project Architecture](#project-architecture)
- [API Documentation](#api-documentation)
- [Available Scripts](#available-scripts)
- [Database Setup](#database-setup)
- [Deployment Information](#deployment-information)
- [Contributing](#contributing)
- [License](#license)

## Installation Prerequisites

Before you start, ensure you have the following installed on your machine:

- **Node.js** (v16 or later) - [Download](https://nodejs.org/)
- **npm** (Node package manager) - Comes with Node.js
- **PostgreSQL** (v12 or later) - [Download](https://www.postgresql.org/)
- **Git** - [Download](https://git-scm.com/)
- **Stripe Account** - For payment processing [Sign up](https://stripe.com)
- **Email Service** - SMTP server for email notifications (optional but recommended)

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/skilladiz_db
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=skilladiz_db

# Next.js Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development

# Authentication
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_public_key
STRIPE_SECRET_KEY=sk_test_your_secret_key

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM_EMAIL=noreply@skilladiz.com

# File Upload Configuration
UPLOAD_DIR=./public/uploads
MAX_FILE_SIZE=10485760

# Analytics (Optional)
NEXT_PUBLIC_CLARITY_ID=your_clarity_id

# Session Configuration
SESSION_SECRET=your_session_secret
```

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jithinbinoy2000/skilladiz_nextapp.git
   cd skilladiz_nextapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database:**
   ```bash
   npm run db:setup
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to `http://localhost:3000`

## Project Architecture

### Directory Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── api/                 # API routes
│   │   ├── admin/           # Admin endpoints
│   │   ├── auth/            # Authentication endpoints
│   │   ├── bookings/        # Booking management
│   │   ├── cms/             # Content management
│   │   ├── coupons/         # Coupon management
│   │   ├── gallery/         # Gallery endpoints
│   │   ├── games/           # Game endpoints
│   │   ├── membership-plans/# Membership endpoints
│   │   ├── stripe/          # Payment processing
│   │   ├── tournaments/     # Tournament endpoints
│   │   ├── upload/          # File upload endpoints
│   │   └── user/            # User management
│   ├── (admin)/             # Admin routes (protected)
│   ├── auth/                # Authentication pages
│   ├── booking/             # Booking flow
│   ├── memberships/         # Membership pages
│   ├── tournaments/         # Tournament pages
│   └── profile/             # User profile
├── components/              # Reusable React components
│   ├── admin/              # Admin-specific components
│   ├── auth/               # Auth components
│   ├── common/             # Common/shared components
│   ├── form/               # Form components
│   ├── ui/                 # UI components (shadcn/ui)
│   └── ...
├── context/                # React context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and helpers
│   ├── api/               # API utilities
│   ├── auth/              # Auth utilities
│   ├── db/                # Database utilities
│   └── utils.js           # Common utilities
├── database/              # Database migrations and seeds
│   ├── migrations/
│   └── seeds/
└── styles/                # Global styles

public/
└── uploads/              # User uploaded files
```

### Tech Stack

- **Frontend:** React 19, Next.js 16, Tailwind CSS 4, Shadcn/UI
- **Backend:** Next.js API Routes, Node.js
- **Database:** PostgreSQL with Knex.js ORM
- **Authentication:** NextAuth.js v4
- **Payment Processing:** Stripe
- **UI/UX:** Framer Motion, Three.js, GSAP, ApexCharts
- **File Upload:** React Dropzone
- **Email:** Nodemailer
- **Calendar:** FullCalendar, Date-FNS, Flatpickr
- **Type Safety:** TypeScript, JSDoc

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh authentication token
- `GET /api/auth/session` - Get current session

### Booking Endpoints

- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking
- `GET /api/bookings/user/:userId` - Get user's bookings
- `GET /api/time-slots` - Get available time slots

### Games & Services Endpoints

- `GET /api/games` - List all available games/services
- `POST /api/games` - Create new game (admin)
- `GET /api/games/:id` - Get game details
- `PUT /api/games/:id` - Update game (admin)
- `DELETE /api/games/:id` - Delete game (admin)

### Membership Endpoints

- `GET /api/membership-plans` - List all membership plans
- `POST /api/membership-plans` - Create membership plan (admin)
- `POST /api/memberships` - Subscribe to membership
- `GET /api/memberships/:userId` - Get user's membership

### Tournament Endpoints

- `GET /api/tournaments` - List all tournaments
- `POST /api/tournaments` - Create tournament (admin)
- `GET /api/tournaments/:id` - Get tournament details
- `POST /api/tournaments/:id/join` - Join tournament
- `DELETE /api/tournaments/:id/leave` - Leave tournament

### User Endpoints

- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/avatar` - Upload user avatar

### Coupon Endpoints

- `GET /api/coupons` - List coupons (admin)
- `POST /api/coupons` - Create coupon (admin)
- `POST /api/coupons/validate` - Validate coupon code

### Payment Endpoints

- `POST /api/stripe/create-payment-intent` - Create Stripe payment intent
- `POST /api/stripe/webhook` - Handle Stripe webhooks

### Admin Endpoints

- `GET /api/admin/dashboard` - Dashboard metrics
- `GET /api/admin/bookings` - All bookings (admin)
- `GET /api/admin/users` - All users (admin)
- `GET /api/admin/analytics` - Business analytics

## Available Scripts

### Development & Build

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Clean build cache
npm run clean
```

### Database Management

```bash
# Run all pending migrations
npm run knex:migrate

# Rollback last migration
npm run knex:rollback

# Run database seeds
npm run knex:seed

# Complete database setup (migrate + seed)
npm run db:setup
```

## Database Setup

### Initial Setup

1. Create a PostgreSQL database:
   ```bash
   createdb skilladiz_db
   ```

2. Run migrations:
   ```bash
   npm run knex:migrate
   ```

3. Seed sample data (optional):
   ```bash
   npm run knex:seed
   ```

### Database Migrations

Migration files are located in `src/database/migrations/`. To create a new migration:

```bash
npx knex --knexfile knexfile.js migrate:make migration_name
```

### Database Seeds

Seed files are located in `src/database/seeds/`. To create a new seed:

```bash
npx knex --knexfile knexfile.js seed:make seed_name
```

## Deployment Information

### Deployment Steps

1. **Prepare your production environment:**
   ```bash
   # Set production environment variables
   NODE_ENV=production
   ```

2. **Configure environment variables:**
   - Update `.env.production.local` with production credentials
   - Ensure all required variables are set (Stripe keys, database URL, etc.)

3. **Build the application:**
   ```bash
   npm run build
   ```

4. **Run database migrations:**
   ```bash
   npm run knex:migrate
   ```

5. **Start the production server:**
   ```bash
   npm start
   ```

### Deployment Platforms

The application can be deployed to:

- **Vercel** - Recommended for Next.js
  ```bash
  vercel deploy --prod
  ```
- **Railway** - PostgreSQL + Node.js support
- **Render.com** - Full-stack hosting
- **AWS** - EC2 with RDS for PostgreSQL
- **DigitalOcean** - App Platform with managed PostgreSQL

### Environment Checklist

Before deploying to production:

- [ ] Database is backed up
- [ ] All environment variables are set
- [ ] Stripe keys are configured
- [ ] Email service is configured
- [ ] CDN is configured for static assets
- [ ] SSL certificate is valid
- [ ] Database migrations are tested
- [ ] Security settings are reviewed

## Contributing

We welcome contributions! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's style guidelines and includes appropriate tests.

## License

### MIT License

This project is licensed under the **MIT License** - a permissive open-source license.

**You are free to:**
- Use the software for personal or commercial purposes
- Modify and distribute the software
- Include the software in proprietary applications

**Conditions:**
- Include a copy of the license and copyright notice in any distribution
- The software is provided "as-is" without warranty

For complete license details, see the [LICENSE](./LICENSE) file in the project root.

**Copyright © 2026 Skilladiz - Gaming Arena Booking Platform**

---

### Last Updated: 2026-04-17 UTC
