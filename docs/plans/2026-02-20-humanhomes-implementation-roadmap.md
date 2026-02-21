# HumanHomes — Implementation Roadmap

**Date:** 2026-02-20
**Author:** Developer (Technical Feasibility Review)
**Inputs:**
- Product Design Document (`2026-02-20-humanhomes-design.md`)
- Feature Inventory & User Flows (`2026-02-20-humanhomes-features-and-flows.md`)
- Frontend + Mobile Stack Research (`2026-02-20-frontend-mobile-stack.md`)
- Backend + API Stack Research (`2026-02-20-backend-api-stack.md`)
- Data Pipeline + Infrastructure Research (`2026-02-20-data-pipeline-infrastructure.md`)

---

## 1. Technical Feasibility Review

Every feature from the design document rated for implementation complexity and flagged for technical risks.

### Feature 1: Home Listings & Stories
**Complexity:** Medium
**What's involved:**
- CRUD for structured listing data (beds, baths, sqft, lot size, year built, systems, upgrades)
- Rich text / block editor for "Home Story" narrative content
- Media pipeline: photo upload, video upload, floor plans, virtual tour embeds
- Geolocation and map integration for neighborhood context
- Search and filtering across all listing fields

**Risks:**
- Media storage costs scale quickly with video — need CDN + object storage (R2/S3) strategy from day one
- Rich text editing in mobile apps is notoriously difficult — consider a markdown-based approach with preview rather than full WYSIWYG on mobile
- Virtual tour embeds depend on third-party providers (Matterport, etc.) — keep this as an embed/link rather than building custom 3D tooling

**Feasibility:** Fully feasible. This is well-understood territory — listing platforms are a solved pattern. The "Home Story" narrative layer is the differentiator but technically straightforward (rich text + media).

---

