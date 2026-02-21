# HumanHomes — Search Feed & Filtering Analysis Report

**Date:** 2026-02-20
**Status:** Complete
**Purpose:** Comprehensive analysis of how enterprise-scale real estate platforms handle search, feeds, and filtering — with clear pros/cons evaluation and a recommended approach for HumanHomes.

---

## Executive Summary

We researched how Zillow, Redfin, Realtor.com, Trulia, Homes.com, Airbnb, and international platforms handle their search feeds. We also analyzed the technical infrastructure that powers these systems and cross-domain UX patterns from dating apps, social platforms, and e-commerce.

**The three biggest findings:**

1. **Every major platform is racing toward AI-powered conversational search** (Redfin with Sierra, Homes.com with Azure OpenAI, Rightmove with Gemini). But they're all training AI on the same data — MLS listings and property specs. HumanHomes can train on community stories and human context, which is data no competitor has. That's a moat.

2. **The "shrinking results" problem has been solved in other domains.** Dating apps (Hinge, Bumble) use a "preference vs dealbreaker" model where soft preferences boost ranking without removing results. This directly applies to HumanHomes' community and lifestyle filters. Preferences adjust what you see first; they don't make things disappear.

3. **You don't need Zillow's infrastructure to launch.** Zillow runs Elasticsearch clusters processing hundreds of millions of queries on 160M homes with a 300+ person engineering team. HumanHomes can start with PostgreSQL + Typesense (a simpler search engine) for under $200/month and scale up as inventory and users grow.

---

## 1. How the Industry Leaders Do It

### Zillow — The Giant

Zillow is the dominant player: 228 million monthly users, 62% of real estate web traffic, 160 million homes in their database.

**How their search works:**
- Split-screen: map on one side, listing cards on the other
- Primary filters always visible: price, beds/baths, home type
- Advanced filters behind a "More" button: year built, HOA, parking, amenities, keywords, etc.
- Default sort is "Homes for You" — a personalized feed that learns from what you view, save, and search for
- Results update instantly as you change filters (no "Apply" button)
- Every search is shareable via URL (the full search state is encoded in the link)

**How their recommendation engine works:**
- Stage 1: Elasticsearch pulls ~100 candidate listings from 1.3M active listings
- Stage 2: A machine learning model re-ranks those 100 down to <10 best matches
- Stage 3: Results are cached in Redis for speed
- Uses your viewing history, saved homes, search patterns, and location preferences
- Also uses a neural network to find "similar homes" based on home characteristics AND user behavior

**What they do well:** Deep personalization, massive data, instant search, sharable search URLs, natural language search ("Austin homes under $400K near good schools").

**Where they fall short:** "Homes for You" mixes paid promotions with organic results (not truly unbiased). No collaborative search features for couples/families. Keyword search is inconsistent. Property detail pages are overwhelmingly dense.

### Redfin — The Map-First Competitor

**Key difference from Zillow:** The map IS the query. When you pan or zoom, listings auto-refresh. No "Search this area" button — it's just always updating.

**Standout features:**
- "Hot Homes" algorithm: ML-powered competitive market indicator that predicts which homes have an 80% chance of selling within 2 weeks (analyzes 500+ attributes per listing)
- Climate risk filters: fire, heat, drought, storm, flood risk built into search
- Walk Score, Bike Score, Transit Score as first-class filters
- Conversational AI search launched Nov 2025 (users view 2x more listings, 47% more likely to request tours)
- Collaborative search ("Shared Search") for families and agents

### Trulia — The Neighborhood Expert

**Most relevant to HumanHomes:** Trulia's "What Locals Say" feature is community-sourced neighborhood intelligence — 6+ million answered polls with ~100,000 new responses per day. This proves people WANT to share about their neighborhoods. Topics include: friendliness, street noise, dog-friendliness, wildlife, parking, decoration habits.

Also offers 34 map overlays: crime heat maps, school boundaries, commute time, noise levels, and more.

**Key insight:** Zillow is "find me a house that matches these specs." Trulia is "find me a neighborhood where I'll love living." HumanHomes should be 10x deeper than Trulia on the community/neighborhood side.

