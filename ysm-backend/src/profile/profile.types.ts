export interface Profile {
  id: string;
  bookmarkedResources: string[];
  resourceState: Record<string, ResourceState>;
}

export type ResourceState = Record<string, any>;
