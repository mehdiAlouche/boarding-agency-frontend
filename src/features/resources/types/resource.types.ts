export interface Resource {
  id: string;
  title: string;
  description: string;
  link?: string;
}

export interface HousingOption extends Resource {
  price?: number;
}

export type IntegrationInfo = Resource;

export interface CommunityEvent extends Resource {
  date?: string;
}
