import { Property, Lead, BuyerProfile } from "@/types";

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Villa in Emirates Hills",
    location: "Emirates Hills",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 8500,
    price: 12500000,
    type: "villa",
    amenities: ["Private Pool", "Garden", "Maid's Room", "Driver's Room", "Garage"],
    furnishing: "furnished",
    yearBuilt: 2020,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2", 
    title: "Modern Penthouse in Downtown Dubai",
    location: "Downtown Dubai",
    bedrooms: 3,
    bathrooms: 4,
    sqft: 3200,
    price: 4800000,
    type: "penthouse",
    amenities: ["Burj Khalifa View", "Gym", "Pool", "Concierge"],
    furnishing: "furnished",
    yearBuilt: 2018
  },
  {
    id: "3",
    title: "Family Townhouse in Arabian Ranches",
    location: "Arabian Ranches",
    bedrooms: 4,
    bathrooms: 5,
    sqft: 4200,
    price: 3200000,
    type: "townhouse", 
    amenities: ["Community Pool", "Playground", "Golf Course Access"],
    furnishing: "unfurnished",
    yearBuilt: 2019
  },
  {
    id: "4",
    title: "Waterfront Apartment in Dubai Marina",
    location: "Dubai Marina",
    bedrooms: 2,
    bathrooms: 3,
    sqft: 1800,
    price: 2100000,
    type: "apartment",
    amenities: ["Marina View", "Gym", "Pool", "Beach Access"],
    furnishing: "semi-furnished",
    yearBuilt: 2017
  }
];

export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Ahmed Al-Mansouri",
    email: "ahmed.mansouri@email.com",
    phone: "+971 50 123 4567",
    inquiries: 8,
    propertyViews: 15,
    budget: 5000000,
    budgetFit: 85,
    responsiveness: 92,
    score: "Hot",
    probability: 88,
    lastActivity: new Date('2024-01-15')
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com", 
    phone: "+971 55 987 6543",
    inquiries: 3,
    propertyViews: 8,
    budget: 2500000,
    budgetFit: 70,
    responsiveness: 65,
    score: "Warm",
    probability: 62,
    lastActivity: new Date('2024-01-12')
  },
  {
    id: "3",
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+971 52 456 7890",
    inquiries: 1,
    propertyViews: 3,
    budget: 1500000,
    budgetFit: 45,
    responsiveness: 30,
    score: "Cold",
    probability: 25,
    lastActivity: new Date('2024-01-08')
  },
  {
    id: "4",
    name: "Fatima Hassan",
    email: "fatima.hassan@email.com",
    phone: "+971 56 789 0123", 
    inquiries: 12,
    propertyViews: 22,
    budget: 8000000,
    budgetFit: 95,
    responsiveness: 88,
    score: "Hot",
    probability: 94,
    lastActivity: new Date('2024-01-16')
  }
];

export const mockBuyerProfiles: BuyerProfile[] = [
  {
    budget: 5000000,
    nationality: "Emirati",
    familySize: 4,
    purpose: "self-use",
    preferredLocation: "Emirates Hills",
    propertyType: "villa"
  },
  {
    budget: 2500000,
    nationality: "British", 
    familySize: 3,
    purpose: "investment",
    preferredLocation: "Dubai Marina",
    propertyType: "apartment"
  }
];

// Pricing calculation logic
export const calculatePricing = (property: Partial<Property>) => {
  const basePrice = (property.sqft || 1000) * 1200; // AED per sqft
  const locationMultiplier = getLocationMultiplier(property.location || "");
  const amenitiesBonus = (property.amenities?.length || 0) * 50000;
  const furnishingBonus = getFurnishingBonus(property.furnishing || "unfurnished");
  
  const suggestedPrice = basePrice * locationMultiplier + amenitiesBonus + furnishingBonus;
  const rentPrice = suggestedPrice * 0.08; // 8% of property value annually
  const roi = 12 + (Math.random() * 8); // 12-20% ROI
  const rentalYield = 6 + (Math.random() * 4); // 6-10% yield
  
  return {
    suggestedPrice: Math.round(suggestedPrice),
    rentPrice: Math.round(rentPrice),
    roi: Math.round(roi * 100) / 100,
    rentalYield: Math.round(rentalYield * 100) / 100,
    confidence: 85 + Math.round(Math.random() * 10),
    factors: getValueFactors(property.location || "", property.amenities || [])
  };
};

const getLocationMultiplier = (location: string): number => {
  const multipliers: { [key: string]: number } = {
    "Emirates Hills": 3.2,
    "Downtown Dubai": 2.8,
    "Dubai Marina": 2.2,
    "Arabian Ranches": 1.8,
    "JBR": 2.5,
    "Palm Jumeirah": 3.0
  };
  return multipliers[location] || 1.5;
};

const getFurnishingBonus = (furnishing: string): number => {
  return furnishing === "furnished" ? 200000 : 
         furnishing === "semi-furnished" ? 100000 : 0;
};

const getValueFactors = (location: string, amenities: string[]): string[] => {
  const factors = [`Prime location in ${location}`];
  if (amenities.includes("Private Pool")) factors.push("Private pool adds 8% value");
  if (amenities.includes("Burj Khalifa View")) factors.push("Iconic view premium");
  if (amenities.includes("Beach Access")) factors.push("Waterfront lifestyle appeal");
  return factors;
};