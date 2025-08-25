import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, Users, MapPin, Star, DollarSign } from "lucide-react";
import { mockProperties } from "@/data/mockData";
import { BuyerProfile, PropertyRecommendation, Property } from "@/types";

export const PropertyRecommender = () => {
  const [profile, setProfile] = useState<BuyerProfile>({
    budget: 0,
    nationality: "",
    familySize: 1,
    purpose: "self-use"
  });
  const [recommendations, setRecommendations] = useState<PropertyRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const nationalities = [
    "Emirati", "British", "Indian", "Pakistani", "Filipino", "Egyptian",
    "Lebanese", "Jordanian", "American", "Canadian", "Australian", "German"
  ];

  const handleInputChange = (field: keyof BuyerProfile, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const generateRecommendations = async () => {
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const scored = mockProperties.map(property => ({
        property,
        score: calculateMatchScore(property, profile),
        reasoning: generateReasoning(property, profile)
      })).sort((a, b) => b.score - a.score).slice(0, 3);
      
      setRecommendations(scored);
      setLoading(false);
    }, 2000);
  };

  const calculateMatchScore = (property: Property, profile: BuyerProfile): number => {
    let score = 60; // Base score
    
    // Budget fit
    const budgetRatio = property.price / profile.budget;
    if (budgetRatio <= 0.9) score += 20;
    else if (budgetRatio <= 1.1) score += 10;
    else score -= 20;
    
    // Family size to bedrooms ratio
    if (property.bedrooms >= profile.familySize) score += 15;
    
    // Purpose matching
    if (profile.purpose === "investment") {
      if (property.location === "Dubai Marina" || property.location === "Downtown Dubai") {
        score += 10;
      }
    } else {
      if (property.location === "Arabian Ranches" || property.location === "Emirates Hills") {
        score += 10;
      }
    }
    
    // Nationality preferences
    if (profile.nationality === "Emirati" && property.type === "villa") score += 15;
    if (profile.nationality === "British" && property.location === "Dubai Marina") score += 10;
    
    return Math.min(100, Math.max(0, score + Math.random() * 10));
  };

  const generateReasoning = (property: Property, profile: BuyerProfile): string => {
    const reasons = [];
    
    if (profile.purpose === "investment") {
      reasons.push(`Excellent investment potential in ${property.location}`);
    } else {
      reasons.push(`Perfect family home in ${property.location}`);
    }
    
    if (property.bedrooms >= profile.familySize) {
      reasons.push(`${property.bedrooms} bedrooms accommodate your family size`);
    }
    
    if (profile.nationality === "Emirati" && property.type === "villa") {
      reasons.push("Traditional villa lifestyle preferred by Emirati families");
    }
    
    if (property.amenities.includes("Private Pool")) {
      reasons.push("Private pool adds luxury and family value");
    }
    
    return reasons.join(". ");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle>AI Property Recommender</CardTitle>
          </div>
          <CardDescription>
            Get personalized property recommendations based on buyer profile and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Buyer Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (AED)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="5000000"
                onChange={(e) => handleInputChange("budget", parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Select onValueChange={(value) => handleInputChange("nationality", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {nationalities.map(nat => (
                    <SelectItem key={nat} value={nat}>{nat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="familySize">Family Size</Label>
              <Input
                id="familySize"
                type="number"
                placeholder="4"
                min="1"
                onChange={(e) => handleInputChange("familySize", parseInt(e.target.value) || 1)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Select onValueChange={(value) => handleInputChange("purpose", value as "investment" | "self-use")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self-use">Self Use</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={generateRecommendations} 
            variant="hero" 
            size="lg" 
            className="w-full"
            disabled={loading || !profile.budget || !profile.nationality}
          >
            {loading ? "Finding Perfect Matches..." : "Get AI Recommendations"}
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Top Property Recommendations</h3>
          {recommendations.map((rec, index) => (
            <Card key={rec.property.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Property Image */}
                  <div className="lg:w-1/3">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <Building2 className="h-12 w-12 text-primary/50" />
                    </div>
                  </div>
                  
                  {/* Property Details */}
                  <div className="lg:w-2/3 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xl font-semibold">{rec.property.title}</h4>
                        <div className="flex items-center space-x-2 text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{rec.property.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-warning" />
                          <span className={`font-bold ${getScoreColor(rec.score)}`}>
                            {Math.round(rec.score)}% Match
                          </span>
                        </div>
                        <Badge variant={index === 0 ? "default" : "secondary"}>
                          #{index + 1} Recommendation
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Bedrooms</p>
                        <p className="font-semibold">{rec.property.bedrooms}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Bathrooms</p>
                        <p className="font-semibold">{rec.property.bathrooms}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Size</p>
                        <p className="font-semibold">{rec.property.sqft.toLocaleString()} sqft</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Type</p>
                        <p className="font-semibold capitalize">{rec.property.type}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrency(rec.property.price)}
                      </span>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50">
                      <h5 className="font-semibold mb-2">Why this property fits:</h5>
                      <p className="text-sm text-muted-foreground">{rec.reasoning}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {rec.property.amenities.slice(0, 4).map(amenity => (
                        <Badge key={amenity} variant="outline">{amenity}</Badge>
                      ))}
                      {rec.property.amenities.length > 4 && (
                        <Badge variant="outline">+{rec.property.amenities.length - 4} more</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};