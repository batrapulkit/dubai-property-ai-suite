import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Users, TrendingUp, Phone, Mail, Calendar, Filter } from "lucide-react";
import { mockLeads } from "@/data/mockData";
import { Lead } from "@/types";

export const LeadScoring = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [filter, setFilter] = useState<"all" | "Hot" | "Warm" | "Cold">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === "all" || lead.score === filter;
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getScoreColor = (score: "Hot" | "Warm" | "Cold") => {
    switch (score) {
      case "Hot": return "destructive";
      case "Warm": return "secondary";
      case "Cold": return "outline";
    }
  };

  const getScoreIcon = (score: "Hot" | "Warm" | "Cold") => {
    switch (score) {
      case "Hot": return "🔥";
      case "Warm": return "⚡";
      case "Cold": return "❄️";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalLeads = leads.length;
  const hotLeads = leads.filter(l => l.score === "Hot").length;
  const warmLeads = leads.filter(l => l.score === "Warm").length;
  const coldLeads = leads.filter(l => l.score === "Cold").length;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{totalLeads}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hot Leads</p>
                <p className="text-2xl font-bold text-red-600">{hotLeads}</p>
              </div>
              <span className="text-2xl">🔥</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warm Leads</p>
                <p className="text-2xl font-bold text-yellow-600">{warmLeads}</p>
              </div>
              <span className="text-2xl">⚡</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cold Leads</p>
                <p className="text-2xl font-bold text-blue-600">{coldLeads}</p>
              </div>
              <span className="text-2xl">❄️</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Lead Management */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Lead Scoring System</CardTitle>
          </div>
          <CardDescription>
            AI-powered lead classification and probability scoring based on CRM data
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search leads by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filter === "Hot" ? "default" : "outline"}
                onClick={() => setFilter("Hot")}
                size="sm"
              >
                🔥 Hot
              </Button>
              <Button
                variant={filter === "Warm" ? "default" : "outline"}
                onClick={() => setFilter("Warm")}
                size="sm"
              >
                ⚡ Warm
              </Button>
              <Button
                variant={filter === "Cold" ? "default" : "outline"}
                onClick={() => setFilter("Cold")}
                size="sm"
              >
                ❄️ Cold
              </Button>
            </div>
          </div>

          {/* Leads Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-sm text-muted-foreground">{lead.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lead.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="font-medium">{lead.inquiries}</span> inquiries
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">{lead.propertyViews}</span> property views
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={lead.responsiveness} className="w-16 h-2" />
                          <span className="text-xs text-muted-foreground">
                            {lead.responsiveness}% responsive
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{formatCurrency(lead.budget)}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress value={lead.budgetFit} className="w-16 h-2" />
                          <span className="text-xs text-muted-foreground">
                            {lead.budgetFit}% fit
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getScoreColor(lead.score)}>
                        {getScoreIcon(lead.score)} {lead.score}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={lead.probability} className="w-20 h-2" />
                        <span className="font-medium">{lead.probability}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formatDate(lead.lastActivity)}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No leads found matching your criteria.</p>
            </div>
          )}

          {/* AI Insights */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
            <h4 className="font-semibold mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              AI Insights & Recommendations
            </h4>
            <div className="space-y-2 text-sm">
              <p>• <strong>{hotLeads}</strong> high-priority leads need immediate follow-up</p>
              <p>• Average lead conversion probability: <strong>{Math.round(leads.reduce((acc, l) => acc + l.probability, 0) / leads.length)}%</strong></p>
              <p>• <strong>Fatima Hassan</strong> has the highest conversion probability ({leads.find(l => l.name === "Fatima Hassan")?.probability}%)</p>
              <p>• Focus on budget-aligned properties for warm leads to improve conversion rates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};