export interface User {
  id: string;
  email: string;
  name: string;
  role: 'agent' | 'admin';
}

export interface Property {
  id: string;
  title: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  price: number;
  type: 'villa' | 'apartment' | 'townhouse' | 'penthouse';
  amenities: string[];
  furnishing: 'furnished' | 'unfurnished' | 'semi-furnished';
  yearBuilt: number;
  imageUrl?: string;
}

export interface BuyerProfile {
  budget: number;
  nationality: string;
  familySize: number;
  purpose: 'investment' | 'self-use';
  preferredLocation?: string;
  propertyType?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiries: number;
  propertyViews: number;
  budget: number;
  budgetFit: number; // 0-100%
  responsiveness: number; // 0-100%
  score: 'Hot' | 'Warm' | 'Cold';
  probability: number; // 0-100%
  lastActivity: Date;
}

export interface PricingPrediction {
  suggestedPrice: number;
  rentPrice: number;
  roi: number;
  rentalYield: number;
  confidence: number;
  factors: string[];
}

export interface PropertyRecommendation {
  property: Property;
  score: number;
  reasoning: string;
}