### Homes.com — The Bold Bet

**Most radical vision:** "Filters are gone." Homes.com (owned by CoStar) launched "Homes AI" in February 2026 — a fully conversational search experience powered by Azure OpenAI. Voice or text. The AI reads property data, 3D tours, images, and neighborhood insights. It learns your preferences through conversation rather than filter clicks.

**Key insight for HumanHomes:** The industry is moving from filter-based search to conversation-based discovery. HumanHomes can skip the filter era entirely and build conversational discovery from day one — but make the conversation about community and life, not just specs.

### Airbnb — The Discovery Model

**Most relevant pattern:** Category-based browsing. In 2022, Airbnb introduced 56 categories (Beachfront, Castles, Treehouses, Off-grid, etc.) that shifted from "where do you want to go?" to "what experience do you want?" The "I'm Flexible" default invites browsing before searching.

**HumanHomes translation:** Categories like "Story Homes," "Block Party Streets," "Artist Enclaves," "Family Havens," "Transition Homes," "Group-Ready."

---

## 2. Filter Methods Comparison

This is the core decision: how do users narrow down what they see?

### Method A: Traditional Subtractive Filtering

**What it is:** Start with everything, remove what doesn't match. Each filter you apply shrinks the results. This is what Zillow, Redfin, Amazon, and most platforms use.

| | |
|---|---|
| **How it feels** | "1,247 homes → add 3 beds → 834 homes → add pool → 47 homes" |
| **Pros** | Intuitive, well-understood, users feel in control, result count gives clear feedback |
| **Cons** | Creates the "shrinking results" problem, over-filtering leads to zero results, feels like elimination |
| **HumanHomes fit** | Necessary for practical criteria (price, beds, location) but dangerous for community/lifestyle criteria — watching homes disappear as you fill out your profile feels like rejection |

### Method B: Additive/Progressive Filtering (Ranking Boost)

**What it is:** Start with a curated view, and as the user provides more preferences, promote better matches to the top WITHOUT removing non-matches. The list stays the same size but reorders.

| | |
|---|---|
| **How it feels** | "Feed of homes → add 'big yard' preference → big-yard homes rise to top, small-yard homes still accessible below" |
| **Pros** | No shrinking results, feels like discovery not elimination, gradual refinement matches how people make emotional decisions, prevents zero-result dead ends |
| **Cons** | Less precise for users who know exactly what they want, harder to explain ("why am I seeing homes without big yards?"), more complex to build |
| **Who does it** | Hinge (dating app) uses preferences as ranking boosts, Pinterest reorders feed based on interests without hiding content, Spotify Discover Weekly balances familiarity with surprises |
| **HumanHomes fit** | This is the right approach for community/lifestyle preferences. "Quiet suburban neighborhood" preference means those homes show first, but a surprisingly great urban home still appears lower in the feed |

### Method C: Preference vs Dealbreaker Split

**What it is:** Explicitly separate "nice to have" (ranking boost) from "must have" (hard filter). Users toggle each criterion between the two modes.

| | |
|---|---|
| **How it feels** | Price under $500K = dealbreaker (hard filter). Big yard = preference (ranking boost). Users control which is which. |
| **Pros** | Best of both worlds — precision when needed, flexibility when wanted. Prevents accidental zero-results. Perfect for HumanHomes' "private preferences" concept |
| **Cons** | More complex UI (two modes per filter), users may not understand the distinction initially |
| **Who does it** | Hinge explicitly separates preferences from dealbreakers. Bumble relaxes filters when the pool is small but allows users to toggle strict mode. |
| **HumanHomes fit** | **This is the recommended approach.** Hard filters for practical criteria (price, location, bedrooms). Soft boost for human criteria (community vibe, home story type, neighborhood character). Dealbreaker toggle available for anyone who wants hard exclusions. |

### Method D: Conversational/AI-Driven Search

**What it is:** Instead of clicking filters, users describe what they want in natural language. The AI translates their words into search parameters and learns from the conversation.

