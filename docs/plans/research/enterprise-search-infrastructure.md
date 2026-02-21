# Enterprise Search Infrastructure for Real Estate Platforms

**Research Date:** 2026-02-20
**Researcher:** infra-researcher
**Context:** Technical infrastructure patterns powering enterprise-scale real estate and marketplace search feeds, evaluated for HumanHomes.

---

## Table of Contents

1. [Search Engine Technology Comparison](#1-search-engine-technology-comparison)
2. [Geospatial Search](#2-geospatial-search)
3. [Real-Time Filter Updates](#3-real-time-filter-updates)
4. [Relevance and Ranking](#4-relevance-and-ranking)
5. [Recommendation Engines](#5-recommendation-engines)
6. [Scale and Performance](#6-scale-and-performance)
7. [Architecture Patterns](#7-architecture-patterns)
8. [Cost and Complexity Tradeoffs](#8-cost-and-complexity-tradeoffs)
9. [Startup vs Enterprise: What to Build When](#9-startup-vs-enterprise-what-to-build-when)
10. [Recommendations for HumanHomes](#10-recommendations-for-humanhomes)

---

## 1. Search Engine Technology Comparison

### Candidates Evaluated

| Feature | Elasticsearch | OpenSearch | Typesense | Meilisearch | PostgreSQL FTS |
|---------|--------------|------------|-----------|-------------|----------------|
| **Language** | Java (Lucene) | Java (Lucene fork) | C++ | Rust | C |
| **License** | SSPL/Elastic/AGPLv3 | Apache 2.0 | GPL-3 | MIT (Community) | PostgreSQL |
| **First Release** | 2010 | 2021 (fork of ES 7.10) | 2015 | 2018 | Built-in |
| **Scale** | Petabytes, distributed | Petabytes, distributed | RAM-bound (up to ~24TB) | Single-node | Single-node |
| **HA/Clustering** | Shard-based distributed | Shard-based distributed | RAFT replication | Single-node only | Streaming replication |
| **Query Latency** | 10-100ms typical | 10-100ms typical | <50ms typical | <50ms typical | 5-10ms (small), degrades at scale |
| **Faceted Search** | Excellent (aggregations) | Excellent (aggregations) | Good (built-in) | Good (built-in) | Manual (requires custom queries) |
| **Geospatial** | Excellent (geo_point, geo_shape) | Excellent (same as ES) | Good (geo_radius, bounding box) | Good (geo_radius, bounding box) | Excellent via PostGIS |
| **Fuzzy/Typo Tolerance** | Configurable | Configurable | Built-in, automatic | Built-in, automatic | Not built-in |
| **BM25 Ranking** | Yes | Yes | Yes | Yes | ts_rank (approximate) |
| **Learning to Rank** | Plugin + native support | Plugin support | No | No | No |
| **Runtime Dependency** | JVM | JVM | None (single binary) | None (single binary) | None |
| **Managed Cloud** | Elastic Cloud, AWS | AWS OpenSearch Service | Typesense Cloud | Meilisearch Cloud | RDS, Neon, Supabase |
| **Best For** | Enterprise at scale | AWS-native workloads | Startup instant-search | Simple search UX | MVP / "good enough" start |

### Elasticsearch / OpenSearch

**Strengths:**
- Industry standard for enterprise search (Zillow, Redfin, Realtor.com all use variants)
- Sophisticated aggregation framework for faceted search with post_filter pattern
- Native Learning to Rank (LTR) support for ML-based relevance scoring
- Distributed architecture handles billions of documents
- Rich geospatial query types: geo_bounding_box, geo_distance, geo_polygon, geo_shape
- Mature ecosystem of tools, monitoring, and integrations

**Weaknesses:**
- Operational complexity: shard allocation, cluster state, JVM tuning, node roles
- Requires separate data sync pipeline (two sources of truth problem)
- JVM memory overhead and garbage collection tuning
- Data freshness lag -- ETL/CDC pipelines introduce latency (seconds to hours)
- Expensive at scale: dedicated cluster costs $500-5000+/month for production

**OpenSearch vs Elasticsearch (2025-2026):**
- OpenSearch is now under Linux Foundation governance (since Sept 2024)
- Elasticsearch benchmarks 40-140% faster in recent tests
- OpenSearch has stronger AWS integration (IAM, KMS, CloudWatch)
- OpenSearch added native vector search, FAISS integration, SIMD acceleration
- For most startup use cases, the differences are negligible

### Typesense

**Strengths:**
- Zero-config typo tolerance (automatic, built-in)
- Sub-50ms query latency consistently
- Dynamic sorting at query time without duplicate indices
- Single binary deployment, no JVM
- Resource-based pricing (no per-search charges)
- Geo search with radius and bounding box filtering
- Scoped API keys for multi-tenant security
- Reference implementation: 1.2M Airbnb listings with map + faceted search

**Weaknesses:**
- Data must fit in RAM (practical limit ~24TB, but cost increases fast)
- RAFT replication (whole dataset per node) vs ES sharding
- No Learning to Rank plugin
- Smaller ecosystem and community than Elasticsearch
- Less sophisticated aggregation framework

### Meilisearch

**Strengths:**
- Extremely developer-friendly (modern dashboard UI, simple REST API)
- Sub-50ms search-as-you-type
- Built-in typo tolerance, synonyms, stop words
- Faceted search handles thousands of facet values across millions of records
- Geosearch with radius and bounding box
- AI-powered hybrid search (vector + keyword)
- MIT licensed (Community edition)
- Simple single-binary deployment

**Weaknesses:**
- **Single-node only** -- no built-in high availability or clustering
- Single point of failure in production
- Less mature for enterprise use cases
- Limited aggregation capabilities vs Elasticsearch
- No Learning to Rank

### PostgreSQL Full-Text Search (+ PostGIS)

**Strengths:**
- Zero additional infrastructure -- already running Postgres
- Data consistency guaranteed (same ACID transaction)
- PostGIS is the gold standard for geospatial operations
- Simple keyword search works well under 100K documents
- With pg_search extension (ParadeDB): BM25, fuzzy search, up to hundreds of millions of docs

**Weaknesses:**
- Native FTS performance degrades dramatically at scale (benchmarks: 22s for count queries on 10M rows vs 770ms with pg_search)
- No built-in faceted search aggregations
- No native typo tolerance or fuzzy matching
- Limited relevance tuning capabilities
- Single-node architecture (same as Postgres itself)

**pg_search (ParadeDB Extension) -- Notable Alternative:**
- Embeds Tantivy (Rust-based Lucene alternative) in Postgres
- BM25 ranking, fuzzy search, phrase proximity, highlighting
- Performance: 34ms for filtered search with highlighting on 10M rows
- Eliminates the "two sources of truth" problem
- Maintains transactional consistency with database writes
- Best for: teams that want advanced search without operational overhead of a separate cluster

### Recommendation by Scale

| Scale | Recommended Engine | Why |
|-------|-------------------|-----|
| 0-100K listings | PostgreSQL FTS + PostGIS | Zero infrastructure overhead, good enough |
| 100K-1M listings | Typesense or Meilisearch | Fast, simple, handles facets and geo |
| 100K-5M listings | Typesense (with HA cluster) | Best balance of features and simplicity |
| 1M-10M listings | Elasticsearch or OpenSearch | Need distributed search, advanced aggregations |
| 10M+ listings | Elasticsearch / OpenSearch | Only option at true enterprise scale |
| Any scale, Postgres-native | pg_search (ParadeDB) | Advanced search without leaving Postgres |

---

## 2. Geospatial Search

### How Map-Based Search Works Technically

Real estate map search uses several geospatial query types:

**geo_bounding_box:** Finds documents with coordinates within a rectangular viewport. This is the primary query for "search as I move the map" -- the frontend sends the map's current viewport bounds (top-left and bottom-right coordinates) to the backend.

```json
{
  "query": {
    "geo_bounding_box": {
      "location": {
        "top_left": { "lat": 37.80, "lon": -122.50 },
        "bottom_right": { "lat": 37.70, "lon": -122.35 }
      }
    }
  }
}
```

**geo_distance:** Finds documents within a radius of a point. Used for "homes near me" or distance-based search.

**geo_polygon / geo_shape:** Finds documents within arbitrary polygons. Used for neighborhood boundaries, school districts, or user-drawn custom areas.

### PostGIS vs Elasticsearch Geospatial

| Capability | PostGIS | Elasticsearch Geo |
|-----------|---------|-------------------|
| **Query Types** | All spatial operations (ST_Within, ST_DWithin, ST_Intersects, ST_Contains) | geo_bounding_box, geo_distance, geo_polygon, geo_shape |
| **Index Type** | GiST / SP-GiST (R-tree) | Geohash grid (inverted index) |
| **Precision** | Full floating-point precision | Geohash precision (configurable, ~1cm at max) |
| **Complex Geometry** | Excellent (multi-polygons, lines, buffers, unions) | Good for points and simple shapes |
| **Scaling** | Single-node | Distributed across shards |
| **Best For** | Complex spatial analysis, boundary operations | Fast point-in-viewport queries at scale |

**Practical Recommendation:** Use PostGIS as the source of truth for geospatial data and complex spatial operations (neighborhood polygon containment, school district boundaries). Use Elasticsearch/Typesense for fast map viewport queries. Sync coordinates to the search index via CDC pipeline.

### Search as You Move the Map

The "search as I move the map" pattern requires careful engineering:

**Problem:** Map `bounds_changed` events fire continuously during pan/zoom, potentially flooding the backend with requests.

**Solution: Debounce + Idle Event Pattern**

1. **Listen to the `idle` event** (Google Maps) or `moveend` event (Mapbox/Leaflet) -- fires only after the user stops moving
2. **Apply debounce** of 300-500ms as a safety net
3. **Cancel in-flight requests** when new movement starts (AbortController)
4. **Show loading skeleton** during the debounce window
5. **Cache recent viewports** -- if the user pans back, serve from cache

```typescript
// Pseudocode for search-on-map-move
const debouncedSearch = debounce(async (bounds: LatLngBounds) => {
  const cacheKey = boundsToKey(bounds);
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  abortController?.abort();
  abortController = new AbortController();

  const results = await searchAPI.searchInBounds(bounds, {
    signal: abortController.signal,
    filters: currentFilters,
  });
  cache.set(cacheKey, results, { ttl: 60_000 });
  return results;
}, 300);

map.on('idle', () => debouncedSearch(map.getBounds()));
```

### Marker Clustering

At city-wide zoom levels, showing thousands of individual markers is both visually overwhelming and performance-killing. Clustering solves this.

**Client-Side Clustering (< 10K markers):**
- **Supercluster** (Mapbox): Extremely fast, clusters millions of points in milliseconds, works in browser and Node.js
- Uses grid-based algorithm with configurable cell size (default 60x60 pixels)
- `maxZoom` controls when clusters dissolve into individual markers
- Libraries: `@googlemaps/markerclusterer`, Leaflet.markercluster, Supercluster

**Server-Side Clustering (10K-100K+ markers):**
- Pre-compute clusters using **H3 hexagonal grid** (Uber's hierarchical geospatial indexing)
- 16 resolution levels from continent-scale to sub-meter
- Store pre-computed cluster counts per H3 cell per zoom level
- API returns cluster centroids + counts for the current viewport + zoom level

**Hybrid Approach (Most Common):**
- Server returns points within viewport (geo_bounding_box query)
- Client clusters the returned points using Supercluster
- At low zoom (city/state), server returns pre-aggregated cluster data
- At high zoom (street level), server returns individual listings

**Performance Targets:**
- Client-side clustering calculation: <100ms
- Maintain 60fps during pan/zoom animations
- Start with client-side clustering; add server-side when hitting 100K+ markers

---

## 3. Real-Time Filter Updates

### How Faceted Search Works

Faceted search is the core UX pattern for real estate: users see filter options with counts (e.g., "3 Beds (245)") that update as other filters change.

**The post_filter Pattern (Elasticsearch):**

The key insight: `post_filter` applies filters AFTER aggregations are calculated. This means aggregations show all available options while results are filtered.

```json
{
  "query": { "match_all": {} },
  "post_filter": {
    "bool": {
      "filter": [
        { "term": { "bedrooms": 3 } },
        { "range": { "price": { "gte": 300000, "lte": 500000 } } }
      ]
    }
  },
  "aggs": {
    "bedroom_counts": {
      "filter": {
        "range": { "price": { "gte": 300000, "lte": 500000 } }
      },
      "aggs": {
        "bedrooms": { "terms": { "field": "bedrooms" } }
      }
    },
    "price_ranges": {
      "filter": {
        "term": { "bedrooms": 3 }
      },
      "aggs": {
        "prices": {
          "range": {
            "field": "price",
            "ranges": [
              { "key": "Under 300K", "to": 300000 },
              { "key": "300K-500K", "from": 300000, "to": 500000 },
              { "key": "500K-750K", "from": 500000, "to": 750000 },
              { "key": "750K+", "from": 750000 }
            ]
          }
        }
      }
    }
  }
}
```

**How filter counts interact:** Each facet aggregation applies filters from ALL OTHER facets but excludes its own filter. This way:
- The bedroom facet shows counts filtered by the current price range (but not the bedroom selection)
- The price facet shows counts filtered by the current bedroom selection (but not the price range)
- Users can always see how many options exist for each filter value

### Making Filters Feel Instant

**Strategy 1: Optimistic UI Updates**
- Show stale counts immediately while the new query executes
- Update counts when the response arrives (typically 50-200ms)
- Users perceive the filter change as instant

**Strategy 2: Debouncing Filter Changes**
- For slider-type filters (price range, square footage): debounce 200-300ms
- For toggle filters (beds, baths, property type): fire immediately
- Cancel in-flight requests when a new filter change occurs

**Strategy 3: Caching Filter Combinations**
- Cache common filter combination results in Redis (TTL 5-15 minutes)
- Pre-warm cache for popular searches: "3 bed, 2 bath, $300K-$500K in [top 50 metros]"
- Cache key: hash of sorted filter parameters + location bounds
- For predictably popular queries, use cache warming during low-traffic periods

**Strategy 4: Pre-computed Aggregations**
- For expensive aggregations, use materialized views or background jobs
- Pre-compute filter counts per neighborhood/city for common filter combinations
- Schedule refreshes during low-traffic periods (e.g., every 5-15 minutes)
- Trade perfect freshness for consistent sub-100ms response times

**Strategy 5: Two-Phase Response**
- Phase 1 (fast): Return result count + first page of results (<100ms)
- Phase 2 (slightly slower): Return updated facet counts (<200ms)
- Frontend shows results immediately, then animates filter count updates

### Caching Architecture for Filters

```
User Request
    |
    v
CDN/Edge Cache (for anonymous, location-based queries)
    |
    v
API Gateway
    |
    v
Redis Cache (filter combinations, TTL 5-15 min)
    |  miss
    v
Search Engine (Elasticsearch/Typesense)
    |
    v
Response cached in Redis
```

---

## 4. Relevance and Ranking

### Beyond Simple Sort Orders

Users expect more than just "price low-to-high" or "newest first." Enterprise platforms use multi-signal ranking.

### Signal Categories for Real Estate Ranking

**1. Query Relevance (BM25 baseline)**
- Text match score against listing title, description, neighborhood name
- Field boosting: title matches score higher than description matches
- Phrase proximity: "hardwood floors" matches better than "hardwood... floors"

**2. Freshness Signals**
- New listing boost (1-3 days old) -- decays over time
- Price change boost (recently reduced prices surface higher)
- Status change boost (back on market, open house scheduled)
- Staleness penalty for listings >30 days without activity

**3. Engagement Signals**
- Click-through rate (CTR) from search results
- Save/favorite rate
- Time spent on listing page
- Contact agent rate
- Share rate
- Photo view-through rate

**4. Listing Quality Signals**
- Number and quality of photos (computer vision can score this)
- Description completeness and length
- Virtual tour available
- Floor plan available
- Professional photos vs phone photos

**5. Personalization Signals**
- User's price range history
- Preferred neighborhoods (from past searches)
- Property type affinity (house vs condo vs townhouse)
- Feature preferences inferred from behavior (pool, garage, yard)
- Commute-aware ranking (properties near user's workplace)

### Practical Ranking Architecture

**Phase 1 (Startup -- Rule-Based):**

```
final_score = (
  bm25_score * 0.3 +
  freshness_score * 0.25 +
  photo_quality_score * 0.15 +
  completeness_score * 0.15 +
  price_competitiveness * 0.15
)
```

Implement with Elasticsearch function_score query. No ML needed. Good enough for 80% of use cases.

**Phase 2 (Growth -- Simple ML):**

Add engagement signals. Use a basic logistic regression or gradient boosted tree to learn weights from implicit feedback (clicks, saves, contact requests).

Features:
- All Phase 1 signals as features
- Historical CTR for this listing
- Historical save rate
- Days on market
- Price relative to neighborhood median

Train offline, deploy as a re-scoring layer.

**Phase 3 (Enterprise -- Learning to Rank):**

Full Learning to Rank (LTR) pipeline:
- **LambdaMART** (via XGBoost) is the industry standard
- Elasticsearch has native LTR support via plugin
- Two-stage architecture: BM25 retrieval (top 1000) -> LTR re-ranking (top 50)
- Features: all Phase 1+2 signals plus personalization signals
- Training data: implicit feedback (click > no-click pairs) per query

Zillow uses this pattern: their tech blog describes extracting filter change events, modeling search behavior, and using ML to provide "Guided Search" personalized refinements.

**What's Practical vs Academic:**
- Rule-based scoring: practical for any startup (Phase 1)
- Simple ML re-ranking: practical once you have 100K+ searches/month of engagement data
- Full LTR with personalization: requires dedicated ML team, 1M+ monthly searches
- Neural ranking / transformer-based: academic for most real estate platforms, used at Zillow/Redfin scale

---

## 5. Recommendation Engines

### Recommendation Approaches for Real Estate

**Content-Based Filtering ("Similar Homes")**

How it works: Compute similarity between listings based on attributes.

Key features for similarity:
- Location (lat/lng distance, same neighborhood)
- Price (within 20% range)
- Bedrooms/bathrooms (exact or +/- 1)
- Square footage (within 15% range)
- Property type (house, condo, townhouse)
- Year built (same era)
- Style/features (pool, garage, yard, view)
- Photo similarity (via embedding vectors)

Implementation:
```python
# Simplified content-based similarity
similarity_score = (
  location_proximity_score * 0.30 +
  price_similarity * 0.20 +
  bed_bath_match * 0.20 +
  sqft_similarity * 0.15 +
  feature_overlap * 0.15
)
```

Compass's "Similar Homes" feature uses this approach: displaying relevant listings comparable to the one being viewed based on location, price, bed/bath count, square footage, and other features. Results: 153% increase in homepage CTR and 107% increase in engagement actions.

**Collaborative Filtering ("People Also Viewed")**

How it works: Find users with similar viewing patterns, recommend what they viewed that you haven't.

Zillow uses collaborative filtering for its "Your Home" feed: if a user viewing a condo in Seattle also looks at a townhome in Bellevue, the engine recommends that townhome to others who engage with the Seattle listing.

Implementation approaches:
- Item-item collaborative filtering (most practical): "listings frequently co-viewed"
- User-item matrix factorization (ALS, SVD)
- Session-based: use sequential viewing behavior without user accounts

Minimum viable signal: co-view matrix. Track pairs of listings viewed in the same session.

**Hybrid Approach (Industry Standard)**

Redfin uses a hybrid approach, merging collaborative filtering with content-based filtering matching user-specific criteria like price range and must-have features.

Architecture:
1. Content-based candidate generation (top 200 similar homes)
2. Collaborative filtering re-ranking (boost co-viewed items)
3. Personalization layer (adjust for user preferences)
4. Business rules (diversity, recency, geographic spread)

**"Homes for You" Personalized Feed**

This is the holy grail of real estate recommendation. Implementation:

1. Build user preference profile from:
   - Explicit: saved searches, favorited listings, set alerts
   - Implicit: viewed listings, time spent, filter patterns, map areas browsed
2. Score all active listings against user preference model
3. Apply diversity rules (don't show 10 similar condos in a row)
4. Refresh feed on each visit with new listings prioritized

### The Cold Start Problem

Real estate has an especially acute cold start problem because:
- Most visitors are not logged in
- Users typically search infrequently (major life events)
- Stop-by behavior is common (casual browsing)

**Solutions by Priority:**

1. **Location-based defaults:** Show popular/trending listings in the user's detected metro area
2. **Session-based recommendations:** After the user views 2-3 listings, start recommending similar ones immediately
3. **Rule-based fallbacks:** Show listings with high engagement (most viewed, most saved) in the area
4. **Onboarding quiz:** Quick "What are you looking for?" to bootstrap preferences
5. **Content-based from first interaction:** Use the first listing viewed as a "seed" for recommendations
6. **Transfer learning:** If user is moving from another city, use their previous city browsing patterns to infer preferences

### Recommendation Engine Scale

| Monthly Active Users | Approach | Infrastructure |
|---------------------|----------|----------------|
| < 10K | Content-based only | Application code, no ML |
| 10K-100K | Content-based + simple collaborative | Pre-computed similarity tables in Redis |
| 100K-1M | Hybrid with personalization | Feature store + ML model serving |
| 1M+ | Full ML pipeline | Dedicated recommendation service, A/B testing |

---

## 6. Scale and Performance

### How Platforms Handle Millions of Listings

**Zillow:** ~135M home records, hundreds of millions of monthly users. Uses distributed Elasticsearch clusters, Kafka for event streaming, and ML-powered ranking.

**Redfin:** Real-time MLS data feeds. Uses a combination of search infrastructure and its own brokerage data for freshness advantages.

**Realtor.com:** Powered by Move/News Corp. Processes MLS feeds from 580+ MLSs.

### Performance Targets

| Operation | Target Latency | Acceptable |
|-----------|---------------|------------|
| Search query (with filters + facets) | <100ms (p50) | <200ms (p95) |
| Map viewport search | <150ms (p50) | <300ms (p95) |
| Autocomplete/typeahead | <50ms (p50) | <100ms (p95) |
| Recommendation generation | <200ms (p50) | <500ms (p95) |
| Filter count updates | <100ms (p50) | <200ms (p95) |
| Listing detail page | <100ms (p50) | <200ms (p95) |

### Indexing and Update Latency

**Near-Real-Time (NRT) Indexing:**
- New listing appears in search: target <5 minutes (via CDC pipeline)
- Price change reflected: target <5 minutes
- Status change (sold, pending): target <2 minutes (prioritized)
- Photo upload: target <15 minutes (includes processing)

**Batch vs Streaming:**
- Batch (scheduled ETL): simpler but higher latency (minutes to hours)
- Streaming (CDC/Kafka): near-real-time but more complex infrastructure
- Most platforms use streaming for critical fields (price, status) and batch for less urgent data (description updates, photo reprocessing)

### Concurrent Filter Combinations

The combinatorial explosion of filters is a key scaling challenge:
- 5 price ranges x 5 bed counts x 3 bath counts x 8 property types x 50 neighborhoods = 30,000 unique filter combinations per metro
- Pre-computing all combinations is impractical
- Solution: compute on-the-fly with aggressive caching of popular combinations

**Caching Strategy:**
- Hot cache (Redis, <1min TTL): Top 100 most common filter combos per metro
- Warm cache (Redis, <15min TTL): Any filter combo that's been requested
- Cold (compute from search engine): First request for unusual filter combo
- Cache invalidation: Time-based (TTL) + event-based (new listing triggers invalidation for affected caches)

### CDN and Edge Caching

- CDN cache search results for anonymous users with common queries (TTL 5-15 minutes)
- Edge compute (Cloudflare Workers / Vercel Edge) for personalization layer
- Static assets (listing photos, map tiles) always CDN-cached
- API responses: cache by query hash, bust on listing updates

---

## 7. Architecture Patterns

### CQRS for Search (Separate Read/Write Models)

The dominant pattern for real estate search infrastructure:

```
                   WRITE SIDE                    READ SIDE
                   ─────────                     ─────────
User submits   → API Server → PostgreSQL    →   Search Index (ES/Typesense)
listing            (CRUD)      (source of        (optimized for queries)
                               truth)
                                  │
                                  ▼
                              CDC Pipeline
                              (Debezium + Kafka)
                                  │
                                  ▼
                              Index Updater
                              (transforms + writes to search)
```

**Write side:** PostgreSQL stores the canonical listing data with full relational integrity. All creates, updates, deletes go here.

**Read side:** Search engine stores denormalized, query-optimized documents. Includes pre-computed fields (neighborhood name, school district, walk score, price per sqft).

**Why CQRS:** Read patterns (complex multi-filter search with facets, geospatial, ranking) are fundamentally different from write patterns (validated CRUD operations). Trying to serve both from one system means compromising on both.

### Event-Driven Indexing (CDC Pipeline)

The standard pipeline for keeping search indexes synchronized:

```
PostgreSQL → Debezium (CDC) → Kafka → Transform Service → Elasticsearch
```

**Debezium** reads PostgreSQL's Write-Ahead Log (WAL) via logical replication, capturing every INSERT, UPDATE, DELETE as a structured event.

**Kafka** provides:
- Durability (events survive consumer crashes)
- Replay capability (rebuild index from scratch)
- Backpressure handling (search indexer can't keep up)
- Multiple consumers (search index + analytics + cache invalidation)

**Transform Service** (Kafka consumer / Flink job):
- Denormalizes data (joins listing + agent + neighborhood data)
- Computes derived fields (price per sqft, days on market)
- Formats for search engine schema
- Handles partial updates efficiently

**Alternative: Simplified CDC Without Kafka**

For startups not ready for Kafka complexity:
- PostgreSQL LISTEN/NOTIFY for change events
- Application-level dual-write (write to DB + push to search)
- Periodic full re-index (every 15-60 minutes) as a safety net
- Use a background job queue (Celery, Sidekiq, BullMQ) for async index updates

### Multi-Index Strategy

Enterprise platforms use multiple search indices:

| Index | Purpose | Update Frequency |
|-------|---------|-----------------|
| `listings` | Property search (main index) | Near-real-time (CDC) |
| `neighborhoods` | Area search, boundary data | Daily batch |
| `agents` | Agent/team search | Daily batch |
| `schools` | School district search | Monthly batch |
| `autocomplete` | Search-as-you-type suggestions | Near-real-time |
| `stories` | Editorial/blog content search | On publish |

Each index has its own mapping optimized for its query patterns.

### Search-Behind-API Pattern

Never expose the search engine directly to clients:

```
Client → API Gateway → Search Service → Elasticsearch
                            │
                            ├── Query validation
                            ├── Rate limiting
                            ├── Authentication/authorization
                            ├── Query rewriting (add personalization)
                            ├── Result post-processing
                            ├── Caching layer
                            └── Fallback handling
```

Benefits:
- Swap search engines without client changes
- Add personalization layer
- Enforce business rules (hidden listings, premium placement)
- Protect against query injection
- Monitor and optimize queries centrally

---

## 8. Cost and Complexity Tradeoffs

### Elasticsearch / OpenSearch Cluster Costs

**Self-Hosted (AWS EC2 / bare metal):**

| Cluster Size | Nodes | Specs | Monthly Cost |
|-------------|-------|-------|-------------|
| Development | 1 node | 2 vCPU, 8GB RAM | ~$60-100 |
| Small prod | 3 nodes | 4 vCPU, 16GB RAM each | ~$400-600 |
| Medium prod | 5-7 nodes | 8 vCPU, 32GB RAM each | ~$1,200-2,500 |
| Large prod | 10-20+ nodes | 16 vCPU, 64GB RAM each | ~$5,000-15,000 |

Add 30-50% for ops overhead (monitoring, backups, on-call, tuning).

**Managed Services:**

| Service | Starting Price | Production Price | Notes |
|---------|---------------|-----------------|-------|
| Elastic Cloud | ~$95/mo (Standard) | $500-5,000+/mo | 30% price increase announced Jan 2025 |
| AWS OpenSearch | Free tier available | $300-3,000+/mo | t3.small free for 12 months |
| AWS OpenSearch Serverless | Pay per OCU | Variable | Good for bursty workloads |
| Typesense Cloud | ~$7/mo (dev) | $50-500/mo | No per-search charges |
| Meilisearch Cloud | $30/mo (Build) | $300/mo (Pro) | 250K searches, 1M docs |

**Key Insight:** Managed services charge 30-50% premium over raw compute costs, but save significant engineering time on operations, patching, and scaling.

### PostgreSQL as "Good Enough" Starting Point

**When PostgreSQL FTS + PostGIS is sufficient:**
- Dataset under 1M listings
- Simple keyword search (not full search-as-you-type)
- Geospatial queries are your primary need (PostGIS excels here)
- You can tolerate slightly slower search (50-200ms vs <50ms)
- You want to move fast and avoid operational complexity

**What you get for free:**
- Full-text search via `tsvector`/`tsquery`
- Geospatial via PostGIS (better than Elasticsearch for complex geometry)
- Faceted counts via `GROUP BY` with `COUNT(*)` (slower but works)
- No data sync pipeline needed
- No additional infrastructure to manage

**What you give up:**
- Search-as-you-type with typo tolerance
- Fast faceted aggregations
- BM25-quality relevance scoring
- Learning to Rank
- Sub-50ms query latency at scale

**Upgrade Path:** Start with PostgreSQL, add pg_search (ParadeDB) when you need better FTS, add Typesense/Meilisearch when you need instant search UX, add Elasticsearch when you need enterprise-scale distributed search.

### When to Introduce Dedicated Search Infrastructure

| Signal | Action |
|--------|--------|
| Search queries taking >200ms (p95) | Add caching, optimize queries |
| Users complaining about search relevance | Consider adding Typesense/Meilisearch |
| Need search-as-you-type / typo tolerance | Add Typesense or Meilisearch |
| Need real-time faceted counts | Add Elasticsearch or Typesense |
| Dataset >5M documents | Need Elasticsearch/OpenSearch |
| Need ML-based ranking | Need Elasticsearch with LTR plugin |
| Multiple query types (listings + agents + neighborhoods) | Multi-index strategy with dedicated search |

### Complexity Comparison

| Approach | Setup Time | Ongoing Ops | Team Expertise Needed |
|----------|-----------|-------------|----------------------|
| PostgreSQL FTS + PostGIS | 1-2 days | Minimal | SQL knowledge |
| pg_search (ParadeDB) | 1-2 days | Minimal | SQL + extension config |
| Typesense | 1-3 days | Low | REST API familiarity |
| Meilisearch | 1-2 days | Low | REST API familiarity |
| Elasticsearch (self-hosted) | 1-2 weeks | High | JVM tuning, cluster ops |
| Elasticsearch (managed) | 2-3 days | Medium | Query DSL, index design |
| Full CQRS + CDC + ES | 2-4 weeks | High | Kafka, Debezium, distributed systems |

---

## 9. Startup vs Enterprise: What to Build When

### Phase 0: MVP (0-1K listings, 0-1K users)

**Stack:** PostgreSQL + PostGIS only

- Full-text search via `to_tsvector`/`to_tsquery`
- Geospatial queries via PostGIS (`ST_DWithin`, `ST_Contains`)
- Simple `ORDER BY` for sorting
- No recommendation engine (show popular/newest)
- No caching layer

**Cost:** $0 additional (just your existing database)
**Time to implement:** 1-2 weeks

### Phase 1: Early Product (1K-50K listings, 1K-50K users)

**Stack:** PostgreSQL + PostGIS + Typesense + Redis

- Typesense for instant search with typo tolerance and facets
- PostGIS for complex geospatial queries
- Redis for caching popular search results
- Simple content-based "Similar Homes" (application code)
- Sync PostgreSQL -> Typesense via application-level events

**Cost:** ~$50-200/mo for Typesense Cloud + Redis
**Time to implement:** 2-4 weeks

### Phase 2: Growth (50K-500K listings, 50K-500K users)

**Stack:** PostgreSQL + PostGIS + Typesense (HA cluster) + Redis + Background Jobs

- Typesense HA cluster (3 nodes) for search
- CDC-lite: background job syncs DB changes to Typesense
- Content-based + simple collaborative filtering recommendations
- Pre-computed filter aggregations for top metros
- Map marker clustering (client-side with Supercluster)
- Session-based recommendations for cold-start users
- Basic engagement tracking (clicks, saves)

**Cost:** ~$200-800/mo for search + caching
**Time to implement:** 1-2 months

### Phase 3: Scale (500K+ listings, 500K+ users)

**Stack:** PostgreSQL + PostGIS + Elasticsearch + Kafka + Redis + ML Pipeline

- Elasticsearch cluster for distributed search
- Kafka + Debezium CDC pipeline for near-real-time indexing
- Multi-index strategy (listings, neighborhoods, agents, autocomplete)
- Learning to Rank (LambdaMART via XGBoost)
- Hybrid recommendation engine (content + collaborative + personalization)
- Server-side marker clustering with H3
- A/B testing infrastructure for search relevance experiments
- Dedicated search/relevance engineering team

**Cost:** $2,000-10,000+/mo for infrastructure
**Time to implement:** 3-6 months

### What Zillow Runs at Scale (For Reference)

- Elasticsearch clusters processing hundreds of millions of queries/month
- Kafka for event streaming across microservices
- ML-powered "Guided Search" with personalized refinements
- Computer vision for property photo analysis and auto-tagging
- Neural search with natural language understanding
- A/B testing every ranking change
- 320+ person engineering + AI team (across Compass as comparison)
- Estimated search infrastructure cost: millions/year

---

## 10. Recommendations for HumanHomes

### Recommended Starting Architecture

Given that HumanHomes is a new platform, the recommended approach is a progressive architecture that starts simple and scales up:

**Immediate (MVP):**
- **PostgreSQL + PostGIS** as the single source of truth
- **Typesense** for search (instant search, facets, geo, typo tolerance)
- Application-level sync: after any listing write to PostgreSQL, immediately push to Typesense
- **Supercluster** for client-side map marker clustering
- **Redis** for caching search results and filter aggregations

**Why Typesense over alternatives for HumanHomes:**
1. Sub-50ms search out of the box -- no tuning needed
2. Built-in typo tolerance and instant search
3. Geospatial search with radius and bounding box
4. Faceted search with counts
5. Single binary, zero JVM, minimal ops
6. Handles 1M+ listings on a single HA cluster
7. $50-200/mo to start vs $500+/mo for Elasticsearch
8. Dynamic sorting at query time (one index, multiple sort orders)
9. Reference implementation already exists for 1.2M property listings (Airbnb)

**When to upgrade:**
- Move to Elasticsearch when you need Learning to Rank (ML-based relevance)
- Move to Elasticsearch when dataset exceeds ~5M listings
- Add Kafka CDC when you need guaranteed near-real-time sync
- Add recommendation ML when you have 100K+ monthly users generating engagement data

### Index Schema Sketch (Typesense)

```json
{
  "name": "listings",
  "fields": [
    {"name": "id", "type": "string"},
    {"name": "title", "type": "string"},
    {"name": "description", "type": "string"},
    {"name": "story", "type": "string", "optional": true},
    {"name": "price", "type": "int64", "facet": true},
    {"name": "bedrooms", "type": "int32", "facet": true},
    {"name": "bathrooms", "type": "float", "facet": true},
    {"name": "sqft", "type": "int32", "facet": true},
    {"name": "property_type", "type": "string", "facet": true},
    {"name": "status", "type": "string", "facet": true},
    {"name": "neighborhood", "type": "string", "facet": true},
    {"name": "city", "type": "string", "facet": true},
    {"name": "state", "type": "string", "facet": true},
    {"name": "zip", "type": "string", "facet": true},
    {"name": "location", "type": "geopoint"},
    {"name": "year_built", "type": "int32", "facet": true},
    {"name": "features", "type": "string[]", "facet": true},
    {"name": "photos_count", "type": "int32"},
    {"name": "has_virtual_tour", "type": "bool", "facet": true},
    {"name": "listed_at", "type": "int64"},
    {"name": "updated_at", "type": "int64"},
    {"name": "price_per_sqft", "type": "float"},
    {"name": "days_on_market", "type": "int32"},
    {"name": "popularity_score", "type": "float"}
  ],
  "default_sorting_field": "popularity_score"
}
```

### Key Architecture Decisions Summary

| Decision | HumanHomes Recommendation | Rationale |
|----------|--------------------------|-----------|
| Search engine | Typesense (start), Elasticsearch (scale) | Best balance of features, simplicity, and cost |
| Geospatial | PostGIS (complex) + Typesense (viewport) | PostGIS for boundaries, Typesense for fast map search |
| Data sync | Application-level events (start), CDC (scale) | Avoid Kafka complexity until needed |
| Ranking | Rule-based scoring (start), ML re-ranking (scale) | Build engagement data first, then train models |
| Recommendations | Content-based similarity (start), hybrid (scale) | Content-based needs no training data |
| Caching | Redis for hot queries, CDN for static | Standard proven pattern |
| Map clustering | Client-side Supercluster (start), H3 server-side (scale) | Client-side sufficient for <100K markers |
| Infrastructure | Managed services (Typesense Cloud, managed Postgres) | Minimize ops burden |

---

## Sources

### Search Engine Comparisons
- [Typesense vs Algolia vs Elasticsearch vs Meilisearch](https://typesense.org/typesense-vs-algolia-vs-elasticsearch-vs-meilisearch/)
- [Elasticsearch Alternatives (Meilisearch Blog)](https://www.meilisearch.com/blog/elasticsearch-alternatives)
- [Comparison with Alternatives (Typesense Docs)](https://typesense.org/docs/overview/comparison-with-alternatives.html)
- [OpenSearch vs Elasticsearch 2025 (Pureinsights)](https://pureinsights.com/blog/2025/elasticsearch-vs-opensearch-in-2025-what-the-fork/)
- [OpenSearch vs Elasticsearch (Netdata)](https://www.netdata.cloud/academy/elasticsearch-vs-opensearch/)

### PostgreSQL FTS
- [Postgres Full-Text Search vs Elasticsearch (Neon)](https://neon.com/blog/postgres-full-text-search-vs-elasticsearch)
- [Full Text Search: Elasticsearch vs Postgres Alternatives (ParadeDB)](https://www.paradedb.com/blog/elasticsearch-vs-postgres)
- [PostgreSQL FTS Alternative to Elasticsearch (Medium)](https://iniakunhuda.medium.com/postgresql-full-text-search-a-powerful-alternative-to-elasticsearch-for-small-to-medium-d9524e001fe0)
- [Why We Replaced Elasticsearch with Postgres Full-Text Search](https://blog.blockost.com/why-we-replaced-elasticsearch-with-postgres-full-text-search)

### Geospatial
- [Elasticsearch Geo Point and Geo Shape Queries (Medium)](https://medium.com/geekculture/elastic-search-geo-point-and-geo-shape-queries-explained-df69ec157527)
- [Elasticsearch Geo Bounding Box Guide (Opster)](https://opster.com/guides/elasticsearch/search-apis/elasticsearch-geo-bounding-box/)
- [Typesense Geosearch Documentation](https://typesense.org/docs/26.0/api/geosearch.html)
- [Supercluster - Fast Geospatial Point Clustering (GitHub)](https://github.com/mapbox/supercluster)
- [Clustering Millions of Points (Mapbox Blog)](https://blog.mapbox.com/clustering-millions-of-points-on-a-map-with-supercluster-272046ec5c97)

### Faceted Search
- [Implementing Faceted Search with Elasticsearch (OneUptime)](https://oneuptime.com/blog/post/2026-01-21-elasticsearch-faceted-search/view)
- [Faceted Search (Meilisearch Docs)](https://www.meilisearch.com/docs/learn/fine_tuning_results/faceted_search)
- [Zillow Personalized Search Refinements (Zillow Tech Hub)](https://www.zillow.com/tech/personalized-search-refinements/)

### Ranking & ML
- [Elasticsearch Learning to Rank (Elastic Labs)](https://www.elastic.co/search-labs/blog/elasticsearch-learning-to-rank-introduction)
- [LambdaMART Explained (Shaped.ai)](https://www.shaped.ai/blog/lambdamart-explained-the-workhorse-of-learning-to-rank)
- [XGBoost Learning to Rank Documentation](https://xgboost.readthedocs.io/en/latest/tutorials/learning_to_rank.html)
- [AI Revolutionizing Property Search (Numalis)](https://numalis.com/ai-revolutionizing-property-search-and-recommendation/)

### Recommendations
- [Compass Similar Homes and Recommendations (Medium)](https://medium.com/compass-true-north/similar-homes-and-homepage-recommendations-new-frontiers-of-ai-in-real-estate-1102330561eb)
- [Compass Personalized Likely-to-Sell (Medium)](https://medium.com/compass-true-north/personalized-likely-to-sell-elevating-real-estate-recommendations-with-likely-to-win-41e85d37a751)
- [Real Estate Cold Start Problem (IEEE)](https://ieeexplore.ieee.org/document/9422813/)
- [Real-Time Personalized Recommendations (Co-libry)](https://co-libry.com/blogs/recommendation-engine-real-estate-job-car/)

### Architecture
- [CQRS Pattern (Microsoft Azure)](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs)
- [CQRS Facts and Myths (Event-Driven.io)](https://event-driven.io/en/cqrs_facts_and_myths_explained/)
- [Building a Scalable Search Architecture (Confluent)](https://www.confluent.io/blog/building-a-scalable-search-architecture/)
- [CDC: PostgreSQL to Elasticsearch with Debezium (Medium)](https://medium.com/@techphile/using-postgres-and-debezium-connector-for-cdc-9fea124f124a)
- [Debezium Architecture (Debezium Docs)](https://debezium.io/documentation/reference/stable/architecture.html)

### Pricing & Operations
- [AWS OpenSearch Pricing](https://aws.amazon.com/opensearch-service/pricing/)
- [Elastic Cloud Pricing](https://www.elastic.co/pricing)
- [Elasticsearch Hosting: Managed vs Self-Hosted (Medium)](https://medium.com/@anmolshelar/elasticsearch-hosting-managed-service-vs-self-hosted-7b1ba8eaf790)
- [Smart Caching Strategies with Redis (Medium)](https://medium.com/@anshulkahar2211/smart-caching-strategies-for-api-pagination-and-filtering-with-redis-5cf6b0a63b0f)
