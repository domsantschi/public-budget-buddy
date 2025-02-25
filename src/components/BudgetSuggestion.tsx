
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { 
  ChevronRight, 
  DollarSign, 
  TrendingUp,
  X 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface BudgetSuggestion {
  amount: number;
  change: number;
  confidence: number;
}

const historicalData = [
  { year: '2020', actual: 2200000, projected: null },
  { year: '2021', actual: 2350000, projected: null },
  { year: '2022', actual: 2600000, projected: null },
  { year: '2023', actual: 2750000, projected: null },
  { year: '2024', actual: null, projected: 2890000 },
  { year: '2025', actual: null, projected: 3050000 },
];

const BudgetSuggestion = () => {
  const [suggestion, setSuggestion] = useState<BudgetSuggestion>({
    amount: 0,
    change: 0,
    confidence: 0
  });
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Simulate API call with mock data
    setSuggestion({
      amount: 2750000,
      change: 5.2,
      confidence: 92
    });
  }, []);

  return (
    <>
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

        <Button 
          onClick={() => setShowDetails(true)} 
          className="w-full group"
        >
          View Historical Data
          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Budget History & Projections</DialogTitle>
            <DialogDescription>
              Historical budget data and future projections based on current trends and economic indicators
            </DialogDescription>
          </DialogHeader>
          
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis 
                  tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#0ea5e9" 
                  name="Historical Budget"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="#22c55e" 
                  name="Projected Budget"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BudgetSuggestion;
