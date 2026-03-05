<div align="center">
  <img src="https://i.ibb.co.com/HfrLhRDc/Group-15.png" width="360" />
  <h4>A simple anime streaming platform with community feature integration</h4>
</div>

## Overview

Syzne TV was born from a simple frustration: watching anime online shouldn’t feel like fighting through layers of intrusive ads and popups. Many platforms today prioritize aggressive monetization over user experience, and somewhere along the way, the joy of watching got lost.

## Tech Stack

- **Runtime**: Bun (v1.3)
- **Framework**: Elysia (latest)
- **Database**: PostgreSQL 18
- **ORM**: Prisma (v7.0)
- **Caching**: Redis (v8.4)
- **Authentication**: JWT
- **Monitoring**: Sentry

## Getting Started

> ⚠️ Docker support is planned but not fully implemented yet.
> Full containerized deployment will be finalized once the backend reaches production readiness.
> For now, please follow the manual setup below.

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/rafiarrafif/SyzneTV-backend.git
cd SyzneTV-backend
```

#### 2️⃣ Prepare Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Then configure .env properly:

- Database credentials
- Redis configuration
- SMTP configuration
- Admin account credentials
- Any other required environment variables

> ⚠️ Make sure all required variables are filled correctly.
> The application will fail to start if any critical configuration is missing.

#### 3️⃣ Install Dependencies

```bash
bun install
```

#### 4️⃣ Run Database Migrations

```bash
bunx prisma deploy
```

#### 5️⃣ Seed Initial Data

```bash
bun run prisma:seed
```

#### 6️⃣ Run the Application

**Development Mode**

```bash
bun run dev
```

**Production Mode**

Build the application:

```bash
bun run build
```

Make the binary executable:

```bash
chmod +x ./dist/server
```

Run the server:

```bash
./dist/server
```

## Project Structure

```
root/
├── prisma/
│   ├── dbml/                # DBML schema generated from Prisma
│   ├── migrations/          # Database migration history
│   └── seed/                # Database seeding scripts
│       └── (run with: bun run prisma:seed)
│
├── scripts/                 # Automation & maintenance scripts (⚠️ do not modify unless necessary)
│
└── src/
    ├── config/              # Non-secret system configuration
    │                         # ⚠️ Never store secrets here — use .env instead
    │
    ├── constants/           # Editable system keys (e.g., cookie names, Redis keys)
    │
    ├── helpers/             # Reusable helper functions (cross-module usage)
    │
    ├── middleware/          # All application middlewares
    │
    ├── modules/             # Domain-based modules (auth, user, media, etc.)
    │
    ├── utils/               # External service utilities
    │                         # (database, bucket storage, SMTP, etc.)
    │
    ├── route.ts             # Root route aggregator (registers all modules)
    │
    └── index.ts             # Application entry point
```

This structure keeps the core system separated from domain logic, automation tools, and infrastructure-related utilities. Making the project easier to scale, debug, and maintain over time.

## Architecture Overview

Syzne TV uses a modular architecture to keep the codebase clean, scalable, and easy to maintain.
Each feature is separated by domain (e.g., `auth`, `user`, `media`) and stored inside:

```
./src/modules
```

Every module follows the same internal structure:

```
module-name/
├── controllers/
├── services/
├── repositories/
├── validations/
├── types.ts
└── index.ts
```

#### Folder Responsibilities

- **Controllers**: Handle incoming HTTP requests and responses. Every file must end with: `*.controller.ts`
- **Services**: Contain the core business logic. Every file must end with: `*.service.ts`
- **Repositories**: Interact with the database using Prisma. Every file must end with: `*.repository.ts`
- **Validations**: Define request validation schemas using Zod. Every file must end with: `*.schema.ts`
- **types.ts**: Contains module-specific TypeScript types.
- **index.ts**: Defines the module routes and route prefix (e.g., `/auth`).

> **IMPORTANT** Whenever you create a new module and configure its routes, you must run:

```bash
bun run route:sync
```

This command registers the module route into the root route automatically. This structure ensures consistency across the project and makes it easier to scale without turning the codebase into a mess.
