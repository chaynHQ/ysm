export interface Resource {
  id: string;
  slug: string;
  featured: boolean;
  image: string;
  title: string;
  subtitle?: string;
  description: Record<string, any>;
  themes: string[];
  tags: string[];
  countries: string[];
  content?: ContentItem[];
}
export type ContentItem = {
  type: string;
  id: string;
  title: string;
  description?: Record<string, any>;
} & Record<string, any>;
