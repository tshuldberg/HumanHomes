# HumanHomes — Product Specification

**Date:** 2026-02-20
**Version:** 1.0
**Status:** Final Draft
**Authors:** Product Team (Trey Shuldberg + Claude Agent Team)

---

## Executive Summary

### Mission

Democratize homeownership. Give every homeowner the full power of the real estate industry — without agents, without gatekeeping, without middlemen. Connect real families with homes to live in, verified by their own communities.

Stop profiteering on single-family homes. Return homes to being living spaces so communities are built by people who care about where they live, know their neighbors, and treat their home as a living entity with its own story.

Inspire new models of ownership — collective purchasing, community-driven transitions, and grassroots paths to homeownership that bypass corporate gatekeepers.

### Problem

The current real estate system is broken:

1. **Gatekeeping.** MLS, realtor associations, and licensing requirements lock essential tools — comparable sales, market data, transaction management — behind paywalls and professional memberships.
2. **Middlemen.** Two realtors stand between buyer and seller, preventing direct communication. Buyers cannot ask sellers about the home's story, character, or history.
3. **Profiteering.** Flippers, corporate buyers, and investment firms treat single-family homes as financial instruments, destroying community fabric.
4. **Dehumanization.** Homes are reduced to square footage and bedroom counts. The human story — the crow that delivered newspapers, the porch where memories were made — is lost.
5. **Inspector Conflicts of Interest.** Home inspectors often work for the realtor, not the buyer. They gloss over issues to help close the sale, leaving buyers exposed to costly surprises.
6. **Inaccessible Homeownership.** Individual buyers are priced out while corporate entities buy at scale. No mainstream path exists for friends, families, or renter groups to pool resources and buy collectively.
7. **Boomer Transition Gap.** Baby boomers hold a massive share of housing stock. Many homes have not been maintained because owners could not afford repairs. No smooth mechanism exists to transition these homes to the next generation of owners.

### Solution

HumanHomes is a full real estate operating system for homeowners. It replicates every capability the professional real estate ecosystem provides, but makes it open, free, and human-first. No agent required. No MLS membership. No gatekeeping.

The platform is a connection layer: it facilitates discovery, verification, communication, and transaction guidance. Traditional title and escrow companies handle closing. HumanHomes replaces the agent, not the legal infrastructure.

### Platform

- **Web app** (Next.js 15) — Primary experience, responsive design
- **iOS app** (React Native / Expo) — Native mobile
- **Android app** (React Native / Expo) — Native mobile

### Revenue Model

**Inverted marketplace** — Instead of buyers and sellers going to realtors, the platform flips the traditional model. People make the first connection directly. Licensed professionals (realtors, brokers, inspectors, attorneys) can offer their services to platform users who request help, but they come to the people — not the other way around.

The platform provides all the services a realtor typically handles (documentation, connections, checklist guidance). Professional help is optional and on the user's terms.

Revenue streams:
- **Professional marketplace fees** — Realtors, brokers, inspectors, and attorneys pay to be listed and to respond to user requests for help
- **Premium tools** — Enhanced analytics, AI pricing guidance, advanced document templates
- **Transaction facilitation** — Optional closing coordination services
- **No user fees for core functionality** — Listing, searching, messaging, and basic tools are free

---

## Design Principles

1. **Homes are living entities.** Every home has a story, a history, a character. The platform elevates this.
2. **People over properties.** Profiles and stories matter as much as square footage.
3. **No middlemen.** Direct buyer-seller connection. The platform provides tools, not gatekeepers.
4. **Community verification over institutional verification.** Trust comes from your neighbors, not a license.
5. **Open data.** Market intelligence is a public good, not a gated resource.
6. **Full replacement.** If a realtor does it, HumanHomes can do it. No half-measures.
7. **Anti-cookie-cutter.** Celebrate neighborhood character, yard space, community gardens, and walkability. Push back against density-maximizing corporate development.
8. **Collective paths to ownership.** Homeownership is not just for individuals. Groups, friends, and communities deserve tools too.
9. **Graceful transitions.** Aging homeowners deserve a dignified path to transition their homes, not pressure from flippers and corporate buyers.
10. **Private preferences, public respect.** Users can filter by personal values and community fit without those filters becoming public-facing or creating visible exclusion.
11. **Stories before statistics.** A user should encounter a home's story before they see its price or square footage.
12. **Never subtract, always refine.** Users should never watch a list of homes shrink. They should watch their match quality improve.
13. **Warmth over efficiency.** Every interaction should feel like a conversation with a neighbor, not a transaction with a database.