| | |
|---|---|
| **How it feels** | "Show me homes with character in a walkable neighborhood where families share fruit from their trees" → AI surfaces matching homes |
| **Pros** | No filter UI to learn, handles nuanced/emotional criteria that don't fit dropdowns, forward-looking (the industry is moving here), accessible to non-tech-savvy users |
| **Cons** | Users don't understand what's happening behind the scenes (black box), hard to debug when results are wrong, requires significant AI investment, needs a fallback when AI fails |
| **Who does it** | Homes.com (most aggressive), Redfin (conversational AI), Zillow (natural language search), Rightmove (Gemini-powered) |
| **HumanHomes fit** | High potential because HumanHomes' unique data (community stories, neighborhood narratives) is exactly the kind of unstructured content that AI search excels at. But don't lead with this — build as a layer on top of the preference system |

### Recommendation: Hybrid Approach

Use all four methods in layers:

| Layer | Method | Used For |
|-------|--------|----------|
| **Quick access** | Horizontal filter chips | HumanHomes categories (Story Homes, Transition, Group-Ready, Verified) |
| **Practical search** | Traditional subtractive filters | Price, beds/baths, location, property type |
| **Lifestyle matching** | Preference/boost (additive) with optional dealbreaker toggle | Community vibe, neighborhood character, home story type |
| **Natural discovery** | AI conversational search (later) | "Show me homes in neighborhoods where people know each other" |

---

## 3. Feed Dynamics Comparison

This is the second core decision: what does the main experience look like?

### Feed Type A: Traditional Search Results

**What it is:** User enters criteria, sees a list of matching results. The standard model.

| | |
|---|---|
| **Pros** | Works when users know what they want, predictable, users feel in control |
| **Cons** | Requires users to articulate what they want (hard for emotional decisions about homes), misses serendipitous discovery, feels transactional |
| **HumanHomes fit** | Necessary as a baseline but insufficient. Nobody searches "3bed 2bath with a crow that delivers newspapers." |

### Feed Type B: Algorithmic Personalized Feed

**What it is:** Platform uses your behavior (what you view, save, click) to curate a feed predicted to interest you. No explicit query needed. Think TikTok "For You" page.

