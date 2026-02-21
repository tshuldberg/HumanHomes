# HumanHomes — UX Design: Flows, Wireframes & Interaction Patterns

**Date:** 2026-02-20
**Status:** Draft
**Author:** Product Designer (Agent)
**Companion to:** `2026-02-20-humanhomes-design.md`, `2026-02-20-humanhomes-features-and-flows.md`

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Entry Point UX — The Discovery-First Approach](#1-entry-point-ux)
3. [Community Affinity Filters — Private Preference Engine](#2-community-affinity-filters)
4. [Group / Collective Purchase Flow](#3-group-collective-purchase-flow)
5. [Broker-Comes-to-You Marketplace](#4-broker-comes-to-you-marketplace)
6. [Baby Boomer Seller Onboarding](#5-baby-boomer-seller-onboarding)
7. [Home Story Creation Flow](#6-home-story-creation-flow)
8. [Verification UX — Neighborly Vouching](#7-verification-ux)
9. [Buyer-Seller First Contact](#8-buyer-seller-first-contact)
10. [Global Navigation & Information Architecture](#global-navigation)
11. [Visual Design Direction](#visual-design-direction)

---

## Design Philosophy

HumanHomes is not a search engine for houses. It is a community platform where homes find people and people find homes. Every design decision follows from three principles:

1. **Stories before statistics.** A user should encounter a home's story before they see its price or square footage.
2. **Never subtract — always refine.** Users should never watch a list of homes shrink. They should watch their match quality improve.
3. **Warmth over efficiency.** Every interaction should feel like a conversation with a neighbor, not a transaction with a database.

---

## 1. Entry Point UX — The Discovery-First Approach {#1-entry-point-ux}

### The Problem

Traditional real estate apps show you everything, then let you filter it down. The founder identified the core issue: watching results shrink after entering personal preferences feels like rejection. "Why did it shrink? Because I'm not that." This is psychologically hostile, especially for a platform built on belonging.

### The Solution: Discovery-First Onboarding

Instead of Search > Filter > Shrink, the flow is: **Discover > Connect > Reveal**

The user never sees a full unfiltered inventory that then shrinks. Instead, they enter through stories and communities, and homes organically appear as the platform learns what resonates.

### Wireframe: Landing Page

```
+------------------------------------------------------------------+
|  [Logo: HumanHomes]                        [Sign In]  [Join]     |
+------------------------------------------------------------------+
|                                                                    |
|          Every home has a story. What's yours?                     |
|                                                                    |
|  +--------------------+  +--------------------+  +--------------+ |
|  |  [Photo: porch]    |  |  [Photo: garden]   |  | [Photo: kid  | |
|  |                    |  |                    |  |  on swing]   | |
|  |  "We planted that  |  |  "The crows bring  |  | "She took    | |
|  |   lemon tree the   |  |   us gifts every   |  |  her first   | |
|  |   day we moved in" |  |   morning on this  |  |  steps right | |
|  |                    |  |   porch"           |  |  here"       | |
|  |  -- Maria, Oakland |  |  -- David, Portland|  | -- Anh, SF   | |
|  +--------------------+  +--------------------+  +--------------+ |
|                                                                    |
|        Explore Neighborhoods    |    Tell Your Home's Story        |
|        [Button: Discover]       |    [Button: I'm Selling]         |
|                                                                    |
+------------------------------------------------------------------+
|                                                                    |
|  HOW IT WORKS                                                      |
|                                                                    |
|  1. Discover communities        You're not searching a database.   |
|     and neighborhoods           You're finding your people.        |
|                                                                    |
|  2. Connect with real people    Message sellers directly. Hear     |
|                                 their story. Share yours.          |
|                                                                    |
|  3. Buy from humans, not        No agents. No middlemen. Just     |
|     corporations                neighbors helping neighbors.       |
|                                                                    |
+------------------------------------------------------------------+
```

**Key interaction:** The landing page has NO search bar and NO property count. The entry point is stories, not listings. This eliminates the "shrinking inventory" problem entirely because the user never sees a total count to begin with.

### Wireframe: Discover Flow (Pre-Login)

```
+------------------------------------------------------------------+
|  DISCOVER                                          [Skip to Map]  |
+------------------------------------------------------------------+
|                                                                    |
|  What draws you to a neighborhood?                                 |
|  (Pick as many as you like)                                        |
|                                                                    |
|  +----------------+  +----------------+  +------------------+     |
|  | Walkable       |  | Yard space     |  | Quiet streets    |     |
|  | streets        |  | & gardens      |  |                  |     |
|  +----------------+  +----------------+  +------------------+     |
|  +----------------+  +----------------+  +------------------+     |
|  | Community      |  | Close to       |  | Family-          |     |
|  | gardens        |  | nature         |  | friendly         |     |
|  +----------------+  +----------------+  +------------------+     |
|  +----------------+  +----------------+  +------------------+     |
|  | Arts &         |  | Local shops    |  | Diverse          |     |
|  | culture        |  | & cafes        |  | community        |     |
|  +----------------+  +----------------+  +------------------+     |
|                                                                    |
|                            [Next]                                  |
+------------------------------------------------------------------+
```

**Key interaction:** These are positive, additive selections. Picking "Yard space & gardens" does not eliminate anything — it tells the platform what to surface first. The mental model is "I'm telling you what I like" not "I'm filtering out what I don't."

### Wireframe: Neighborhood Discovery (Post-Selection)

```
+------------------------------------------------------------------+
|  Communities that match your vibe                 [Adjust Prefs]   |
+------------------------------------------------------------------+
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  [Map showing highlighted neighborhoods with warm pins]       | |
|  |                                                                | |
|  |  Neighborhoods glow based on match strength — no counts,      | |
|  |  no "X homes found" numbers. Just warmth indicators.          | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  +-----------------------------+  +-----------------------------+ |
|  |  TEMESCAL, OAKLAND          |  |  SELLWOOD, PORTLAND          | |
|  |  [Neighborhood photo]       |  |  [Neighborhood photo]        | |
|  |                             |  |                              | |
|  |  "We wave at each other     |  |  "Every block has a little   | |
|  |   on morning walks. The     |  |   free library. The farmers  | |
|  |   farmers market on         |  |   market is walking          | |
|  |   Sundays is where we all   |  |   distance."                 | |
|  |   catch up."                |  |                              | |
|  |                             |  |  -- 12 resident stories      | |
|  |  -- 8 resident stories      |  |  Yard-friendly | Walkable    | |
|  |  Walkable | Community       |  |                              | |
|  |                             |  |  [Explore This Neighborhood] | |
|  |  [Explore This Neighborhood]|  |                              | |
|  +-----------------------------+  +-----------------------------+ |
|                                                                    |
+------------------------------------------------------------------+
```

**Critical detail:** There are NO result counts like "47 homes" or "Results: 12." Neighborhoods are presented as stories and communities, not inventories. The user discovers a neighborhood they connect with FIRST, then sees homes within it.

### Wireframe: Homes Within a Neighborhood

```
+------------------------------------------------------------------+
|  TEMESCAL, OAKLAND              [Map] [List] [Stories]  [Back]    |
+------------------------------------------------------------------+
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  NEIGHBORHOOD STORY                                           | |
|  |  "Temescal was named after the Ohlone sweat lodge that        | |
|  |   once stood here. Today it's a tight-knit community          | |
|  |   of families, artists, and longtime residents who know        | |
|  |   each other by name..."                                      | |
|  |                                                                | |
|  |  Resident Perspectives: Maria V. | David K. | Anh T.          | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  Homes with stories in Temescal                                    |
|                                                                    |
|  +-----------------------------+  +-----------------------------+ |
|  |  [Hero photo of home]       |  |  [Hero photo of home]        | |
|  |                             |  |                              | |
|  |  "We raised three kids      |  |  "The backyard fig tree      | |
|  |   here. The backyard was    |  |   produces enough for the    | |
|  |   their whole world."       |  |   whole block."              | |
|  |                             |  |                              | |
|  |  3 bed | 2 bath | 1,400sf  |  |  2 bed | 1 bath | 1,100sf   | |
|  |  Listed by: The Garcias     |  |  Listed by: James            | |
|  |  Verified Neighbors [v v v] |  |  Verified [v v]              | |
|  |                             |  |                              | |
|  |  [Read Their Story]         |  |  [Read Their Story]          | |
|  +-----------------------------+  +-----------------------------+ |
|                                                                    |
+------------------------------------------------------------------+
```

**Key decisions:**
- The home story excerpt appears ABOVE the stats (beds/baths/sqft).
- Price is NOT shown on the card. Price appears on the detail page. This prevents the listing view from becoming a price-sorting exercise.
- The CTA is "Read Their Story" not "View Listing" — language matters.
- Seller name and verification level are visible, making it personal from first glance.

### Flow Summary: Entry to First Home View

```
Landing Page (stories, no search bar)
    |
    v
"Discover" button
    |
    v
Preference selection (additive, positive framing)
    |
    v
Neighborhood discovery (stories, no counts)
    |
    v
Enter a neighborhood (community context first)
    |
    v
Browse homes within neighborhood (stories above stats)
    |
    v
Read a Home Story (full detail page)
```

At no point does the user see a number go down. At no point does adding a preference make anything disappear. The platform gets smarter about what to show first, but it never takes anything away.

---

## 2. Community Affinity Filters — Private Preference Engine {#2-community-affinity-filters}

### The Problem

Users want to find communities that share their values — faith communities selling to faith communities, eco-conscious clusters, LGBTQ-friendly neighborhoods, multigenerational families. These preferences are deeply personal and must never feel discriminatory, gatekeeping, or exclusionary.

### The Solution: Private Resonance Tuning

Filters are reframed as "resonance" — what resonates with you, not what excludes others. The system operates entirely in the background, adjusting the order of what you see, never hiding anything permanently.

### Wireframe: Resonance Settings (in Profile)

```
+------------------------------------------------------------------+
|  YOUR RESONANCE                                         [Save]    |
+------------------------------------------------------------------+
|                                                                    |
|  These preferences are completely private. They help us show       |
|  you communities and homes that resonate with your values.         |
|  No one — not sellers, not buyers, not neighbors — can see         |
|  these settings.                                                   |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  COMMUNITY VALUES                                             | |
|  |                                                                | |
|  |  What matters to you in a community?                          | |
|  |                                                                | |
|  |  [ ] Faith-centered community                                 | |
|  |  [ ] Environmentally conscious                                | |
|  |  [ ] LGBTQ-welcoming                                          | |
|  |  [ ] Politically active                                       | |
|  |  [ ] Multigenerational families                               | |
|  |  [ ] Artists and creatives                                    | |
|  |  [ ] Young families with children                             | |
|  |  [ ] Active / outdoor lifestyle                               | |
|  |  [ ] Quiet and private                                        | |
|  |  [ ] Social and connected                                     | |
|  |  [+ Add your own]                                             | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  LIFESTYLE PREFERENCES                                        | |
|  |                                                                | |
|  |  [ ] Pet-friendly neighborhood                                | |
|  |  [ ] Gardening / food growing                                 | |
|  |  [ ] Walkable daily life                                      | |
|  |  [ ] Rural / space / acreage                                  | |
|  |  [ ] Close to public transit                                  | |
|  |  [ ] Home-based work / studio space                           | |
|  |  [+ Add your own]                                             | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  HOW THIS WORKS                                               | |
|  |                                                                | |
|  |  Your resonance settings adjust which neighborhoods and       | |
|  |  homes appear first in your feed. They never hide results.    | |
|  |  You can always browse beyond your resonance matches.          | |
|  |                                                                | |
|  |  These settings are encrypted and never shared. They are      | |
|  |  never used for advertising. They exist only to help you      | |
|  |  find your community.                                         | |
|  +--------------------------------------------------------------+ |
|                                                                    |
+------------------------------------------------------------------+
```

### How Private Filters Affect the UI

1. **Sorting, not filtering.** Resonance preferences change the ORDER of results, not the existence of results. A user who selects "Faith-centered community" sees faith-aligned neighborhoods higher in their feed, but all neighborhoods remain accessible.

2. **No before/after counts.** Since results are sorted rather than filtered, there is no count that changes. The user never sees "47 homes" become "12 homes."

3. **Gentle match indicators.** Instead of filter badges, homes and neighborhoods that strongly match receive a subtle warm-glow indicator (a soft amber border or a small resonance icon) — but no text label explaining WHY it matched. The user knows what they selected; the system simply surfaces it.

4. **Seller-side resonance.** Sellers can also set private resonance preferences for the kind of buyer they hope to find. This operates identically — it affects order of visibility in the seller's offer review and buyer interest dashboard, but never hides any buyer from the seller.

### Anti-Discrimination Guardrails

- Resonance settings never appear on profiles, listings, offers, or messages.
- The platform cannot use resonance data for advertising, analytics, or any purpose other than sort order for the individual user.
- No resonance category maps to a protected class directly. Categories are values-based ("faith-centered community") not identity-based ("Christian only").
- Moderation: custom-added resonance values are reviewed for content that could constitute discriminatory intent.
- Audit log: the system logs aggregate resonance usage patterns to detect if any category correlates with discriminatory outcomes (e.g., if "quiet and private" is being used as a proxy for racial exclusion, the team investigates).

---

## 3. Group / Collective Purchase Flow {#3-group-collective-purchase-flow}

### The Problem

Group buying is unfamiliar. The UX must make a complex legal and financial process feel approachable, step-by-step, and achievable. Users need to feel guided, not overwhelmed.

### The Solution: The "Build Your Crew" Wizard

Group purchasing is presented as a journey metaphor. You are building a crew, planning a voyage, and finding your home together. Each step is isolated, completable, and celebratory.

### Wireframe: Group Formation Entry

```
+------------------------------------------------------------------+
|  BUY TOGETHER                                                      |
+------------------------------------------------------------------+
|                                                                    |
|  Homeownership is better with people you trust.                    |
|                                                                    |
|  +---------------------------+  +------------------------------+  |
|  |                           |  |                              |  |
|  |  I HAVE MY CREW           |  |  HELP ME FIND CO-BUYERS      |  |
|  |                           |  |                              |  |
|  |  Invite friends, family,  |  |  Match with compatible       |  |
|  |  or housemates to buy     |  |  co-buyers who share your    |  |
|  |  together.                |  |  values and goals.           |  |
|  |                           |  |                              |  |
|  |  [Start a Group]          |  |  [Find Co-Buyers]            |  |
|  +---------------------------+  +------------------------------+  |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  WE'RE RENTERS WHO WANT TO OWN                                | |
|  |                                                                | |
|  |  You and your housemates rent together. You love the home.    | |
|  |  What if you could buy it — together?                         | |
|  |                                                                | |
|  |  [Explore Renter-to-Owner]                                    | |
|  +--------------------------------------------------------------+ |
|                                                                    |
+------------------------------------------------------------------+
```

### Wireframe: Group Dashboard (After Formation)

```
+------------------------------------------------------------------+
|  THE CHEN-PARK-WILLIAMS GROUP                    [Settings] [Chat]|
+------------------------------------------------------------------+
|                                                                    |
|  YOUR CREW                                                         |
|  +---+  +---+  +---+  +---+                                      |
|  |   |  |   |  |   |  | + |  <- Add member                      |
|  | J |  | S |  | M |  |   |                                      |
|  +---+  +---+  +---+  +---+                                      |
|  Jin    Sarah  Marcus  Invite                                      |
|  [vvv]  [vv]   [vv]                                               |
|  (verified badges under each member)                               |
|                                                                    |
|  JOURNEY PROGRESS                                                  |
|  +--------------------------------------------------------------+ |
|  |  [x] Form your crew ..... [x] Plan finances ....              | |
|  |  [ ] Get verified ........[ ] Find your home ....              | |
|  |  [ ] Make an offer ....... [ ] Close together                 | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  SHARED FINANCES                                                   |
|  +--------------------------------------------------------------+ |
|  |  Combined budget: $620,000                                    | |
|  |                                                                | |
|  |  Jin Chen        $250,000  (40.3%)   [Edit]                  | |
|  |  Sarah Park      $200,000  (32.3%)   [Edit]                  | |
|  |  Marcus Williams $170,000  (27.4%)   [Edit]                  | |
|  |                                                                | |
|  |  Ownership Structure: Tenancy in Common                       | |
|  |  [Change Structure] [Learn About Options]                     | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  SAVED HOMES                                                       |
|  +-----------------------------+  +-----------------------------+ |
|  |  [Home photo]               |  |  [Home photo]                | |
|  |  Temescal craftsman         |  |  Sellwood bungalow           | |
|  |  Jin: "Love it"             |  |  Sarah: "Maybe"              | |
|  |  Sarah: "Love it"           |  |  Marcus: "Love it"           | |
|  |  Marcus: "Want to visit"    |  |  Jin: (not yet voted)        | |
|  +-----------------------------+  +-----------------------------+ |
|                                                                    |
+------------------------------------------------------------------+
```

### Key Interaction Patterns

**Voting on homes:** Each group member can react to saved homes with "Love it," "Maybe," "Not for us," or "Want to visit." The group sees alignment at a glance without needing a meeting. Homes where all members say "Love it" get a special highlight.

**Financial planning:** The shared finance calculator is deliberately simplified. It shows three things: your contribution, your percentage, and the group total. Advanced options (mortgage qualification modeling, LTV ratios) are behind an "Advanced" toggle — not on the primary screen.

**Legal structure education:** When a user taps "Learn About Options," a side panel explains each structure in plain language:

```
+----------------------------------------------+
|  OWNERSHIP STRUCTURES                         |
+----------------------------------------------+
|                                                |
|  TENANCY IN COMMON                            |
|  Each person owns a specific percentage.       |
|  You can sell your share independently.         |
|  Most flexible. Most common for co-buyers.     |
|                                                |
|  JOINT TENANCY                                 |
|  Everyone owns equal shares.                   |
|  If one person leaves, share transfers          |
|  to remaining owners.                          |
|  Best for partners or very close groups.       |
|                                                |
|  LLC                                           |
|  You create a company that owns the home.      |
|  Most legal protection but most paperwork.     |
|  Best for larger groups or investment goals.   |
|                                                |
|  Not sure? That's normal. You can consult a    |
|  real estate attorney from our marketplace.    |
|  [Find an Attorney]                            |
|                                                |
+----------------------------------------------+
```

**Member verification failure:** If one group member fails verification, the group is not blocked. The dashboard shows that member's status clearly, and the group can proceed while that member resolves their verification. Offers submitted by the group will show which members are fully verified.

---

## 4. Broker-Comes-to-You Marketplace {#4-broker-comes-to-you-marketplace}

### The Problem

Traditional real estate makes you hunt for professionals. HumanHomes inverts this: professionals pitch their services to users. But this must not become spam or cold outreach.

### The Solution: The "Request Help" Model

Users post a help request. Qualified professionals respond with their pitch. The user reviews pitches and chooses (or chooses no one). Professionals can never initiate contact.

### Wireframe: User Requests Help

```
+------------------------------------------------------------------+
|  PROFESSIONAL HELP                                                 |
+------------------------------------------------------------------+
|                                                                    |
|  Need a hand? Request help from independent professionals.         |
|  They'll come to you with their offer — no cold calls, ever.       |
|                                                                    |
|  What do you need?                                                 |
|                                                                    |
|  +------------------+  +------------------+  +-----------------+  |
|  |  Home            |  |  Title           |  |  Real Estate    |  |
|  |  Inspector       |  |  Company         |  |  Attorney       |  |
|  +------------------+  +------------------+  +-----------------+  |
|  +------------------+  +------------------+  +-----------------+  |
|  |  Notary          |  |  Mortgage        |  |  Appraiser      |  |
|  |                  |  |  Advisor         |  |                 |  |
|  +------------------+  +------------------+  +-----------------+  |
|                                                                    |
|  [Or describe what you need in your own words]                     |
|                                                                    |
+------------------------------------------------------------------+
```

### Wireframe: Professional Pitches Arrive

```
+------------------------------------------------------------------+
|  YOUR REQUEST: Home Inspector — Temescal, Oakland                  |
|  Posted 2 hours ago | 3 professionals have responded               |
+------------------------------------------------------------------+
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  SARAH MARTINEZ — Licensed Inspector                          | |
|  |  [Photo]                                                       | |
|  |                                                                | |
|  |  "I've inspected 40+ homes in Temescal. I work exclusively    | |
|  |   for buyers — no realtor relationships, no conflicts of      | |
|  |   interest. I'll spend as long as it takes."                  | |
|  |                                                                | |
|  |  Fee: $450 flat                                               | |
|  |  Independence verified [v]                                    | |
|  |  12 HumanHomes reviews | 4.9 avg                             | |
|  |                                                                | |
|  |  [View Full Profile]  [Message Sarah]  [Book Sarah]           | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  JAMES OKAFOR — Licensed Inspector                            | |
|  |  [Photo]                                                       | |
|  |                                                                | |
|  |  "Structural specialist. I bring a thermal camera and          | |
|  |   document everything in a 30-page report with photos."        | |
|  |                                                                | |
|  |  Fee: $525 flat                                               | |
|  |  Independence verified [v]                                    | |
|  |  8 HumanHomes reviews | 5.0 avg                              | |
|  |                                                                | |
|  |  [View Full Profile]  [Message James]  [Book James]           | |
|  +--------------------------------------------------------------+ |
|                                                                    |
+------------------------------------------------------------------+
```

### Key Interaction Patterns

- **No outbound.** Professionals cannot message users who have not posted a help request. This is a hard technical constraint, not a policy — the messaging system physically does not allow it.
- **Independence badge.** Every professional's profile shows whether they have verified independence (no brokerage affiliation). Users can filter to only see independent professionals.
- **Transparent pricing.** Fees are shown upfront on every pitch. No "call for quote" — if a professional wants to respond, they must state their fee.
- **Review provenance.** Reviews are tied to verified HumanHomes transactions. No imported reviews from other platforms. Every review corresponds to a real transaction on this platform.

---

## 5. Baby Boomer Seller Onboarding {#5-baby-boomer-seller-onboarding}

### The Problem

An aging homeowner who has lived in their home for 30-40 years may not be tech-savvy. They may be emotionally attached to the home. The standard "create a listing" flow would feel cold and overwhelming.

### The Solution: The Warm Handoff — "Tell Us About Your Home"

The boomer experience is a separate, simplified entry point. It uses conversational UX (one question at a time), large text, minimal chrome, and an emotional tone that honors their relationship with the home.

### Wireframe: Transition Listing Entry Point

```
+------------------------------------------------------------------+
|  [Logo: HumanHomes]                                    [Help]     |
+------------------------------------------------------------------+
|                                                                    |
|           Ready to pass your home to its next family?              |
|                                                                    |
|           You've made this house a home. Let's help you            |
|           find someone who'll love it the way you did.             |
|                                                                    |
|           +----------------------------------------------+        |
|           |                                              |        |
|           |  [Large button: Tell Us About Your Home]     |        |
|           |                                              |        |
|           +----------------------------------------------+        |
|                                                                    |
|           Or, if a family member is helping:                        |
|           [I'm helping someone list their home]                    |
|                                                                    |
+------------------------------------------------------------------+
```

### Wireframe: Conversational Listing Flow (One Question Per Screen)

```
Screen 1:
+------------------------------------------------------------------+
|                                                                    |
|     How long have you lived in your home?                          |
|                                                                    |
|     +------------------------------------------------------+     |
|     |  [                                              ]     |     |
|     |  e.g., "32 years — since 1994"                       |     |
|     +------------------------------------------------------+     |
|                                                                    |
|     [Next ->]                                                      |
|                                                                    |
+------------------------------------------------------------------+

Screen 2:
+------------------------------------------------------------------+
|                                                                    |
|     What's your favorite thing about this home?                    |
|                                                                    |
|     +------------------------------------------------------+     |
|     |  [                                              ]     |     |
|     |  Take your time. There's no wrong answer.             |     |
|     |  [                                              ]     |     |
|     |  [                                              ]     |     |
|     +------------------------------------------------------+     |
|                                                                    |
|     [<- Back]                          [Next ->]                   |
|                                                                    |
+------------------------------------------------------------------+

Screen 3:
+------------------------------------------------------------------+
|                                                                    |
|     What would you want the next family to know                    |
|     about this home?                                               |
|                                                                    |
|     +------------------------------------------------------+     |
|     |  [                                              ]     |     |
|     |  Maybe it's the neighbor who always waves, the        |     |
|     |  garden that blooms every spring, or the spot          |     |
|     |  where your kids measured their height on the          |     |
|     |  doorframe.                                            |     |
|     +------------------------------------------------------+     |
|                                                                    |
|     [<- Back]                          [Next ->]                   |
|                                                                    |
+------------------------------------------------------------------+

Screen 4:
+------------------------------------------------------------------+
|                                                                    |
|     Let's add some photos.                                         |
|                                                                    |
|     You can take them right now with your phone,                   |
|     or add them later. No professional photos needed —             |
|     real photos tell real stories.                                  |
|                                                                    |
|     +------------------------------------------------------+     |
|     |                                                        |     |
|     |        [Take a Photo]     [Upload from Library]        |     |
|     |                                                        |     |
|     |        [I'll add photos later]                         |     |
|     |                                                        |     |
|     +------------------------------------------------------+     |
|                                                                    |
|     [<- Back]                          [Next ->]                   |
|                                                                    |
+------------------------------------------------------------------+

Screen 5:
+------------------------------------------------------------------+
|                                                                    |
|     Now for the details. Don't worry — we'll help                  |
|     you fill these in.                                             |
|                                                                    |
|     Bedrooms:   [ 3  v ]                                           |
|     Bathrooms:  [ 2  v ]                                           |
|     Approx sqft: [  1,800  ]    (not sure? [estimate for me])     |
|     Year built:  [  1962   ]    (not sure? [look it up])          |
|                                                                    |
|     Anything that needs fixing?                                    |
|     +------------------------------------------------------+     |
|     |  Be honest — buyers on HumanHomes appreciate          |     |
|     |  transparency. "The roof needs work" is a feature,     |     |
|     |  not a flaw, for buyers who love a project.            |     |
|     +------------------------------------------------------+     |
|                                                                    |
|     [<- Back]                          [Next ->]                   |
|                                                                    |
+------------------------------------------------------------------+
```

### Key Design Decisions

- **One question per screen.** No multi-field forms. Each screen has exactly one thing to think about.
- **Large, readable text.** Minimum 18px body text, high contrast.
- **Encouraging microcopy.** Every prompt includes gentle coaching: "Take your time," "There's no wrong answer," "Don't worry."
- **Story before stats.** The conversational flow asks about memories and feelings BEFORE asking for bedroom count and square footage. By the time they reach the structured data, they feel emotionally invested — not like they're filling out a government form.
- **Family member proxy.** A "helping someone" flow lets adult children or caregivers create the listing with the homeowner, maintaining the homeowner's voice throughout.
- **"Not sure" helpers.** For fields like square footage and year built, the platform offers to look up public records automatically ("look it up" fetches from the county assessor database).
- **No pricing pressure.** The flow does NOT ask "What's your asking price?" during onboarding. That comes later, with Market Intelligence context ("Homes similar to yours in your neighborhood have sold for...").

---

## 6. Home Story Creation Flow {#6-home-story-creation-flow}

### The Problem

Telling a home's story is not "fill in a text box." Most sellers will stare at a blank field and write nothing meaningful. The flow needs to guide sellers through structured storytelling that produces rich, authentic narratives.

### The Solution: Guided Story Prompts with AI Assembly

The seller answers a series of specific, evocative questions. Each question is designed to unlock a specific kind of memory. After answering, the platform assembles their responses into a cohesive Home Story (with AI assistance), which the seller can then edit and refine.

### Wireframe: Story Builder (Within Listing Creation)

```
+------------------------------------------------------------------+
|  YOUR HOME'S STORY                              Step 3 of 7       |
+------------------------------------------------------------------+
|                                                                    |
|  Every home has a story. These questions help you tell it.         |
|  Answer as many or as few as you like.                             |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  THE FIRST MEMORY                                             | |
|  |  What's the first thing you remember about moving in?         | |
|  |  +----------------------------------------------------------+ | |
|  |  | The smell of the orange blossoms through the kitchen     | | |
|  |  | window. We moved in during spring and the whole street   | | |
|  |  | smelled like oranges.                                    | | |
|  |  +----------------------------------------------------------+ | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  THE FAVORITE SPOT                                            | |
|  |  Where's your favorite place in the house, and why?           | |
|  |  +----------------------------------------------------------+ | |
|  |  |                                                          | | |
|  |  +----------------------------------------------------------+ | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  THE NEIGHBORHOOD                                             | |
|  |  What would you tell a friend about your neighborhood?        | |
|  |  +----------------------------------------------------------+ | |
|  |  |                                                          | | |
|  |  +----------------------------------------------------------+ | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  THE SEASONS                                                  | |
|  |  What's the best season in this home, and what makes it       | |
|  |  special?                                                     | |
|  |  +----------------------------------------------------------+ | |
|  |  |                                                          | | |
|  |  +----------------------------------------------------------+ | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  THE CHARACTER                                                | |
|  |  What gives this home its personality? Quirks, features,      | |
|  |  sounds, or rituals that make it uniquely yours.              | |
|  |  +----------------------------------------------------------+ | |
|  |  |                                                          | | |
|  |  +----------------------------------------------------------+ | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  YOUR WISH                                                    | |
|  |  What do you hope the next family will love about this home?  | |
|  |  +----------------------------------------------------------+ | |
|  |  |                                                          | | |
|  |  +----------------------------------------------------------+ | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  [Save & Preview Story]                                            |
|                                                                    |
+------------------------------------------------------------------+
```

### Wireframe: AI-Assembled Story Preview

```
+------------------------------------------------------------------+
|  PREVIEW: YOUR HOME'S STORY                         [Edit]        |
+------------------------------------------------------------------+
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  "We moved into this home on a spring day in 2003, and the    | |
|  |   first thing that hit us was the scent of orange blossoms    | |
|  |   drifting through the kitchen window. The whole street        | |
|  |   smelled like oranges.                                       | |
|  |                                                                | |
|  |   Our favorite spot has always been the back porch. We put    | |
|  |   up string lights the first summer and never took them       | |
|  |   down. That's where we've had every birthday dinner, every   | |
|  |   late-night conversation, every quiet Sunday morning.        | |
|  |                                                                | |
|  |   The neighborhood is the kind of place where people wave     | |
|  |   from their yards. Our neighbor Carmen brings us lemons      | |
|  |   from her tree every February. The kids on our block still   | |
|  |   play in the street until the streetlights come on.          | |
|  |                                                                | |
|  |   We hope the next family will sit on that porch with         | |
|  |   the string lights and feel what we've felt: that this       | |
|  |   isn't just a house. It's a home."                           | |
|  |                                                                | |
|  |  — The Nguyens                                                | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  This story was composed from your answers. You can edit           |
|  any part of it, or rewrite it entirely.                           |
|                                                                    |
|  [Edit Story]  [Looks Great — Publish]  [Redo from Scratch]       |
|                                                                    |
+------------------------------------------------------------------+
```

### Key Design Decisions

- **Specific prompts, not blank fields.** "What's the first thing you remember about moving in?" will produce a richer answer than "Tell us about your home."
- **All prompts are optional.** A seller can answer one question or all six. The AI assembles whatever they provide into a coherent narrative.
- **AI assists, seller owns.** The platform uses AI to weave individual answers into a flowing narrative, but the seller always has final edit control. The AI never invents details.
- **Warmth in the writing.** The AI assembly preserves the seller's voice and phrasing. It connects sentences and adds flow, but it does not corporate-ize the language.
- **Photo linking.** After the story is written, the seller can optionally link specific photos to specific story sections ("This is the porch" attached to the porch story segment).

---

## 7. Verification UX — Neighborly Vouching {#7-verification-ux}

### The Problem

Community vouching is the heart of HumanHomes trust, but the process must be simple, not awkward. Asking a neighbor to vouch for you could feel uncomfortable. Providing a vouch could feel like a burden or a risk.

### The Solution: Lightweight, Low-Pressure Vouching

Vouching is reframed as "confirming you're a neighbor" rather than "vouching for someone's character." The bar is deliberately low: "Do you know this person? Do they live where they say they live?" This removes the social weight of a character reference.

### Wireframe: Requesting a Vouch

```
+------------------------------------------------------------------+
|  GET VOUCHED                                                       |
+------------------------------------------------------------------+
|                                                                    |
|  Your neighbors can confirm you're part of the community.          |
|  It's simple — they just confirm they know you.                    |
|                                                                    |
|  HOW TO ASK                                                        |
|                                                                    |
|  Option 1: Share a link                                            |
|  +--------------------------------------------------------------+ |
|  |  Send this link to a neighbor:                                | |
|  |  humanhomes.com/vouch/jin-chen-7x3k                           | |
|  |                                                                | |
|  |  [Copy Link]  [Share via Text]  [Share via Email]             | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  Option 2: Invite by name                                          |
|  +--------------------------------------------------------------+ |
|  |  If your neighbor is on HumanHomes, find them:                | |
|  |  [Search for a neighbor...                              ]     | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  YOUR VOUCH STATUS                                                 |
|  +--------------------------------------------------------------+ |
|  |  [v] Maria Garcia — confirmed Feb 12                          | |
|  |  [v] David Okafor — confirmed Feb 14                          | |
|  |  [ ] Pending: Carmen Reyes (sent Feb 18)                      | |
|  |                                                                | |
|  |  Trust level: 2 of 3 vouches for Level 2                      | |
|  |  [||||||||||||----------]                                     | |
|  +--------------------------------------------------------------+ |
|                                                                    |
+------------------------------------------------------------------+
```

### Wireframe: Providing a Vouch (Neighbor's View)

```
+------------------------------------------------------------------+
|  VOUCH REQUEST                                                     |
+------------------------------------------------------------------+
|                                                                    |
|  Jin Chen is asking you to confirm that you know them              |
|  as a neighbor.                                                    |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  [Jin's profile photo]                                        | |
|  |                                                                | |
|  |  Jin Chen                                                     | |
|  |  Says they live at: 4500 block, Telegraph Ave area            | |
|  |  (exact address hidden for privacy)                           | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  We're just asking three simple things:                            |
|                                                                    |
|  1. Do you know this person?             [Yes] [No]               |
|  2. Do they live in your neighborhood?   [Yes] [No] [Not sure]   |
|  3. Would you call them a neighbor?      [Yes] [No]               |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  Optional: Add a note                                         | |
|  |  +----------------------------------------------------------+ | |
|  |  | "Jin's been my neighbor for 5 years. Great family."      | | |
|  |  +----------------------------------------------------------+ | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  [Submit Vouch]                                                    |
|                                                                    |
|  Your vouch is private. Only the trust level (not your             |
|  identity or answers) is visible on Jin's profile.                 |
|                                                                    |
+------------------------------------------------------------------+
```

### Key Interaction Patterns

- **Three yes/no questions.** No essay writing, no character reference, no legal language. Three taps and done.
- **Block-level location.** The voucher sees the person's approximate location (block level), not their exact address. This is enough to confirm "yes, they live near me" without exposing private data.
- **Voucher anonymity.** The identity of who vouched is visible only to the person being vouched. On the public profile, only the trust level and vouch count are visible — not voucher names.
- **Anti-gaming:** Each HumanHomes user can provide a maximum of 10 vouches total (prevents vouch farming). Vouches from accounts in the same household or at the same IP are flagged for review. Mutual vouching (A vouches for B, B vouches for A simultaneously) triggers a cooldown and review.
- **Progressive trust tiers:**

```
Tier 0: Unverified (new account)
Tier 1: Identity verified (ID check complete)
Tier 2: Neighbor-confirmed (3+ vouches from different households + ID verified)
Tier 3: Established (5+ vouches + completed transaction on platform + 6+ months tenure)
```

---

## 8. Buyer-Seller First Contact {#8-buyer-seller-first-contact}

### The Problem

The first message from a buyer to a seller sets the tone of the entire relationship. If it feels like a transaction ("Is this still available?"), the platform has failed. If it feels like a human introduction, the platform is working.

### The Solution: Structured First Message with Profile Context

The first message from a buyer is not a blank text box. It is a structured introduction that automatically includes the buyer's profile context, so the seller immediately knows who they're talking to.

### Wireframe: First Contact Prompt (Buyer's View)

```
+------------------------------------------------------------------+
|  INTRODUCE YOURSELF TO THE NGUYENS                                 |
+------------------------------------------------------------------+
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  [Home photo thumbnail]                                       | |
|  |  The Nguyen Home — Temescal, Oakland                          | |
|  |  "We moved in when the orange blossoms were blooming..."      | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  Your profile will be shared with this message:                    |
|  +--------------------------------------------------------------+ |
|  |  [Your photo]  Jin Chen                                       | |
|  |  Teacher, parent of two                                       | |
|  |  Looking for: A home with a yard where the kids can play      | |
|  |  Verified: Tier 2 [vv]                                        | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  What draws you to this home?                                      |
|  +--------------------------------------------------------------+ |
|  |                                                                | |
|  |  Starter prompts (optional — pick one or write your own):     | |
|  |                                                                | |
|  |  "I read your story about [the orange blossoms / the back     | |
|  |   porch / the neighborhood] and it really resonated..."       | |
|  |                                                                | |
|  |  "My family is looking for exactly this kind of home           | |
|  |   because..."                                                 | |
|  |                                                                | |
|  |  "I love that your neighborhood has [feature from the         | |
|  |   Home Story]..."                                             | |
|  |                                                                | |
|  |  Or just say hello in your own words.                         | |
|  |                                                                | |
|  |  +----------------------------------------------------------+ | |
|  |  |                                                          | | |
|  |  |                                                          | | |
|  |  +----------------------------------------------------------+ | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  [Send Introduction]                                               |
|                                                                    |
+------------------------------------------------------------------+
```

### Wireframe: First Message Arrives (Seller's View)

```
+------------------------------------------------------------------+
|  NEW MESSAGE ABOUT YOUR HOME                                       |
+------------------------------------------------------------------+
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  [Jin's photo]                                                | |
|  |                                                                | |
|  |  JIN CHEN                                                     | |
|  |  Teacher, parent of two                                       | |
|  |  Verified: Tier 2 [vv]                                        | |
|  |  Looking for: A home with a yard where the kids can play      | |
|  |                                                                | |
|  |  ---                                                          | |
|  |                                                                | |
|  |  "Hi! I read your story about the orange blossoms and it      | |
|  |   made me smile — we have a lemon tree at our current         | |
|  |   apartment that I've been nurturing on the balcony for       | |
|  |   three years, and I'd love to finally plant it in a real     | |
|  |   yard. Your home sounds like the kind of place where our     | |
|  |   kids could grow up knowing their neighbors. Would love      | |
|  |   to learn more."                                             | |
|  |                                                                | |
|  |  Received today at 2:15 PM                                    | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  [Reply to Jin]                                               | |
|  |  +----------------------------------------------------------+ | |
|  |  |                                                          | | |
|  |  +----------------------------------------------------------+ | |
|  |  [Send Reply]                                                 | |
|  +--------------------------------------------------------------+ |
|                                                                    |
+------------------------------------------------------------------+
```

### Key Design Decisions

- **Profile attached automatically.** The buyer does not choose whether to share their profile. The seller always sees who is messaging them. This is a core platform principle — no anonymous inquiries.
- **Starter prompts reference the Home Story.** The prompts dynamically pull details from the seller's Home Story, making it effortless for the buyer to reference something specific and personal.
- **No "Is this still available?" pattern.** By structuring the first message around "What draws you to this home?" the platform steers away from transactional openers.
- **Seller sees the person first, message second.** The buyer's profile and verification level appear above the message text. The seller is reading a person's introduction, not processing an inquiry.
- **After first contact:** Subsequent messages in the thread are a free-form chat — no more structured prompts. The structure is only for the ice-breaker.

---

## Global Navigation & Information Architecture {#global-navigation}

### Primary Navigation (Logged-In User)

```
+------------------------------------------------------------------+
|  [Logo]                                                            |
|                                                                    |
|  Discover       Your Home       Messages       Profile            |
|  (neighborhoods  (your listing   (conversations  (your profile,   |
|   & homes)       if selling)     with buyers/     verification,   |
|                                  sellers)         settings)       |
|                                                                    |
|  [+] Sell Your Home    [?] Help                                    |
+------------------------------------------------------------------+
```

### Navigation Philosophy

- **Four primary tabs,** not six or eight. Cognitive load is low.
- **"Discover" not "Search."** The primary tab is exploration-oriented. It leads to neighborhood stories, not a search form.
- **"Your Home" only if selling.** This tab appears only when the user has an active listing. Otherwise, it is replaced by a "Sell Your Home" prompt.
- **Messages are central.** Messaging is a top-level nav item because human connection is the core product, not an afterthought.

### Mobile Navigation

```
+------------------------------------------------------------------+
|                                                                    |
|  [Discover]  [Home]  [Messages]  [Profile]                        |
|     *           *        (3)         *                             |
|                                                                    |
+------------------------------------------------------------------+
```

Four-tab bottom bar. Badge count on Messages. Minimal, warm icons. No hamburger menu — everything is reachable in two taps.

---

## Visual Design Direction {#visual-design-direction}

### Color Palette

- **Primary:** Warm terracotta (#C4704B) — earthy, human, inviting. Not tech-blue.
- **Secondary:** Sage green (#8B9F82) — natural, calm, community-focused.
- **Background:** Warm white (#FAF7F2) — never stark white.
- **Text:** Charcoal (#2D2D2D) — soft but readable. Never pure black.
- **Accent:** Amber (#D4A84B) — for match indicators, verification badges.
- **Error/Alert:** Muted brick (#B85C4F) — warm even in error states.

### Typography

- **Headlines:** Serif typeface (e.g., Lora or Merriweather) — warm, narrative, story-like.
- **Body:** Sans-serif (e.g., Inter or Source Sans) — clean, readable.
- **The combination** signals: "This is a place for stories told by real people, presented clearly." Serif headlines give warmth; sans-serif body gives clarity.

### Imagery

- **No stock photos.** All imagery should be user-generated or illustrated.
- **Warm photography.** Natural light, real rooms, lived-in spaces. Not staged, not HDR-blown.
- **Illustrations for empty states.** When a user has no messages, no saved homes, or no vouches yet, show warm hand-drawn-style illustrations — not sad empty-box icons.

### Component Style

- **Rounded corners** (12-16px radius) on all cards and containers.
- **Soft shadows** (no hard drop shadows).
- **Generous spacing.** Let the content breathe. Dense UI signals "efficiency tool." Spacious UI signals "place to be."
- **No aggressive CTAs.** Buttons use warm fill colors, not red/orange urgency colors. No "ACT NOW" language. The platform does not create urgency — homes are not going anywhere.

---

## Interaction Pattern Reference

### Pattern: Progressive Disclosure

Used in: Entry Point UX, Boomer Onboarding, Group Purchasing

**Rule:** Never show all complexity upfront. Reveal detail as the user demonstrates intent. A buyer browsing neighborhoods does not need to see mortgage calculators. A seller answering story prompts does not need to see disclosure forms yet.

### Pattern: Additive Selection (Never Subtractive)

Used in: Resonance Filters, Neighborhood Discovery, Preference Setting

**Rule:** User actions add specificity to what they see. They never remove results. Selecting "faith-centered community" brings faith-aligned neighborhoods forward. It does not hide non-faith-aligned neighborhoods. The mental model is "turn up the volume on what I like" not "mute what I don't."

### Pattern: Human-First Data Display

Used in: Listing Cards, Offer Comparison, Buyer Messages

**Rule:** Show the person before the data. On a listing card: story excerpt > photo > seller name > stats > price. On an offer: buyer profile > their story > verification level > offer amount. On a message: sender profile > message content. Data serves the human context, never the reverse.

### Pattern: Structured Ice-Breaking

Used in: First Contact Messaging, Home Story Creation, Vouch Requests

**Rule:** When a user faces a blank text field in a socially sensitive context, provide structured prompts that lower the barrier to entry. Prompts should be specific and contextual (referencing the home's story, the neighborhood, the person), not generic ("Say hi!").

### Pattern: Celebratory Milestones

Used in: Verification Progress, Group Formation, Closing Timeline

**Rule:** Mark progress with warmth. When a user gets their first vouch, show a brief celebration. When a group reaches financial alignment, acknowledge it. When a closing timeline hits the "keys in hand" milestone, make it feel special. These moments are meaningful in real life — the platform should honor that.

---

## Open Design Questions (For Team Discussion)

1. **Price visibility timing.** This document proposes hiding price from listing cards and showing it only on detail pages. This is a strong design stance that prioritizes stories over shopping. The team should validate this with user research — some users may find it frustrating.

2. **Meet-and-greet feature.** The features doc flags concern about meet-and-greet enabling discrimination. Recommendation: Do NOT build a formal meet-and-greet feature. The existing messaging + video call tools provide sufficient personal connection. A structured "screening interview" step would create gatekeeping dynamics that contradict the platform's values.

3. **Seller buyer-preference visibility.** Should sellers be able to see that a buyer's resonance settings align with theirs? Recommendation: No. Resonance operates independently for each user. Revealing alignment creates implicit social pressure and could be gamed.

4. **Group size limits.** What is the maximum number of co-buyers in a group? Recommendation: Start with 6. Larger groups introduce governance complexity that the current legal templates cannot adequately address. Expand after user research.

5. **Boomer proxy permissions.** When a family member creates a listing on behalf of an aging homeowner, what verification is required? Recommendation: The homeowner must complete at least Layer 1 (ID verification), even if someone else handles the listing content. A power-of-attorney flow covers cases where the homeowner cannot participate.

6. **Vouch expiration.** Should vouches expire? Recommendation: Yes, after 2 years. Neighborhoods change. A vouch from someone who moved away 3 years ago has diminished relevance. Users receive a gentle reminder to refresh their vouches.
