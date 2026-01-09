
export enum BillingInterval {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export interface Feature {
  text: string;
  isNew?: boolean;
  highlight?: boolean;
  tooltip?: string;
  value?: string | boolean;
}

export interface FeatureGroup {
  name: string;
  items: {
    name: string;
    values: Record<string, string | boolean>;
  }[];
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  badge?: string;
  ctaText: string;
  features: Feature[];
  variant: 'default' | 'highlight' | 'enterprise' | 'studio';
  holidayOffer?: string;
}
