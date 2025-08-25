import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calculator, Users, TrendingUp, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "See you next time!"
    });
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Dubai Real Estate Suite</h1>
                  <p className="text-sm text-muted-foreground">AI-Powered Intelligence</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{user.name}</p>
                <Badge variant="secondary" className="text-xs">{user.role}</Badge>
              </div>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h2>
          <p className="text-muted-foreground">
            Manage your properties, leads, and get AI-powered insights all in one place.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Properties</p>
                  <p className="text-3xl font-bold text-primary">247</p>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Leads</p>
                  <p className="text-3xl font-bold text-success">89</p>
                </div>
                <div className="p-3 rounded-full bg-success/10">
                  <Users className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg ROI</p>
                  <p className="text-3xl font-bold text-accent">16.8%</p>
                </div>
                <div className="p-3 rounded-full bg-accent/10">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => navigate("/smart-pricing")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <Button variant="ghost" size="sm">
                  Open →
                </Button>
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Pricing & ROI</h3>
              <p className="text-muted-foreground">
                AI-powered property valuation with ROI predictions and rental yield analysis
              </p>
            </CardContent>
          </Card>

          <Card 
            className="shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => navigate("/property-recommender")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-success/10 group-hover:bg-success/20 transition-colors">
                  <Building2 className="h-6 w-6 text-success" />
                </div>
                <Button variant="ghost" size="sm">
                  Open →
                </Button>
              </div>
              <h3 className="text-xl font-bold mb-2">Property Recommender</h3>
              <p className="text-muted-foreground">
                Match clients with perfect properties based on their preferences and requirements
              </p>
            </CardContent>
          </Card>

          <Card 
            className="shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => navigate("/lead-scoring")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <Button variant="ghost" size="sm">
                  Open →
                </Button>
              </div>
              <h3 className="text-xl font-bold mb-2">Lead Scoring</h3>
              <p className="text-muted-foreground">
                Classify and prioritize leads with AI-powered scoring and probability analysis
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;