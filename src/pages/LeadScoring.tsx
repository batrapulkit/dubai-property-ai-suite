import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, ArrowLeft, Users } from "lucide-react";
import { LeadScoring as LeadScoringComponent } from "@/components/LeadScoring";

const LeadScoring = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Lead Scoring System</h1>
                  <p className="text-sm text-muted-foreground">AI-Powered Lead Classification</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => navigate("/smart-pricing")}>
                Smart Pricing
              </Button>
              <Button variant="outline" onClick={() => navigate("/property-recommender")}>
                Property Recommender
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Lead Scoring & Management</h2>
          <p className="text-muted-foreground">
            AI-powered lead classification to prioritize your sales efforts and maximize conversions.
          </p>
        </div>

        <LeadScoringComponent />
      </main>
    </div>
  );
};

export default LeadScoring;