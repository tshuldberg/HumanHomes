import { z } from "zod";

const homeStorySectionSchema = z.object({
  prompt: z.string().min(1),
  response: z.string().min(1),
});

const homeStorySchema = z.object({
  sections: z.array(homeStorySectionSchema).min(1),
  assembledNarrative: z.string().min(1),
});

export const createListingSchema = z.object({
  title: z.string().min(1).max(200),
  address: z.string().min(1),
  beds: z.number().int().min(0),
  baths: z.number().min(0),
  sqft: z.number().positive().nullable().optional(),
  lotSize: z.number().positive().nullable().optional(),
  yearBuilt: z.number().int().min(1600).max(2100).nullable().optional(),
  price: z.number().positive(),
  homeStory: homeStorySchema.nullable().optional(),
});

export type CreateListingInput = z.infer<typeof createListingSchema>;

export const updateListingSchema = createListingSchema.partial();

export type UpdateListingInput = z.infer<typeof updateListingSchema>;
