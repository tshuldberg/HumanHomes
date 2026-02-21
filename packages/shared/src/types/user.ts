export type UserRole = "buyer" | "seller" | "both";

export enum VerificationTier {
  UNVERIFIED = 0,
  IDENTITY_VERIFIED = 1,
  NEIGHBOR_CONFIRMED = 2,
  ESTABLISHED = 3,
}

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  role: UserRole | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface BuyerProfile {
  id: string;
  userId: string;
  type: "buyer";
  bio: string | null;
  story: string | null;
  photoUrls: string[];
  verificationTier: number;
  preferences: Record<string, unknown>;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SellerProfile {
  id: string;
  userId: string;
  type: "seller";
  bio: string | null;
  story: string | null;
  photoUrls: string[];
  verificationTier: number;
  preferences: Record<string, unknown>;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type Profile = BuyerProfile | SellerProfile;

export interface GroupProfile {
  id: string;
  name: string;
  memberIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
