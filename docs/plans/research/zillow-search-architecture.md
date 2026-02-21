# Zillow Search & Feed Architecture Research

> Research compiled: 2026-02-20
> Researcher: zillow-researcher agent
> Purpose: Inform HumanHomes search feed and filtering system design

---

## Table of Contents

1. [Search & Filter System](#1-search--filter-system)
2. [Feed & Discovery](#2-feed--discovery)
3. [Technical Architecture](#3-technical-architecture)
4. [Mobile vs Web UX](#4-mobile-vs-web-ux)
5. [Unique Capabilities](#5-unique-capabilities)
6. [Scale & Performance Numbers](#6-scale--performance-numbers)
7. [Key Takeaways for HumanHomes](#7-key-takeaways-for-humanhomes)

---

## 1. Search & Filter System

### 1.1 Search Paradigm: Hybrid Map + List

Zillow uses a **hybrid map-and-list** search experience. On desktop, the screen is split: a map on the left and a scrollable list of property cards on the right. On mobile, users toggle between a full-screen map view and a list view.

- **Map view**: Homes are grouped area-wise on first view (cluster markers showing count), users tap or zoom to see individual homes
- **List view**: Property cards with photos, price, beds/baths, sqft, and key details
- **Split view (desktop)**: Map and list side-by-side, interlinked — scrolling the list highlights pins on the map and vice versa

### 1.2 Filter Taxonomy (Complete Inventory)

Zillow organizes filters into a primary bar and a "More" dropdown for advanced options.

**Primary Filter Bar (always visible):**
- **Listing Type**: For Sale, For Rent, Sold
- **Price Range**: Min/Max with slider and direct input
- **Beds & Baths**: 0+ through 5+ selection chips
- **Home Type**: Houses, Townhomes, Multi-family, Condos/Co-ops, Lots/Land, Apartments, Manufactured

**Advanced Filters (under "More" dropdown):**
- **Square Footage**: Min/Max
- **Lot Size**: Min/Max
- **Year Built**: Min/Max range
- **HOA Fees**: Max monthly HOA
- **Parking**: Garage spots
- **Amenities**: Pool, A/C, Waterfront
- **View**: City, Park, Water, Mountain
- **Days on Zillow**: Time on market
- **Keywords**: Free-text search within listing descriptions
- **Open Houses**: Upcoming open house filter
- **3D Tours**: Listings with virtual tours
- **Pending/Under Contract**: Include or exclude
- **Has Photos**: Filter for listings with photos
- **New Construction**: Only new builds
- **Basement**: Has basement
- **Single Story**: Single-level homes

**Sort Options:**
- Homes for You (default, personalized)
- Price (High to Low)
- Price (Low to High)
- Newest
- Bedrooms
- Bathrooms
- Square Feet
- Lot Size

### 1.3 Dynamic Filter Updates

Results update dynamically as filters change — no "Apply" button needed for most interactions. The URL encodes the full search state in a `searchQueryState` JSON parameter that includes:
- `mapBounds` (west, east, south, north coordinates)
- `filterState` (all active filters as key-value pairs)
- `pagination` (current page)
- `isMapVisible` (boolean)

This means every search state is **deep-linkable and shareable** — a critical UX pattern.

### 1.4 Natural Language Search (AI-Powered)

Launched January 2023, significantly upgraded September 2024. Zillow is the first major real estate marketplace to offer natural language search.

**How it works:**
- Users type everyday language: "Austin homes under $400K near good schools" or "3-bedroom houses near Roosevelt High School"
- ML models parse the query and map it to structured filters + semantic search across listing descriptions
- Currently live on iOS and Android apps; expanding to web
- Handles: commute time queries, affordability criteria, school proximity, points of interest

### 1.5 Guided Search (Personalized Refinements)

Zillow added a ML-driven feature called "Guided Search" that surfaces contextual filter suggestions as button chips above results.

**Technical details:**
- A ranking model captures context from currently-applied filters to surface the most relevant next refinement
- Suggestions adjust dynamically — e.g., if user has already selected 3 bedrooms, the model won't suggest bedroom filters but may suggest "Has Garage" or "Built After 2010"
- **A/B testing results: 33% lift in filter engagement**, positive impact on saved homes and conversions
- Rolled out to select regions first, then expanded based on testing

---

## 2. Feed & Discovery

### 2.1 "Homes for You" Personalized Feed

This is Zillow's primary discovery mechanism beyond explicit search. It appears as:
- The default sort order in search results
- A dedicated feed in the mobile app home screen
- Personalized email digests

**How the algorithm works:**
- Based on **viewing history** (homes viewed), **saving behavior** (favorited homes), **search history** (filters applied, locations searched)
- Uses exponential decay weighting — recent activity weighted more heavily than old activity
- Factors in: days on market, whether listing has 3D tour, open house scheduled, and **promoted listings** (paid placement)
- Learns over time as more behavioral data is collected
- Users can influence it by saving/unsaving homes and modifying search behavior

### 2.2 Recommendation System Architecture

Zillow's recommendation system is a **multi-stage pipeline**:

**Stage 1 — Candidate Generation (Elasticsearch):**
- User profile + request filters generate an Elasticsearch query
- Relevance score based on a linear model derived from user profile features
- Generates a maximum of **100 candidates from ~1.3 million active listings**
- This is the bottleneck stage — historically the source of timeouts

**Stage 2 — Scoring (Python ML service):**
- Candidates are re-scored by a more sophisticated ML model
- Typically returns **fewer than 10 final recommendations**
- Uses features like listing embeddings, user preference vectors, and contextual signals

**Stage 3 — Caching:**
- Results cached where applicable (Redis distributed cache)
- Real-time generation is preferred to capture new listings and updated preferences

### 2.3 Home Embeddings (Siamese Network)

Zillow developed a deep learning embedding system for "Similar Homes" recommendations:

- **Architecture**: Siamese neural network
- **Hybrid approach**: Combines collaborative filtering (user behavior) and content-based features (home attributes)
- **Cold-start handling**: Neural network mapping function from content space to embedding space, supervised by engagement data — critical because new listings are a significant portion of inventory
- **Text embeddings**: Separate scalable system generates embedding vectors from listing descriptions for downstream use in ranking models

### 2.4 Recommendation Diversity

Zillow actively fights the "filter bubble" problem:

- **Submodular objective function**: Selects highly relevant items while preferring items spanning diverse categories
- **Greedy forward selection algorithm**: Computes the optimal diverse subset
- **User interests diffusion matrix**: Represents correlations between categories, "diffuses" user preferences to similar but unexplored categories
- This ensures buyers see a variety of options (different neighborhoods, styles, price points) rather than nearly identical homes

### 2.5 Home Insights Collections

NLP-powered thematic collections:
- "Homes with a pool in Boca Raton, FL"
- "Remodeled kitchens in Seattle"
- "Homes with mountain views"
- Uses NLP models to categorize and highlight specific home features from listing text

### 2.6 Saved Searches & Alerts

- Users can save any search configuration (filters + location + map bounds)
- Alert frequency options: **Instant**, **Daily**, or **Never**
- Instant alerts: Push notification + email as soon as a matching listing appears
- Daily alerts: One aggregated email per day with new matches
- Each saved search has independent notification settings
- Saved searches are editable — change filters, rename, adjust frequency

### 2.7 Personalized Location Preferences

The Relevance team developed a specialized location preference model:

- **Method 1**: Count home clicks per zip code, weighted by exponential time decay
- **Method 2 (better)**: Cluster past user clicks and build a personalized click density model per user
- Method 2 yields **3% NDCG lift in top positions, 2%+ lift in top 20**
- Integrated into the broader ranking pipeline

---

## 3. Technical Architecture

### 3.1 Frontend Stack

- **Web**: Next.js (React) deployed via standardized web platform on AWS + Kubernetes
- **Mobile**: Native iOS (Swift) and Android (Kotlin) apps
- **Module system**: Beginning to use webpack federated modules for micro-frontend architecture
- **Maps**: Custom map implementation with standard, satellite, and terrain styles

### 3.2 Backend Stack

- **Languages**: Python (ML services, scoring), Java (core services, Elasticsearch integration)
- **API Layer**: Apollo GraphQL federated graph — 70+ systems connected via subgraph federation
- **Search Engine**: Elasticsearch for candidate generation and listing search
- **Cache**: Redis for distributed caching
- **ML Serving**: Knative Serving on Kubernetes (from Kubeflow integration)
  - Custom AIP Serving SDK wrapping Knative/Kubernetes complexity
  - Docker images with multiple entrypoints for training and serving
  - SageMaker for training, Kubernetes for real-time serving
  - GitLab CI/CD pipelines for deployment

### 3.3 Data Pipeline & Streaming

Zillow transitioned from batch to **streaming data architecture**:

- **Message Bus**: Apache Kafka (migrated from AWS Kinesis due to KPL scaling issues with JVM heap)
- **Architecture**: Producer and consumer streams scaled independently
- **REST API abstraction**: Teams call a REST API that uses underlying Kafka streams — no direct knowledge of streaming tech needed
- **Schema Registry**: Tight integration for message schema enforcement and compatibility
- **Data updates flow**: New listings, price updates, and ML pipeline outputs stream in near-real-time
- **Batch processing**: Updates rate-limited and sent via Elasticsearch bulk processor

### 3.4 Elasticsearch Configuration

- Listings indexed with custom relevance scoring per request
- Optimizations: tuned refresh intervals, optimized query/fetch phases
- Three fetch methods used: source fields, stored fields, and doc values (performance-optimized selection)
- Real-time updates via streaming architecture
- Approximately **1.3 million active listings** indexed for search

### 3.5 Experimentation Platform

- Runs **thousands of experiments daily**
- Custom A/B testing infrastructure: "AB Testing Hub" web application
- Analysis library: ZEXPy (Python) with automated and manual analysis modes
- Single source of truth API: "fast-ab" for publishing/retrieving experiment data
- **Hybrid build & buy strategy**: Custom analysis platform + bought feature-flagging solution with developer SDKs
- Achieved **3x growth in experiment volume** within first 2 years of platform deployment

### 3.6 Data Sources

- **MLS feeds**: Internet Data Exchange (IDX) direct feeds from Multiple Listing Services
- **Public records**: County tax assessor records via third-party aggregators
- **Parcel data**: Digital Map Products (now LightBox) for parcel boundary data
- **Neighborhood data**: 7,000+ neighborhood polygons (shared under Creative Commons)
- **Photos**: Millions of property photos processed through CNNs for quality assessment

---

## 4. Mobile vs Web UX

### 4.1 Shared Patterns

- Both platforms offer map/list views
- Same filter taxonomy available
- Saved searches and favorites sync across platforms
- Push notifications on mobile, email notifications on both

### 4.2 Mobile-Specific Patterns

- **Map-first experience**: Default view on mobile is the map
- **Bottom navigation bar**: Home, Search, Saved, Account
- **Filter access**: Top-level filter bar that expands to full-screen filter sheet
- **Draw on map**: Finger-based polygon drawing for custom search areas
- **Swipe gestures**: Swipe through property photos in cards
- **Pull-up panel**: Property details appear as a draggable bottom sheet over the map
- **Touch-optimized map**: Pinch to zoom, drag to pan, tap pins for preview cards
- **Instant search**: Map re-searches automatically as user pans/zooms (with debouncing)

### 4.3 Desktop-Specific Patterns

- **Split pane**: Map (left) + results list (right) — persistent
- **Hover interactions**: Hovering over a list card highlights the corresponding map pin
- **Richer property cards**: More data visible per card (description preview, Zestimate, etc.)
- **Keyboard shortcuts**: Tab through results, Enter to open details
- **Wider filter bar**: All primary filters visible without collapse

### 4.4 Map Styles

Both platforms offer multiple map styles:
- **Standard** (default road map)
- **Satellite** (aerial imagery)
- **Terrain** (topographical)

Map overlays available:
- School district boundaries
- Flood zones
- Neighborhood boundaries
- Transit routes (in some markets)

---

## 5. Unique Capabilities

### 5.1 Draw on Map (Custom Boundary Search)

- Press the "Draw" button, then use cursor (desktop) or finger (mobile) to trace a custom polygon
- All results constrain to within the drawn boundary
- Can be combined with all other filters
- Originally launched on iPhone app (2011), later expanded to all platforms
- Useful for: "I want to live within walking distance of this park" or "homes in this specific valley"

### 5.2 School District Search

- Search by specific school or school district name
- Displays **attendance zone boundaries** overlaid on the map
- Shows available homes within the zone
- For schools without fixed boundaries (charter, private, open enrollment): shows homes within **5-mile radius**
- GreatSchools ratings integrated into listing details

### 5.3 Commute Time Search

- Toggle "Travel times" in a listing's Overview section
- Enter a work address or frequent destination
- Shows estimated commute time by: car, transit, bicycle, or walking
- September 2024 update: Commute time now supported in natural language search ("homes with 30 min commute to downtown")
- Uses travel time APIs to compute real-time or average commute estimates

### 5.4 3D Tours / Virtual Tours

- Listings with 3D Home tours allow virtual "walk-through"
- Users can filter to only show listings with 3D tours
- Alerts can be configured specifically for 3D-tour-enabled listings
- Interactive floor plan navigation
- Tours created by agents using Zillow's 3D Home app or third-party tools (Matterport, etc.)

### 5.5 Zestimate Integration

- **Neural Zestimate**: Single national-scale neural network (replaced thousands of regional models)
- Uses: home characteristics, location, market trends, tax assessments, sales history, and **property photos** (CNN-based quality detection)
- **Median error rate: 7.49%** for off-market homes (across 100M+ homes)
- **15%+ reduction** in relative error vs. previous pipeline approach
- Displayed prominently on every listing and in search result cards
- Includes Zestimate range (confidence interval)
- Price history chart showing Zestimate trend over time

### 5.6 Price History & Tax Records

- **Price history**: Shows every sale, listing, and price change event with dates and amounts
- **Tax assessment history**: Annual tax assessments from county records
- **Data sources**: IDX feeds from MLS + county public records via third-party aggregators
- Presented as interactive timeline/chart on property detail pages
- Includes: original list price, price changes, sold price, and dates

### 5.7 Additional Search Features

- **Recently Sold**: Filter for sold homes with actual sale prices
- **Foreclosures/Pre-foreclosures**: Specialized listing types
- **Open House filter**: Find homes with upcoming open houses
- **New Construction**: Filter for newly built homes
- **Coming Soon**: Pre-listing status before homes go on MLS
- **Keyword search**: Free-text search within listing descriptions (e.g., "granite countertops", "corner lot")

---

## 6. Scale & Performance Numbers

| Metric | Value | Date |
|--------|-------|------|
| Total homes in database | ~160 million | 2024 |
| Active rental listings | 1.9 million | 2024 |
| Active for-sale listings (indexed) | ~1.3 million | 2022 (from tech blog) |
| Monthly active users | 228 million | 2024 |
| Annual site visits | 9.3 billion | 2024 |
| Real estate web traffic share | 62% (Zillow + subsidiaries) | 2024 |
| Portal visit market share | >50% | 2024 |
| Active home shoppers | 4 million | 2024 |
| Leads generated for agents | 16.9 million/year | 2024 |
| Homes viewed per second (mobile) | 157 | 2024 |
| Recommendation candidates (ES) | Max 100 from 1.3M listings | Per request |
| Final recommendations returned | <10 per request | Per request |
| Experiments running | Thousands daily | 2024 |
| Zestimate coverage | 100+ million off-market homes | 2024 |
| Zestimate median error | 7.49% | 2024 |
| Neighborhood polygons | 7,000+ | Available via CC license |

---

## 7. Key Takeaways for HumanHomes

### What Zillow Does Well (Adopt/Learn From)

1. **Hybrid map+list is table stakes** — Every serious real estate search needs both views, tightly interlinked
2. **URL-encoded search state** — Deep-linkable, shareable, bookmarkable searches via JSON-in-URL pattern
3. **Multi-stage recommendation pipeline** — Elasticsearch for fast candidate generation, then ML re-ranking for quality. This scales well.
4. **Guided Search (contextual filter suggestions)** — 33% engagement lift is significant. ML-driven "what to filter next" is a strong UX differentiator.
5. **Streaming architecture for real-time updates** — Kafka-based pipeline ensures new listings appear fast. Critical for competitive UX.
6. **Natural language search** — Forward-looking feature that reduces friction. LLM-powered query parsing is becoming expected.
7. **Recommendation diversity** — Actively preventing filter bubbles keeps users exploring
8. **Home embeddings for cold-start** — Siamese network approach solves the "new listing" problem elegantly
9. **Experimentation infrastructure** — Thousands of daily experiments enable rapid iteration. Build this early.

### Where Zillow Falls Short (Opportunities for HumanHomes)

1. **"Homes for You" includes paid promotion** — Default sort mixes organic relevance with paid listings. An opportunity to offer truly unbiased ranking.
2. **Filter UX is complex** — Advanced filters buried in "More" dropdown. Progressive disclosure is good, but could be more intuitive.
3. **Keyword search is limited and confusing** — Roman Sorin's UX critique notes that keyword search behavior is inconsistent and unintuitive.
4. **No real-time filter count updates** — When you change filters, you don't see "showing X of Y results" update instantly. This is a common UX miss.
5. **Limited collaborative features** — No shared boards, no "compare homes" side-by-side, minimal social features for couples/families searching together.
6. **Information overload** — Property detail pages are extremely dense. HumanHomes could offer a more focused, curated experience.
7. **Alert fatigue** — Instant alerts can be overwhelming. Smarter notification batching and prioritization could differentiate.

### Architecture Recommendations for HumanHomes

1. **Search stack**: Elasticsearch (or OpenSearch) for listing search + ML re-ranking service. Proven at Zillow scale.
2. **API design**: GraphQL with schema federation — allows independent service evolution. Zillow's 70+ service migration proves this works.
3. **Real-time pipeline**: Kafka/Redpanda for listing updates + user event streaming. Critical for fresh results.
4. **Recommendation approach**: Start with collaborative filtering + content features, add embeddings as data grows. Zillow's Siamese network approach is a good target architecture.
5. **Experimentation**: Build feature flagging and A/B testing infrastructure early. Zillow's 3x experiment growth was enabled by investing in this early.
6. **Mobile**: Native apps (Swift/Kotlin) for map-heavy experience. Zillow's 157 homes/second viewing rate demands native performance.
7. **Search state**: Encode full search state in URL parameters (JSON). Enables sharing, bookmarking, and deep linking from notifications.

---

## Sources

- [Optimizing Elasticsearch for Low Latency, Real-Time Recommendations — Zillow Tech Hub](https://www.zillow.com/tech/optimizing-elasticsearch/)
- [Guided Search — Personalized Search Refinements — Zillow Tech Hub](https://www.zillow.com/tech/personalized-search-refinements/)
- [Home Embeddings for Similar Home Recommendations — Zillow Tech Hub](https://www.zillow.com/tech/embedding-similar-home-recommendation/)
- [Improving Recommendation Quality by Tapping into Listing Text — Zillow Tech Hub](https://www.zillow.com/tech/improve-quality-listing-text/)
- [Introduction to Recommendations at Zillow — Zillow Tech Hub](https://www.zillow.com/tech/introduction-recommendations-zillow/)
- [Helping Buyers Explore via Personalized Recommendation Diversity — Zillow Tech Hub](https://www.zillow.com/tech/personalized-recommendation-diversity/)
- [Personalized Location Preference for Home Recommendations — Zillow Tech Hub](https://www.zillow.com/tech/personalized-location-preference/)
- [Helping Users Discover Dream Homes Through Home Insights Collections — Zillow Tech Hub](https://www.zillow.com/tech/helping-users-discover-their-dream-homes-through-home-insights-collections/)
- [Building the Neural Zestimate — Zillow Tech Hub](https://www.zillow.com/tech/building-the-neural-zestimate/)
- [Serving Machine Learning Models Efficiently at Scale — Zillow Tech Hub](https://www.zillow.com/tech/serving-machine-learning-models-efficiently-at-scale-at-zillow/)
- [Zillow Transitions to Streaming Data Architecture — Zillow Tech Hub](https://www.zillow.com/tech/streaming-data-architecture/)
- [Building a Data Streaming Platform — Zillow Tech Hub](https://www.zillow.com/tech/building-a-data-streaming-platform/)
- [The Data Infra Behind Zillow's 3x Growth in Experiment Volume — Zillow Tech Hub](https://www.zillow.com/tech/the-data-infra-behind-zillows-3x-growth-in-experiment-volume/)
- [Zillow's AI-powered home search gets smarter (Sep 2024)](https://zillow.mediaroom.com/2024-09-04-Zillows-AI-powered-home-search-gets-smarter-with-new-natural-language-features)
- [How to Find a House on Zillow with Advanced Search — Zillow](https://www.zillow.com/learn/zillow-advanced-search/)
- [Zillow Statistics (2025) — iPropertyManagement](https://ipropertymanagement.com/research/zillow-statistics)
- [Zillow Revenue and Usage Statistics (2026) — Business of Apps](https://www.businessofapps.com/data/zillow-statistics/)
- [Zillow Tech Stack — StackShare](https://stackshare.io/zillow/zillow)
- [Zillow's confusing keyword UX — Roman Sorin](https://romansorin.com/blog/zillows-confusing-keyword-ux)
- [Saved Searches and Saved Homes — Zillow Help Center](https://zillow.zendesk.com/hc/en-us/articles/213395508-Saved-Searches-and-Saved-Homes)
- [Zillow Notification Guide — Zillow Help Center](https://zillow.zendesk.com/hc/en-us/articles/360001863488-Zillow-Notification-Guide)