### Feature 2: People Profiles (Buyers + Sellers + Groups)
**Complexity:** Medium
**What's involved:**
- User registration and profile management
- Buyer profiles, seller profiles, and group profiles (distinct schemas but shared base)
- Profile media (photos, videos)
- Transaction history display
- Verification badge display
- Privacy controls (what's visible to whom)

**Risks:**
- Group profiles add complexity — need to handle membership, roles, and shared state
- Privacy is critical: profile data must have granular visibility controls (public, verified-users-only, connections-only)
- Profile data becomes PII-heavy — encryption at rest, GDPR/CCPA compliance from day one

**Feasibility:** Fully feasible. Standard user profile system with the group dimension adding moderate complexity.

---

### Feature 3: Multi-Layer Verification System
**Complexity:** High
**What's involved:**
- **Layer 1 (Identity):** Integration with identity verification provider (Stripe Identity, Persona, or similar)
- **Layer 2 (Neighborly Vouching):** Social graph of vouches, vouch chain validation, anti-gaming detection
- **Layer 3 (Intent Pledge):** Legal-weight commitment to owner-occupy, stored as signed attestation
- Trust tier calculation engine (graduated levels based on vouch count, vouch quality)
- Anti-gaming: vouch limits per user, detection of vouch rings/collusion, temporal analysis

**Risks:**
- Vouch system is novel — no off-the-shelf solution exists. Must be custom-built with careful anti-gaming logic
- Identity verification costs: Persona Startup Program provides 500 free/month for 1 year; Stripe Identity fallback at $1.50/verification. Budget for post-free-tier scale
- Legal implications of "intent pledge" — is it enforceable? Consult legal counsel before launch
- Anti-gaming is an arms race — need monitoring, anomaly detection, and manual review workflows
- Cold start problem: early users have no one to vouch for them. Need bootstrap mechanism (seed community, geographic clustering)

**Feasibility:** Feasible but technically demanding. Layer 1 is off-the-shelf. Layer 2 (vouching) requires significant custom development and ongoing anti-abuse work. Layer 3 is more of a UX/legal challenge than a technical one.

---

### Feature 4: Market Intelligence (Public Records Pipeline)
**Complexity:** Very High
**What's involved:**
- County assessor data ingestion (3,000+ counties in the US, each with different formats and access methods)
- Deed transfer records parsing
- Tax record aggregation
- Comparable sales algorithm (matching properties by characteristics and proximity)
- Neighborhood price trend computation
- AI-assisted pricing model (ML regression on comparable sales data)
- Market conditions dashboard (aggregate statistics)

**Risks:**
- **This is the hardest feature in the entire platform.** County data is fragmented, inconsistent, and often only available via screen scraping or paid data providers.
- Data providers exist: ATTOM (~$500/mo MVP, scaling with volume), CoreLogic (enterprise pricing), RealEstateAPI.com (developer-friendly). ATTOM data quality varies by county
- Building a proprietary public records pipeline is a multi-year effort if done from scratch
- AI pricing guidance carries liability risk — must be clearly labeled as informational, not appraisal
- Data freshness varies by county (some update daily, some quarterly)
- National coverage requires thousands of data source integrations

**Feasibility:** Feasible at national scale using ATTOM Data API (158M properties, 99% US coverage). Data provider abstraction layer enables future swapping to CoreLogic or proprietary ingestion. Inngest durable workflows handle scheduled data sync with retry logic. Build proprietary county-level ingestion for top-50 counties as a long-term cost optimization.

---

### Feature 5: Direct Communication
**Complexity:** Medium
**What's involved:**
- Real-time messaging (WebSocket-based)
- Thread-based conversations tied to listings
- Public Q&A on listings
- Video calling integration (WebRTC or third-party: Twilio, Daily.co, Agora)
- Push notifications (mobile + web)
- Message moderation and reporting

**Risks:**
- Stream Chat vendor lock-in — saves 3-6 months of development but creates dependency. Mitigation: plan migration path to Matrix/Element if costs become prohibitive at scale
- Video calling (Daily.co) charges per participant-minute — defer until proven demand
- Moderation is essential to prevent scams and harassment — Stream Chat provides built-in moderation tools, but custom rules will be needed for real estate scam patterns
- Message persistence and search are handled by Stream Chat, but data portability should be considered

**Feasibility:** Fully feasible. Stream Chat provides pre-built UI for both React (web) and React Native (mobile), handling WebSocket management, reconnection, offline queuing, and presence. This is the fastest path to production-ready messaging.

---

### Feature 6: Offer Management
**Complexity:** High
**What's involved:**
- Offer submission with structured fields (price, contingencies, financing details, closing timeline)
- Counteroffer workflow (state machine: submitted, countered, accepted, rejected, expired)
- Multiple offer tracking for sellers (comparison view)
- Offer comparison scoring (price + buyer profile + verification level + story)
- Contingency tracking (inspection, financing, appraisal deadlines)
- Group offer support (multiple co-buyers on a single offer)
- Notification pipeline for offer events

**Risks:**
- Offer state machine has many edge cases (simultaneous counteroffers, expired offers, withdrawn offers)
- Legal compliance: offers may need to meet state-specific requirements for binding contracts
- Group offers multiply complexity (multiple signers, split financing, coordinated contingencies)
- Must handle the case where a seller has dozens of offers simultaneously

**Feasibility:** Feasible. Complex state machine but well-defined. Group offer support adds significant complexity and should be deferred to a later phase.

---

### Feature 7: Disclosure & Document Builder
**Complexity:** High
**What's involved:**
- State-specific disclosure form templates (50 states, varying requirements)
- Property condition report generator
- Document template engine (purchase agreements, addenda, co-ownership agreements)
- E-signature integration (DocuSign, HelloSign, or built-in)
- Document storage and versioning
- Guided workflow (checklist-driven form completion)
- Group purchase agreement templates (equity splits, shared responsibility)

**Risks:**
- **Legal liability is the primary risk.** Document templates must be reviewed by attorneys in each state
- State-specific requirements change — need a maintenance process for template updates
- E-signature has legal requirements (ESIGN Act, UETA) — using an established provider (DocuSign) mitigates this
- Building for all 50 states from day one is impractical — start with 3-5 states and expand
- Co-ownership document templates (LLC structures, tenancy in common) require specialized legal review

**Feasibility:** Feasible with phased rollout (start with a few states). Legal review costs will be significant. E-signature should use a third-party provider. Template engine itself is straightforward.

---

### Feature 8: Showing & Access Management
**Complexity:** Low
**What's involved:**
- Calendar-based showing scheduler
- Request/approve workflow for showing times
- Open house event management with RSVP
- Push notifications for showing requests and reminders
- Optional smart lock integration (future)

**Risks:**
- Calendar UX needs to be polished — clunky scheduling will frustrate users
- Smart lock integration is a nice-to-have but adds IoT complexity (defer to much later)
- Time zone handling for remote buyers

**Feasibility:** Fully feasible. Standard scheduling pattern. One of the simpler features.

---

### Feature 9: Closing Coordination
**Complexity:** Medium
**What's involved:**
- Guided closing checklist (configurable per state/transaction type)
- Timeline tracker with milestone events
- Professional marketplace integration (link to inspectors, title companies, attorneys)
- Document collection tracking (which documents are submitted, pending, completed)
- Status dashboard for all parties

**Risks:**
- Closing processes vary significantly by state — need configurable workflows
- Integration with title companies and lenders requires partnerships, not just API calls
- Liability: if the platform's checklist misses a required step, legal exposure

**Feasibility:** Feasible. The guided checklist is a content/workflow challenge more than a technical one. Start with the most common transaction types and expand.

---

### Feature 10: Community & Neighborhood Discovery
**Complexity:** Medium
**What's involved:**
- Neighborhood profile pages with resident-submitted content
- Geographic boundaries (neighborhood polygons on maps)
- Community character tags and descriptions
- "Community fit" matching algorithm (private preference matching)
- Resident verification (must live in the neighborhood to contribute)
- Search and browse by neighborhood attributes

**Risks:**
- Neighborhood boundary definitions are subjective and politically sensitive
- Private preference matching must be carefully designed to avoid discrimination concerns (Fair Housing Act)
- Content moderation for neighborhood descriptions
- Cold start: neighborhoods need residents to contribute before they're useful

**Feasibility:** Feasible. The private matching engine needs careful design for legal compliance. Neighborhood boundary data is available from third parties (Zillow, OpenStreetMap) but may need community input.

---

### Feature 11: Group Purchasing & Collective Ownership
**Complexity:** Very High
**What's involved:**
- Group formation tools (find compatible co-buyers)
- Group profile management (members, roles, decision-making rules)
- Financial modeling tools (contribution calculations, mortgage qualification per member, equity splits)
- Co-ownership structure templates (joint tenancy, tenancy in common, LLC)
- Group messaging and decision-making workflows
- Group offer submission (coordinated with Feature 6)
- Buyout and exit clause management

**Risks:**
- **Novel product area with very few precedents.** No existing platform does this well
- Legal complexity is extreme — co-ownership laws vary by state, entity formation requirements differ
- Financial modeling requires integration with lending partners who support group purchases (rare)
- Group dynamics (disagreements, member exits) need robust conflict resolution workflows
- Mortgage qualification for groups is non-standard — most lenders don't support it easily
- Could become a liability magnet if group purchases go wrong

**Feasibility:** Feasible but extremely complex. Recommend treating this as a standalone product track with its own phased rollout. Start with educational content and simple group formation, defer financial modeling and legal documents until partnerships with co-ownership-focused lenders/attorneys are established.

---

### Feature 12: Boomer Home Transition Program
**Complexity:** Medium
**What's involved:**
- Dedicated listing type with transition-specific fields (deferred maintenance, repair needs, emotional narrative)
- Condition assessment tools (guided self-inspection for sellers)
- Repair network integration (connect with local repair services)
- Community outreach tools (notify nearby users of transition opportunities)
- Sensitive UX design (acknowledging emotional weight)

**Risks:**
- Target demographic (aging homeowners) may be less tech-savvy — needs exceptional UX simplicity
- Home condition transparency could create liability if disclosures are incomplete
- Repair network is a marketplace within a marketplace — adds operational complexity
- Emotional sensitivity requires careful copywriting and UX testing

**Feasibility:** Feasible. Mostly a specialized listing type with some additional workflows. The repair network is the most complex piece but can start as a simple directory.

---

### Feature 13: Professional Services Marketplace (Inverted)
**Complexity:** Medium
**What's involved:**
- Professional profiles with credentials, pricing, and reviews
- Independence verification for inspectors (no realtor affiliation)
- Service request workflow (user requests help, professionals respond)
- Rating and review system tied to verified transactions
- Professional search and matching by location, specialty, availability
- Fee transparency enforcement

**Risks:**
- Two-sided marketplace dynamics — need both supply (professionals) and demand (users) to be useful
- Professional credential verification requires integration with licensing boards (state-specific)
- Independence verification for inspectors is difficult to enforce programmatically
- Review gaming is common in professional marketplaces — need anti-fraud measures

**Feasibility:** Feasible. Standard marketplace pattern. Credential verification is the main technical challenge. Start with a curated, invite-only professional network and open up over time.

---

## 2. Dependency Graph

```
Auth & User System
  |
  +-- People Profiles
  |     |
  |     +-- Verification System (Layer 1: Identity)
  |     |     |
  |     |     +-- Verification System (Layer 2: Vouching)
  |     |     |     |
  |     |     |     +-- Verification System (Layer 3: Intent Pledge)
  |     |     |
  |     |     +-- Community & Neighborhood Discovery
  |     |
  |     +-- Group Profiles
  |           |
  |           +-- Group Purchasing & Collective Ownership
  |
  +-- Home Listings & Stories
  |     |
  |     +-- Showing & Access Management
  |     |
  |     +-- Direct Communication (Messaging)
  |     |     |
  |     |     +-- Video Calling
  |     |
  |     +-- Offer Management
  |     |     |
  |     |     +-- Group Offer Support
  |     |     |
  |     |     +-- Disclosure & Document Builder
  |     |           |
  |     |           +-- E-Signature Integration
  |     |           |
  |     |           +-- Closing Coordination
  |     |                 |
  |     |                 +-- Professional Services Marketplace
  |     |
  |     +-- Boomer Home Transition Program (specialized listing type)
  |
  +-- Market Intelligence (Public Records Pipeline)
        |
        +-- AI Pricing Guidance
```

**Critical path:** Auth -> Profiles -> Listings -> Messaging -> Offers -> Documents -> Closing

**Parallel tracks (can develop independently after dependencies are met):**
- Verification System (after Profiles)
- Market Intelligence (after Listings — independent data pipeline)
- Community Discovery (after Profiles + Verification)
- Showing Management (after Listings)
- Professional Marketplace (after Closing Coordination)
- Group Purchasing (after Profiles + Offers)
- Boomer Transition (after Listings)

---

## 3. Phased Build Plan

### Phase 1: Foundation (Weeks 1-6)
**Goal:** Monorepo setup, auth, basic user profiles, deployment pipeline

**Deliverables:**
- Turborepo monorepo with pnpm workspaces (`apps/web`, `apps/mobile`, `apps/api`, `packages/shared`, `packages/db`, `packages/trpc`, `packages/ui`, `packages/api-client`, `packages/config`)
- Next.js 15 web app (App Router, React Server Components)
- Expo (SDK 54+) mobile app shell with Expo Router
- tRPC + Fastify API server (end-to-end type safety)
- PostgreSQL (Supabase managed) + Drizzle ORM (SQL-first, PostGIS-ready)
- Clerk authentication (email/password + Google + Apple OAuth, pre-built UI, identity verification hooks)
- Basic user profiles (buyer + seller types) with Zod-validated schemas
- Profile photo upload to Cloudflare R2 (zero egress cost)
- NativeWind v5 + Gluestack UI v3 (cross-platform styling)
- Sentry error tracking
- Resend for transactional email
- CI/CD pipeline (GitHub Actions -> Railway for API, Vercel or Railway for web)
- Development, staging, production environments

**Working increment:** Users can sign up, create a profile, and log in on web and mobile.

**Tech stack locked in this phase:**

| Layer | Decision | Rationale |
|-------|----------|-----------|
| Monorepo | Turborepo + pnpm | Simple, fast, Vercel-aligned |
| Web framework | Next.js 15 (App Router) | SSR/SSG for SEO, RSC for performance |
| Mobile framework | Expo (SDK 54+) + Expo Router | File-based routing, OTA updates, New Architecture |
| API | tRPC + Fastify | End-to-end type safety, fastest Node.js server |
| Database | PostgreSQL (Supabase) + Drizzle ORM | PostGIS, FTS, zero codegen, SQL control |
| Auth | Clerk | Best DX, identity verification, multi-platform SDKs |
| Object storage | Cloudflare R2 | $0 egress, S3-compatible |
| Hosting | Railway (MVP) | All-in-one, ~$20-50/mo, easy AWS migration later |
| Styling | NativeWind v5 + Gluestack UI v3 | Cross-platform Tailwind, accessible components |
| State (client) | Zustand | Lightweight, zero boilerplate |
| State (server) | TanStack Query | Caching, background refetch, optimistic updates |
| Error tracking | Sentry | SDK drop-in, $26-80/mo |
| Email | Resend | Developer-friendly, $20/mo |

---

### Phase 2: Listings & Home Stories (Weeks 7-12)
**Goal:** Core listing creation and browsing experience

**Deliverables:**
- Listing creation flow (structured data + narrative "Home Story")
- Rich text editor for Home Story (web: Tiptap/ProseMirror, mobile: simplified markdown with preview)
- Photo/video upload pipeline (Cloudflare R2 + Cloudflare CDN + Sharp image optimization)
- Listing detail pages with full media gallery (web: react-photo-album + yet-another-react-lightbox, mobile: galeria)
- Listing search with filters (location, price, beds, baths, sqft, yard size, walkability, neighborhood character)
- PostgreSQL full-text search for listing content (Drizzle tsvector/tsquery)
- Map view with listing pins (react-map-gl + MapLibre GL JS on web, @maplibre/maplibre-react-native on mobile)
- Mapbox geocoding API for address autocomplete
- Listing management dashboard for sellers (edit, pause, archive)
- Basic SEO (listing pages server-rendered via RSC + ISR)

**Working increment:** Sellers can create listings with stories and photos. Buyers can search, browse, and view listings on a map.

---

### Phase 3: Messaging & Communication (Weeks 13-18)
**Goal:** Direct buyer-seller communication

**Deliverables:**
- Stream Chat SDK integration (pre-built UI for React web + React Native mobile)
- Conversation threads tied to listings (buyer-seller direct messaging)
- Public Q&A on listing pages (Stream Chat channels per listing)
- Push notifications via FCM (Android/web) + APNs (iOS) through Expo Notifications
- Unread message indicators and notification center
- Message moderation and reporting (Stream Chat built-in moderation tools)
- Email notification fallback via Resend for offline users
- Real-time presence indicators (online/offline via Stream Chat)

**Working increment:** Buyers and sellers can message each other about listings. Public Q&A lets any user ask questions on a listing.

---

### Phase 4: Verification System (Weeks 19-26)
**Goal:** Multi-layer trust system that differentiates HumanHomes

**Deliverables:**
- **Layer 1:** Persona identity verification SDK integration (500 free/mo via Persona Startup Program; Stripe Identity as fallback at $1.50/verification)
- **Layer 2:** Custom vouch system — request vouches, submit vouches, vouch chain display, social graph storage in PostgreSQL
- Vouch anti-gaming: limits per user (e.g., 5 vouches per year), vouch chain depth limits, graph analysis for rings, geographic validation
- **Layer 3:** Intent pledge UI — signed attestation to owner-occupy, linked to Persona-verified identity
- Trust tier calculation (Bronze/Silver/Gold/Platinum based on verification layers completed + vouch count)
- Verification badges on profiles and listings
- Admin review dashboard for flagged vouches
- Bootstrap mechanism for early adopters (reduced vouch requirements in initial markets)

**Working increment:** Users can verify their identity, receive vouches from community members, and display trust badges. Buyers with higher trust tiers are more attractive to sellers.

---

### Phase 5: Market Intelligence & Public Records (Weeks 27-36)
**Goal:** Replace MLS comps with open data

**Deliverables:**
- ATTOM Data API integration (primary: 158M properties, 99% US coverage, ~$500/mo) + RealEstateAPI.com (supplementary)
- Data provider abstraction layer (swappable backend for future CoreLogic or proprietary ingestion)
- Inngest durable workflows for scheduled data sync (daily property record refresh, staleness tracking)
- Comparable sales display on listing pages ("homes like this sold for...")
- Neighborhood price trends (charts, historical data)
- Market conditions dashboard (local buyer's/seller's market indicators)
- Basic AI pricing suggestion (regression model on comparable sales via OpenAI/Anthropic API)
- Coverage map (show which areas have good data coverage)
- Aggressive caching layer (property records rarely change — cache in PostgreSQL + Redis)

**Deferred:**
- Proprietary county-level data scraping (multi-year effort, start after MVP)
- Advanced ML pricing models
- Meilisearch for property search (upgrade from PostgreSQL FTS when search UX becomes priority)

**Working increment:** Users can see comparable sales, neighborhood trends, and AI-suggested pricing for any listing with sufficient data coverage.

---

### Phase 6: Offer Management & Documents (Weeks 37-46)
**Goal:** Full offer lifecycle and document generation

**Deliverables:**
- Offer submission form (price, contingencies, financing, timeline, buyer story)
- Counteroffer workflow (state machine: submitted -> countered -> accepted/rejected/expired)
- Seller offer dashboard (multiple offer comparison, side-by-side view)
- Offer comparison scoring (price + verification tier + buyer profile)
- Contingency tracking with deadline reminders
- State-specific disclosure form templates (launch with 3-5 states: CA, TX, FL, NY, WA)
- Purchase agreement template
- E-signature integration (Dropbox Sign API, $75/mo for 50 requests — best DX, embedded signing)
- Document storage and version history (Cloudflare R2)

**Working increment:** Buyers submit offers, sellers compare and counter. Accepted offers trigger guided disclosure and document signing flow.

---

### Phase 7: Closing Coordination & Professional Marketplace (Weeks 47-56)
**Goal:** Guide users from accepted offer to keys in hand

**Deliverables:**
- Closing checklist engine (configurable per state/transaction type)
- Timeline tracker with milestone events and status updates
- Professional services directory (inspectors, title companies, attorneys, notaries)
- Professional profiles with credentials, pricing, and verified reviews
- Service request workflow (user posts need, professionals respond)
- Inspector independence verification (self-attestation + spot checks initially)
- Rating and review system tied to completed transactions
- Integration with title company APIs (if available) or manual coordination tools

**Working increment:** After an offer is accepted, users follow a guided checklist to closing. They can find and hire independent professionals directly through the platform.

---

### Phase 8: Community Features, Group Purchasing & Specialized Programs (Weeks 57-72)
**Goal:** Advanced community features and the group purchasing differentiator

**Deliverables:**
- **Community & Neighborhood Discovery:**
  - Neighborhood profile pages with boundary maps
  - Resident-submitted descriptions and stories
  - Neighborhood character tags and search
  - Private community fit matching (preference engine)
  - Resident verification (address-based)

- **Group Purchasing (MVP):**
  - Group formation and profile creation
  - Group messaging and decision-making tools
  - Basic financial planning calculator (contribution splits)
  - Group offer submission (extends Phase 6 offer system)
  - Educational content on co-ownership structures

- **Boomer Home Transition:**
  - Transition listing type with deferred maintenance fields
  - Guided condition self-assessment for aging sellers
  - Community outreach tools
  - Repair service directory (extension of professional marketplace)

**Deferred to future phases:**
- Advanced co-ownership legal document generation
- Co-ownership financial modeling with lender integrations
- Smart lock integration for showings
- Video calling (can use third-party links in messaging for now)
- Advanced AI features (property valuation models, community fit ML)

**Working increment:** Neighborhoods have profile pages. Groups can form and submit offers together. Aging homeowners can list transition properties with honest condition disclosures.

---

## 4. Third-Party Integration Map

### Recommended Stack (Specific Selections)

| Service | Purpose | Phase | Complexity | MVP Monthly Cost |
|---------|---------|-------|------------|-----------------|
| **Clerk** | Auth (email + OAuth + identity hooks) | 1 | Low (SDK) | Free (10K MAU) |
| **Supabase** (PostgreSQL) | Managed database + Realtime | 1 | Low | $25/mo (Pro) |
| **Cloudflare R2** | Object storage (photos, videos, docs) | 1 | Low (S3-compatible) | ~$0.015/GB/mo, **$0 egress** |
| **Railway** | API server hosting (Fastify + tRPC) | 1 | Low | ~$20-50/mo |
| **Sentry** | Error tracking | 1 | Low (SDK) | $26/mo (Team) |
| **Resend** | Transactional email | 1 | Low (API) | $20/mo |
| **Mapbox** | Geocoding + address autocomplete | 2 | Low (API) | Free (50K loads, 100K geocodes) |
| **MapLibre GL** | Map rendering (web + mobile) | 2 | Medium | Free (OSS) |
| **Sharp** | Image optimization (self-hosted) | 2 | Low | Free |
| **Stream Chat** | Real-time messaging (web + mobile) | 3 | Low (pre-built UI) | Free (10K MAU) |
| **FCM / APNs** | Push notifications | 3 | Medium | Free |
| **Persona** | Identity verification (Layer 1) | 4 | Low (SDK) | Free (500/mo, Startup Program) |
| **ATTOM Data API** | Public records, comps, property data | 5 | Medium (normalization) | ~$500/mo |
| **RealEstateAPI.com** | Supplementary property data | 5 | Low (API) | Developer tier |
| **Inngest** | Durable job workflows (data pipeline) | 5 | Low (serverless) | Free tier / $25/mo |
| **OpenAI / Anthropic** | AI pricing guidance | 5 | Medium (prompt eng.) | ~$50-200/mo |
| **Dropbox Sign** (HelloSign) | E-signatures | 6 | Low (embedded API) | $75/mo (50 requests) |
| **Daily.co** | Video calling (future) | 8+ | Medium (WebRTC) | Free (10K min/mo) |

### Scale Upgrade Path

| Trigger | Upgrade From | Upgrade To | Why |
|---------|-------------|-----------|-----|
| 10K+ users | Railway | AWS (ECS/Fargate) | Full control, auto-scaling |
| 100K+ users | Supabase Realtime | Ably | Enterprise-grade delivery guarantees |
| Search UX priority | PostgreSQL FTS | Meilisearch | Typo tolerance, faceted search, sub-50ms |
| Video becomes core | Daily.co | LiveKit (self-hosted) | Cost control at scale |
| Chat costs grow | Stream Chat | Matrix/Element (self-hosted) | Eliminate per-MAU pricing |

### Monthly Cost Estimate by Phase

| Phase | Estimated Monthly Cost | Key Cost Drivers |
|-------|----------------------|-----------------|
| Phase 1 (Foundation) | ~$90-150/mo | Railway, Supabase, Sentry, Resend |
| Phase 2 (Listings) | ~$120-200/mo | + R2 storage, Mapbox (free tier) |
| Phase 3 (Messaging) | ~$150-300/mo | + Stream Chat (free tier covers MVP) |
| Phase 4 (Verification) | ~$150-400/mo | + Persona (free tier covers MVP) |
| Phase 5 (Market Intel) | ~$700-1,200/mo | + ATTOM ($500), Inngest, AI APIs |
| Phase 6 (Offers/Docs) | ~$800-1,400/mo | + Dropbox Sign ($75) |
| Phase 7 (Closing/Pros) | ~$900-1,500/mo | Incremental growth |
| Phase 8 (Community/Groups) | ~$1,000-1,800/mo | + compute for matching engine |

**Total MVP infrastructure (Phases 1-3): ~$150-300/month**

*Note: These are infrastructure costs only, not including developer salaries, legal review, or business operations. Costs assume pre-scale usage on free tiers where available. Costs grow with user adoption.*

---

## 5. Technical Risk Register

### Risk 1: Public Records Data Access
**Severity:** Critical
**Likelihood:** High
**Description:** County assessor data is fragmented across 3,000+ US counties with no standardized API. Screen scraping is fragile and legally questionable. Data providers (ATTOM, CoreLogic) are expensive and may have restrictive licensing.
**Impact:** Without reliable comp data, the platform cannot replace MLS — which is the core value proposition for market intelligence.
**Mitigation:**
- Start with ATTOM Data API (~$500/mo, 158M properties, 99% US coverage, 30-day free trial) + RealEstateAPI.com as supplementary source
- Budget ~$6K/year initially, scaling to $50-100K/year with volume
- Build proprietary ingestion for top-50 counties by transaction volume as a long-term investment
- Clearly communicate data coverage limitations to users (show coverage map)
- Consider partnerships with county clerk offices or open data initiatives

### Risk 2: Fair Housing Act Compliance
**Severity:** Critical
**Likelihood:** Medium
**Description:** Private community preference matching and "community fit" features could be construed as discriminatory steering under the Fair Housing Act if preferences correlate with protected classes (race, religion, familial status, etc.).
**Impact:** Federal enforcement action, lawsuits, platform shutdown.
**Mitigation:**
- Legal review of all matching algorithms before launch
- Never allow filtering by protected class characteristics, even indirectly
- Preference categories must be carefully scoped (e.g., "walkability preference" is fine; "family-friendly" may raise red flags)
- Audit matching outcomes for disparate impact
- Retain Fair Housing Act specialist counsel
- Document all design decisions around community matching

### Risk 3: Legal Document Liability
**Severity:** High
**Likelihood:** Medium
**Description:** If a user relies on a platform-generated document (disclosure form, purchase agreement) that turns out to be deficient, HumanHomes could face liability.
**Impact:** Lawsuits, regulatory action, user harm.
**Mitigation:**
- All document templates reviewed by licensed attorneys in each target state
- Clear disclaimers: "This is a template, not legal advice"
- Recommend users consult an attorney (link to professional marketplace)
- Maintain a template update process when state laws change
- Start with states that have simpler disclosure requirements
- Carry errors & omissions insurance

### Risk 4: Verification System Gaming
**Severity:** High
**Likelihood:** High
**Description:** The vouch system is susceptible to fraud rings (fake accounts vouching for each other), social engineering, and coordinated attacks by corporate buyers seeking "verified" status.
**Impact:** Undermines the entire trust system — HumanHomes' core differentiator.
**Mitigation:**
- Vouch limits (e.g., each user can vouch for 5 people per year)
- Graph analysis for vouch rings (detect clusters of mutual vouching)
- Temporal analysis (new accounts vouching for new accounts is suspicious)
- Geographic validation (voucher must be in same area as vouchee)
- Manual review for flagged vouches
- Revocation mechanism if fraud is discovered post-hoc
- Progressive trust (vouches from highly-trusted users carry more weight)

### Risk 5: Two-Sided Marketplace Cold Start
**Severity:** High
**Likelihood:** High
**Description:** The platform needs both buyers and sellers. Without listings, buyers won't come. Without buyers, sellers won't list. The professional marketplace has the same problem (professionals won't join without users, users won't request services without professionals).
**Impact:** Platform fails to achieve critical mass and dies.
**Mitigation:**
- Launch hyper-locally (single metro area, ideally seller's personal network)
- Seed with "Home Story" content that's interesting even without transaction intent (people love reading about homes)
- Consider allowing "story-only" listings (no sale intent, just sharing your home's story) to build content
- Community features can drive engagement independent of transactions
- Professional marketplace starts invite-only with curated providers

### Risk 6: Scalability of Real-Time Features
**Severity:** Medium
**Likelihood:** Medium
**Description:** Real-time messaging, notifications, and live offer updates need to scale with concurrent users. WebSocket connection management, message ordering, and delivery guarantees become challenging at scale.
**Impact:** Poor user experience, dropped messages, inconsistent state.
**Mitigation:**
- Stream Chat handles WebSocket management, reconnection, offline queuing, and delivery guarantees up to scale
- Supabase Realtime for DB-change-driven notifications (included with Supabase)
- At 100K+ users: migrate real-time notifications to Ably for enterprise-grade guaranteed delivery
- Design for eventual consistency where strict ordering isn't required
- Load test messaging infrastructure before scaling marketing

### Risk 7: Mobile App Complexity with Cross-Platform
**Severity:** Medium
**Likelihood:** Medium
**Description:** Expo/React Native provides cross-platform development but has limitations for native-feel interactions (camera, maps, push notifications, deep linking). Complex features like rich text editing and video calling have historically been painful in React Native.
**Impact:** Subpar mobile experience, development delays for mobile-specific features.
**Mitigation:**
- Use Expo's managed workflow where possible, eject only when necessary
- Identify native-module requirements early (camera, maps, push, deep links)
- Simplify mobile-specific UX (e.g., markdown with preview instead of rich text editor)
- Test on real devices continuously, not just simulators
- Consider native modules for performance-critical screens (map view with many pins)

### Risk 8: Group Purchasing Legal Complexity
**Severity:** High
**Likelihood:** High
**Description:** Co-ownership structures (joint tenancy, tenancy in common, LLC) vary dramatically by state. Most mortgage lenders don't support group purchases easily. If a group purchase facilitated by the platform goes wrong (member dispute, default), HumanHomes could face liability.
**Impact:** Legal liability, reputational damage, regulatory scrutiny.
**Mitigation:**
- Defer complex group purchasing features until partnerships with co-ownership-focused lenders/attorneys are established
- Start with educational content and simple group formation tools
- Require group members to seek independent legal counsel before executing co-ownership agreements
- Clear disclaimers and hold-harmless agreements
- Partner with organizations already doing co-ownership (e.g., OPAL, Landed)

### Risk 9: Regulatory Pushback from Real Estate Industry
**Severity:** High
**Likelihood:** Medium-High (increases with success)
**Description:** The NAR (National Association of Realtors), MLS organizations, and state real estate commissions may take action to restrict or regulate the platform. Possible vectors: claiming the platform is "practicing real estate" without a license, lobbying for regulations that require agent involvement, or pressure on data providers to cut off access.
**Impact:** Legal challenges, data access disruption, hostile regulatory environment.
**Mitigation:**
- Legal analysis of "practicing real estate" laws in each target state before launch
- Platform provides tools, not advice — careful language throughout
- Grassroots community support as political counter-weight
- "Quiet revolution" strategy — build user base before making industry-wide claims
- Diversify data sources to reduce dependency on any single provider
- Build relationships with housing advocacy organizations

### Risk 10: Data Privacy and Security
**Severity:** Critical
**Likelihood:** Medium
**Description:** The platform stores highly sensitive PII (identity documents, financial information, home addresses, community preferences, transaction details). A data breach would be catastrophic.
**Impact:** User harm, lawsuits, regulatory fines, reputational destruction.
**Mitigation:**
- Encryption at rest and in transit (AES-256, TLS 1.3)
- Minimal data retention (delete identity verification documents after verification completes)
- SOC 2 compliance roadmap from Phase 1
- Regular penetration testing (quarterly after launch)
- GDPR/CCPA compliance (privacy policy, data deletion requests, consent management)
- Role-based access control for all internal tools
- Incident response plan documented before launch

---

## Summary

### What's clearly feasible and well-understood:
- Auth, profiles, listings, messaging, showing management, closing checklists
- These are established patterns with mature tooling

### What's feasible but requires careful execution:
- Verification system (custom vouch graph + anti-gaming)
- Offer management (complex state machine)
- Document builder (legal review bottleneck, not technical)
- Professional marketplace (two-sided dynamics)
- Community features (Fair Housing compliance)

### What's feasible but very hard:
- Market Intelligence / Public Records Pipeline (data fragmentation, cost, coverage)
- Group Purchasing (legal complexity, lender support, novel product area)

### Recommended Launch Scope (MVP):
Phases 1-3 (Foundation + Listings + Messaging) produce a functional product where sellers can list homes with stories and buyers can discover and communicate directly. This is the "minimum viable revolution" — it delivers on the core mission (no middlemen, human-first) without requiring the most complex features.

This aligns with the Feature Inventory's **Tier 1 MVP** recommendation (features 1.1-1.7, 2.1-2.2, 2.4-2.5, 3.1, 3.3, 4.1-4.2, 5.1, 6.1-6.2), though I recommend deferring Market Intelligence (4.x) and Offer Management (6.x) to Phases 5-6 respectively, keeping the MVP focused on the storytelling + communication core.

**MVP infrastructure cost: ~$150-300/month** (leveraging free tiers across Clerk, Stream Chat, Persona, Mapbox, and FCM).

### Timeline Summary:
| Phase | Duration | Cumulative |
|-------|----------|-----------|
| Phase 1: Foundation | 6 weeks | 6 weeks |
| Phase 2: Listings & Stories | 6 weeks | 12 weeks |
| Phase 3: Messaging | 6 weeks | 18 weeks |
| Phase 4: Verification | 8 weeks | 26 weeks |
| Phase 5: Market Intelligence | 10 weeks | 36 weeks |
| Phase 6: Offers & Documents | 10 weeks | 46 weeks |
| Phase 7: Closing & Professionals | 10 weeks | 56 weeks |
| Phase 8: Community & Groups | 16 weeks | 72 weeks |

**Total estimated timeline: ~72 weeks (18 months) for full scope.**
**MVP (Phases 1-3): ~18 weeks (4.5 months).**

*Note: Timeline assumes a small team (2-3 full-stack developers). Phases 5-8 have significant parallelization potential with a larger team. Legal review and data provider negotiations happen in parallel with development and are not reflected in these estimates.*
