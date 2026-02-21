# Data Pipeline + Infrastructure Research

**Researcher:** infra-researcher
**Date:** 2026-02-20
**Status:** Complete

---

## 1. Public Records Data Pipeline (Replacing MLS Comps)

**How Zillow/Redfin do it:** Aggregate from MLS feeds via IDX, county/tax assessor records, user-submitted data, and deed recordings. HumanHomes uses public records only (no MLS).

**Recommendation: ATTOM Data API (Primary) + RealEstateAPI.com (Supplementary)**

| Provider | Coverage | Pricing | Strengths |
|----------|----------|---------|-----------|
| ATTOM Data | 158M properties, 99% US, 70B rows | ~$500/mo, 30-day trial | Comps, deed history, tax, AVMs. Daily updates. |
| RealEstateAPI.com | Nationwide US | Developer-friendly | Comps, parcels, autocomplete. Built for proptech. |
| BatchData | 150M+ (99% US) | $500/mo for 20K records | Direct county assessor feeds. |
| CoreLogic | 200+ data sources | Enterprise custom | Most trusted. Overkill for MVP. |

**Architecture note:** Build an abstraction layer over the data provider for swappability. Cache aggressively — property records don't change frequently.

---

## 2. Identity Verification

**Recommendation: Persona (Primary), Stripe Identity (Fallback)**

| Provider | Pricing | Strengths |
|----------|---------|-----------|
| Persona | 500 free/mo for 1 year (Startup Program) | Best UX, customizable flows, workflow builder |
| Stripe Identity | $1.50/verification | Simple if using Stripe, transparent pricing |
| Jumio | $50K-$200K+/year | Too expensive for startup |
| Onfido/Entrust | ~$60K/year median | Acquired, uncertain direction |

**Multi-layer mapping:**
- Layer 1 (Identity): Gov ID + selfie match via Persona
- Layer 2 (Neighborly Vouching): Custom-built (social graph feature)
- Layer 3 (Intent Pledge): Custom-built with Persona verified identity attached

---

## 3. Document Management & E-Signatures

**Recommendation: Dropbox Sign (formerly HelloSign) API**

| Provider | API Pricing | Strengths |
|----------|-------------|-----------|
| Dropbox Sign | $75/mo for 50 requests | API-first, embedded signing, best DX |
| DocuSign | $300+/mo | Industry standard, overkill for MVP |
| PandaDoc | Enterprise only | Good builder, not developer-friendly |

**State-specific templates:**
- Build using Dropbox Sign template API
- Store state requirements in config/database
- ESIGN Act (federal) + UETA (state) provide legal framework
- Start with 5-10 major states, expand
- Remote online notarization (RON) for deed transfers later

---

## 4. Mapping & Geocoding

**Recommendation: Mapbox (Primary) with MapLibre rendering fallback**

| Provider | Free Tier | Strengths |
|----------|-----------|-----------|
| Mapbox | 50K map loads/mo, 100K geocoding/mo | Beautiful styles, React/RN SDKs, autocomplete |
| Google Maps | $200/mo credit | Best data quality, most expensive |
| MapLibre | Completely free | No vendor lock-in, requires own tiles |

**Hybrid approach at scale:**
- Mapbox for geocoding/address autocomplete
- MapLibre for map rendering with Mapbox-compatible tiles (reduces per-load costs)

**Note:** Real estate software needs Mapbox commercial licensing.

---

## 5. Infrastructure & Hosting

**Recommendation: Railway (MVP) → AWS (scale)**

| Platform | Cost | Strengths | Weaknesses |
|----------|------|-----------|------------|
| Railway | $8-15/mo typical | Best DX, all-in-one, per-minute billing | Less control than AWS |
| Vercel | $20/user/mo + overages | Best Next.js DX | Bandwidth overages balloon, per-seat pricing |
| Fly.io | ~$1.94/mo per instance | Global edge | Managed Postgres expensive |
| AWS | Pay-per-use | Unlimited flexibility | Billing complexity, DevOps overhead |

**Phased approach:**
- **Phase 1 (MVP):** Railway — Next.js + API + PostgreSQL + Redis. ~$20-50/mo.
- **Phase 2 (Growth, 10K+ users):** Railway + managed services (Neon/Supabase DB, Cloudflare CDN).
- **Phase 3 (Scale, 100K+ users):** AWS with ECS/Fargate, RDS, ElastiCache. Terraform/Pulumi IaC.

**Why NOT Vercel:** Bandwidth overages unpredictable, no DB hosting, per-seat pricing hurts.

---

## Cost Summary

| Area | Primary Choice | MVP Monthly Cost |
|------|---------------|-----------------|
| Public Records | ATTOM Data API | ~$500/mo |
| Identity Verification | Persona | Free (startup program) |
| E-Signatures | Dropbox Sign API | ~$75/mo |
| Mapping/Geocoding | Mapbox | Free tier covers MVP |
| Hosting | Railway | ~$20-50/mo |
| CDN/Assets | Cloudflare | Free tier |
| **Total** | | **~$600-650/month** |

---

## Key Risks

1. **ATTOM data quality varies by county** — supplement with community-sourced pricing
2. **Identity verification costs scale linearly** — only verify at critical trust gates
3. **State-specific legal templates are 50-state surface area** — launch in 5-10 states
4. **Railway scaling ceiling** — containerize from day 1 for easy AWS migration
5. **Mapbox commercial license required** — budget for this or use MapLibre with open tiles
