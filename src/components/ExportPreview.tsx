import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download, Coins, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
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
const ExportPreview = ({
  selectedCanton,
  selectedAccount,
  aiSuggestion
}: ExportPreviewProps) => {
  const [notes, setNotes] = useState("");
  const [userEstimate, setUserEstimate] = useState<string>("");
  const [difference, setDifference] = useState<number>(0);
  const [percentageDiff, setPercentageDiff] = useState<number>(0);
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
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 p-3 rounded-md border">
                <div className="text-sm text-muted-foreground mb-1">Your Estimate:</div>
                <div className="text-lg font-bold">
                  {userEstimate ? formatCHF(parseFloat(userEstimate.replace(/[^\d.-]/g, ''))) : "-"}
                </div>
              </div>
              
              <div className="bg-white/50 p-3 rounded-md border">
                <div className="text-sm text-muted-foreground mb-1">AI Suggestion:</div>
                <div className="text-lg font-bold">{formatCHF(aiSuggestion)}</div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-blue-800">Potential Budgetary Slack:</div>
                <div className="font-bold text-lg">
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
              <div className="text-sm text-blue-600 mt-1">
                {userEstimate ? difference > 0 ? "Your estimate is higher than AI suggestion. Consider reviewing for potential savings." : difference < 0 ? "Your estimate is lower than AI suggestion. This may lead to budget shortfalls." : "Your estimate matches the AI suggestion exactly." : "Enter your budget estimate to see the comparison."}
              </div>
            </div>
          </section>

          <section className="space-y-2">
            
            
          </section>
        </div>
      </div>
    </Card>;
};
export default ExportPreview;