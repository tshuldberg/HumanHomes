/**
 * Trust tier levels for user verification.
 * Higher tiers unlock more platform capabilities.
 */
export const TRUST_TIERS = {
  UNVERIFIED: { level: 0, label: "Unverified", requirements: "None" },
  IDENTITY_VERIFIED: { level: 1, label: "Identity Verified", requirements: "Persona ID check" },
  NEIGHBOR_CONFIRMED: { level: 2, label: "Neighbor Confirmed", requirements: "3+ vouches from verified users" },
  ESTABLISHED: { level: 3, label: "Established", requirements: "6+ vouches, 1+ year on platform" },
} as const;

/**
 * US states — abbreviation + full name pairs.
 * Initial launch: CA, TX, FL, NY, WA.
 */
export const US_STATES = [
  { abbr: "AL", name: "Alabama" }, { abbr: "AK", name: "Alaska" },
  { abbr: "AZ", name: "Arizona" }, { abbr: "AR", name: "Arkansas" },
  { abbr: "CA", name: "California" }, { abbr: "CO", name: "Colorado" },
  { abbr: "CT", name: "Connecticut" }, { abbr: "DE", name: "Delaware" },
  { abbr: "FL", name: "Florida" }, { abbr: "GA", name: "Georgia" },
  { abbr: "HI", name: "Hawaii" }, { abbr: "ID", name: "Idaho" },
  { abbr: "IL", name: "Illinois" }, { abbr: "IN", name: "Indiana" },
  { abbr: "IA", name: "Iowa" }, { abbr: "KS", name: "Kansas" },
  { abbr: "KY", name: "Kentucky" }, { abbr: "LA", name: "Louisiana" },
  { abbr: "ME", name: "Maine" }, { abbr: "MD", name: "Maryland" },
  { abbr: "MA", name: "Massachusetts" }, { abbr: "MI", name: "Michigan" },
  { abbr: "MN", name: "Minnesota" }, { abbr: "MS", name: "Mississippi" },
  { abbr: "MO", name: "Missouri" }, { abbr: "MT", name: "Montana" },
  { abbr: "NE", name: "Nebraska" }, { abbr: "NV", name: "Nevada" },
  { abbr: "NH", name: "New Hampshire" }, { abbr: "NJ", name: "New Jersey" },
  { abbr: "NM", name: "New Mexico" }, { abbr: "NY", name: "New York" },
  { abbr: "NC", name: "North Carolina" }, { abbr: "ND", name: "North Dakota" },
  { abbr: "OH", name: "Ohio" }, { abbr: "OK", name: "Oklahoma" },
  { abbr: "OR", name: "Oregon" }, { abbr: "PA", name: "Pennsylvania" },
  { abbr: "RI", name: "Rhode Island" }, { abbr: "SC", name: "South Carolina" },
  { abbr: "SD", name: "South Dakota" }, { abbr: "TN", name: "Tennessee" },
  { abbr: "TX", name: "Texas" }, { abbr: "UT", name: "Utah" },
  { abbr: "VT", name: "Vermont" }, { abbr: "VA", name: "Virginia" },
  { abbr: "WA", name: "Washington" }, { abbr: "WV", name: "West Virginia" },
  { abbr: "WI", name: "Wisconsin" }, { abbr: "WY", name: "Wyoming" },
  { abbr: "DC", name: "District of Columbia" },
] as const;

/** Listing lifecycle statuses */
export const LISTING_STATUSES = ["draft", "active", "pending", "sold", "archived"] as const;

/** Maximum number of vouches a single user can give */
export const MAX_VOUCHES_PER_USER = 10;

/** Maximum number of co-buyers in a group purchase */
export const MAX_GROUP_SIZE = 6;

/** Vouches expire after this many years */
export const VOUCH_EXPIRY_YEARS = 2;