---

## Complete Feature Inventory

### 1. Home Listings & Stories

| # | Feature | Description |
|---|---------|-------------|
| 1.1 | Structured listing data | Standard property fields: beds, baths, sqft, lot size, year built, systems, upgrades |
| 1.2 | Home Story | Free-form narrative about the home's history, memories, character, and renovations |
| 1.3 | Photo/video galleries | Upload and organize photos, videos, floor plans, and virtual tours |
| 1.4 | Seller relationship narrative | Why the seller loves this home, what made it special, their life there |
| 1.5 | Neighborhood context | Community vibe, walkability, local character, nearby amenities — told by people |
| 1.6 | Anti-cookie-cutter emphasis | Highlight yard space, fruit trees, neighborhood character over density and uniformity |
| 1.7 | Organic-only listings | All listings are user-generated; no MLS data import, no scraped listings |

**Home Story Creation:** Sellers answer a series of specific, evocative prompts — "What's the first thing you remember about moving in?", "Where's your favorite spot?", "What would you tell the next family?" — and the platform assembles responses into a cohesive narrative with AI assistance. The seller retains full editorial control.

### 2. People Profiles

| # | Feature | Description |
|---|---------|-------------|
| 2.1 | Buyer profile | Who you are, your family, why you want this neighborhood |
| 2.2 | Seller profile | Your story, why you're selling, what you loved about living there |
| 2.3 | Group profile | Collective profile for co-buying groups — members, shared vision, combined financials |
| 2.4 | Verification badges | Visual trust indicators tied to the multi-layer verification system |
| 2.5 | Transaction history | Record of past purchases and sales completed on the platform |

### 3. Multi-Layer Verification System

| # | Feature | Description |
|---|---------|-------------|
| 3.1 | Identity verification (Layer 1) | Government ID check via Persona (startup program) or Stripe Identity |
| 3.2 | Neighborly vouching (Layer 2) | Community members confirm you're a real person/family who lives in their home |
| 3.3 | Intent pledge (Layer 3) | Explicit commitment to owner-occupy — not flip, not rent out, not corporate acquisition |
| 3.4 | Graduated trust tiers | More vouches and verified transactions = higher trust level |
| 3.5 | Anti-gaming measures | Vouch limits per user (max 10 total), vouch chain validation, mutual-vouch cooldown, IP/household deduplication, abuse detection |

**Trust Tiers:**
- Tier 0: Unverified (new account)
- Tier 1: Identity verified (ID check complete)
- Tier 2: Neighbor-confirmed (3+ vouches from different households + ID verified)
- Tier 3: Established (5+ vouches + completed transaction on platform + 6+ months tenure)

**Vouching UX:** Three yes/no questions ("Do you know this person?", "Do they live in your neighborhood?", "Would you call them a neighbor?"). Block-level location shown to voucher (not exact address). Voucher identity visible only to the person being vouched. Vouches expire after 2 years.

### 4. Market Intelligence

| # | Feature | Description |
|---|---------|-------------|
| 4.1 | Public records comps | Comparable sales data sourced from ATTOM Data API (county assessor, deed transfers, tax records) |
| 4.2 | Neighborhood trends | Price trends and analytics at the neighborhood level |
| 4.3 | AI pricing guidance | ML suggestions: "homes like yours in this area sold for..." |
| 4.4 | Market conditions dashboard | Buyer's market vs seller's market indicators and trends |
| 4.5 | Open access guarantee | All market intelligence is free and ungated |

**Data Pipeline:** Primary source is ATTOM Data API (~$500/mo, 158M properties, 99% US coverage). Supplementary source: RealEstateAPI.com. Abstraction layer built for provider swappability. Aggressive caching (property records change infrequently). Coverage map shows data quality per area.

### 5. Direct Communication

