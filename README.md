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

> IMPORTANT: Whenever you create a new module and configure its routes, you must run:

```bash
bun run route:sync
```