| | |
|---|---|
| **Pros** | Enables serendipitous discovery, reduces cognitive load, keeps users engaged |
| **Cons** | Black box (users don't know why they see what they see), filter bubble risk, privacy concerns, can feel manipulative |
| **HumanHomes fit** | Useful as ONE section of the feed but shouldn't be the whole experience. HumanHomes should use stated preferences (transparent, user-controlled) rather than behavioral tracking (opaque). |

### Feed Type C: Discovery-First (Browsing Before Searching)

**What it is:** Lead with browsable categories or curated collections. Users discover through exploration before any search action. Think Airbnb categories or Spotify Browse.

| | |
|---|---|
| **Pros** | Inspires users who don't have a specific goal, surfaces content types users didn't know existed, creates emotional engagement, reduces cold-start problem |
| **Cons** | Frustrating for users with specific intent, requires enough inventory to fill categories, can feel like window shopping |
| **HumanHomes fit** | **Very high.** Discovery-first aligns perfectly with the human-first mission. Categories like "Story Homes," "Community Gems," "Transition Homes," "Group-Ready" lead with narrative, not specs. |

### Feed Type D: Hybrid (Search + Discovery + Personalization)

**What it is:** Multiple entry points for different user intents. Search bar for intent-driven users. Discovery categories for explorers. Personalized feed for returning users.

| | |
|---|---|
| **Pros** | Serves both intent-driven and exploratory users, multiple entry points reduce friction |
| **Cons** | Complex to build, risk of UI clutter |
| **Who does it** | YouTube (search + algorithmic home + recommended), Spotify (search + browse + home + library), Amazon (search + recommendations + categories) |
| **HumanHomes fit** | **Recommended.** Search for practical needs + discovery categories for exploration + personalized "For You" section based on stated preferences. |

### Recommended Feed Structure

```
┌─────────────────────────────────────────────────┐
│  [Search Bar: Location / Neighborhood]          │
├─────────────────────────────────────────────────┤
│  [Story Homes] [Transition] [Group-Ready]       │
│  [Verified] [Just Listed] [First-Time] [More]   │  ← Discovery chips
├─────────────────────────────────────────────────┤
│                                                   │
│  "Stories That Match Your Preferences"            │  ← Boosted section
│  ┌──────┐ ┌──────┐ ┌──────┐                      │     (based on stated
│  │Photo │ │Photo │ │Photo │                      │      preferences)
│  │Story │ │Story │ │Story │                      │
│  │Stats │ │Stats │ │Stats │                      │
│  │95% ★ │ │88% ★ │ │82% ★ │                      │
│  └──────┘ └──────┘ └──────┘                      │
│                                                   │
│  "More Homes to Discover"                         │  ← Everything else
│  ┌──────┐ ┌──────┐ ┌──────┐                      │     (always visible,
│  │      │ │      │ │      │                      │      never hidden)
│  └──────┘ └──────┘ └──────┘                      │
│                                                   │
│  [Explore Map View]                               │
└─────────────────────────────────────────────────┘
```

**Key principle:** The "More Homes to Discover" section means the full universe is always accessible. Users never experience their options shrinking. Preferences organize the feed; they don't gatekeep it.

---

## 4. Layout Comparison

How do you display the listings themselves?

| Layout | What It Is | Pros | Cons | HumanHomes Fit |
|--------|-----------|------|------|----------------|
| **Split-screen map + list** | Map and listing cards side by side (Zillow, Airbnb) | Users see spatial relationships, map zoom = geographic filter, hover-sync between list and map | Cramped on mobile, map doesn't convey stories, less space for listing details | Secondary view. Essential for geographic search but not the primary experience |
| **Map-primary** | Map is dominant, listings appear as pins (Redfin, Google Maps) | Natural for geographic decisions, context immediately visible | Poor for emotional/story decisions, low information density per pin, bad for users without a location in mind | Optional view. Include but don't default to it |
| **Story card feed** | Pinterest-style visual cards in a scrollable feed (Pinterest, Instagram Explore) | Emotionally engaging, story excerpts convey character, natural for mobile, perfect for narrative-first | Lower info density, harder to compare listings, requires good photography | **Primary view.** This is the only layout that can convey the human dimension. |
| **Compact list** | Traditional rows of data (Amazon, Indeed) | Highest info density, easiest to scan, simplest to build | Loses geographic context, not visually engaging, doesn't differentiate from competitors | Alternative view for users doing serious comparison shopping |

### Recommended Layout Strategy

| Context | Primary | Secondary |
|---------|---------|-----------|
| Home/Discovery | Story card feed | — |
| Search results (desktop) | Story cards + toggleable map panel | Compact list option |
| Search results (mobile) | Story card feed | Map as tab toggle |
| Neighborhood browsing | Map with community overlays | Card feed of neighborhood stories |
| Group buying comparison | Side-by-side cards | — |

---

## 5. Technical Architecture Options

What do you actually build to power this? Here are the options, from simplest to most complex.

### Option 1: PostgreSQL Only (Simplest Start)

**What it is:** Use your existing database for everything — search, filtering, geospatial queries.

| | |
|---|---|
| **Cost** | $0 additional |
| **Setup time** | 1-2 weeks |
| **What you get** | Basic text search, geospatial queries via PostGIS (which is actually excellent for map search), simple filters via SQL |
| **What you give up** | Search-as-you-type, typo tolerance, fast faceted counts, instant search feel |
| **Good enough for** | 0-100K listings, early MVP, validating the concept |
| **Upgrade trigger** | Users complain about search speed or relevance |

### Option 2: PostgreSQL + Typesense (Recommended Start)

**What it is:** Keep PostgreSQL as your main database, add Typesense (a simple search engine) specifically for the search experience.

| | |
|---|---|
| **Cost** | ~$50-200/month for Typesense Cloud |
| **Setup time** | 2-4 weeks |
| **What you get** | Sub-50ms instant search, automatic typo tolerance, faceted filtering with counts, geospatial search, search-as-you-type — all out of the box |
| **What you give up** | ML-based ranking (Learning to Rank), distributed scale beyond ~5M listings |
| **Good enough for** | 1K-1M+ listings, up to 500K users |
| **Why Typesense** | Single binary (no JVM), zero configuration needed, no per-search charges, there's already a reference implementation with 1.2M Airbnb listings. Meilisearch is similar but single-node only (no high availability). |
| **Upgrade trigger** | Need ML-based relevance ranking or dataset exceeds 5M |

### Option 3: PostgreSQL + Elasticsearch (Enterprise Scale)

**What it is:** The industry standard. Zillow, Redfin, Realtor.com, and Rightmove all use Elasticsearch (or its fork, OpenSearch).

| | |
|---|---|
| **Cost** | $500-5,000+/month (managed) or $400-2,500/month (self-hosted, plus ops time) |
| **Setup time** | 2-4 weeks (managed) or 1-2 months (with full CDC pipeline) |
| **What you get** | Everything in Option 2, PLUS: ML-based Learning to Rank, sophisticated aggregation framework, distributed search across billions of documents, enterprise ecosystem |
| **What you give up** | Simplicity. Requires JVM tuning, cluster management, a data sync pipeline (Debezium/Kafka), and operational expertise |
| **Good enough for** | 500K+ listings, millions of users |
| **Why not start here** | Overkill for a new platform. The operational complexity and cost aren't justified until you have significant scale |

### Option 4: Full Enterprise Stack (Where Zillow Is)

**What it is:** Elasticsearch + Kafka streaming + ML ranking pipeline + recommendation engine + A/B testing infrastructure.

| | |
|---|---|
| **Cost** | $10,000+/month infrastructure, dedicated search/ML engineering team |
| **What you get** | Personalized ranking, real-time recommendations, "Homes for You" feeds, natural language search, thousands of daily experiments |
| **Why not** | This is what Zillow runs with a 300+ person engineering team. Build toward this, don't start here |

### Cost Comparison Table

| Approach | Monthly Cost | Listings Supported | Users Supported | Team Needed |
|----------|-------------|-------------------|----------------|-------------|
| PostgreSQL only | $0 extra | 0-100K | 0-10K | 1 developer |
| PostgreSQL + Typesense | $50-200 | 1K-1M+ | 1K-500K | 1-2 developers |
| PostgreSQL + Elasticsearch (managed) | $500-3,000 | 500K-10M+ | 100K-5M | 2-3 developers + ops |
| Full enterprise stack | $10,000+ | 10M+ | Millions | Dedicated team |

### Recommendation

**Start with Option 2 (PostgreSQL + Typesense).** It gives you enterprise-quality instant search for $50-200/month with minimal engineering overhead. When you outgrow it, migrate to Elasticsearch — the search-behind-API pattern means clients never touch the search engine directly, so the swap is contained to the backend.

The product spec already calls for PostgreSQL + PostGIS and mentions Typesense as a scale target. This aligns perfectly.

---

## 6. UX Pattern Recommendations for HumanHomes

### The Three-Tier Filter Architecture

This is the recommended filter system, designed specifically for HumanHomes' unique needs:

| Tier | Name | Behavior | Where It Lives | Examples |
|------|------|----------|----------------|----------|
| **Tier 1** | Quick Filters | Instant toggle chips, always visible | Horizontal scrollable bar at top of feed | Story Homes, Transition, Group-Ready, Verified, Just Listed, First-Time |
| **Tier 2** | Standard Filters | Hard filters with counts (subtractive) | Top bar dropdowns (desktop) / bottom sheet (mobile) | Price range, beds/baths, property type, location |
| **Tier 3** | Preference Filters | Ranking boosts, not hard exclusions (additive) | Full-screen settings page, accessible from profile | Community vibe, neighborhood character, home story type, lifestyle values |

**Why three tiers matter:**
- Tier 1 makes HumanHomes' unique categories discoverable without any explanation needed
- Tier 2 handles the practical "I need 3 bedrooms under $500K" use case that every home buyer has
- Tier 3 handles the emotional "I want to live in a neighborhood where people know each other" criteria WITHOUT creating the shrinking results problem

**The dealbreaker toggle:** Any Tier 3 preference filter can be toggled to "dealbreaker" mode by the user, converting it from a ranking boost to a hard filter. This gives power users full control while keeping the default experience warm and inclusive.

### Onboarding That Prevents Shrinking Results

The design document warns against users seeing a broad selection of homes that then shrinks when they provide personal details. Here's how to prevent it:

**Recommended flow: Preference-First Onboarding**

1. "Tell us about what home means to you" (not "what are you looking for")
2. Story preferences: "What kind of home stories interest you?" — visual cards, not checkboxes
3. Practical basics: Location, price range, beds/baths
4. Community fit: "What matters to you in a neighborhood?" (private, never shared)
5. First view: Already personalized. The user NEVER sees an unfiltered "before" to compare against.

**Why this works:** The user's first view of the feed is already their personalized view. There's no "before and after" shrinking. They didn't watch 1,247 homes drop to 312. They just see "Stories That Match You" — which feels like discovery, not elimination.

### Private Community Filters

This is the most delicate UX challenge. Users want to filter by community fit (values, lifestyle, culture), but making these filters visible creates exclusion dynamics.

**Rules:**
1. Preference filters are NEVER visible to other users, sellers, or the public
2. No result counts that change based on private preferences (prevents inferring what someone filtered on)
3. Frame as "finding your fit" not "excluding others"
4. Preferences adjust ORDER of results, never EXISTENCE of results (unless user toggles dealbreaker)
5. Match indicators show "95% match" — not "doesn't meet criteria"

### Empty State Strategy (Critical for Early Growth)

HumanHomes launches with zero MLS dependency (user-generated listings only), so thin markets are inevitable early on.

| Scenario | Response |
|----------|----------|
| Zero listings match filters | "We haven't found your perfect match yet. Here are homes that come close." + show partial matches |
| Low inventory in area | Lead with neighborhood stories and community content, even without listings |
| No story homes in area | Show standard listings + "Know a home with a story? Help us grow [Area]" CTA |
| Brand new user, no preferences | Show trending/popular stories from nearby areas as inspiration |

### Mobile Filter Patterns

| Filter Type | Mobile Pattern |
|-------------|---------------|
| Quick filters (chips) | Horizontal scrollable bar, always visible above feed |
| Standard filters (price, beds) | Bottom sheet for 1-2 filters, full-screen page for multi-filter |
| Preference/community filters | Full-screen settings page (accessible from profile, not a modal) |
| Active filter state | Badge count on filter button + dismissible chips above results |
| Clear filters | "Clear All" button + swipe-to-dismiss individual chips |

---

## 7. Recommended Approach for HumanHomes

Pulling everything together into a single recommended architecture:

### Feed Model: Discovery-First Hybrid

- **Default experience:** Story card feed with discovery categories (not search results)
- **Search available:** Location/address search bar for intent-driven users
- **Personalization:** Stated preferences (transparent, user-controlled) boost ranking — behavioral tracking is secondary
- **Layout:** Pinterest-style story cards as primary, map as toggleable secondary
- **Sections:** "Stories That Match Your Preferences" (boosted) + "More Homes to Discover" (everything else, always visible)

### Filter Model: Three-Tier with Preference/Dealbreaker Split

- **Tier 1 (chips):** HumanHomes-unique categories — instant toggle
- **Tier 2 (standard):** Price, beds, baths, location, property type — hard filters with counts
- **Tier 3 (preferences):** Community vibe, story type, neighborhood character — ranking boosts, private, with optional dealbreaker toggle

### Technical Stack

- **Search:** Typesense (instant search, facets, geo, typo tolerance — $50-200/month)
- **Database:** PostgreSQL + PostGIS (source of truth, complex geospatial)
- **Cache:** Redis (popular search results, filter aggregations)
- **Map clustering:** Supercluster (client-side, sufficient for <100K markers)
- **Data sync:** Application-level events (write to DB, then push to Typesense)
- **Upgrade path:** Elasticsearch when needing ML ranking or >5M listings

### Competitive Moat

Every competitor is racing toward AI search trained on the SAME data (MLS specs, market statistics). HumanHomes' differentiator is data no one else has:
- Community stories and neighborhood narratives
- Neighbor testimonials and vouching data
- Home stories written by the people who lived there
- Lived experience descriptions of what it's like in a neighborhood
- Community event and culture data

This is the content the AI search can be trained on — and no competitor can replicate it because it requires the community-first platform to generate it.

### What Zillow Weaknesses to Exploit

| Zillow Weakness | HumanHomes Opportunity |
|-----------------|----------------------|
| "Homes for You" includes paid promotions | Truly unbiased ranking — no pay-to-play |
| No real-time filter count updates | Show live counts as filters change |
| No collaborative search features | Co-buyer shared boards, group voting on saved homes |
| Information overload on detail pages | Focused, story-first detail pages |
| Keyword search is inconsistent | AI search trained on community stories |
| Homes reduced to specs and square footage | Every home has a story, not just a listing |

---

## 8. What to Build First vs What to Add Later

### Phase 1: MVP (Build Now)

- Story card feed as primary layout
- Horizontal category chips (Story Homes, Just Listed, etc.)
- Standard filters: price, beds/baths, property type, location
- Map view as toggleable secondary
- Saved searches with basic alerts
- PostgreSQL + PostGIS + Typesense search

### Phase 2: Post-Launch (Build Next)

- Preference filters (Tier 3) with boost-not-filter logic
- Preference-first onboarding flow
- "Stories That Match" vs "More to Discover" feed sections
- Match indicators on listing cards
- Full-screen filter page for mobile
- Shareable search URLs for co-buyer groups
- Content-based "Similar Homes" recommendations

### Phase 3: Growth Features (Build When You Have Users)

- Collaborative search boards (co-buyer group saved homes with voting)
- Behavioral recommendation layer (clicks, saves, time on listing)
- AI/conversational search trained on community stories
- Advanced empty state handling (partial matches, nearby suggestions)
- Server-side map clustering (when >100K markers)
- Neighborhood discovery with community overlays on map

### Phase 4: Enterprise Scale (Build When You Need It)

- Elasticsearch migration (when >5M listings or need ML ranking)
- Learning to Rank (ML-based relevance)
- Full CDC pipeline (Debezium + Kafka for near-real-time sync)
- A/B testing infrastructure for search experiments
- Natural language search with LLM-powered query parsing
- Hybrid recommendation engine (content + collaborative + personalization)

---

## Cross-Platform Inspiration Summary

| Feature | Source | HumanHomes Adaptation |
|---------|--------|----------------------|
| Category browsing | Airbnb | "Story Homes," "Community Gems," "Family Havens" — human categories |
| "What Locals Say" | Trulia | 10x richer: video stories, community profiles, not just polls |
| Hot Homes competitive indicator | Redfin | "Neighborhood Pulse" — community vitality signals |
| Preference vs Dealbreaker | Hinge (dating) | Soft match for lifestyle, hard filter for practical criteria |
| Filterless conversational search | Homes.com | Conversation guided by community knowledge, not just specs |
| "Where Can I Live?" lifestyle search | Rightmove | Lifestyle + community match scoring |
| Collaborative search | Redfin, Realtor.com+ | Extend to co-buyer groups, families, friends house-hunting together |
| "I'm Flexible" discovery mode | Airbnb | "Show me where I'd love to live" — no specs required |
| Match scoring | OkCupid (dating) | "95% match based on your preferences" on listing cards |
| Productive browsing | Pinterest | Infinite scroll story feed that evolves with user interests |

---

## Detailed Research Documents

The full research from each agent is available for deep dives:

| Document | Location | Contents |
|----------|----------|----------|
| Zillow Architecture | `docs/plans/research/zillow-search-architecture.md` | Technical architecture, filter taxonomy, recommendation pipeline, scale numbers |
| Competitor Platforms | `docs/plans/research/competitor-platform-search.md` | Redfin, Realtor.com, Trulia, Homes.com, Airbnb, Rightmove, Domain |
| Enterprise Infrastructure | `docs/plans/research/enterprise-search-infrastructure.md` | Search engines compared, geospatial search, faceted search, ranking, recommendations, costs |
| UX Filter & Feed Patterns | `docs/plans/research/ux-filter-feed-patterns.md` | Filter UX patterns, additive vs subtractive, personalization, layouts, mobile, cross-domain |