| # | Feature | Description |
|---|---------|-------------|
| 5.1 | Buyer-seller messaging | Real-time direct chat via Stream Chat SDK (WebSocket, offline queuing, moderation) |
| 5.2 | Video calls | Face-to-face video for remote buyers via Daily.co SDK |
| 5.3 | Listing Q&A threads | Public or private question threads on individual listings |
| 5.4 | Seller transparency | The seller always knows who is interested in buying their home |

**First Contact UX:** The first message from buyer to seller is a structured introduction. The buyer's profile is automatically attached. Dynamic starter prompts reference specific details from the seller's Home Story. Subsequent messages are free-form chat. No anonymous inquiries.

### 6. Offer Management

| # | Feature | Description |
|---|---------|-------------|
| 6.1 | On-platform offers | Submit and receive formal offers within the platform |
| 6.2 | Counteroffer workflow | State machine: submitted > countered > accepted / rejected / expired |
| 6.3 | Multiple offer tracking | Sellers view, compare, and manage simultaneous offers |
| 6.4 | Human offer comparison | Compare offers by buyer profile, verification level, and story — not just price |
| 6.5 | Contingency management | Track inspection, financing, and appraisal contingencies with deadline reminders |
| 6.6 | Group offer support | Collective purchasing groups submit unified offers with co-buyer details and ownership structure |

### 7. Disclosure & Document Builder

| # | Feature | Description |
|---|---------|-------------|
| 7.1 | Guided disclosure forms | State-specific templates (launch with CA, TX, FL, NY, WA) |
| 7.2 | Property condition reports | Structured format for documenting property condition |
| 7.3 | Document templates | Purchase agreements, addenda, and other transaction documents |
| 7.4 | E-signing integration | Dropbox Sign (HelloSign) API — $75/mo for 50 requests |
| 7.5 | Checklist-driven guidance | Step-by-step process replacing the agent's role in documentation |
| 7.6 | Group purchase agreements | Templates for co-ownership: equity splits, shared responsibility, exit clauses |

### 8. Showing & Access Management

| # | Feature | Description |
|---|---------|-------------|
| 8.1 | Showing scheduler | Seller-controlled calendar for scheduling home viewings |
| 8.2 | Buyer time slot requests | Buyers request viewing times, sellers approve or suggest alternatives |
| 8.3 | Self-guided tours | Smart lock integration potential for unaccompanied viewings (future) |
| 8.4 | Open house management | Create, manage, and track RSVPs for open house events |

### 9. Closing Coordination

| # | Feature | Description |
|---|---------|-------------|
| 9.1 | Closing checklist | Guided list: title search, insurance, inspections, appraisal, final walkthrough |
| 9.2 | Independent professional marketplace | Vetted inspectors, title companies, attorneys, notaries |
| 9.3 | Inspector independence guarantee | Inspectors must demonstrate no realtor affiliation |
| 9.4 | Timeline tracker | Visual timeline from accepted offer to keys in hand |

### 10. Community & Neighborhood Discovery

| # | Feature | Description |
|---|---------|-------------|
| 10.1 | Character-based browsing | Explore neighborhoods by culture, character, and community vibe |
| 10.2 | Resident perspectives | Verified residents share what it's really like to live there |
| 10.3 | Community fit matching | Private "resonance" engine matches neighborhoods to user values |
| 10.4 | Neighborhood stories | Community-authored endorsements and narratives about neighborhood life |
| 10.5 | Neighbor preview | See who your neighbors would be before you buy |
| 10.6 | Private community filters | Personal preference filters that operate privately — never displayed publicly |

**Resonance Engine:** Preferences adjust the ORDER of results, not their existence. No before/after counts. Subtle warm-glow indicators for strong matches (no text labels explaining why). Preferences are encrypted and never shared. Audit log monitors for proxy-discrimination patterns.

### 11. Group Purchasing & Collective Ownership

| # | Feature | Description |
|---|---------|-------------|
| 11.1 | Co-buying platform | Friends, family, or groups pool resources to buy together |
| 11.2 | Renter-to-owner pathway | Renters in a shared home organize to purchase the property they already live in |
| 11.3 | Group formation tools | Find compatible co-buyers based on shared values, location preferences, and financial capacity |
| 11.4 | Co-ownership structure templates | Pre-built templates for equity splits, maintenance responsibility, buyout provisions, exit clauses |
| 11.5 | Group verification | Each member goes through the full verification process individually |
| 11.6 | Shared financial planning | Calculate each member's contribution, mortgage qualification, and ownership percentage |
| 11.7 | Legal structure templates | Joint tenancy, tenancy in common, and LLC formation documents |

