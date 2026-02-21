# Frontend + Mobile Tech Stack Research

**Researcher:** frontend-researcher
**Date:** 2026-02-20
**Status:** Complete

---

## 1. Web Framework: Next.js 15 (App Router)

**Recommendation: Next.js 15 — strong pick, no close second for this use case.**

**Why Next.js wins for HumanHomes:**
- **SEO is critical for real estate** — home listings, neighborhood pages, and market data pages need server-side rendering and static generation. Next.js excels at SSG/ISR for listing catalogs and SSR for dynamic pages (search results, dashboards).
- **React Server Components (RSC)** — now stable in React 19, deeply integrated via the App Router. Reduces client-side JavaScript dramatically. Home listing pages can be mostly server-rendered with interactive islands (photo galleries, chat widgets, map).
- **Turbopack** — stable in dev, beta for production builds as of 15.5. Significant DX improvement for a large codebase.
- **68% developer preference** in the 2024 State of JS survey. Massive ecosystem, hiring pool, and community support.
- **ISR (Incremental Static Regeneration)** — perfect for listings that change infrequently but need to stay fresh.

**Why not Remix:** No built-in SSG, smaller ecosystem, progressive enhancement less relevant for rich interactive features.

**Why not others (Astro, SvelteKit):** TypeScript + React Native code sharing locks us into React ecosystem.

---

## 2. Mobile Framework: React Native with Expo (SDK 54+)

**Recommendation: Expo (managed workflow) with Expo Router.**

- **New Architecture is default** (RN 0.82) — TurboModules, Fabric Renderer, JSI. Near-native performance.
- **Expo Router** — file-based routing (identical mental model to Next.js App Router). Deep linking for listing URLs.
- **EAS** — OTA updates, cloud builds, one-click deployments.
- **Metro auto-configured for monorepos** since SDK 52.

---

## 3. Code Sharing Strategy: Turborepo Monorepo

**Recommendation: Turborepo with pnpm workspaces.**

```
humanhomes/
  apps/
    web/          # Next.js 15 (App Router)
    mobile/       # Expo (React Native + Expo Router)
  packages/
    shared/       # Business logic, types, validators (Zod schemas)
    ui/           # Shared UI components (NativeWind-styled)
    api-client/   # tRPC or typed API client
    config/       # Shared ESLint, TypeScript configs
```

**Why Turborepo over Nx:** Simpler setup, Vercel alignment, right-sized for 2 apps + 3-4 packages.

**What gets shared:** Zod schemas, business logic, TypeScript types, constants, utilities.
**What stays platform-specific:** Navigation/routing, native modules, server-only code.

---

## 4. UI Component Library & Styling: NativeWind v5 + Gluestack UI v3

- **NativeWind:** Tailwind CSS on web, StyleSheet.create on native. Same utility classes, platform-optimal rendering.
- **Gluestack UI v3:** Unstyled, accessible components styled with NativeWind. Cross-platform rendering.
- Platform-specific modifiers: `ios:`, `android:`, `web:` prefixes.

---

## 5. Maps: react-map-gl + MapLibre GL

- **Open source, no vendor lock-in** — MapLibre GL JS is BSD licensed.
- **Free tile hosting options** — Stadia Maps, MapTiler free tier, Protomaps.
- **Custom styling** — neighborhood boundaries, school districts, walkability overlays.
- **react-map-gl** — maintained by Vis.gl (Uber).
- **Mobile:** MapLibre React Native (`@maplibre/maplibre-react-native`).

---

## 6. Real-Time Messaging: Stream Chat SDK

- Pre-built UI for React (web) and React Native (mobile).
- WebSocket management, reconnection, offline queuing, presence.
- Moderation tools, content moderation, blocking, reporting.
- End-to-end encryption available.
- Free tier: ~$0 for first 10K MAU.
- Future: migrate to self-hosted (Matrix/Element) if pricing becomes prohibitive.

---

## 7. Video Calls: Daily.co

- React and React Native SDKs with pre-built UI.
- Handles WebRTC complexity. 1:1 and small group calls.
- Free tier: 10,000 participant minutes/month.
- Scale alternative: LiveKit (open source, self-hostable).

---

## 8. State Management: Zustand + TanStack Query

- **TanStack Query:** ~80% of state (API data, caching, background refetch, optimistic updates).
- **Zustand:** ~20% (UI state, user preferences, cross-component state).
- 18KB combined bundle (vs 50KB+ for Redux).
- Works in React Native.

---

## 9. Photo/Video Galleries

- **Web:** react-photo-album + yet-another-react-lightbox
- **Mobile:** galeria (Fernando Rojo) for animated image viewing
- **Video:** react-native-video / expo-video
- **Uploads:** expo-image-picker (mobile), presigned S3/R2 URLs (web)

---

## Summary Table

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Web framework | Next.js 15 (App Router) | SSR/SSG for SEO, RSC, largest ecosystem |
| Mobile framework | Expo (SDK 54+) + Expo Router | File-based routing, OTA updates, new architecture |
| Monorepo | Turborepo + pnpm | Simple, fast, Vercel-aligned |
| Styling | NativeWind v5 (Tailwind CSS) | Cross-platform utility classes |
| UI components | Gluestack UI v3 (unstyled) | Accessible, cross-platform, NativeWind-compatible |
| Maps | react-map-gl + MapLibre GL | Open source, no vendor lock-in |
| Chat/messaging | Stream Chat SDK | Pre-built UI, moderation, free tier |
| Video calls | Daily.co SDK | Managed WebRTC, free tier |
| State (client) | Zustand | Lightweight, zero boilerplate |
| State (server) | TanStack Query | Caching, background refetch, optimistic updates |
| Photo/video | galeria (mobile), react-photo-album (web) | Purpose-built gallery experiences |
| Language | TypeScript 5.9+ | Design requirement |

## Key Trade-offs

1. **Stream Chat vs custom** — saves 3-6 months but adds vendor dependency.
2. **MapLibre vs Google Maps** — free but weaker geocoding. May need Google Places API alongside.
3. **NativeWind vs Tamagui** — simpler and more familiar, slightly less optimized on mobile.
4. **Turborepo vs Nx** — simpler but less architecture enforcement. Easy to migrate later.
5. **Daily.co vs LiveKit** — simpler but proprietary. Start managed, go open-source if video becomes core.
