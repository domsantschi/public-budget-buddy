
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download, Coins, TrendingUp, TrendingDown, AlertCircle, ChevronRight, History } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
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
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface ExportPreviewProps {
  selectedCanton?: string;
  selectedAccount?: {
    id: number;
    account_number: number;
    name: string;
    category: string;
  } | null;
  aiSuggestion: number;
}

const historicalData = [
  { year: '2010', actual: 1500000, budget: 1450000, performance: 50000, projected: null },
  { year: '2011', actual: 1600000, budget: 1650000, performance: -50000, projected: null },
  { year: '2012', actual: 1680000, budget: 1600000, performance: 80000, projected: null },
  { year: '2013', actual: 1750000, budget: 1800000, performance: -50000, projected: null },
  { year: '2014', actual: 1850000, budget: 1750000, performance: 100000, projected: null },
  { year: '2015', actual: 1920000, budget: 1850000, performance: 70000, projected: null },
  { year: '2016', actual: 2000000, budget: 2100000, performance: -100000, projected: null },
  { year: '2017', actual: 2100000, budget: 2000000, performance: 100000, projected: null },
  { year: '2018', actual: 2200000, budget: 2150000, performance: 50000, projected: null },
  { year: '2019', actual: 2300000, budget: 2250000, performance: 50000, projected: null },
  { year: '2020', actual: 2200000, budget: 2400000, performance: -200000, projected: null },
  { year: '2021', actual: 2350000, budget: 2300000, performance: 50000, projected: null },
  { year: '2022', actual: 2600000, budget: 2500000, performance: 100000, projected: null },
  { year: '2023', actual: 2750000, budget: 2700000, performance: 50000, projected: null },
  { year: '2024', actual: 2800000, budget: 2850000, performance: -50000, projected: null },
  { year: '2025', actual: null, budget: null, performance: null, projected: 2890000 },
  { year: '2026', actual: null, budget: null, performance: null, projected: 3050000 },
  { year: '2027', actual: null, budget: null, performance: null, projected: 3200000 },
  { year: '2028', actual: null, budget: null, performance: null, projected: 3350000 },
  { year: '2029', actual: null, budget: null, performance: null, projected: 3500000 },
  { year: '2030', actual: null, budget: null, performance: null, projected: 3650000 }
];

const ExportPreview = ({
  selectedCanton,
  selectedAccount,
  aiSuggestion
}: ExportPreviewProps) => {
  const [notes, setNotes] = useState("");
  const [userEstimate, setUserEstimate] = useState<string>("");
  const [difference, setDifference] = useState<number>(0);
  const [percentageDiff, setPercentageDiff] = useState<number>(0);
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    const userValue = userEstimate ? parseFloat(userEstimate.replace(/[^\d.-]/g, '')) : 0;
    const diff = userValue - aiSuggestion;
    setDifference(diff);
    if (aiSuggestion !== 0) {
      setPercentageDiff(diff / aiSuggestion * 100);
    } else {
      setPercentageDiff(0);
    }
  }, [userEstimate, aiSuggestion]);
  
  const formatCHF = (amount: number) => {
    return amount.toLocaleString('de-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  
  const handleEstimateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEstimate(e.target.value);
  };
  
  return <Card className="w-full h-full flex flex-col animate-fade-in bg-white/50 backdrop-blur-sm">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Coins className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Slack Evaluation</h3>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          <section className="space-y-2">
            <h4 className="font-semibold">Your Budget Estimate</h4>
            <div className="flex items-center space-x-2">
              <Input type="text" placeholder="Enter your budget estimate..." value={userEstimate} onChange={handleEstimateChange} className="w-full" />
            </div>
          </section>

          <section className="space-y-4">
            <h4 className="font-semibold">Budget Comparison</h4>
            
            <div className="space-y-4">
              <div className="bg-white/80 p-5 rounded-md border shadow-sm">
                <div className="text-sm text-muted-foreground mb-1">Your Estimate:</div>
                <div className="text-xl font-bold">
                  {userEstimate ? formatCHF(parseFloat(userEstimate.replace(/[^\d.-]/g, ''))) : "-"}
                </div>
              </div>
              
              <div className="bg-white/80 p-5 rounded-md border shadow-sm">
                <div className="text-sm text-muted-foreground mb-1">AI Suggestion:</div>
                <div className="text-xl font-bold">{formatCHF(aiSuggestion)}</div>
                <div className="flex items-center space-x-2 text-sm mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">+3.2% from previous year</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-5 rounded-md border border-blue-100 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-blue-800">Potential Budgetary Slack:</div>
                <div className="font-bold text-xl">
                  {userEstimate ? <div className="flex items-center">
                      {difference > 0 ? <TrendingUp className="h-4 w-4 text-green-500 mr-1" /> : difference < 0 ? <TrendingDown className="h-4 w-4 text-red-500 mr-1" /> : <AlertCircle className="h-4 w-4 text-blue-500 mr-1" />}
                      <span className={difference > 0 ? 'text-green-600' : difference < 0 ? 'text-red-600' : 'text-blue-600'}>
                        {formatCHF(Math.abs(difference))} 
                        {difference !== 0 && <span className="text-sm ml-1">
                            ({percentageDiff > 0 ? '+' : ''}{percentageDiff.toFixed(1)}%)
                          </span>}
                      </span>
                    </div> : <span className="text-blue-600">-</span>}
                </div>
              </div>
              <div className="text-sm text-blue-600 mt-2">
                {userEstimate ? difference > 0 ? "Your estimate is higher than AI suggestion. Consider reviewing for potential savings." : difference < 0 ? "Your estimate is lower than AI suggestion. This may lead to budget shortfalls." : "Your estimate matches the AI suggestion exactly." : "Enter your budget estimate to see the comparison."}
              </div>
            </div>
            
            <Button 
              onClick={() => setShowDetails(true)} 
              className="w-full group mt-2"
              variant="outline"
            >
              <History className="mr-2 h-4 w-4" />
              View Historical Data
              <ChevronRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </section>
        </div>
      </div>
      
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
                    <path d="M 0 0 L 4 4 M 4 0 L 0 4" strokeWidth="1" stroke="#333333" fill="#22c55e"/>
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
                  tickFormatter={(value) => `CHF ${(value/1000000).toFixed(1)}M`}
                />
                <Tooltip 
                  formatter={(value) => [formatCHF(Number(value)), '']}
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
                  dataKey="budget" 
                  stackId="a"
                  fill="#0ea5e9" 
                  name="Budget"
                />
                <Bar 
                  dataKey="performance" 
                  stackId="a"
                  name="Performance Delta"
                >
                  {historicalData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={entry.performance >= 0 ? "#22c55e" : "#ea384c"}
                    />
                  ))}
                </Bar>
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
    </Card>;
};

export default ExportPreview;
