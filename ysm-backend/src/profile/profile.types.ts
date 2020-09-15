export interface Profile {
  id: string;
  termsAccepted: boolean;
  bookmarkedResources: string[];
  resourceState: Record<string, ResourceState>;
}

export type ResourceState = Record<string, any>;