**Group Dashboard:** Members vote on saved homes (Love it / Maybe / Not for us / Want to visit). Journey progress bar tracks crew formation through closing. Ownership structure education presented in plain language. Maximum 6 co-buyers per group (initial limit).

### 12. Boomer Home Transition Program

| # | Feature | Description |
|---|---------|-------------|
| 12.1 | Transition listings | Dedicated listing type for aging homeowners — not a traditional sale |
| 12.2 | Home condition transparency | Honest representation of deferred maintenance without sales pressure |
| 12.3 | Community outreach tools | Connect with aging homeowners in neighborhoods where homes need new life |
| 12.4 | Transition assistance | Guided process for downsizing, estate transitions, passing homes to family or community |
| 12.5 | Repair network | Connect transitioning homes with affordable repair services and community volunteers |
| 12.6 | Sensitivity-first design | Conversational UX: one question per screen, large text (18px minimum), encouraging microcopy |

**Boomer Onboarding:** Separate entry point with conversational flow. Asks about memories and feelings before bedroom count. "I'm helping someone list their home" option for family members. "Not sure?" helpers auto-fetch square footage and year built from county records. No pricing question during onboarding.

### 13. Professional Services Marketplace (Inverted)

| # | Feature | Description |
|---|---------|-------------|
| 13.1 | Inverted discovery | Users post help requests; qualified professionals respond with pitches |
| 13.2 | Independence verification | Inspectors must demonstrate no realtor or brokerage affiliation |
| 13.3 | User-controlled engagement | Users choose if, when, and which professional help they want; no cold outreach |
| 13.4 | Transparent pricing | Professionals list fees upfront; no hidden commissions |
| 13.5 | Community reviews | Ratings and reviews tied to verified transactions on the platform |

**Hard constraint:** Professionals cannot initiate contact with users who have not posted a help request. This is enforced at the messaging-system level, not as policy. Reviews are tied to verified HumanHomes transactions — no imported reviews.

---

## User Journeys

### Buyer Journey (Individual)

1. **Discover** — Land on HumanHomes. No search bar on landing page. Entry point is home stories and neighborhood narratives.
2. **Explore neighborhoods** — Select positive preferences (additive, never subtractive). Neighborhoods surface as stories and communities, not inventories. No result counts.
3. **Browse homes** — Within a chosen neighborhood, browse listing cards that show story excerpts above stats. Price shown only on detail page.
4. **Create profile** — Build buyer profile: who you are, your family, your values. Set private resonance preferences (lifestyle, values, interests).
5. **Verify** — Layer 1 (ID check) > Layer 2 (3+ neighbor vouches) > Layer 3 (intent pledge). Earn trust tier badges.
6. **Connect** — Introduce yourself to sellers with structured first message (profile auto-attached). Read their Home Story. Ask questions on listing Q&A.
7. **Visit** — Request showing via seller-controlled scheduler. Attend open houses. Self-guided tour option (if seller enables).
8. **Offer** — Submit offer on-platform with your profile and story attached. Negotiate via counteroffer workflow. Manage contingencies.
9. **Close** — Follow guided closing checklist. Hire independent professionals from the marketplace. Inspector works for you, not a realtor. Track timeline to keys. Complete documents via e-signing.
10. **Settle in** — Join neighborhood community on the platform. Vouch for future buyers. Add to the neighborhood story.

### Seller Journey

1. **Decide to sell** — Explore Market Intelligence for pricing context. AI guidance based on public records comps. No realtor needed.
2. **Create listing** — Enter structured data, then write your Home Story via guided prompts. Upload photos/videos. Describe neighborhood character.
3. **Complete disclosures** — Guided disclosure builder walks through state-specific forms. Property condition report.
4. **Receive interest** — Read buyer profiles and stories. Respond to Q&A threads. Know who is interested.
5. **Manage showings** — Approve/deny requests. Schedule open houses with RSVP tracking.
6. **Review offers** — Compare offers by price AND by person (profile, verification, story). Counteroffer workflow.
7. **Close** — Follow closing checklist. Document signing on-platform. Timeline tracker to keys.

