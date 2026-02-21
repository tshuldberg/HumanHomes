# Backend + API Tech Stack Research

**Researcher:** backend-researcher
**Date:** 2026-02-20
**Status:** Complete

---

## 1. Node.js Framework: tRPC + Fastify

**Recommendation: tRPC on top of Fastify adapter.**

| Framework | Strengths | Weaknesses | Fit |
|-----------|-----------|------------|-----|
| NestJS | Enterprise-grade, structured, comprehensive | Heaviest abstraction, slower throughput, opinionated | Overkill for greenfield TypeScript-first |
| Fastify | Fastest Node.js framework, excellent TS support | Less opinionated | Strong fit for performance |
| Hono | Ultra-light, edge-ready | Newer ecosystem | Good for edge, not primary server |
| tRPC | End-to-end type safety, zero runtime overhead | Only TypeScript clients | Perfect for TS monorepo |

tRPC gives end-to-end type safety between API and all clients. Fastify provides the HTTP layer. For public API needs, expose REST alongside tRPC using Fastify routes.

---

## 2. Database + ORM: PostgreSQL + Drizzle ORM

| Option | Strengths | Weaknesses |
|--------|-----------|------------|
| Prisma | Excellent DX, visual tools, largest community | Schema-first requires codegen, historically slower |
| Drizzle | SQL-first, zero codegen, PostGIS + FTS support, lightweight | Smaller ecosystem, steeper SQL curve |
| Supabase | Hosted Postgres, instant APIs, RLS | Vendor coupling, less query control |

**Why Drizzle for HumanHomes:**
1. **PostGIS support** — built-in geometry types for geospatial queries
2. **Full-text search** — PostgreSQL native FTS with tsvector/tsquery
3. **Zero codegen** — instant type reflection
4. **SQL control** — complex real estate queries benefit from direct SQL
5. **Performance** — one SQL per query guarantee

**Database hosting:** Supabase managed PostgreSQL (free 500MB, Pro $25/mo for 8GB).

---

## 3. Auth: Clerk

| Provider | Strengths | Price |
|----------|-----------|-------|
| Clerk | Best DX, pre-built UI, identity verification, org management | $0.02/MAU after 10K free |
| Auth0 | Enterprise compliance, HIPAA, SAML SSO | $0.07/MAU |
| Supabase Auth | Cheapest, RLS integration | $0.00325/MAU after 50K free |

Clerk wins for: identity verification integration, multi-platform SDKs (Next.js + React Native + Node.js), pre-built UI, custom user metadata for profiles/badges.

---

## 4. Real-Time: Supabase Realtime (MVP) → Ably (at scale)

| Solution | Strengths | Price |
|----------|-----------|-------|
| Supabase Realtime | Integrated with DB, Broadcast + Presence + DB changes | Included with Supabase |
| Ably | Enterprise-grade, guaranteed delivery, offline persistence | Usage-based |
| Socket.io | Free, flexible | Single-server bottleneck, no persistence |

Start with Supabase Realtime (bundled). Migrate to Ably at 100K+ users.

---

## 5. Search: PostgreSQL FTS (MVP) → Meilisearch (scale)

| Solution | Strengths | Weaknesses |
|----------|-----------|------------|
| PostgreSQL FTS | Built-in, free, Drizzle supports natively | Less sophisticated ranking, no typo tolerance |
| Meilisearch | Sub-50ms, typo-tolerant, faceted search | Extra service |
| Typesense | Sub-50ms, geo-search built-in | Smaller ecosystem |
| Elasticsearch | Most powerful | Heavy JVM, operational complexity |

Start with PostgreSQL FTS (zero cost), add Meilisearch when search UX becomes a priority.

---

## 6. File Storage: Cloudflare R2

| Solution | Storage Cost | Egress Cost |
|----------|-------------|-------------|
| Cloudflare R2 | $0.015/GB/mo | **$0** |
| AWS S3 | $0.023/GB/mo | $0.09/GB |
| Supabase Storage | $0.021/GB/mo | $0.09/GB |

R2's zero egress is critical for a media-heavy real estate platform. S3-compatible API makes migration trivial.

---

## 7. Job Queues: Inngest

| Solution | Hosting | Strengths |
|----------|---------|-----------|
| BullMQ | Self-hosted (Redis) | Battle-tested, no vendor lock-in |
| Inngest | Managed (serverless) | Event-driven step functions, auto-retry, zero infra |
| Trigger.dev | Managed or self-hosted | No timeouts, largest community |

Inngest wins for durable workflows (public records pipeline), event-driven triggers (new listing → comps analysis), scheduled jobs (daily records sync), and zero infrastructure.

---

## 8. Monorepo Tooling: Turborepo

Turborepo with pnpm workspaces. Simpler than Nx, right-sized for the project.

---

## Recommended Architecture

```
humanhomes/
├── apps/
│   ├── web/          # Next.js 15 (App Router)
│   ├── mobile/       # React Native (Expo)
│   └── api/          # Fastify + tRPC server
├── packages/
│   ├── db/           # Drizzle ORM schema + migrations
│   ├── shared/       # Shared types, validation (Zod), business logic
│   └── trpc/         # tRPC router definitions
├── turbo.json
└── pnpm-workspace.yaml
```

**Data flow:** Client → tRPC → Fastify → Drizzle → PostgreSQL (Supabase)

**Key trade-offs:**
1. tRPC over REST/GraphQL — no public API but full type safety
2. Drizzle over Prisma — SQL control over DX polish
3. Clerk over Supabase Auth — higher cost for better DX and identity verification
4. Inngest over BullMQ — managed convenience over self-hosted control
5. R2 over S3 — massive egress savings for media-heavy platform
