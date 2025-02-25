
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight, DollarSign, TrendingUp } from "lucide-react";

interface BudgetSuggestion {
  amount: number;
  change: number;
  confidence: number;
}

const BudgetSuggestion = () => {
  const [suggestion, setSuggestion] = useState<BudgetSuggestion>({
    amount: 0,
    change: 0,
    confidence: 0
  });

  useEffect(() => {
    // Simulate API call with mock data
    setSuggestion({
      amount: 2750000,
      change: 5.2,
      confidence: 92
    });
  }, []);

  return (
    <Card className="p-6 space-y-4 animate-fade-in bg-white/50 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Budget Suggestion</h3>
        <span className="text-sm text-muted-foreground">
          {suggestion.confidence}% confidence
        </span>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <DollarSign className="h-6 w-6 text-muted-foreground" />
        <span className="text-3xl font-bold">
          {suggestion.amount.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center space-x-2 text-sm">
        <TrendingUp className="h-4 w-4 text-green-500" />
        <span className="text-green-500">+{suggestion.change}% from previous year</span>
      </div>

      <Button className="w-full group">
        View Details
        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </Card>
  );
};

export default BudgetSuggestion;
