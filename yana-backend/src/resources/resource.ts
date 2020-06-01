export interface Resource {
  id: string;
  slug: string;
  title: string;
  icon: string;
  subtitle?: string;
  descriptionHtml: string;
  content?: ContentItem[];
}
export type ContentItem = {
  type: string;
  id: string;
  title: string;
  descriptionHtml: string;
} & { [key: string]: any };
