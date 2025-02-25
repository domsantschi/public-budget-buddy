
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface BudgetSuggestion {
  amount: number;
  change: number;
  confidence: number;
}

const historicalData = [
  { year: '2010', actual: 1500000, projected: null },
  { year: '2011', actual: 1600000, projected: null },
  { year: '2012', actual: 1680000, projected: null },
  { year: '2013', actual: 1750000, projected: null },
  { year: '2014', actual: 1850000, projected: null },
  { year: '2015', actual: 1920000, projected: null },
  { year: '2016', actual: 2000000, projected: null },
  { year: '2017', actual: 2100000, projected: null },
  { year: '2018', actual: 2200000, projected: null },
  { year: '2019', actual: 2300000, projected: null },
  { year: '2020', actual: 2200000, projected: null },
  { year: '2021', actual: 2350000, projected: null },
  { year: '2022', actual: 2600000, projected: null },
  { year: '2023', actual: 2750000, projected: null },
  { year: '2024', actual: 2800000, projected: null },
  { year: '2025', actual: null, projected: 2890000 },
  { year: '2026', actual: null, projected: 3050000 },
  { year: '2027', actual: null, projected: 3200000 },
  { year: '2028', actual: null, projected: 3350000 },
  { year: '2029', actual: null, projected: 3500000 },
  { year: '2030', actual: null, projected: 3650000 }
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
            <DialogTitle>Budget History & Projections (2010-2030)</DialogTitle>
            <DialogDescription>
              Historical budget data and future projections based on current trends and economic indicators
            </DialogDescription>
          </DialogHeader>
          
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                <defs>
                  <pattern id="projectedPattern" patternUnits="userSpaceOnUse" width="4" height="4">
                    <path d="M 0 0 L 4 4 M 4 0 L 0 4" strokeWidth="1" stroke="#fff" fill="#22c55e"/>
                  </pattern>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
                />
                <Legend />
                <ReferenceLine 
                  x="2025" 
                  stroke="#ff0000" 
                  label={{ 
                    value: "Current Year", 
                    position: "top",
                    fill: "#ff0000",
                    fontSize: 12 
                  }} 
                />
                <Bar 
                  dataKey="actual" 
                  fill="#0ea5e9" 
                  name="Historical Budget"
                />
                <Bar 
                  dataKey="projected" 
                  fill="url(#projectedPattern)" 
                  name="Projected Budget"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BudgetSuggestion;
