import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  role: z.enum(["buyer", "seller", "both"]).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateProfileSchema = z.object({
  bio: z.string().max(2000).nullable().optional(),
  story: z.string().max(5000).nullable().optional(),
  photoUrls: z.array(z.string().url()).optional(),
  preferences: z.record(z.unknown()).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
