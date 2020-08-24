export interface Page {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  content: Record<string, any>;
}