### Group Purchasing Journey

1. **Form the group** — Friends, family, or co-renters create a Group Profile. Define shared vision.
2. **Build the group (optional)** — Use Group Formation tools to find compatible co-buyers. Match on values, location, financial capacity.
3. **Plan finances** — Shared financial planning tools. Calculate contributions, ownership percentages, mortgage qualification. Choose legal structure (joint tenancy, tenancy in common, LLC).
4. **Verify each member** — Every member goes through individual verification across all three layers.
5. **Search & explore** — Browse listings as a group. Vote on saved homes. Shared favorites and discussion threads.
6. **Submit group offer** — Unified offer with co-buyer details and ownership structure. Seller sees the full picture.
7. **Close with co-ownership docs** — Group purchase agreement templates. Equity splits, maintenance responsibilities, buyout provisions, exit clauses. Independent closing professionals.

### Renter-to-Owner Journey

1. **Organize** — Co-renters create a Group Profile for their household. Assess collective financial capacity.
2. **Approach the landlord** — Platform tools for formal expression of interest. Tenant purchase proposal templates.
3. **Negotiate & offer** — If landlord lists on HumanHomes, submit group offer. Otherwise, use document templates to structure the deal.
4. **Close & transition** — Standard group closing process. Rental relationship converts to ownership.

### Boomer Home Transition Journey

1. **Outreach** — Sensitivity-first approach. No pressure, no sales tactics. Information about transition options.
2. **Explore options** — Sell, gift to family, community transfer. No realtor pressure to maximize price.
3. **Create transition listing** — Conversational UX, one question at a time. Honest condition representation. Decades-long Home Story.
4. **Connect with repair network** — Affordable repair services. Community volunteer groups for cleanup and basic maintenance.
5. **Find the right buyer** — Transition listings attract character-over-perfection buyers. Community fit matching. Direct communication.
6. **Transition with dignity** — Guided downsizing process. Estate transition support. Adapted closing process.

---

## UX Design Decisions

### Entry Point: Discovery-First

The platform opens with stories, not search. No search bar on the landing page. No property counts. Users enter through neighborhood narratives and home stories. The flow is **Discover > Connect > Reveal**, not Search > Filter > Shrink. At no point does adding a preference make anything disappear.

### Private Resonance Engine

Community affinity filters operate as "resonance" — adjusting sort order, never filtering results. Preferences are completely private and encrypted. No before/after counts. Subtle warm-glow indicators for strong matches without explanatory labels. Anti-discrimination guardrails: no categories map directly to protected classes; custom values moderated; aggregate usage audited for proxy-discrimination patterns.

### Human-First Data Display

On listing cards: story excerpt > photo > seller name > stats. Price is not shown on cards — it appears on the detail page. The CTA is "Read Their Story" not "View Listing." On offers: buyer profile > their story > verification level > offer amount. The person always comes before the data.

### Visual Design Direction

