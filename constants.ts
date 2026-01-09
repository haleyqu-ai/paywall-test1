
import { Plan, FeatureGroup } from './types';

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'No credit card needed',
    monthlyPrice: 0,
    yearlyPrice: 0,
    ctaText: 'Current plan',
    variant: 'default',
    features: [
      { text: 'Core AI features' },
      { text: '100 monthly credits recharge', highlight: true },
      { text: '10 downloads per month of Meshy-4 models' },
      { text: '1 task in queue' },
      { text: 'Low queue priority' },
      { text: 'Assets are under CC BY 4.0 license' }
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Best for individual creators',
    monthlyPrice: 20,
    yearlyPrice: 15.17,
    badge: 'MOST POPULAR',
    holidayOffer: 'HOLIDAY OFFER: 6 Months Free + 2 Bonus Gifts',
    ctaText: 'Subscribe Now',
    variant: 'highlight',
    features: [
      { text: 'Everything in Free, plus:' },
      { text: 'Advanced generation tools', highlight: true },
      { text: '1,000 monthly credits recharge (up to 100 assets)', highlight: true },
      { text: 'Unlimited downloads per month of all models', highlight: true },
      { text: '10 tasks in queue' },
      { text: 'High queue priority' },
      { text: 'Assets are private & customer owned' },
      { text: '4 free retries for each task' },
      { text: 'API & 3D platform plugins access' },
      { text: 'Unlimited downloads of community models', highlight: true }
    ]
  },
  {
    id: 'studio',
    name: 'Studio',
    tagline: 'Best for studios and teams',
    monthlyPrice: 60,
    yearlyPrice: 48,
    holidayOffer: 'HOLIDAY OFFER: 6 Months Free + 2 Bonus Gifts',
    ctaText: 'Subscribe Now',
    variant: 'studio',
    features: [
      { text: 'Everything in Pro, plus:' },
      { text: 'Team management' },
      { text: '4,000 monthly credits recharge (up to 400 assets)', highlight: true },
      { text: '20 tasks in queue' },
      { text: 'Higher queue priority', highlight: true },
      { text: '8 free retries for each task', highlight: true },
      { text: 'Centralized billing' },
      { text: 'Shared team credits' }
    ]
  }
];

export const ENTERPRISE_PLAN: Plan = {
  id: 'enterprise',
  name: 'Enterprise',
  tagline: 'For organizations that need large volume usage, customized solutions, and more',
  monthlyPrice: 0,
  yearlyPrice: 0,
  ctaText: 'Contact Us',
  variant: 'enterprise',
  features: [
    { text: 'Everything in Studio, plus:' },
    { text: 'Multiple team/workspace management' },
    { text: 'Customizable credit balance', highlight: true },
    { text: '50+ tasks in queue' },
    { text: 'Highest queue priority', highlight: true },
    { text: 'Unlimited free retries for each task', highlight: true },
    { text: 'Highest API throughput' },
    { text: 'Full API Playground Access' },
    { text: 'Forever API asset retention' },
    { text: 'SAML SSO support' },
    { text: 'Dedicated account support' }
  ]
};

export const COMPARISON_DATA: FeatureGroup[] = [
  {
    name: 'Fundamental',
    items: [
      { name: 'Credit plans', values: { free: '100 credits', pro: '1,000 credits', studio: '4,000 credits', enterprise: 'Customizable' } },
      { name: 'Assets generation', values: { free: 'Up to 10', pro: 'Up to 100', studio: 'Up to 400', enterprise: 'Customizable' } },
      { name: 'Download limit', values: { free: '10 Meshy-4', pro: 'Unlimited', studio: 'Unlimited', enterprise: 'Unlimited' } },
      { name: 'Priority', values: { free: 'Low', pro: 'High', studio: 'Higher', enterprise: 'Highest' } }
    ]
  },
  {
    name: 'AI Capabilities',
    items: [
      { name: 'Image to 3D', values: { free: true, pro: true, studio: true, enterprise: true } },
      { name: 'Text to 3D', values: { free: true, pro: true, studio: true, enterprise: true } },
      { name: 'AI Texturing', values: { free: true, pro: true, studio: true, enterprise: true } },
      { name: 'Remesh', values: { free: false, pro: true, studio: true, enterprise: true } },
      { name: 'Animation library', values: { free: '20', pro: 'Over 500', studio: 'Over 500', enterprise: 'Over 500' } }
    ]
  }
];
