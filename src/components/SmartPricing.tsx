import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, TrendingUp, DollarSign, Percent, CheckCircle } from "lucide-react";
import { calculatePricing } from "@/data/mockData";
import { Property, PricingPrediction } from "@/types";

export const SmartPricing = () => {
  const [formData, setFormData] = useState<Partial<Property>>({
    location: "",
    bedrooms: 0,
    bathrooms: 0,
    sqft: 0,
    amenities: [],
    furnishing: "unfurnished",
    yearBuilt: 2020
  });
  const [prediction, setPrediction] = useState<PricingPrediction | null>(null);
  const [loading, setLoading] = useState(false);

  const locations = [
    "Emirates Hills", "Downtown Dubai", "Dubai Marina", "Arabian Ranches", 
    "JBR", "Palm Jumeirah", "Business Bay", "DIFC"
  ];

  const amenitiesList = [
    "Private Pool", "Garden", "Maid's Room", "Driver's Room", "Garage",
    "Gym", "Concierge", "Beach Access", "Golf Course Access", "Burj Khalifa View"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    const current = formData.amenities || [];
    const updated = current.includes(amenity)
      ? current.filter(a => a !== amenity)
      : [...current, amenity];
    setFormData(prev => ({ ...prev, amenities: updated }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const result = calculatePricing(formData);
      setPrediction(result);
      setLoading(false);
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-primary" />
            <CardTitle>Smart Pricing & ROI Predictor</CardTitle>
          </div>
          <CardDescription>
            Get AI-powered property valuation and investment analysis for Dubai real estate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Property Details Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select onValueChange={(value) => handleInputChange("location", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                placeholder="3"
                onChange={(e) => handleInputChange("bedrooms", parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                placeholder="2"
                onChange={(e) => handleInputChange("bathrooms", parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sqft">Square Feet</Label>
              <Input
                id="sqft"
                type="number"
                placeholder="2000"
                onChange={(e) => handleInputChange("sqft", parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="furnishing">Furnishing</Label>
              <Select onValueChange={(value) => handleInputChange("furnishing", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select furnishing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="furnished">Furnished</SelectItem>
                  <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
                  <SelectItem value="unfurnished">Unfurnished</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearBuilt">Year Built</Label>
              <Input
                id="yearBuilt"
                type="number"
                placeholder="2020"
                onChange={(e) => handleInputChange("yearBuilt", parseInt(e.target.value) || 2020)}
              />
            </div>
          </div>

          {/* Amenities Selection */}
          <div className="space-y-3">
            <Label>Amenities</Label>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map(amenity => (
                <Badge
                  key={amenity}
                  variant={formData.amenities?.includes(amenity) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                  onClick={() => handleAmenityToggle(amenity)}
                >
                  {formData.amenities?.includes(amenity) && (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  )}
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleCalculate} 
            variant="hero" 
            size="lg" 
            className="w-full"
            disabled={loading || !formData.location || !formData.sqft}
          >
            {loading ? "Calculating..." : "Calculate Pricing & ROI"}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {prediction && (
        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <span>AI Pricing Analysis</span>
            </CardTitle>
            <CardDescription>
              Analysis based on historical data and market trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg bg-primary/5">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Suggested Price</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(prediction.suggestedPrice)}
                </p>
              </div>

              <div className="text-center p-4 rounded-lg bg-accent/5">
                <DollarSign className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Annual Rent</p>
                <p className="text-2xl font-bold text-accent">
                  {formatCurrency(prediction.rentPrice)}
                </p>
              </div>

              <div className="text-center p-4 rounded-lg bg-success/5">
                <Percent className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Estimated ROI</p>
                <p className="text-2xl font-bold text-success">
                  {prediction.roi}%
                </p>
              </div>

              <div className="text-center p-4 rounded-lg bg-warning/5">
                <TrendingUp className="h-8 w-8 text-warning mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Rental Yield</p>
                <p className="text-2xl font-bold text-warning">
                  {prediction.rentalYield}%
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-3">
              <h4 className="font-semibold">Key Value Factors:</h4>
              <ul className="space-y-2">
                {prediction.factors.map((factor, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Confidence Level: <span className="font-semibold text-primary">{prediction.confidence}%</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Based on analysis of 10,000+ Dubai property transactions
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};