- **Color palette:** Warm terracotta (#C4704B), sage green (#8B9F82), warm white (#FAF7F2), charcoal (#2D2D2D), amber accent (#D4A84B)
- **Typography:** Serif headlines (Lora/Merriweather) for warmth + sans-serif body (Inter/Source Sans) for clarity
- **Imagery:** No stock photos. Natural light, real rooms, lived-in spaces. Hand-drawn illustrations for empty states.
- **Components:** Rounded corners (12-16px), soft shadows, generous spacing, warm button colors (no urgency)

### Interaction Patterns

| Pattern | Used In | Rule |
|---------|---------|------|
| Progressive Disclosure | Entry point, onboarding, group purchasing | Never show all complexity upfront. Reveal detail as user demonstrates intent. |
| Additive Selection | Resonance filters, neighborhood discovery | User actions add specificity. They never remove results. "Turn up the volume on what I like." |
| Human-First Data | Listing cards, offer comparison, messages | Show the person before the data. |
| Structured Ice-Breaking | First contact, story creation, vouch requests | Provide contextual prompts for blank text fields in socially sensitive contexts. |
| Celebratory Milestones | Verification, group formation, closing | Mark progress with warmth. Honor meaningful real-life moments. |

### Navigation

Four primary tabs: Discover, Your Home (if selling), Messages, Profile. "Discover" not "Search." Messages are top-level because human connection is the core product. Mobile: four-tab bottom bar, badge count on Messages, no hamburger menu.

---

## Technical Architecture

### Stack Summary

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Web framework | Next.js 15 (App Router) | SSR/SSG for SEO, RSC, largest ecosystem |
| Mobile framework | Expo (SDK 54+) + Expo Router | File-based routing, OTA updates, New Architecture |
| Monorepo | Turborepo + pnpm | Simple, fast, Vercel-aligned |
| API | tRPC + Fastify | End-to-end type safety, fastest Node.js framework |
| Database | PostgreSQL + Drizzle ORM | PostGIS for geospatial, FTS, zero codegen |
| Auth | Clerk | Identity verification, multi-platform SDKs, pre-built UI |
| Real-time | Supabase Realtime (MVP) > Ably (scale) | Included with Supabase, enterprise-grade upgrade path |
| Search | PostgreSQL FTS (MVP) > Meilisearch (scale) | Zero cost start, sub-50ms typo-tolerant upgrade |
| File storage | Cloudflare R2 | Zero egress cost — critical for media-heavy platform |
| Job queues | Inngest | Durable workflows, event-driven, zero infrastructure |
| Chat/messaging | Stream Chat SDK | Pre-built UI, moderation, free tier |
| Video calls | Daily.co SDK | Managed WebRTC, free tier |
| State (client) | Zustand + TanStack Query | 18KB combined, works in React Native |
| Styling | NativeWind v5 (Tailwind CSS) | Cross-platform utility classes |
| UI components | Gluestack UI v3 | Accessible, cross-platform, NativeWind-compatible |
| Maps | react-map-gl + MapLibre GL (rendering) + Mapbox (geocoding) | Open source rendering, no vendor lock-in |
| Identity verification | Persona (startup program) / Stripe Identity (fallback) | Best UX, 500 free/mo for 1 year |
| E-signatures | Dropbox Sign API | API-first, embedded signing, best DX |
| Public records | ATTOM Data API (primary) + RealEstateAPI.com (supplementary) | 158M properties, 99% US coverage |
| Hosting | Railway (MVP) > AWS (scale) | Best DX, ~$20-50/mo MVP |
| Language | TypeScript 5.9+ | Design requirement — full stack |

### Monorepo Structure

```
humanhomes/
  apps/
    web/          # Next.js 15 (App Router)
    mobile/       # Expo (React Native + Expo Router)
    api/          # Fastify + tRPC server
  packages/
    db/           # Drizzle ORM schema + migrations
    shared/       # Shared types, validation (Zod), business logic
    trpc/         # tRPC router definitions
    ui/           # Shared UI components (NativeWind-styled)
    api-client/   # tRPC typed client
    config/       # Shared ESLint, TypeScript configs
  turbo.json
  pnpm-workspace.yaml
```

### Data Flow

```
Client (Web/Mobile) --> tRPC --> Fastify --> Drizzle --> PostgreSQL (Supabase)
                                                          |
                                            PostGIS (geospatial queries)
                                            FTS (full-text search)
                                                          |
                                   Cloudflare R2 <-- Media uploads
                                   Stream Chat <-- Real-time messaging
                                   Persona <-- Identity verification
                                   ATTOM <-- Public records
```

### Infrastructure Cost (MVP)

| Area | Primary Choice | Monthly Cost |
|------|---------------|-------------|
| Public Records | ATTOM Data API | ~$500/mo |
| Identity Verification | Persona | Free (startup program) |
| E-Signatures | Dropbox Sign API | ~$75/mo |
| Mapping/Geocoding | Mapbox | Free tier |
| Hosting | Railway | ~$20-50/mo |
| CDN/Assets | Cloudflare | Free tier |
| **Total** | | **~$600-650/month** |

---

## Implementation Roadmap

### Dependency Graph (Critical Path)

```
Auth & User System
  |
  +-- People Profiles
  |     +-- Verification System (Layer 1 > Layer 2 > Layer 3)
  |     +-- Group Profiles > Group Purchasing
  |
  +-- Home Listings & Stories
  |     +-- Showing & Access Management
  |     +-- Direct Communication > Video Calling
  |     +-- Offer Management > Disclosure & Docs > E-Signing > Closing
  |     +-- Boomer Home Transition Program
  |
  +-- Market Intelligence > AI Pricing Guidance
```

**Critical path:** Auth > Profiles > Listings > Messaging > Offers > Documents > Closing

### Phased Build Plan

| Phase | Scope | Duration | Cumulative |
|-------|-------|----------|-----------|
| 1: Foundation | Monorepo, auth, profiles, CI/CD | 6 weeks | 6 weeks |
| 2: Listings & Stories | Listing CRUD, Home Story builder, photos, maps, search | 6 weeks | 12 weeks |
| 3: Messaging | Real-time chat, Q&A, push notifications, moderation | 6 weeks | 18 weeks |
| 4: Verification | Identity (Persona), vouching, intent pledge, trust tiers | 8 weeks | 26 weeks |
| 5: Market Intelligence | ATTOM integration, comps, trends, AI pricing | 10 weeks | 36 weeks |
| 6: Offers & Documents | Offer state machine, disclosures, e-signing (5 states) | 10 weeks | 46 weeks |
| 7: Closing & Professionals | Closing checklist, professional marketplace, reviews | 10 weeks | 56 weeks |
| 8: Community & Groups | Neighborhood discovery, group purchasing, boomer transition | 16 weeks | 72 weeks |

**MVP (Phases 1-3): ~18 weeks (4.5 months).** Sellers can list homes with stories and photos. Buyers can discover, browse, and message sellers directly.

**Full scope: ~72 weeks (18 months)** with a 2-3 person team. Phases 5-8 have significant parallelization potential with a larger team.

### Feature Priority Tiers

**Tier 1 — MVP:**
Home Listings & Stories, People Profiles (buyer + seller), Identity Verification + Intent Pledge, Direct Messaging, Public Records Comps, Basic Offers

**Tier 2 — Post-Launch:**
Full Verification System, Disclosure & Document Builder, Showing Management, Closing Coordination, Community Discovery, AI Pricing, Video Calls, Listing Q&A

**Tier 3 — Growth:**
Group Purchasing, Group Profiles, Group Offers, Group Purchase Agreements, Private Resonance Filters, Professional Services Marketplace

**Tier 4 — Long-Term Vision:**
Boomer Home Transition Program, Renter-to-Owner Pathway, Repair Network, Shared Ownership Management, Legislative Advocacy Tools

---

## Technical Risk Register

| # | Risk | Severity | Likelihood | Mitigation |
|---|------|----------|-----------|-----------|
| 1 | Public records data fragmentation (3,000+ counties, inconsistent formats) | Critical | High | Start with ATTOM API, budget $50-100K/year, build proprietary for top-50 counties over time |
| 2 | Fair Housing Act compliance (private filters correlating with protected classes) | Critical | Medium | Legal review of all matching algorithms, audit outcomes for disparate impact, retain FHA specialist counsel |
| 3 | Legal document liability (deficient templates) | High | Medium | Attorney review per state, clear disclaimers, E&O insurance, start with 3-5 states |
| 4 | Verification system gaming (fraud rings, coordinated attacks) | High | High | Vouch limits, graph analysis, temporal analysis, geographic validation, manual review, revocation |
| 5 | Two-sided marketplace cold start | High | High | Launch hyper-locally, seed with Home Story content, allow story-only listings, curated professional network |
| 6 | Real-time scalability | Medium | Medium | Managed infrastructure (Ably/Pusher), message queuing, eventual consistency, load testing |
| 7 | Mobile cross-platform limitations (rich text, video, maps) | Medium | Medium | Markdown on mobile (not WYSIWYG), native modules for maps, real-device testing |
| 8 | Group purchasing legal complexity (co-ownership laws vary by state) | High | High | Defer complex features until partnerships with co-ownership lenders/attorneys, educational content first |
| 9 | Regulatory pushback from real estate industry | High | Medium-High | Legal analysis of "practicing real estate" laws, platform provides tools not advice, grassroots support |
| 10 | Data privacy and security (PII-heavy platform) | Critical | Medium | Encryption at rest + in transit, minimal data retention, SOC 2 roadmap, quarterly pen testing, GDPR/CCPA compliance |

---

## Growth & Advocacy Strategy

### Grassroots-First Approach

The platform must build critical mass through genuine community adoption before the real estate industry takes notice. This is one of the largest industries on the planet. Corporate entities (BlackRock, institutional buyers) and entrenched industry players (NAR, MLS organizations) will resist disruption.

- **Quiet revolution** — Build user base and demonstrate value before making industry-wide claims
- **Community-driven growth** — Word of mouth through successful transactions, not advertising blitzes
- **Inspire new models** — Show brokers, lenders, and investors that a more communal, socialized approach to housing can work
- **Delicate positioning** — Take power back without threatening incumbents so aggressively that they mobilize against the platform early

### Legislative & Policy Path

- Support policies that limit corporate single-family home purchases
- Advocate for open access to real estate data (against MLS gatekeeping)
- Partner with housing advocacy organizations
- Provide data and case studies to legislators showing the impact of corporate homebuying on communities
- Long-term: push for regulatory frameworks that distinguish owner-occupied purchases from investment purchases

### Industry Dynamics

- Real estate is deeply embedded in corporate strategy (businesses like McDonald's are fundamentally landlords)
- People are locked into subscription-based lifestyles (renting); the platform provides an exit ramp
- Expect resistance from entrenched interests — plan for it, do not be surprised by it
- Build grassroots support strong enough to sustain momentum through industry pushback

---

## Open Questions & Future Considerations

### Design Questions

1. **Price visibility timing.** Hiding price from listing cards is a strong design stance prioritizing stories over shopping. Validate with user research — some users may find it frustrating.
2. **Meet-and-greet feature.** Recommendation: Do NOT build a formal meet-and-greet. Messaging + video calls provide sufficient personal connection without creating gatekeeping dynamics.
3. **Seller buyer-preference visibility.** Should sellers see that a buyer's resonance aligns with theirs? Recommendation: No. Revealing alignment creates social pressure and could be gamed.
4. **Group size limits.** Start with 6 co-buyers maximum. Larger groups introduce governance complexity beyond current template coverage.
5. **Boomer proxy permissions.** Homeowner must complete at least Layer 1 verification even if a family member handles listing content. Power-of-attorney flow for cases where homeowner cannot participate.
6. **Vouch expiration.** Vouches expire after 2 years. Users receive a gentle reminder to refresh.

### Strategic Questions

7. **National vs hyper-local launch.** Public records coverage and legal template requirements favor launching in a single metro area (ideally the founder's personal network) and expanding.
8. **Revenue model.** Not defined in this spec. Options include freemium tiers, professional marketplace commissions, premium verification features, or voluntary transaction fees. The core platform should remain free.
9. **AI pricing liability.** Must be clearly labeled as informational, not appraisal. Consult legal counsel.
10. **Intent pledge enforceability.** Is the owner-occupy commitment legally enforceable? More of a UX/social signal than a legal contract. Consult legal counsel before launch.
11. **Repair network scope.** Should the repair network be accessible outside the boomer transition context? Could serve all homeowners and become a standalone community feature.

---

## Reference Documents

| Document | Location | Contents |
|----------|----------|----------|
| Product Design Document | `docs/plans/2026-02-20-humanhomes-design.md` | Original vision, mission, feature areas, design principles |
| Feature Inventory & User Flows | `docs/plans/2026-02-20-humanhomes-features-and-flows.md` | Complete feature tables, user journey flows, UX considerations, priority tiers |
| UX Design: Flows & Wireframes | `docs/plans/2026-02-20-humanhomes-ux-design.md` | Wireframe concepts, interaction patterns, visual design direction, navigation |
| Frontend + Mobile Stack Research | `docs/plans/2026-02-20-frontend-mobile-stack.md` | Next.js, Expo, NativeWind, MapLibre, Stream Chat, state management |
| Backend + API Stack Research | `docs/plans/2026-02-20-backend-api-stack.md` | tRPC, Fastify, Drizzle, PostgreSQL, Clerk, R2, Inngest |
| Data Pipeline + Infrastructure | `docs/plans/2026-02-20-data-pipeline-infrastructure.md` | ATTOM, Persona, Dropbox Sign, Mapbox, Railway, cost analysis |
| Implementation Roadmap | `docs/plans/2026-02-20-humanhomes-implementation-roadmap.md` | Feasibility review, dependency graph, phased build plan, risk register |
