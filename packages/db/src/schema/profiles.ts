import {
  pgTable,
  uuid,
  text,
  jsonb,
  timestamp,
  pgEnum,
  integer,
  boolean,
  unique,
} from "drizzle-orm/pg-core";
import { users } from "./users.js";

export const profileTypeEnum = pgEnum("profile_type", ["buyer", "seller"]);

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: profileTypeEnum("type").notNull(),
    bio: text("bio"),
    story: text("story"),
    photoUrls: text("photo_urls").array().default([]),
    verificationTier: integer("verification_tier").notNull().default(0),
    preferences: jsonb("preferences").$type<Record<string, unknown>>().default({}),
    isPublic: boolean("is_public").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [unique("profiles_user_type_unique").on(table.userId, table.type)],
);
