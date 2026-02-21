export enum ListingStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  PENDING = "pending",
  SOLD = "sold",
  ARCHIVED = "archived",
}

export interface HomeStorySection {
  prompt: string;
  response: string;
}

export interface HomeStory {
  sections: HomeStorySection[];
  assembledNarrative: string;
}

export interface Listing {
  id: string;
  sellerId: string;
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number | null;
  lotSize: number | null;
  yearBuilt: number | null;
  price: number;
  homeStory: HomeStory | null;
  photoUrls: string[];
  videoUrls: string[];
  status: ListingStatus;
  location: {
    lat: number;
    lng: number;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}
